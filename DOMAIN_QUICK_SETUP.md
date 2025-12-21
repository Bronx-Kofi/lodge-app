# ⚡ Quick Domain Setup (30 Minutes)

## Fastest Path: Namecheap + Netlify DNS

### Step 1: Buy Domain (5 min)

1. Go to https://www.namecheap.com
2. Search: "bonolodge" or your preferred name
3. Add `.com` domain to cart
4. Enable **WhoisGuard** (FREE privacy protection)
5. Create account & pay (~$12)

---

### Step 2: Set Up Netlify (Already Done!)

✅ Your site is ready on GitHub
⏳ Just needs to be deployed to Netlify

---

### Step 3: Deploy to Netlify (5 min)

1. Go to https://app.netlify.com/
2. **Import** → GitHub → `Bronx-Kofi/lodge-app`
3. Settings:
   - Base: `lodge-app`
   - Build: `npm run build`
   - Publish: `.next`
4. Add environment variables:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID = jyrzp1q7
   NEXT_PUBLIC_SANITY_DATASET = production
   SANITY_API_READ_TOKEN = [get from Sanity]
   ```
5. Deploy!

---

### Step 4: Add Custom Domain to Netlify (2 min)

1. In Netlify dashboard: **Domain settings**
2. Click **Add custom domain**
3. Enter: `bonolodge.com` (or your domain)
4. Click **Add domain**
5. Choose **Use Netlify DNS**
6. Netlify shows you nameservers like:
   ```
   dns1.p03.nsone.net
   dns2.p03.nsone.net
   dns3.p03.nsone.net
   dns4.p03.nsone.net
   ```

---

### Step 5: Update Nameservers at Namecheap (2 min)

1. Go to Namecheap dashboard
2. Find your domain → Click **Manage**
3. Go to **Domain** tab
4. Under **NAMESERVERS**, select **Custom DNS**
5. Paste the Netlify nameservers:
   ```
   dns1.p03.nsone.net
   dns2.p03.nsone.net
   dns3.p03.nsone.net
   dns4.p03.nsone.net
   ```
6. Click ✓ **Save**

---

### Step 6: Wait & Configure (15-60 min)

**DNS Propagation**: 15 minutes - 48 hours (usually < 1 hour)

While waiting:

1. **Get Sanity API Token**:
   - https://www.sanity.io/manage → API → Tokens
   - Add "Netlify Production" with Viewer permission
   - Copy token

2. **Add to Netlify**:
   - Site settings → Environment variables
   - Add `SANITY_API_READ_TOKEN`

3. **Update Sanity CORS**:
   - https://www.sanity.io/manage → API → CORS
   - Add: `https://bonolodge.com`
   - Add: `https://www.bonolodge.com`
   - Add: `https://bonolodge.com/studio`

---

### Step 7: Verify (1 min)

Once DNS propagates:

1. Visit: `https://bonolodge.com`
2. Check HTTPS is working (🔒 in browser)
3. Test `/studio` access
4. Verify all pages load

---

## ✅ Done!

**Your site is live at**: `https://yourdomain.com`

**Cost**: ~$12/year
**Time**: ~30 minutes + DNS wait

---

## Troubleshooting

### Domain not working yet?
- DNS takes time (usually 30-60 minutes)
- Check: https://www.whatsmydns.net/

### SSL certificate pending?
- Netlify auto-provisions after DNS is live
- Wait 5-10 minutes after domain resolves

### Images not loading?
- Check Sanity CORS includes your domain
- Clear browser cache

---

## Alternative: Quick Setup with Cloudflare

**Cheaper** (~$8-10/year) but requires Cloudflare account:

1. https://dash.cloudflare.com/sign-up
2. Register domain through Cloudflare
3. Add DNS records:
   - A: @ → 75.2.60.5
   - CNAME: www → [your-netlify-site].netlify.app
4. Add domain to Netlify
5. Done!

---

**Need the detailed guide?** See `CUSTOM_DOMAIN_GUIDE.md`
