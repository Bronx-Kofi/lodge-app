# 🚀 Migrate from Netlify to Vercel (Keep Same Domain)

## ✅ YES - You Can Use the Same Domain!

You own `mikyhillsidelodge.com` - you can point it to any hosting service you want!

---

## 📋 Migration Steps (15-20 Minutes)

### Step 1: Deploy to Vercel

1. **Go to Vercel**
   - Visit: https://vercel.com/signup
   - Sign up with GitHub account
   - This connects to your repository automatically

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose: `Bronx-Kofi/lodge-app`
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave as is)
   - Click "Deploy"

4. **Wait for First Deploy**
   - Takes ~2-3 minutes
   - You'll get a temporary URL like: `lodge-app-xyz.vercel.app`

### Step 2: Add Environment Variables

In Vercel dashboard:

1. Go to your project → **Settings** → **Environment Variables**

2. Add these variables (one by one):

```
NEXT_PUBLIC_SANITY_PROJECT_ID = jyrzp1q7
NEXT_PUBLIC_SANITY_DATASET = production
SANITY_API_READ_TOKEN = (your read token)
SANITY_API_TOKEN = sk8Ogt47TJ3lnOjKBbkr3CJqv26wfLwXWMG3tu4Q2Iwhipaxh9nbQE0kdwJhiNqirEWD98knLth4kkla7nsZLh3T65LRwLKonOBBOCxDAlmp2zdLjtQlI4cTGzYKgfEKhJf8oOsViDMy19V8Fi46CsnvNoIW4tSZclAG2JFNdkoDrYKtfFAF
RESEND_API_KEY = (optional - if you set up email)
```

3. For each variable:
   - Environment: Select **Production, Preview, Development**
   - Click "Save"

4. **Redeploy** after adding all variables:
   - Go to "Deployments"
   - Click "..." on latest deployment
   - Click "Redeploy"

### Step 3: Test Vercel Deployment

1. Visit your temporary Vercel URL: `https://lodge-app-xyz.vercel.app`
2. Test the check-in form: `/check-in-form`
3. Make sure it works perfectly

### Step 4: Point Domain to Vercel

#### If Domain is Registered on Netlify:

You'll need to update DNS records:

1. **In Vercel:**
   - Go to your project → **Settings** → **Domains**
   - Click "Add Domain"
   - Enter: `mikyhillsidelodge.com`
   - Click "Add"
   - Vercel will show DNS records you need

2. **Get DNS Records from Vercel:**
   - Vercel shows: `A` record and/or `CNAME` records
   - Note these down

3. **In Netlify (or your domain registrar):**
   - Go to domain settings
   - Find DNS settings
   - Update/Add records as shown by Vercel
   - Typically:
     - Type: `A`
     - Name: `@`
     - Value: `76.76.21.21` (Vercel's IP)
   - And:
     - Type: `CNAME`
     - Name: `www`
     - Value: `cname.vercel-dns.com`

4. **Save DNS Changes**

#### If Domain is on Different Registrar (GoDaddy, Namecheap, etc.):

1. **In Vercel:**
   - Project → Settings → Domains
   - Add: `mikyhillsidelodge.com`
   - Note the DNS records shown

2. **In Your Domain Registrar:**
   - Log in to where you bought the domain
   - Go to DNS Management
   - Update A record to point to Vercel
   - Update CNAME for www subdomain

### Step 5: Wait for DNS Propagation

- DNS changes take **10 minutes to 24 hours**
- Usually happens within **1-2 hours**
- You can check progress: https://dnschecker.org

### Step 6: Enable HTTPS in Vercel

- Vercel automatically provisions SSL certificate
- Once DNS propagates, certificate is issued
- Your site will be live at: `https://mikyhillsidelodge.com`

### Step 7: Remove from Netlify (Optional)

Once Vercel is working:
1. Go to Netlify
2. Delete the site (optional - to avoid confusion)
3. Or just leave it (it won't affect anything)

---

## 🎯 Key Differences: Netlify vs Vercel

| Feature | Netlify | Vercel |
|---------|---------|--------|
| **Free Tier** | 300 build minutes/month | Unlimited builds |
| **Bandwidth** | 100GB/month | 100GB/month |
| **Build Time** | Good | Excellent (faster) |
| **Next.js** | Supported | Optimized for Next.js |
| **Edge Functions** | Yes | Yes (better) |
| **Dashboard** | Good | Excellent |
| **Deployment** | Git push | Git push |

**Vercel is made BY the Next.js team - perfect for your site!**

---

## 💰 Cost Comparison

### Netlify:
- Free: 300 build minutes
- Pro: $19/month

### Vercel:
- Free: Unlimited builds, 100GB bandwidth
- Pro: $20/month (only if you need more)

**For your lodge, Vercel FREE tier is perfect!**

---

## ✅ Advantages of Vercel

1. **Unlimited Builds** - No build minute limits
2. **Faster Deployments** - Optimized for Next.js
3. **Better Next.js Support** - Made by Next.js creators
4. **Edge Network** - Fast globally
5. **Better DX** - Nicer dashboard and tools
6. **Automatic HTTPS** - Easy SSL setup
7. **Preview Deployments** - Every PR gets a preview URL

---

## 🔧 Troubleshooting

### Domain Not Working Yet?
- **Check DNS propagation:** https://dnschecker.org
- **Wait:** DNS can take up to 24 hours
- **Clear browser cache:** Ctrl+Shift+R

### Form Still Not Working?
- **Check environment variables** are all added
- **Redeploy** after adding variables
- **Check Sanity status** - make sure account is active

### SSL Certificate Issues?
- Vercel auto-provisions SSL
- Wait 10-20 minutes after DNS propagates
- Certificate appears automatically

---

## 📝 Migration Checklist

- [ ] Sign up for Vercel with GitHub
- [ ] Import lodge-app repository
- [ ] Add all environment variables
- [ ] Test on Vercel temporary URL
- [ ] Add custom domain in Vercel
- [ ] Update DNS records at domain registrar
- [ ] Wait for DNS propagation (1-24 hours)
- [ ] Verify HTTPS working
- [ ] Test all features (form, receipt, etc.)
- [ ] (Optional) Delete Netlify site

---

## ⚡ Quick Start

**Fastest migration:**
1. Go to: https://vercel.com
2. "Sign up with GitHub"
3. Import `Bronx-Kofi/lodge-app`
4. Add environment variables
5. Deploy
6. Add domain
7. Update DNS
8. Wait 1-2 hours
9. Done!

---

## 💡 Recommendation

**Migrate to Vercel because:**
- ✅ No build minute limits (Netlify has 300/month)
- ✅ Faster deployments
- ✅ Better Next.js optimization
- ✅ Free tier is generous
- ✅ Made for Next.js projects
- ✅ Same domain works perfectly

**Your domain is portable - you own it!**

---

## 🎉 Final Notes

- **You keep your domain** - just point it somewhere else
- **All your code stays the same** - no changes needed
- **Environment variables** - just copy them over
- **DNS update** - only takes a few minutes to set up
- **Site downtime** - minimal (during DNS propagation)

**Vercel is probably better for your Next.js site anyway!**

---

**Ready to migrate? Follow the steps above and you'll be on Vercel in 20 minutes (plus DNS wait time)!**

