#!/usr/bin/env python3
"""
Fetch student milestones from the #milestones Slack channel and write them to
public/data/milestones.json for the read-only dashboard.

Each top-level message that contains a "Milestone:" line is one milestone. The
author is the owner. Thread replies (e.g. Dr. Lei's review) become comments.

Expected format (one message per milestone, edited as it progresses):

    Milestone: Submit CIKM paper
    Deadline: 2026-07-15
    Status: in progress
    Completed: 2026-07-14      <- added when done

Parsing is lenient: case-insensitive, tolerant of surrounding *bold* markers.
Deadline/completion status (on-time / late / overdue) is computed at display
time and by the daily deadline checker, not here.
"""

import os
import re
import json
from datetime import datetime
from typing import Dict, List, Any, Optional

from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from dotenv import load_dotenv

from fetch_slack_updates import get_slack_client, USER_MAPPING
from fetch_research_updates import (
    build_channel_index,
    ensure_member,
    resolve_user_names,
    fetch_all_messages,
    message_markdown,
)

load_dotenv()

DATA_DIR = "public/data"
OUT_FILE = f"{DATA_DIR}/milestones.json"
CHANNEL_NAME = "milestones"

_DATE_FORMATS = ["%Y-%m-%d", "%Y/%m/%d", "%B %d, %Y", "%b %d, %Y", "%m/%d/%Y", "%d %B %Y", "%d %b %Y"]


def _field(text: str, name: str) -> Optional[str]:
    """Extract a 'Name: value' line (lenient to *bold* and spacing)."""
    m = re.search(rf"(?im)^\s*\*?{name}\*?\s*:\s*(.+?)\s*$", text)
    if not m:
        return None
    return m.group(1).replace("*", "").replace("`", "").strip()


def _parse_date(raw: Optional[str]) -> Optional[str]:
    """Return an ISO date (YYYY-MM-DD) or None. Strips trailing notes/parens."""
    if not raw:
        return None
    cleaned = re.split(r"[(\[]", raw)[0].strip().strip(".,")
    for fmt in _DATE_FORMATS:
        try:
            return datetime.strptime(cleaned, fmt).strftime("%Y-%m-%d")
        except ValueError:
            continue
    return None


def _normalize_status(raw: Optional[str]) -> str:
    s = (raw or "").lower()
    if "done" in s or "complete" in s:
        return "done"
    if "progress" in s:
        return "in progress"
    if "block" in s:
        return "blocked"
    if "plan" in s:
        return "planned"
    return s.strip() or "planned"


def _owner(uid: Optional[str]) -> Dict[str, str]:
    info = USER_MAPPING.get(uid, {})
    name = info.get("name") or uid or "Unknown"
    slug = info.get("slug") or re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return {"name": name, "slug": slug}


def parse_milestone(client: WebClient, channel_id: str, msg: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    text = msg.get("text", "") or ""
    title = _field(text, "milestone")
    if not title:
        return None  # not a milestone message

    deadline_raw = _field(text, "deadline")
    deadline = _parse_date(deadline_raw)
    status = _normalize_status(_field(text, "status"))
    completed = _parse_date(_field(text, "completed"))
    # If marked done without an explicit Completed date, fall back to last edit.
    if status == "done" and not completed:
        edited = msg.get("edited", {}).get("ts") or msg.get("ts")
        completed = datetime.fromtimestamp(float(edited)).strftime("%Y-%m-%d")

    # Thread replies -> comments (Dr. Lei's review etc.).
    comments: List[Dict[str, str]] = []
    if msg.get("thread_ts") and msg.get("reply_count"):
        try:
            thread = client.conversations_replies(channel=channel_id, ts=msg["thread_ts"])
            replies = thread.get("messages", [])[1:]
            resolve_user_names(client, {r.get("user") for r in replies})
            for r in replies:
                if r.get("type") == "message" and r.get("user"):
                    comments.append({
                        "author": USER_MAPPING.get(r.get("user"), {}).get("name", r.get("user")),
                        "content": message_markdown(r).strip(),
                    })
        except SlackApiError as e:
            print(f"  [INFO] thread fetch skipped ({e.response['error']})")

    owner = _owner(msg.get("user"))
    return {
        "id": msg["ts"],
        "ownerName": owner["name"],
        "ownerSlug": owner["slug"],
        "title": title,
        "deadline": deadline,
        "deadlineRaw": deadline_raw,
        "status": status,
        "completed": completed,
        "comments": comments,
        "updated": datetime.fromtimestamp(float(msg.get("edited", {}).get("ts") or msg["ts"])).strftime("%Y-%m-%d"),
    }


def main():
    print("Starting milestones fetch...")
    try:
        client = get_slack_client()
    except ValueError as e:
        print(f"[ERROR] {e}")
        return

    channel_id = os.environ.get("MILESTONES_CHANNEL_ID") or build_channel_index(client).get(CHANNEL_NAME)
    if not channel_id:
        print(f"[ERROR] #{CHANNEL_NAME} not found / not visible to bot — invite the bot to the channel")
        return

    ensure_member(client, channel_id)

    raw = fetch_all_messages(client, channel_id)
    posts = [m for m in raw if m.get("type") == "message" and not m.get("subtype") and m.get("user")]
    resolve_user_names(client, {m.get("user") for m in posts})

    milestones: List[Dict[str, Any]] = []
    for m in posts:
        parsed = parse_milestone(client, channel_id, m)
        if parsed:
            milestones.append(parsed)

    # Sort by deadline (soonest first), undated last.
    milestones.sort(key=lambda x: (x["deadline"] is None, x["deadline"] or ""))

    os.makedirs(DATA_DIR, exist_ok=True)
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        json.dump({"last_updated": datetime.now().isoformat(), "milestones": milestones}, f, indent=2, ensure_ascii=False)
    print(f"[OK] wrote {len(milestones)} milestones -> {OUT_FILE}")


if __name__ == "__main__":
    main()
