# 🚀 SLACK INTEGRATION IMPLEMENTATION GUIDE

## 📋 Overview
This guide will help you implement the complete Slack weekly updates system into your Next.js project.

## ⚠️ IMPORTANT DECISION

Your project is currently configured for **static export** to GitHub Pages. The Slack integration requires **server-side API routes** which don't work with static exports.

### **You have 2 options:**

### **Option 1: Deploy to Vercel (RECOMMENDED)**
- ✅ Full featured with real-time updates
- ✅ Proper authentication with NextAuth.js
- ✅ Database support (Vercel Postgres)
- ✅ Automatic cron jobs
- ✅ Free tier available
- ❌ Must change hosting from GitHub Pages to Vercel

### **Option 2: Keep GitHub Pages + External Service**
- ✅ Keep current GitHub Pages hosting
- ✅ Static site remains fast
- ❌ Requires external service for Slack fetching (GitHub Actions)
- ❌ Must store data in JSON files or external DB
- ❌ More complex setup

---

## 🎯 OPTION 1: Full Implementation (Vercel Deployment)

This is the recommended approach with all features.

### **Step 1: Install Dependencies**

```bash
cd sercatuta-lei.github.io

# Install Slack SDK
npm install @slack/web-api @slack/bolt

# Install authentication
npm install next-auth bcryptjs
npm install -D @types/bcryptjs

# Install database (Prisma + PostgreSQL)
npm install @prisma/client
npm install -D prisma

# Install utilities
npm install date-fns zod swr

# Install markdown rendering
npm install react-markdown remark-gfm
```

### **Step 2: Environment Variables**

Create `.env.local` in your project root:

```bash
# Slack Configuration
SLACK_BOT_TOKEN=xoxb-your-bot-token-here
SLACK_SIGNING_SECRET=your-signing-secret
SLACK_CHANNEL_ID=C123456789

# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Admin Password (SHA-256 hash)
ADMIN_PASSWORD_HASH=fe09819b017626806fc8b09ab5339098ea80dbd3cd36a5a8b0aeab94381c98bf

# Cron Secret (for securing the endpoint)
CRON_SECRET=your-random-secret-here

# App Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### **Step 3: File Structure to Create**

You need to create these files:

```
sercatuta-lei.github.io/
├── prisma/
│   └── schema.prisma              ← Database schema
├── lib/
│   ├── slack/
│   │   ├── client.ts              ← Slack client setup
│   │   ├── parser.ts              ← Slack to Markdown parser
│   │   └── types.ts               ← TypeScript types
│   ├── db/
│   │   ├── prisma.ts              ← Prisma client
│   │   └── queries.ts             ← Database queries
│   └── auth/
│       └── config.ts              ← NextAuth config
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts       ← NextAuth handler
│   │   ├── slack/
│   │   │   ├── fetch-updates/
│   │   │   │   └── route.ts       ← Fetch from Slack
│   │   │   └── webhook/
│   │   │       └── route.ts       ← Slack webhook (optional)
│   │   └── updates/
│   │       ├── route.ts           ← Get all students
│   │       └── [studentId]/
│   │           └── route.ts       ← Get student updates
│   ├── updates/
│   │   ├── page.tsx               ← Students grid (UPDATE)
│   │   └── [studentId]/
│   │       └── page.tsx           ← Individual updates (NEW)
│   ├── login/
│   │   └── page.tsx               ← Login page (NEW)
│   └── providers.tsx              ← Session provider (NEW)
└── components/
    └── updates/
        ├── UpdateCard.tsx         ← Update card component
        ├── UpdateTimeline.tsx     ← Timeline component
        └── PasswordProtect.tsx    ← Password wrapper
```

### **Step 4: Slack App Setup**

1. Go to https://api.slack.com/apps
2. Create New App → "From scratch"
3. Name it "Weekly Updates Bot"
4. Select your workspace
5. **Add Bot Token Scopes:**
   - `channels:history` - Read messages
   - `channels:read` - View channel info
   - `users:read` - Get user info
6. **Install App** to workspace
7. Copy **Bot User OAuth Token** → `SLACK_BOT_TOKEN`
8. Copy **Signing Secret** → `SLACK_SIGNING_SECRET`
9. Get your channel ID:
   - Right-click channel → View channel details
   - Copy at bottom → `SLACK_CHANNEL_ID`

### **Step 5: Database Setup (Vercel Postgres)**

```bash
# Initialize Prisma
npx prisma init

# Push schema to database
npx prisma db push

# Generate Prisma Client
npx prisma generate

# View database in browser
npx prisma studio
```

### **Step 6: Deploy to Vercel**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**In Vercel Dashboard:**
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.local`
3. Go to Project Settings → Cron Jobs
4. Add cron: Path `/api/slack/fetch-updates`, Schedule `0 23 * * 3`

---

## 🔧 OPTION 2: Hybrid Approach (Keep GitHub Pages)

If you want to keep GitHub Pages:

### **Changes Needed:**

1. **Keep** `output: 'export'` in `next.config.ts`
2. **Use** GitHub Actions for Slack fetching
3. **Store** data in JSON files (commit to repo)
4. **Use** client-side password protection

### **Files to Create:**

```
.github/
└── workflows/
    └── fetch-slack-updates.yml    ← GitHub Action

public/
└── data/
    └── updates.json               ← Student updates

app/
└── updates/
    ├── page.tsx                   ← Read from JSON
    └── [slug]/
        └── page.tsx               ← Individual page
```

### **GitHub Action Example:**

```yaml
name: Fetch Slack Updates

on:
  schedule:
    - cron: '0 23 * * 3'  # Wednesday 11 PM UTC
  workflow_dispatch:

jobs:
  fetch:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      
      - name: Install dependencies
        run: |
          pip install slack_sdk pyyaml
      
      - name: Fetch updates
        env:
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}
          SLACK_CHANNEL_ID: ${{ secrets.SLACK_CHANNEL_ID }}
        run: |
          python scripts/fetch_slack_updates.py
      
      - name: Commit changes
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add public/data/updates.json
          git commit -m "Update weekly updates from Slack" || echo "No changes"
          git push
```

---

## 🧪 Testing Locally

```bash
# Start dev server
npm run dev

# Test Slack fetch (in another terminal)
curl -X POST http://localhost:3000/api/slack/fetch-updates \
  -H "Authorization: Bearer YOUR_CRON_SECRET"

# View database
npx prisma studio

# Run build
npm run build
npm run start
```

---

## 📝 Next Steps

**If choosing Option 1 (Vercel):**
1. ✅ You've already updated `next.config.ts`
2. ⏳ Install dependencies (see Step 1)
3. ⏳ Create all required files (I'll help you)
4. ⏳ Set up Slack app
5. ⏳ Initialize database
6. ⏳ Deploy to Vercel

**If choosing Option 2 (GitHub Pages):**
1. ⏳ Revert `next.config.ts` to keep `output: 'export'`
2. ⏳ Create GitHub Actions workflow
3. ⏳ Create Python script for fetching
4. ⏳ Update pages to read from JSON

---

## 🎯 Which Option Do You Want?

**Tell me which option you prefer, and I'll create all the necessary files for you!**

**Option 1:** Full-featured with Vercel (I'll create 20+ files)
**Option 2:** Hybrid with GitHub Pages (simpler but limited)

