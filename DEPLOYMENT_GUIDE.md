# 🚀 DEPLOYMENT GUIDE - GITHUB PAGES

## ✅ CURRENT STATUS

Your Slack integration is **ready to deploy**! Here's how to deploy it to GitHub Pages.

---

## 📋 PRE-DEPLOYMENT CHECKLIST

Before deploying, make sure:

- ✅ Python script runs successfully (`python scripts/fetch_slack_updates.py`)
- ✅ Updates display correctly on http://localhost:3000/updates
- ✅ Password protection works (`425SEL@bRC`)
- ✅ Individual student pages work
- ✅ All students show correct data
- ✅ Markdown renders properly

---

## 🚀 DEPLOYMENT STEPS

### **STEP 1: Build the Site**

```bash
cd sercatuta-lei.github.io

# Clean previous build (if any errors)
Remove-Item -Path .next -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path out -Recurse -Force -ErrorAction SilentlyContinue

# Build for production
npm run build
```

**Expected output:**
```
✓ Generating static pages (7/7)
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    ...
├ ○ /updates                             ...
├ ○ /updates/arjun-dahal                 ...
└ ...

○  (Static)  prerendered as static content
```

**Build creates:** `out/` folder with static HTML files

---

### **STEP 2: Test the Build Locally (Optional)**

```bash
# Install a simple HTTP server
npm install -g serve

# Serve the build
serve out

# Open http://localhost:3000/updates
```

---

### **STEP 3: Set Up GitHub Secrets (REQUIRED for Automation)**

**Before deploying, add your Slack credentials to GitHub:**

1. **Go to your GitHub repository:**
   - Navigate to: https://github.com/YOUR-USERNAME/YOUR-REPO

2. **Go to Settings → Secrets and variables → Actions**

3. **Click "New repository secret"**

4. **Add Secret #1:**
   - Name: `SLACK_BOT_TOKEN`
   - Value: Your Slack Bot Token (starts with `xoxb-`)
   - Click "Add secret"

5. **Add Secret #2:**
   - Name: `SLACK_CHANNEL_ID`
   - Value: Your Slack Channel ID (e.g., `C079B9BUNBE`)
   - Click "Add secret"

**✅ These secrets allow GitHub Actions to fetch from Slack automatically!**

---

### **STEP 4: Commit All Changes**

```bash
# Add all new files
git add .

# Commit
git commit -m "Add Slack weekly updates integration"

# Push to main branch
git push origin main
```

---

### **STEP 5: Deploy to GitHub Pages**

You have **2 deployment options:**

#### **OPTION A: Using Your Existing Deploy Script (Recommended)**

```bash
npm run deploy
```

This runs your existing script that:
- Builds the site
- Creates `.nojekyll` file
- Commits to `out/` folder
- Pushes to `gh-pages` branch

#### **OPTION B: Manual Deployment**

```bash
# Build
npm run build

# Navigate to out folder
cd out

# Create .nojekyll file (important!)
New-Item -ItemType File -Name .nojekyll -Force

# Initialize git (if needed)
git init
git add -A
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
git push -f origin HEAD:gh-pages

# Return to main directory
cd ..
```

---

### **STEP 6: Configure GitHub Pages (If Not Already Done)**

1. **Go to:** GitHub repo → Settings → Pages

2. **Source:** Deploy from a branch

3. **Branch:** `gh-pages` / `/(root)`

4. **Click "Save"**

5. **Wait 1-2 minutes** for deployment

6. **Visit:** https://YOUR-USERNAME.github.io/YOUR-REPO/updates/

---

## 🤖 STEP 7: Verify GitHub Actions Works

### **Test the Automation:**

1. **Go to:** GitHub repo → Actions tab

2. **You should see:** "Fetch Slack Weekly Updates" workflow

3. **Click "Run workflow"** (to test manually)
   - Select branch: `main`
   - Click "Run workflow"

4. **Watch it run:**
   - Should complete in ~30 seconds
   - Check for errors in logs
   - Verify `public/data/updates.json` was updated

5. **Check your site:**
   - Refresh: https://YOUR-USERNAME.github.io/updates/
   - New updates should appear!

