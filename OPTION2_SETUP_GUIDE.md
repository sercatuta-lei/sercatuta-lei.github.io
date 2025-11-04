# 🚀 OPTION 2 IMPLEMENTATION - SETUP GUIDE

## ✅ FILES CREATED

All necessary files have been created for you! Here's what was added:

### **1. Configuration Files**
- ✅ `next.config.ts` - Reverted to enable static export
- ✅ `.github/workflows/fetch-slack-updates.yml` - GitHub Actions workflow
- ✅ `scripts/fetch_slack_updates.py` - Python Slack fetcher

### **2. Data Files**
- ✅ `public/data/updates.json` - Student updates storage
- ✅ `public/data/last-sync.json` - Sync timestamp tracking

### **3. Frontend Components**
- ✅ `components/PasswordProtected.tsx` - Client-side password protection
- ✅ `app/updates/page.tsx` - Student grid page (updated)
- ✅ `app/updates/[slug]/page.tsx` - Individual student page (new)

### **4. Documentation**
- ✅ `OPTION2_SETUP_GUIDE.md` - This file
- ✅ `SLACK_INTEGRATION_GUIDE.md` - Complete technical guide
- ✅ `IMPLEMENTATION_TODO.md` - Implementation checklist

---

## 📋 SETUP STEPS

### **Step 1: Install Python Dependencies**

The GitHub Action will automatically install these, but for local testing:

```bash
pip install slack_sdk pyyaml python-dotenv
```

### **Step 2: Set up Slack App**

1. **Go to https://api.slack.com/apps**

2. **Click "Create New App" → "From scratch"**
   - App Name: `Weekly Updates Bot`
   - Workspace: Select your workspace

3. **Add OAuth Scopes:**
   - Go to "OAuth & Permissions"
   - Under "Bot Token Scopes", add:
     - `channels:history` - Read channel messages
     - `channels:read` - View channel info
     - `users:read` - Get user information

4. **Install App to Workspace:**
   - Click "Install to Workspace"
   - Authorize the app

5. **Copy the Bot Token:**
   - Go to "OAuth & Permissions"
   - Copy the "Bot User OAuth Token" (starts with `xoxb-`)
   - This is your `SLACK_BOT_TOKEN`

6. **Get Channel ID:**
   - Open Slack, right-click your updates channel
   - Select "View channel details"
   - Scroll down, copy the Channel ID
   - This is your `SLACK_CHANNEL_ID`

### **Step 3: Add GitHub Secrets**

1. **Go to your GitHub repository**

2. **Navigate to:** Settings → Secrets and variables → Actions

3. **Click "New repository secret"**

4. **Add these secrets:**

   **Secret 1:**
   - Name: `SLACK_BOT_TOKEN`
   - Value: Your Slack Bot Token (starts with `xoxb-`)

   **Secret 2:**
   - Name: `SLACK_CHANNEL_ID`
   - Value: Your Slack Channel ID (e.g., `C123456789`)

### **Step 4: Install Next.js Dependencies**

The project uses `react-markdown` for rendering. Install it:

```bash
cd sercatuta-lei.github.io
npm install react-markdown remark-gfm
```

### **Step 5: Test Locally (Optional)**

To test the Python script locally before deploying:

1. **Create a `.env` file in the root:**

```bash
SLACK_BOT_TOKEN=xoxb-your-token-here
SLACK_CHANNEL_ID=C123456789
```

2. **Run the script:**

```bash
python scripts/fetch_slack_updates.py
```

3. **Check the output:**
   - `public/data/updates.json` should be updated
   - `public/data/last-sync.json` should be created

### **Step 6: Test the Website Locally**

```bash
npm run dev
```

Visit http://localhost:3000/updates

**Password:** `425SEL@bRC`

### **Step 7: Build and Deploy**

```bash
# Build the site
npm run build

# Deploy to GitHub Pages (your existing method)
npm run deploy
```

Or simply push to GitHub and let GitHub Pages rebuild automatically.

---

## 🤖 HOW IT WORKS

### **Automatic Updates (GitHub Actions)**

The workflow runs **every Wednesday at 11 PM UTC** (5 PM CT):

1. **Checks out your repository**
2. **Sets up Python environment**
3. **Runs `fetch_slack_updates.py`** with your secrets
4. **Fetches messages from Slack** for each student
5. **Parses and formats** messages to Markdown
6. **Updates `public/data/updates.json`**
7. **Commits and pushes** changes
8. **GitHub Pages automatically rebuilds** your site

### **Manual Trigger**

You can also manually trigger the workflow:

1. Go to **Actions** tab in GitHub
2. Click **"Fetch Slack Weekly Updates"**
3. Click **"Run workflow"**
4. Select branch and click **"Run workflow"**

---

## 🔐 PASSWORD PROTECTION

The updates page is protected with client-side password authentication:

- **Password:** `425SEL@bRC`
- **Password Hash (SHA-256):** `fe09819b017626806fc8b09ab5339098ea80dbd3cd36a5a8b0aeab94381c98bf`
- **Session Duration:** 5 minutes
- **Storage:** Browser localStorage

### **To Change Password:**

1. Generate new SHA-256 hash:
```bash
echo -n "YourNewPassword" | shasum -a 256
```

