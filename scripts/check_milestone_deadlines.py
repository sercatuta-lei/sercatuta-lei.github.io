#!/usr/bin/env python3
"""
Daily deadline checker. Reads public/data/milestones.json, finds milestones
whose deadline has passed and are not marked done, and posts an overdue summary
to the #milestones Slack channel (pinging Dr. Lei). De-dupes via an alert-state
file so each overdue milestone is announced once per deadline.

Also writes the alert body to milestone_alert.txt and sets the GitHub Actions
output `has_alerts`, so the workflow can optionally email the same summary.
"""

import os
import json
from datetime import datetime
from typing import Dict, Any, List

from slack_sdk.errors import SlackApiError

from fetch_slack_updates import get_slack_client, USER_MAPPING
from fetch_research_updates import build_channel_index

DATA_DIR = "public/data"
MILESTONES_FILE = f"{DATA_DIR}/milestones.json"
ALERTS_FILE = f"{DATA_DIR}/milestone-alerts.json"
CHANNEL_NAME = "milestones"
PROFESSOR_UID = "U079XLY1QU8"  # Dr. Lei


def _load(path: str, default: Any) -> Any:
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    return default


def _set_output(name: str, value: str) -> None:
    out = os.environ.get("GITHUB_OUTPUT")
    if out:
        with open(out, "a", encoding="utf-8") as f:
            f.write(f"{name}={value}\n")


def main():
    data = _load(MILESTONES_FILE, None)
    if not data:
        print("[INFO] no milestones.json — nothing to check")
        return

    today = datetime.now().strftime("%Y-%m-%d")
    overdue: List[Dict[str, Any]] = [
        m for m in data.get("milestones", [])
        if m.get("deadline") and m["deadline"] < today and m.get("status") != "done"
    ]

    alerts = _load(ALERTS_FILE, {"notified": {}})
    notified: Dict[str, str] = alerts.get("notified", {})
    new = [m for m in overdue if notified.get(m["id"]) != m["deadline"]]

    # Rebuild notified from current overdue only (so re-overdue items re-alert later).
    alerts["notified"] = {m["id"]: m["deadline"] for m in overdue}
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(ALERTS_FILE, "w", encoding="utf-8") as f:
        json.dump(alerts, f, indent=2)

    if not new:
        print(f"[INFO] {len(overdue)} overdue, no new alerts")
        _set_output("has_alerts", "false")
        return

    def days_over(d: str) -> int:
        return (datetime.now() - datetime.strptime(d, "%Y-%m-%d")).days

    lines = [f"• *{m['ownerName']}* — {m['title']}  (due {m['deadline']}, {days_over(m['deadline'])}d overdue)" for m in new]
    body = "⚠️ *Overdue milestones*\n" + "\n".join(lines)

    with open("milestone_alert.txt", "w", encoding="utf-8") as f:
        f.write(body)
    _set_output("has_alerts", "true")

    try:
        client = get_slack_client()
        channel_id = os.environ.get("MILESTONES_CHANNEL_ID") or build_channel_index(client).get(CHANNEL_NAME)
        if channel_id:
            client.chat_postMessage(channel=channel_id, text=f"<@{PROFESSOR_UID}>\n{body}")
            print(f"[OK] posted {len(new)} overdue alert(s) to Slack")
        else:
            print(f"[WARN] #{CHANNEL_NAME} not found — skipped Slack post")
    except SlackApiError as e:
        print(f"[ERROR] Slack post failed: {e.response['error']}")


if __name__ == "__main__":
    main()
