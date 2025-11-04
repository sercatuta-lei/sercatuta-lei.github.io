#!/usr/bin/env python3
"""
Fetch weekly updates from Slack and save to JSON files
This script is designed to run via GitHub Actions
"""

import os
import json
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Constants
DATA_DIR = "public/data"
UPDATES_FILE = f"{DATA_DIR}/updates.json"
SYNC_FILE = f"{DATA_DIR}/last-sync.json"

# User ID to Name mapping (same as Jekyll implementation)
USER_MAPPING = {
    "U078U88QTN3": {"name": "Arjun Dahal", "slug": "arjun-dahal", "photo": "arjun.jpeg"},
    "U079MEWK5TK": {"name": "Fadul Sikder", "slug": "fadul-sikder", "photo": "fadul.jpg"},
    "U079MEEBRAM": {"name": "Krishna Khadka", "slug": "krishna-khadka", "photo": "krishna.jpeg"},
    "U0798MEJQRH": {"name": "Pujan Budhathoki", "slug": "pujan-budhathoki", "photo": "pujan.png"},
    "U079265G0ES": {"name": "Qiping Wei", "slug": "qiping-wei", "photo": "qiping.jpg"},
    "U079VPWQM8X": {"name": "Saif Uddin Mahmud", "slug": "saif-uddin-mahmud", "photo": "saif-pic.jpg"},
    "U08F6QCJ4JJ": {"name": "Shovon Niverd", "slug": "shovon-niverd", "photo": "shovon_pereira.jpg"},
    "U079XLY1QU8": {"name": "Dr. Lei", "slug": "dr-lei", "photo": "DrLei.jpg"},
}


def get_slack_client() -> WebClient:
    """Initialize and return Slack WebClient"""
    token = os.environ.get('SLACK_BOT_TOKEN')
    if not token:
        raise ValueError("SLACK_BOT_TOKEN environment variable not set")
    return WebClient(token=token)


def parse_rich_text_element(elements: List[Dict]) -> str:
    """Parse Slack rich text elements to Markdown"""
    markdown = ""
    
    for el in elements:
        el_type = el.get('type', '')
        
        if el_type == 'text':
            text = el.get('text', '')
            style = el.get('style', {})
            
            if style.get('bold'):
                text = f"**{text}**"
            if style.get('italic'):
                text = f"*{text}*"
            if style.get('strike'):
                text = f"~~{text}~~"
            if style.get('code'):
                text = f"`{text}`"
            
            markdown += text
        
        elif el_type == 'link':
            url = el.get('url', '')
            text = el.get('text', url)
            markdown += f"[{text}]({url})"
        
        elif el_type == 'user':
            user_id = el.get('user_id', '')
            user_name = USER_MAPPING.get(user_id, {}).get('name', user_id)
            markdown += f"@{user_name}"
        
        elif el_type == 'emoji':
            name = el.get('name', '')
            markdown += f":{name}:"
        
        elif el_type == 'channel' or el_type == 'broadcast':
            range_val = el.get('range', 'channel')
            markdown += f"@{range_val}"
    
    return markdown


def parse_rich_text_section(elements: List[Dict]) -> str:
    """Parse rich text section"""
    return parse_rich_text_element(elements)


def parse_rich_text_list(list_element: Dict) -> str:
    """Parse rich text list to Markdown"""
    markdown = ""
    style = list_element.get('style', 'bullet')
    elements = list_element.get('elements', [])
    
    for idx, item in enumerate(elements, 1):
        prefix = f"{idx}. " if style == 'ordered' else "- "
        content = parse_rich_text_element(item.get('elements', []))
        markdown += f"{prefix}{content}\n"
    
    return markdown