2. Update in `components/PasswordProtected.tsx`:
```typescript
const PASSWORD_HASH = "your-new-hash-here";
```

---

## 📊 DATA STRUCTURE

### **updates.json Format:**

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
          "content": "**Arjun:**\n\nUpdate content...\n\n**Replies:**\n\n**Dr. Lei:**\nFeedback...",
          "placeholder": false
        }
      ]
    }
  ],
  "last_updated": "2024-10-15T23:00:00.000Z"
}
```

### **last-sync.json Format:**

```json
{
  "U078U88QTN3": "1697400000.123456",
  "U079MEWK5TK": "1697400001.234567"
}
```

---

## 🎨 CUSTOMIZATION

### **Update Schedule**

Edit `.github/workflows/fetch-slack-updates.yml`:

```yaml
schedule:
  - cron: '0 23 * * 3'  # Every Wednesday at 11 PM UTC
```

Change to your preferred schedule. Examples:
- `0 18 * * 5` - Every Friday at 6 PM UTC
- `0 12 * * 1,4` - Every Monday and Thursday at noon UTC

### **Student List**

Edit `scripts/fetch_slack_updates.py` to add/remove students:

```python
USER_MAPPING = {
    "U123456789": {
        "name": "New Student",
        "slug": "new-student",
        "photo": "new-student.jpg"
    },
    # ... existing students
}
```

### **Styling**

The components use Tailwind CSS. Customize in:
- `app/updates/page.tsx` - Student grid
- `app/updates/[slug]/page.tsx` - Individual page
- `components/PasswordProtected.tsx` - Login form

---

## 🧪 TESTING

### **Test Python Script:**

```bash
# Set environment variables
export SLACK_BOT_TOKEN="xoxb-..."
export SLACK_CHANNEL_ID="C..."

# Run script
python scripts/fetch_slack_updates.py
```

### **Test Website:**

```bash
npm run dev
# Visit http://localhost:3000/updates
```

### **Test Workflow (Dry Run):**

1. Go to GitHub Actions
2. Manually trigger the workflow
3. Check the logs and output

---

## 🔍 TROUBLESHOOTING

### **Issue: No updates appearing**

**Check:**
1. GitHub Actions ran successfully (check Actions tab)
2. `public/data/updates.json` was updated
3. Site was rebuilt after JSON update
4. Check browser console for fetch errors

**Solution:**
```bash
# Manually trigger workflow
# Or run locally:
python scripts/fetch_slack_updates.py
```

### **Issue: "Failed to fetch updates"**

**Cause:** JSON file not accessible

**Solution:**
- Ensure `public/data/` directory exists
- Check file permissions
- Verify GitHub Pages is serving the `/data/` directory

### **Issue: Password not working**

**Cause:** Password hash mismatch

**Solution:**
1. Verify password is `425SEL@bRC`
2. Check PASSWORD_HASH in `components/PasswordProtected.tsx`
3. Clear browser localStorage: `localStorage.clear()`

### **Issue: GitHub Action fails**

**Check:**
1. Secrets are set correctly (`SLACK_BOT_TOKEN`, `SLACK_CHANNEL_ID`)
2. Bot has proper permissions in Slack
3. Channel ID is correct
4. View workflow logs for detailed error

### **Issue: Markdown not rendering**

**Cause:** Missing `react-markdown` package

**Solution:**
```bash
npm install react-markdown remark-gfm
```

---

## 📈 MONITORING

### **Check Workflow Status:**

1. Go to **Actions** tab in GitHub
2. View recent workflow runs
3. Check for errors or warnings

### **View Logs:**

1. Click on a workflow run
2. Click on "fetch-updates" job
3. Expand steps to see detailed logs

### **Monitor Updates:**

- Check `public/data/updates.json` in your repository
- Last updated timestamp shows when data was refreshed
- Each student's `updates` array shows their history

---

## 🎯 NEXT STEPS

1. **✅ Set up Slack App** (Step 2)
2. **✅ Add GitHub Secrets** (Step 3)
3. **✅ Install Dependencies** (Step 4)
4. **✅ Test Locally** (Step 5)
5. **✅ Deploy** (Step 7)
6. **✅ Wait for Wednesday** or manually trigger workflow
7. **✅ Verify updates appear** on your site

---

## 💡 TIPS

1. **Test First:** Run the Python script locally before relying on GitHub Actions
2. **Check Logs:** GitHub Actions logs show exactly what happened
3. **Commit Often:** JSON files should be committed to trigger site rebuild
4. **Monitor:** Check after each Wednesday to ensure workflow runs
5. **Debug:** Use `npm run dev` to test changes locally

---

## 📞 SUPPORT

If you encounter issues:

1. **Check the workflow logs** in GitHub Actions
2. **Verify secrets** are set correctly
3. **Test locally** with the Python script
4. **Check Slack permissions** for the bot
5. **Review browser console** for frontend errors

---

## 🎉 SUCCESS!

Once set up, the system will:

✅ Automatically fetch updates every Wednesday
✅ Parse Slack messages to beautiful Markdown
✅ Display updates on your website
✅ Protect content with password
✅ Show individual student pages
✅ Include threaded replies
✅ Track sync timestamps
✅ Handle missing updates gracefully

**Your website now has a fully automated PhD student updates system!** 🚀

