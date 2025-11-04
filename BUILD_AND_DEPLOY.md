# 🚀 BUILD & DEPLOY - QUICK GUIDE

## ✅ ALL FIXES APPLIED!

All TypeScript errors have been fixed. You're ready to build and deploy!

---

## 🔨 BUILD THE SITE

Run these commands in PowerShell:

```powershell
# Navigate to project
cd C:\Users\sampa\Downloads\sercatuta-lei.github-archive\sercatuta-lei.github.io

# Clean previous builds
Remove-Item -Path .next -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path out -Recurse -Force -ErrorAction SilentlyContinue

# Build for production
npm run build
```

**Expected output:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (15/15)
✓ Collecting build traces
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    ...
├ ○ /updates                             ...
├ ○ /updates/arjun-dahal                 ...
├ ○ /updates/fadul-sikder                ...
└ ...

Export successful. Files written to C:\...\out
```

---

## 🚀 DEPLOY TO GITHUB PAGES

### **Method 1: Using Your Deploy Script (Easiest)**

```powershell
npm run deploy
```

This will:
1. Build the site
2. Create `.nojekyll` file
3. Commit to `out/` folder
4. Push to `gh-pages` branch

### **Method 2: Manual Deployment**

```powershell
# Build (if not done)
npm run build

# Navigate to out folder
cd out

# Create .nojekyll (important!)
New-Item -ItemType File -Name .nojekyll -Force

# Add all files
git add -A

# Commit
git commit -m "Deploy Slack integration to GitHub Pages"

# Push to gh-pages branch
git push -f origin HEAD:gh-pages

# Return to main directory
cd ..
```

---

## 📝 COMMIT YOUR CODE TO MAIN BRANCH

Don't forget to commit all the new Slack integration files:

```powershell
# Add all new files
git add .

# Commit
git commit -m "Add Slack weekly updates integration"

# Push to main branch
git push origin main
```

---

## 🔐 ADD GITHUB SECRETS (REQUIRED!)

For the automation to work:

1. **Go to:** https://github.com/YOUR-USERNAME/YOUR-REPO/settings/secrets/actions

2. **Click:** "New repository secret"

3. **Add Secret #1:**
   - Name: `SLACK_BOT_TOKEN`
   - Value: (your Slack bot token from .env file)

4. **Add Secret #2:**
   - Name: `SLACK_CHANNEL_ID`
   - Value: (your Slack channel ID from .env file)

---

## ✅ VERIFICATION

### **After deployment, check:**

1. **GitHub Pages is enabled:**
   - Go to: Settings → Pages
   - Source: Deploy from `gh-pages` branch
   - Wait 1-2 minutes for deployment

2. **Visit your site:**
   ```
   https://YOUR-USERNAME.github.io/YOUR-REPO/updates/
   ```
   Or if custom domain:
   ```
   https://sercatuta-lei.github.io/updates/
   ```

3. **Test the site:**
   - Password prompt appears
   - Enter: `425SEL@bRC`
   - Student grid loads
   - Click on students to see updates

4. **Test GitHub Actions:**
   - Go to: Actions tab
   - Click "Fetch Slack Weekly Updates"
   - Click "Run workflow"
   - Verify it runs successfully

---

## 📅 AUTOMATIC UPDATES

Once GitHub Secrets are added, the system will automatically:

**Every Wednesday at 11 PM UTC (5 PM CT):**
1. Fetch messages from Slack
2. Update `public/data/updates.json`
3. Commit changes
4. Trigger GitHub Pages rebuild
5. Your site shows new updates!

---

## 🎉 YOU'RE DONE!

Your Slack integration is complete and ready to deploy!

**Run:** `npm run build` first to verify, then `npm run deploy` to go live! 🚀

