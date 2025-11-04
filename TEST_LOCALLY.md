# 🧪 LOCAL TESTING GUIDE

## Let's verify everything works!

Follow these steps to test locally before deploying.

---

## ✅ STEP 1: Install Dependencies

```bash
cd sercatuta-lei.github.io

# Install Next.js dependencies (if not already installed)
npm install

# Install required packages for the Slack integration
npm install react-markdown remark-gfm

# Install Python dependencies for the script
pip install slack_sdk pyyaml python-dotenv
```

---

## ✅ STEP 2: Set Up Environment Variables

Create a `.env` file in the project root:

```bash
# Create .env file
cat > .env << 'EOF'
SLACK_BOT_TOKEN=xoxb-your-token-here
SLACK_CHANNEL_ID=C123456789
EOF
```

**Replace with your actual values:**
- `SLACK_BOT_TOKEN` - Your Slack Bot Token (from https://api.slack.com/apps)
- `SLACK_CHANNEL_ID` - Your Slack Channel ID

---

## ✅ STEP 3: Test Python Script

Let's test fetching data from Slack:

```bash
# Make script executable
chmod +x scripts/fetch_slack_updates.py

# Run the script
python scripts/fetch_slack_updates.py
```

**Expected output:**
```
🚀 Starting Slack updates fetch...
✅ Slack client initialized

📝 Processing Arjun Dahal...
  ✅ Found update from 2024-10-15

📝 Processing Fadul Sikder...
  ✅ Found update from 2024-10-16

...

✅ Data saved to public/data/updates.json

📊 Summary:
   Total students: 7
   Total updates: 15
```

**Check the results:**
```bash
# View the generated JSON
cat public/data/updates.json | head -20

# Check sync timestamps
cat public/data/last-sync.json
```

---

## ✅ STEP 4: Start Next.js Dev Server

```bash
npm run dev
```

**Expected output:**
```
  ▲ Next.js 15.4.3
  - Local:        http://localhost:3000
  - Network:      http://192.168.1.x:3000

 ✓ Ready in 2.5s
```

---

## ✅ STEP 5: Test the Website

Open your browser and navigate to:

**http://localhost:3000/updates**

### **Test Checklist:**

- [ ] Password prompt appears
- [ ] Enter password: `425SEL@bRC`
- [ ] Login successful (no error message)
- [ ] Student grid loads with photos
- [ ] Update counts show correctly
- [ ] Click on a student
- [ ] Individual page loads
- [ ] Updates display with proper formatting
- [ ] Markdown renders correctly (bold, lists, links)
- [ ] Replies section shows (if any)
- [ ] Back button works
- [ ] Dark mode toggle works (if you have theme toggle)

---

## ✅ STEP 6: Test Password Protection

### **Test valid password:**
```
Password: 425SEL@bRC
Expected: ✅ Login successful
```

### **Test invalid password:**
```
Password: wrong123
Expected: ❌ "Invalid password. Please try again."
```

### **Test session timeout:**
```
1. Login successfully
2. Wait 6 minutes
3. Refresh page
Expected: ❌ Should ask for password again
```

### **Test localStorage:**
```javascript
// Open browser console (F12)
localStorage.getItem('sessionTimestamp')
// Should show timestamp after login
```

---

## ✅ STEP 7: Test Different Scenarios

### **Test with no updates:**

Edit `public/data/updates.json` temporarily:
```json
{
  "students": [],
  "last_updated": null
}
```

Refresh page → Should show "No student updates available yet"

### **Test with placeholder updates:**

The script automatically creates placeholders if no update is found.

### **Test Markdown rendering:**

Check if these render correctly:
- **Bold text**
- *Italic text*
- `Code blocks`
- [Links](https://example.com)
- Lists (bulleted and numbered)
- > Blockquotes
- Threaded replies with separators

---

## 🔍 VERIFICATION CHECKLIST

### **Files Created:**
```bash
# Check all files exist
ls -la .github/workflows/fetch-slack-updates.yml
ls -la scripts/fetch_slack_updates.py
ls -la public/data/updates.json
ls -la public/data/last-sync.json
ls -la components/PasswordProtected.tsx
ls -la app/updates/page.tsx
ls -la app/updates/[slug]/page.tsx
```

### **Config Check:**
```bash
# Verify static export is enabled
grep "output: 'export'" next.config.ts
```

### **Dependencies Check:**
```bash
# Verify packages are installed
npm list react-markdown
npm list remark-gfm
pip list | grep slack-sdk
```

---

## 🐛 TROUBLESHOOTING

### **Issue: Python script fails with "SLACK_BOT_TOKEN not set"**

**Solution:**
```bash
# Check .env file exists
cat .env

# Manually export variables
export SLACK_BOT_TOKEN="xoxb-your-token"
export SLACK_CHANNEL_ID="C123456789"

# Run script again
python scripts/fetch_slack_updates.py
```

### **Issue: "Failed to fetch updates" on website**

**Check:**
```bash
# 1. Verify JSON file exists
ls -la public/data/updates.json

# 2. Check file is valid JSON
cat public/data/updates.json | python -m json.tool

# 3. Check browser console (F12) for errors
# Look for CORS or 404 errors
```

**Solution:**
```bash
# Ensure JSON file is in correct location
mkdir -p public/data
python scripts/fetch_slack_updates.py
```

### **Issue: Password not working**

**Check:**
```javascript
// In browser console (F12)
const encoder = new TextEncoder();
const data = encoder.encode("425SEL@bRC");
crypto.subtle.digest("SHA-256", data).then(hashBuffer => {
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  console.log(hashHex);
});
// Should output: fe09819b017626806fc8b09ab5339098ea80dbd3cd36a5a8b0aeab94381c98bf
```

**Solution:**
```bash
# Clear browser storage
localStorage.clear();
# Refresh page and try again
```

### **Issue: Updates not rendering**

**Check:**
```bash
# Verify react-markdown is installed
npm list react-markdown

# If not installed:
npm install react-markdown remark-gfm
```

### **Issue: Dark mode not working**

**Check your theme provider in layout:**
```bash
grep -r "ThemeProvider" app/layout.tsx
```

---

## ✅ SUCCESS INDICATORS

### **All systems green if you see:**

✅ Python script runs without errors
✅ `public/data/updates.json` created/updated
✅ `public/data/last-sync.json` created
✅ Dev server starts successfully
✅ `/updates` page loads
✅ Password authentication works
✅ Student grid displays with photos
✅ Individual student pages load
✅ Markdown renders properly
✅ Back navigation works
✅ No console errors (F12)

---

## 📊 EXPECTED DATA STRUCTURE

### **updates.json should look like:**
```json
{
  "students": [
    {
      "slackId": "U078U88QTN3",
      "name": "Arjun Dahal",
      "slug": "arjun-dahal",
      "photo": "arjun.jpeg",
      "updates": [
        {
          "date": "2024-10-15",
          "content": "**Arjun:**\n\nHello everyone...",
          "placeholder": false
        }
      ]
    }
  ],
  "last_updated": "2024-10-15T23:00:00.000Z"
}
```

### **last-sync.json should look like:**
```json
{
  "U078U88QTN3": "1697400000.123456",
  "U079MEWK5TK": "1697400001.234567"
}
```

---

## 🎯 NEXT STEPS AFTER TESTING

Once everything works locally:

1. **Commit changes:**
```bash
git add .
git commit -m "Add Slack weekly updates integration"
git push
```

2. **Add GitHub Secrets:**
   - Go to GitHub repo → Settings → Secrets → Actions
   - Add `SLACK_BOT_TOKEN`
   - Add `SLACK_CHANNEL_ID`

3. **Deploy:**
```bash
npm run build
npm run deploy
```

4. **Test on production:**
   - Visit `https://sercatuta-lei.github.io/updates/`
   - Test password and functionality

5. **Verify automation:**
   - Go to GitHub → Actions tab
   - Wait for next Wednesday OR manually trigger workflow
   - Check workflow runs successfully

---

## 🎉 TESTING COMPLETE!

If all checks pass, you're ready to deploy! 🚀

