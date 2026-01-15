# 🚀 Deploy to Vercel - Quick Guide

Your site has been paused on Netlify. This guide will help you migrate to Vercel in minutes.

## 📋 Prerequisites

- GitHub account with this repository
- Your Sanity credentials (already configured)
- Vercel account (free tier is fine)

---

## 🎯 Step-by-Step Deployment

### Step 1: Push to GitHub (if not already done)

```bash
cd lodge-app
git init
git add .
git commit -m "Prepare for Vercel deployment"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with GitHub
3. **Click "Add New Project"**
4. **Import your repository**
5. **Configure the project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `lodge-app`
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install --legacy-peer-deps`

### Step 3: Add Environment Variables

In the Vercel project settings, add these environment variables:

```bash
# Required - Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=jyrzp1q7
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk8Ogt47TJ3lnOjKBbkr3CJqv26wfLwXWMG3tu4Q2Iwhipaxh9nbQE0kdwJhiNqirEWD98knLth4kkla7nsZLh3T65LRwLKonOBBOCxDAlmp2zdLjtQlI4cTGzYKgfEKhJf8oOsViDMy19V8Fi46CsnvNoIW4tSZclAG2JFNdkoDrYKtfFAF
SANITY_API_READ_TOKEN=sk42UyRaixoyLn5lK6Jrlp5PxObNlmy1puUx28PIhTAq2AcUrxJQy3f5KhtvyXPAteExIz0heFVX0huzdfqdoF7mVxT30uVqwMOYL5j2yUnB47wNAcNqlU3y2hhEhEHNzpe1JIiUH60C1cVNbK7IWYPfTnR8ptNwIsHNkVkHzrKs3WMlhRFl
```

**Note**: Email system is disabled as per your setup, so no RESEND_API_KEY needed.

### Step 4: Deploy

Click **"Deploy"** and wait 2-3 minutes. Vercel will:
- Install dependencies
- Build your Next.js app
- Deploy to production
- Give you a live URL like `your-project.vercel.app`

---

## 🌐 Custom Domain Setup (Optional)

If you have a custom domain (like mikyhillside.com):

### Option A: Domain Already on Netlify

1. **In Vercel**: 
   - Go to Project Settings → Domains
   - Add your domain
   - Note the DNS records Vercel provides

2. **In Netlify**:
   - Go to Domain settings
   - Update DNS records to point to Vercel
   - OR transfer the domain away from Netlify

### Option B: Domain on Another Registrar

1. **In Vercel**:
   - Go to Project Settings → Domains
   - Add your domain
   - Get the DNS records

2. **In your domain registrar** (GoDaddy, Namecheap, etc.):
   - Update A records or CNAME to point to Vercel
   - Typical Vercel DNS:
     ```
     A    @    76.76.21.21
     CNAME www  cname.vercel-dns.com
     ```

---

## ⚙️ Important Configurations

### Build Settings in vercel.json

Already configured in `vercel.json`:
- Node.js 20
- Legacy peer deps handling
- Optimal memory allocation (6GB)
- Security headers
- Cache headers for static assets

### Sanity Studio Access

Your Sanity Studio will be available at:
- `https://your-project.vercel.app/studio`

Make sure to update Sanity CORS settings:
1. Go to https://sanity.io/manage
2. Select your project
3. Go to API settings
4. Add your Vercel URL to allowed origins:
   - `https://your-project.vercel.app`
   - `https://*.vercel.app` (for preview deployments)

---

## 🔄 Automatic Deployments

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: For pull requests and other branches

No need to manually trigger deployments!

---

## 📊 Post-Deployment Checklist

- [ ] Site is live and loading correctly
- [ ] Sanity Studio is accessible at `/studio`
- [ ] Images from Sanity CDN are loading
- [ ] Forms are working (check-in, bookings)
- [ ] Mobile responsive design works
- [ ] Custom domain configured (if needed)
- [ ] Sanity CORS settings updated
- [ ] Old Netlify site can be deleted

---

## 🆘 Troubleshooting

### Build Fails

**Error**: Dependencies issue
**Fix**: Vercel should use `--legacy-peer-deps` from vercel.json

**Error**: Sanity schema errors
**Fix**: Run `npm run typegen` locally and commit changes

### Site Loads but No Content

**Issue**: Environment variables not set
**Fix**: Double-check all env vars in Vercel dashboard

### Sanity Studio Won't Load

**Issue**: CORS settings
**Fix**: Add Vercel URL to Sanity CORS allowed origins

### Images Not Loading

**Issue**: Sanity CDN configuration
**Fix**: Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct

---

## 💡 Advantages of Vercel

✅ **Built for Next.js** - Zero config needed
✅ **Automatic HTTPS** - Free SSL certificates
✅ **Global CDN** - Fast worldwide
✅ **Preview Deployments** - Test before going live
✅ **Analytics** - Built-in performance monitoring
✅ **Generous Free Tier** - More than enough for most sites

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Next.js Docs: https://nextjs.org/docs

---

## 🎉 You're Done!

Once deployed, your site will be:
- Faster (Vercel's edge network)
- More reliable (99.99% uptime)
- Easier to manage (automatic deployments)
- Better monitored (built-in analytics)

**Your new workflow**:
1. Make changes locally
2. Commit and push to GitHub
3. Vercel automatically deploys
4. Done! ✨