def parse_rich_text(elements: List[Dict]) -> str:
    """Parse Slack rich text blocks to Markdown"""
    markdown = ""
    
    for element in elements:
        elem_type = element.get('type', '')
        
        if elem_type == 'rich_text_section':
            markdown += parse_rich_text_section(element.get('elements', [])) + "\n"
        
        elif elem_type == 'rich_text_list':
            markdown += "\n" + parse_rich_text_list(element) + "\n"
        
        elif elem_type == 'rich_text_preformatted':
            content = parse_rich_text_element(element.get('elements', []))
            markdown += f"```\n{content}\n```\n"
        
        elif elem_type == 'rich_text_quote':
            content = parse_rich_text_element(element.get('elements', []))
            lines = content.split('\n')
            markdown += '\n'.join(f"> {line}" for line in lines) + "\n"
    
    return markdown.strip()


def parse_blocks(blocks: List[Dict]) -> str:
    """Parse Slack blocks to Markdown"""
    markdown = ""
    
    for block in blocks:
        block_type = block.get('type', '')
        
        if block_type == 'rich_text':
            markdown += parse_rich_text(block.get('elements', [])) + "\n\n"
        
        elif block_type == 'section':
            text = block.get('text', {})
            if isinstance(text, dict):
                markdown += text.get('text', '') + "\n\n"
        
        elif block_type == 'divider':
            markdown += "---\n\n"
    
    return markdown.strip()


def format_message_with_replies(main_message: Dict, replies: List[Dict]) -> str:
    """Format main message and replies into Markdown"""
    formatted = ""
    
    # Main message
    user_id = main_message.get('user', '')
    user_name = USER_MAPPING.get(user_id, {}).get('name', user_id)
    
    formatted += f"**{user_name}:**\n\n"
    
    if 'blocks' in main_message:
        formatted += parse_blocks(main_message['blocks'])
    elif 'text' in main_message:
        formatted += main_message['text']
    
    # Replies (skip first one as it's the main message)
    if len(replies) > 1:
        formatted += "\n\n**Replies:**\n\n"
        
        for reply in replies[1:]:
            replier_id = reply.get('user', '')
            replier_name = USER_MAPPING.get(replier_id, {}).get('name', replier_id)
            
            formatted += f"**{replier_name}:**\n"
            
            if 'blocks' in reply:
                formatted += parse_blocks(reply['blocks'])
            elif 'text' in reply:
                formatted += reply['text']
            
            formatted += "\n\n---\n\n"
    
    return formatted.strip()


def load_existing_data() -> Dict[str, Any]:
    """Load existing updates data"""
    if os.path.exists(UPDATES_FILE):
        with open(UPDATES_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"students": [], "last_updated": None}


def load_sync_data() -> Dict[str, str]:
    """Load last sync timestamps"""
    if os.path.exists(SYNC_FILE):
        with open(SYNC_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}


