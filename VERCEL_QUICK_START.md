# ⚡ Vercel Deployment - 5 Minute Guide

## 🎯 Super Quick Steps

### 1. Install Vercel CLI (Optional but Recommended)

```bash
npm i -g vercel
```

### 2. Deploy from Command Line

```bash
cd lodge-app
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → lodge-app (or your choice)
- **Directory?** → `./` (current directory)
- **Override settings?** → No

### 3. Add Environment Variables

```bash
# Add production environment variables
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
# Paste: jyrzp1q7

vercel env add NEXT_PUBLIC_SANITY_DATASET
# Paste: production

vercel env add SANITY_API_TOKEN
# Paste your token

vercel env add SANITY_API_READ_TOKEN
# Paste your read token
```

### 4. Deploy to Production

```bash
vercel --prod
```

**Done!** 🎉 Your site is live!

---

## 🌐 Alternative: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your Git repository
3. Select `lodge-app` as root directory
4. Add environment variables from `.env.local`
5. Click Deploy

**Takes 2-3 minutes!**

---

## 🔑 Environment Variables to Add

Copy these from your `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=jyrzp1q7
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk8Ogt47TJ3lnOjKBbkr3CJqv26wfLwXWMG3tu4Q2Iwhipaxh9nbQE0kdwJhiNqirEWD98knLth4kkla7nsZLh3T65LRwLKonOBBOCxDAlmp2zdLjtQlI4cTGzYKgfEKhJf8oOsViDMy19V8Fi46CsnvNoIW4tSZclAG2JFNdkoDrYKtfFAF
SANITY_API_READ_TOKEN=sk42UyRaixoyLn5lK6Jrlp5PxObNlmy1puUx28PIhTAq2AcUrxJQy3f5KhtvyXPAteExIz0heFVX0huzdfqdoF7mVxT30uVqwMOYL5j2yUnB47wNAcNqlU3y2hhEhEHNzpe1JIiUH60C1cVNbK7IWYPfTnR8ptNwIsHNkVkHzrKs3WMlhRFl
```

---

## ✅ Post-Deployment

1. **Test your site**: Visit the Vercel URL
2. **Update Sanity CORS**: Add Vercel URL to allowed origins
3. **Configure custom domain** (optional): Project Settings → Domains

---

## 🚀 That's It!

Your site is now live on Vercel with:
- Automatic HTTPS
- Global CDN
- Automatic deployments on git push
- Preview deployments for branches
- Built-in analytics
