#!/usr/bin/env python3
"""
Fetch each member's research-channel history from Slack and write one JSON file
per person to public/data/research/<slug>.json.

Unlike the weekly-status fetch (one shared channel, one curated post per week),
research channels are per-person free-form feeds. We pull the FULL history of
each channel, including thread replies, on every run. A full re-pull is
idempotent and avoids the placeholder/shadowing pitfalls of incremental sync.

Runs in GitHub Actions alongside fetch_slack_updates.py.

Required Slack bot scopes: channels:read, channels:history, users:read, and
channels:join (so the bot can self-join public channels). If channels:join is
not granted, invite the bot to each *-research channel manually.
"""

import os
import json
import time
from datetime import datetime
from typing import Dict, List, Any, Optional

from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from dotenv import load_dotenv

# Reuse the markdown formatting + client helpers from the weekly fetcher.
from fetch_slack_updates import (
    get_slack_client,
    format_message_with_replies,
    USER_MAPPING,
)

load_dotenv()

DATA_DIR = "public/data/research"

# Channel -> person. Mirrors lib/people.ts. A channel that does not exist (or
# that the bot cannot access) is skipped without failing the run.
RESEARCH_CHANNELS = [
    {"channel": "arjun-research", "slug": "arjun-dahal", "name": "Arjun Dahal"},
    {"channel": "fadul-research", "slug": "fadul-sikder", "name": "Fadul Sikder"},
    {"channel": "krishna-research", "slug": "krishna-khadka", "name": "Krishna Khadka"},
    {"channel": "pujan-research", "slug": "pujan-budhathoki", "name": "Pujan Budhathoki"},
    {"channel": "qiping-research", "slug": "qiping-wei", "name": "Qiping Wei"},
    {"channel": "saif-research", "slug": "saif-uddin-mahmud", "name": "Saif Uddin Mahmud"},
    {"channel": "shovon-research", "slug": "shovon-niverd", "name": "Shovon Niverd"},
    {"channel": "mekdelawit-research", "slug": "mekdelawit-gebrewold", "name": "Mekdelawit Gebrewold"},
    {"channel": "samreen-research", "slug": "samreen", "name": "Samreen"},
    {"channel": "sunny-research", "slug": "sunny-shree", "name": "Sunny Shree"},
]


def build_channel_index(client: WebClient) -> Dict[str, str]:
    """Map public channel name -> channel id (paginated)."""
    index: Dict[str, str] = {}
    cursor = None
    while True:
        resp = client.conversations_list(
            types="public_channel",
            exclude_archived=False,
            limit=200,
            cursor=cursor,
        )
        for ch in resp.get("channels", []):
            index[ch["name"]] = ch["id"]
        cursor = resp.get("response_metadata", {}).get("next_cursor")
        if not cursor:
            break
        time.sleep(1)  # be gentle with rate limits
    return index


def ensure_member(client: WebClient, channel_id: str) -> None:
    """Best-effort join so conversations_history works on public channels."""
    try:
        client.conversations_join(channel=channel_id)
    except SlackApiError as e:
        # already in channel / missing scope / method restriction -> rely on a
        # manual invite. Don't fail the whole run for one channel.
        print(f"  [INFO] join skipped ({e.response['error']})")


def resolve_user_names(client: WebClient, user_ids: set) -> None:
    """Augment USER_MAPPING with real names for any users we don't know yet."""
    for uid in user_ids:
        if not uid or uid in USER_MAPPING:
            continue
        try:
            info = client.users_info(user=uid)
            profile = info["user"].get("profile", {})
            name = (
                profile.get("real_name")
                or info["user"].get("real_name")
                or info["user"].get("name")
                or uid
            )
            USER_MAPPING[uid] = {"name": name}
        except SlackApiError:
            USER_MAPPING[uid] = {"name": uid}


def fetch_all_messages(client: WebClient, channel_id: str) -> List[Dict[str, Any]]:
    """Paginate the full channel history (oldest cursor not set => everything)."""
    messages: List[Dict[str, Any]] = []
    cursor = None
    while True:
        resp = client.conversations_history(channel=channel_id, limit=200, cursor=cursor)
        messages.extend(resp.get("messages", []))
        cursor = resp.get("response_metadata", {}).get("next_cursor")
        if not cursor:
            break
        time.sleep(1)
    return messages


def fetch_channel(client: WebClient, channel_id: str, person: Dict[str, str]) -> Dict[str, Any]:
    raw = fetch_all_messages(client, channel_id)

    # Keep real user posts; drop system/subtype noise (joins, topic changes...).
    posts = [
        m
        for m in raw
        if m.get("type") == "message" and not m.get("subtype") and m.get("user")
    ]

    # Collect every author (and repliers) so attribution resolves to real names.
    author_ids = {m.get("user") for m in posts}

    messages: List[Dict[str, Any]] = []
    for m in posts:
        replies: List[Dict[str, Any]] = []
        if m.get("thread_ts") and m.get("reply_count"):
            try:
                thread = client.conversations_replies(channel=channel_id, ts=m["thread_ts"])
                replies = thread.get("messages", [])
                author_ids.update(r.get("user") for r in replies)
                time.sleep(0.5)
            except SlackApiError as e:
                print(f"  [INFO] thread fetch skipped ({e.response['error']})")

        ts = float(m["ts"])
        messages.append(
            {
                "_pending_replies": replies,
                "_message": m,
                "id": m["ts"],
                "date": datetime.fromtimestamp(ts).strftime("%Y-%m-%d"),
                "ts": ts,
                "reply_count": (len(replies) - 1) if len(replies) > 1 else 0,
            }
        )

    # Resolve names once, then format markdown (format uses USER_MAPPING).
    resolve_user_names(client, author_ids)
    for entry in messages:
        entry["content"] = format_message_with_replies(entry.pop("_message"), entry.pop("_pending_replies"))

    messages.sort(key=lambda x: x["ts"], reverse=True)
    for entry in messages:
        entry.pop("ts", None)

    return {
        "slug": person["slug"],
        "name": person["name"],
        "channel": person["channel"],
        "last_updated": datetime.now().isoformat(),
        "messages": messages,
    }


def main():
    print("Starting research-channel fetch...")
    try:
        client = get_slack_client()
    except ValueError as e:
        print(f"[ERROR] {e}")
        return

    os.makedirs(DATA_DIR, exist_ok=True)
    channel_index = build_channel_index(client)

    written = 0
    for person in RESEARCH_CHANNELS:
        name = person["channel"]
        print(f"\n[PROCESSING] {name}...")
        channel_id = channel_index.get(name)
        if not channel_id:
            print("  [SKIP] channel not found / not visible to bot")
            continue

        ensure_member(client, channel_id)
        try:
            data = fetch_channel(client, channel_id, person)
        except SlackApiError as e:
            print(f"  [ERROR] {e.response['error']} — skipping")
            continue

        out_path = f"{DATA_DIR}/{person['slug']}.json"
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"  [OK] {len(data['messages'])} messages -> {out_path}")
        written += 1

    print(f"\n[SUMMARY] wrote {written}/{len(RESEARCH_CHANNELS)} research files")


if __name__ == "__main__":
    main()
