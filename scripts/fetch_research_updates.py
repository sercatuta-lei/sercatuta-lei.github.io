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
    parse_blocks,
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


def message_markdown(m: Dict[str, Any]) -> str:
    """A single message's text as markdown, WITHOUT an author prefix."""
    if m.get("blocks"):
        md = parse_blocks(m["blocks"])
        if md.strip():
            return md
    return m.get("text", "")


def fetch_channel(client: WebClient, channel_id: str, person: Dict[str, str]) -> Dict[str, Any]:
    raw = fetch_all_messages(client, channel_id)

    # Keep real user posts; drop system/subtype noise (joins, topic changes...).
    posts_raw = [
        m
        for m in raw
        if m.get("type") == "message" and not m.get("subtype") and m.get("user")
    ]

    # Identify the channel owner. Prefer an exact Slack id match (known users),
    # fall back to the channel's first-name token for people not in the mapping.
    owner_name = person["name"]
    owner_id = next((uid for uid, info in USER_MAPPING.items() if info.get("name") == owner_name), None)
    first_name = person["channel"].split("-research")[0].lower()

    # Flatten top-level posts + thread replies into individual posts.
    flat: List[Dict[str, Any]] = []
    author_ids = set()
    for m in posts_raw:
        flat.append(m)
        author_ids.add(m.get("user"))
        if m.get("thread_ts") and m.get("reply_count"):
            try:
                thread = client.conversations_replies(channel=channel_id, ts=m["thread_ts"])
                for r in thread.get("messages", [])[1:]:  # [0] is the parent, already added
                    if r.get("type") == "message" and r.get("user"):
                        flat.append(r)
                        author_ids.add(r.get("user"))
                time.sleep(0.5)
            except SlackApiError as e:
                print(f"  [INFO] thread fetch skipped ({e.response['error']})")

    resolve_user_names(client, author_ids)

    def is_owner(uid: Optional[str]) -> bool:
        if owner_id and uid == owner_id:
            return True
        return first_name in USER_MAPPING.get(uid, {}).get("name", "").lower()

    # Group posts by local calendar day.
    by_day: Dict[str, List[Dict[str, Any]]] = {}
    for m in flat:
        ts = float(m["ts"])
        uid = m.get("user")
        date = datetime.fromtimestamp(ts).strftime("%Y-%m-%d")
        by_day.setdefault(date, []).append(
            {
                "ts": ts,
                "author": USER_MAPPING.get(uid, {}).get("name", uid),
                "content": message_markdown(m).strip(),
                "is_owner": is_owner(uid),
            }
        )

    # One entry per day: owner's posts are the body, everyone else -> replies.
    days: List[Dict[str, Any]] = []
    for date in sorted(by_day.keys(), reverse=True):
        day_posts = sorted(by_day[date], key=lambda x: x["ts"])
        owner = [p["content"] for p in day_posts if p["is_owner"] and p["content"]]
        replies = [
            {"author": p["author"], "content": p["content"]}
            for p in day_posts
            if not p["is_owner"] and p["content"]
        ]
        if not owner and not replies:
            continue
        days.append({"id": date, "date": date, "owner": owner, "replies": replies})

    return {
        "slug": person["slug"],
        "name": person["name"],
        "channel": person["channel"],
        "last_updated": datetime.now().isoformat(),
        "days": days,
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
        print(f"  [OK] {len(data['days'])} days -> {out_path}")
        written += 1

    print(f"\n[SUMMARY] wrote {written}/{len(RESEARCH_CHANNELS)} research files")


if __name__ == "__main__":
    main()
