# 🚀 START HERE - Deploy to Vercel

Your Netlify site has been paused. Here's how to get back online with Vercel in **under 10 minutes**.

---

## ⚡ Quick Deploy (Recommended)

### Step 1: Go to Vercel
Visit: **https://vercel.com/new**

### Step 2: Import Repository
- Sign in with GitHub/GitLab/Bitbucket
- Click "Import Project"
- Select your repository

### Step 3: Configure Project
- **Root Directory**: `lodge-app`
- **Framework**: Next.js (auto-detected)
- **Build Command**: `npm run build` ✅ (pre-filled)
- **Install Command**: `npm install --legacy-peer-deps`

### Step 4: Add Environment Variables
Click "Add Environment Variable" and add these **4 variables**:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID
jyrzp1q7

NEXT_PUBLIC_SANITY_DATASET
production

SANITY_API_TOKEN
sk8Ogt47TJ3lnOjKBbkr3CJqv26wfLwXWMG3tu4Q2Iwhipaxh9nbQE0kdwJhiNqirEWD98knLth4kkla7nsZLh3T65LRwLKonOBBOCxDAlmp2zdLjtQlI4cTGzYKgfEKhJf8oOsViDMy19V8Fi46CsnvNoIW4tSZclAG2JFNdkoDrYKtfFAF

SANITY_API_READ_TOKEN
sk42UyRaixoyLn5lK6Jrlp5PxObNlmy1puUx28PIhTAq2AcUrxJQy3f5KhtvyXPAteExIz0heFVX0huzdfqdoF7mVxT30uVqwMOYL5j2yUnB47wNAcNqlU3y2hhEhEHNzpe1JIiUH60C1cVNbK7IWYPfTnR8ptNwIsHNkVkHzrKs3WMlhRFl
```

### Step 5: Deploy!
Click **"Deploy"** and wait 2-3 minutes. ☕

---

## ✅ After Deployment

### 1. Update Sanity CORS (IMPORTANT!)
```
1. Go to: https://sanity.io/manage
2. Select your project
3. Go to: API → CORS Origins
4. Click "Add CORS Origin"
5. Add: https://your-project.vercel.app
6. Check: "Allow credentials"
7. Save!
```

### 2. Test Everything
- Visit your new Vercel URL
- Go to `/studio` - Sanity Studio should load
- Check images are loading
- Test forms (bookings, check-in)

### 3. Custom Domain (Optional)
In Vercel dashboard:
- Go to Project Settings → Domains
- Add your custom domain
- Update DNS records at your registrar

---

## 📁 What's Been Configured

✅ **vercel.json** - Deployment settings, headers, caching
✅ **.vercelignore** - Files to exclude from deployment  
✅ **.env.production** - Your production environment variables
✅ **Documentation** - Complete guides for reference

---

## 🆘 Problems?

**Build fails?**
- Check environment variables are added correctly
- Ensure root directory is set to `lodge-app`

**No content showing?**
- Environment variables missing - add all 4 variables

**Sanity Studio won't load?**
- Update CORS settings in Sanity dashboard

**Need more help?**
- Read: `VERCEL_DEPLOYMENT_GUIDE.md` (detailed guide)
- Read: `VERCEL_QUICK_START.md` (5-min guide)
- Visit: https://vercel.com/docs

---

## 🎉 That's It!

Your site will be:
- ✅ Live in 2-3 minutes
- ✅ Faster (global CDN)
- ✅ Auto-deployed on git push
- ✅ Free HTTPS/SSL
- ✅ Better monitoring

**Ready? Go to:** https://vercel.com/new