def save_data(data: Dict[str, Any], sync_data: Dict[str, str]):
    """Save updates and sync data to JSON files"""
    # Ensure data directory exists
    os.makedirs(DATA_DIR, exist_ok=True)
    
    # Save updates
    with open(UPDATES_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    # Save sync data
    with open(SYNC_FILE, 'w', encoding='utf-8') as f:
        json.dump(sync_data, f, indent=2)
    
    print(f"[OK] Data saved to {UPDATES_FILE}")


def fetch_user_updates(
    client: WebClient,
    channel_id: str,
    user_id: str,
    last_sync_ts: Optional[str]
) -> Optional[Dict[str, Any]]:
    """Fetch updates for a specific user from Slack"""
    
    # Calculate time range
    now = datetime.now()
    
    if last_sync_ts:
        oldest = float(last_sync_ts)
        days_since = (now - datetime.fromtimestamp(oldest)).days
        
        if days_since < 5:
            print(f"  [SKIP] Last update was {days_since} days ago")
            return None
    else:
        # First time, fetch last 7 days
        seven_days_ago = now - timedelta(days=7)
        oldest = seven_days_ago.timestamp()
    
    try:
        # Fetch messages
        result = client.conversations_history(
            channel=channel_id,
            oldest=str(oldest),
            limit=100
        )
        
        messages = result.get('messages', [])
        
        # Filter by user
        user_messages = [msg for msg in messages if msg.get('user') == user_id]
        
        if not user_messages:
            print(f"  [INFO] No messages found")
            return {
                'found': False,
                'placeholder': True,
                'content': f"No update was provided for the week ending {now.strftime('%Y-%m-%d')}.",
                'date': now.strftime('%Y-%m-%d'),
                'timestamp': now.timestamp()
            }
        
        # Get the most recent message
        latest = user_messages[0]
        message_ts = float(latest['ts'])
        message_date = datetime.fromtimestamp(message_ts)
        
        # Fetch thread replies if exists
        replies = []
        if latest.get('thread_ts'):
            thread_result = client.conversations_replies(
                channel=channel_id,
                ts=latest['thread_ts']
            )
            replies = thread_result.get('messages', [])
        
        # Format content
        content = format_message_with_replies(latest, replies)
        
        print(f"  [OK] Found update from {message_date.strftime('%Y-%m-%d')}")
        
        return {
            'found': True,
            'placeholder': False,
            'content': content,
            'date': message_date.strftime('%Y-%m-%d'),
            'timestamp': message_ts,
            'reply_count': len(replies) - 1 if replies else 0
        }
        
    except SlackApiError as e:
        print(f"  [ERROR] Slack API Error: {e}")
        return None


def main():
    """Main function"""
    print("Starting Slack updates fetch...")
    
    # Initialize Slack client
    try:
        client = get_slack_client()
        print("[OK] Slack client initialized")
    except ValueError as e:
        print(f"[ERROR] {e}")
        return
    
    # Get channel ID
    channel_id = os.environ.get('SLACK_CHANNEL_ID')
    if not channel_id:
        print("[ERROR] SLACK_CHANNEL_ID environment variable not set")
        return
    
    # Load existing data
    data = load_existing_data()
    sync_data = load_sync_data()
    
    # Ensure students list exists
    if 'students' not in data:
        data['students'] = []
    
    # Create student lookup
    student_lookup = {s['slackId']: s for s in data['students']}
    
    updates_made = False
    
    # Process each student
    for user_id, user_info in USER_MAPPING.items():
        # Skip Dr. Lei
        if user_id == "U079XLY1QU8":
            continue
        
        print(f"\n[PROCESSING] {user_info['name']}...")
        
        # Get or create student record
        if user_id not in student_lookup:
            student = {
                'slackId': user_id,
                'name': user_info['name'],
                'slug': user_info['slug'],
                'photo': user_info['photo'],
                'updates': []
            }
            data['students'].append(student)
            student_lookup[user_id] = student
        else:
            student = student_lookup[user_id]
        
        # Fetch updates
        last_sync = sync_data.get(user_id)
        result = fetch_user_updates(client, channel_id, user_id, last_sync)
        
        if result:
            # Add update to student
            update_entry = {
                'date': result['date'],
                'content': result['content'],
                'placeholder': result.get('placeholder', False)
            }
            
            # Check if update already exists
            existing = next(
                (u for u in student['updates'] if u['date'] == result['date']),
                None
            )
            
            if not existing:
                student['updates'].append(update_entry)
                student['updates'].sort(key=lambda x: x['date'], reverse=True)
                updates_made = True
                print(f"  [+] Added new update")
            else:
                print(f"  [INFO] Update already exists")
            
            # Update sync timestamp
            sync_data[user_id] = str(result['timestamp'])
    
    # Update last_updated timestamp
    data['last_updated'] = datetime.now().isoformat()
    
    # Save data
    save_data(data, sync_data)
    
    if updates_made:
        print("\n[SUCCESS] Updated weekly progress!")
    else:
        print("\n[INFO] No new updates found")
    
    print(f"\n[SUMMARY]")
    print(f"   Total students: {len(data['students'])}")
    total_updates = sum(len(s['updates']) for s in data['students'])
    print(f"   Total updates: {total_updates}")


if __name__ == "__main__":
    main()

