# 🚀 Quick Start: Deploy to Netlify in 5 Minutes

## Your Project Info
- **Sanity Project ID**: `jyrzp1q7`
- **Dataset**: `production`

## Step 1: Get Your Sanity Read Token (2 minutes)

1. Go to: https://www.sanity.io/manage
2. Click on your project
3. Go to **API** → **Tokens**
4. Click **"Add API token"**
5. Settings:
   - **Name**: "Netlify Production"
   - **Permissions**: Select **"Viewer"** (read-only)
6. Click **"Add token"**
7. **COPY THE TOKEN** (you won't see it again!)

## Step 2: Deploy to Netlify (2 minutes)

1. Go to: https://app.netlify.com/
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose your Git provider (GitHub/GitLab/Bitbucket)
4. Select your repository
5. Configure:
   - **Base directory**: `lodge-app`
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. Click **"Deploy site"**

## Step 3: Add Environment Variables (1 minute)

In Netlify dashboard:
1. Go to **Site settings** → **Environment variables**
2. Click **"Add a variable"** and add these 3:

```
NEXT_PUBLIC_SANITY_PROJECT_ID = jyrzp1q7
NEXT_PUBLIC_SANITY_DATASET = production
SANITY_API_READ_TOKEN = [paste your token from Step 1]
```

3. Click **"Save"**
4. Click **"Trigger deploy"** to redeploy with new variables

## Step 4: Configure Sanity CORS (1 minute)

After your site is deployed, Netlify will give you a URL like:
`https://your-site-name.netlify.app`

1. Go back to: https://www.sanity.io/manage
2. Select your project → **API** → **CORS origins**
3. Click **"Add CORS origin"**
4. Add your Netlify URL: `https://your-site-name.netlify.app`
5. Check ✓ **"Allow credentials"**
6. Click **"Save"**
7. **Add another** for Studio: `https://your-site-name.netlify.app/studio`

## ✅ Done!

Your site is now live at:
- **Frontend**: `https://your-site-name.netlify.app`
- **CMS**: `https://your-site-name.netlify.app/studio`

## Optional: Auto-Deploy on Content Changes

Set up webhooks so your site rebuilds when you update content:

1. In Netlify: **Site settings** → **Build & deploy** → **Build hooks**
2. Click **"Add build hook"**
   - Name: "Sanity Content Update"
   - Branch: `main`
3. Copy the webhook URL
4. In Sanity: https://www.sanity.io/manage → Your project → **API** → **Webhooks**
5. Click **"Create webhook"**
   - Name: "Deploy to Netlify"
   - URL: [paste webhook URL]
   - Dataset: `production`
   - Trigger on: `Create`, `Update`, `Delete`
6. Save

Now whenever you edit content in Sanity, your site will automatically rebuild!

## Need Help?

See detailed guides:
- `NETLIFY_DEPLOYMENT_GUIDE.md` - Full deployment guide
- `PRODUCTION_CHECKLIST.md` - Complete checklist