---

## 📅 AUTOMATIC UPDATES

Once deployed, the system will **automatically:**

- **Every Wednesday at 11 PM UTC (5 PM CT)**:
  1. GitHub Actions triggers
  2. Fetches messages from Slack
  3. Updates `public/data/updates.json`
  4. Commits changes
  5. GitHub Pages rebuilds (1-2 minutes)
  6. Your site shows new updates!

---

## 🔍 VERIFICATION

### **Check if deployment worked:**

1. **Visit:** https://YOUR-USERNAME.github.io/updates/
   - Should show password prompt
   - Enter: `425SEL@bRC`
   - Should see student grid

2. **Click on a student:**
   - Individual page loads
   - Shows their Slack updates
   - Markdown renders correctly

3. **Check GitHub Actions:**
   - Go to Actions tab
   - Last run should show green checkmark ✅

4. **Check data files:**
   - Navigate to `public/data/updates.json` in GitHub
   - Should contain recent updates

---

## 🐛 TROUBLESHOOTING

### **Build Fails:**

```bash
# Clean everything and rebuild
Remove-Item -Path .next -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path out -Recurse -Force -ErrorAction SilentlyContinue
npm run build
```

### **Deploy Fails:**

Check:
- GitHub Pages is enabled (Settings → Pages)
- Branch is set to `gh-pages`
- You have push permissions

### **GitHub Action Fails:**

Check:
- Secrets are set correctly (`SLACK_BOT_TOKEN`, `SLACK_CHANNEL_ID`)
- Bot has permissions in Slack
- Channel ID is correct
- View workflow logs for details

### **Updates Don't Show:**

Check:
- `public/data/updates.json` exists in GitHub
- File is being served (visit: https://YOUR-SITE/data/updates.json)
- Browser cache (hard refresh: Ctrl+Shift+R)
- Console errors (F12)

---

## 📊 DEPLOYMENT CHECKLIST

- [ ] Build succeeds locally (`npm run build`)
- [ ] GitHub Secrets added (`SLACK_BOT_TOKEN`, `SLACK_CHANNEL_ID`)
- [ ] All changes committed and pushed
- [ ] Deployed to GitHub Pages
- [ ] GitHub Pages settings configured
- [ ] Site accessible at your GitHub Pages URL
- [ ] Password protection works
- [ ] Student pages load correctly
- [ ] GitHub Actions workflow exists
- [ ] Manual workflow trigger works
- [ ] Updates display correctly

---

## 🎯 QUICK DEPLOYMENT COMMANDS

```powershell
# 1. Navigate to project
cd C:\Users\sampa\Downloads\sercatuta-lei.github-archive\sercatuta-lei.github.io

# 2. Clean build folders
Remove-Item -Path .next -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path out -Recurse -Force -ErrorAction SilentlyContinue

# 3. Build
npm run build

# 4. Commit changes
git add .
git commit -m "Add Slack weekly updates integration"
git push origin main

# 5. Deploy
npm run deploy
```

---

## 🔗 POST-DEPLOYMENT

### **Your site will be at:**
```
https://sercatuta-lei.github.io/updates/
```

### **Password:**
```
425SEL@bRC
```

### **To manually fetch updates:**

1. Go to: GitHub → Actions → "Fetch Slack Weekly Updates"
2. Click "Run workflow"
3. Wait ~30 seconds
4. Site will auto-rebuild in 1-2 minutes
5. Refresh your site

---

## 📅 AUTOMATION SCHEDULE

The system will automatically run **every Wednesday at 5 PM CT**:

```
Wednesday 5:00 PM CT → Fetch from Slack
Wednesday 5:01 PM CT → Update JSON files
Wednesday 5:02 PM CT → Commit & push
Wednesday 5:03 PM CT → GitHub Pages rebuilds
Wednesday 5:05 PM CT → Live on your site! ✅
```

---

## 🎉 YOU'RE READY!

Run the deployment commands above, and your Slack integration will be live on GitHub Pages! 🚀

Let me know when you're ready to deploy or if you encounter any issues!

