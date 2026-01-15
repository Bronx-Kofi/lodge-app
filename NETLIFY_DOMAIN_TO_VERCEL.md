# 🌐 Use Your Netlify Domain (mikyhillsidelodge.com) on Vercel

You bought `mikyhillsidelodge.com` on Netlify. Here's how to point it to your Vercel site.

---

## ✅ Step-by-Step Guide

### Step 1: Deploy to Vercel First

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Add environment variables
4. Deploy and get your Vercel URL (e.g., `lodge-app-xyz.vercel.app`)

**Don't skip this!** You need the Vercel site live before adding the domain.

---

### Step 2: Add Domain in Vercel

1. **In Vercel Dashboard:**
   - Go to your project
   - Click **Settings** → **Domains**
   
2. **Add your domains:**
   - Click "Add Domain"
   - Enter: `mikyhillsidelodge.com`
   - Click "Add"
   
3. **Add www subdomain:**
   - Click "Add Domain" again
   - Enter: `www.mikyhillsidelodge.com`
   - Click "Add"

4. **Get DNS Records:**
   - Vercel will show you what DNS records to add
   - Keep this page open!
   - You'll see something like:
     ```
     A Record: @ → 76.76.21.21
     CNAME: www → cname.vercel-dns.com
     ```

---

### Step 3: Update DNS in Netlify

1. **Log into Netlify:**
   - Go to https://app.netlify.com
   
2. **Navigate to Domain:**
   - Click on Domains in the top menu
   - Find `mikyhillsidelodge.com`
   - Click on it

3. **Go to DNS Settings:**
   - Click "DNS settings" or "Options" → "Go to DNS panel"

4. **Update DNS Records:**
   
   **For Root Domain (@):**
   - Find existing A record pointing to Netlify
   - Delete it or edit it
   - Add new A record:
     ```
     Type: A
     Name: @ (or leave blank)
     Value: 76.76.21.21
     TTL: 3600 (or Auto)
     ```
   
   **For WWW Subdomain:**
   - Find existing CNAME for www
   - Delete it or edit it
   - Add new CNAME:
     ```
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     TTL: 3600 (or Auto)
     ```

5. **Save Changes**

---

### Step 4: Wait for DNS Propagation

- **Minimum wait:** 5-10 minutes
- **Maximum wait:** 48 hours (usually much faster)
- **Average:** 30-60 minutes

**Check propagation:**
- Visit https://dnschecker.org
- Enter `mikyhillsidelodge.com`
- See if it points to Vercel's IP (76.76.21.21)

---

### Step 5: Verify in Vercel

1. **Go back to Vercel:**
   - Settings → Domains
   - Check status of `mikyhillsidelodge.com`
   - Should show "Valid Configuration" ✅

2. **Test your domain:**
   - Visit https://mikyhillsidelodge.com
   - Visit https://www.mikyhillsidelodge.com
   - Both should load your site

3. **Vercel automatically provides:**
   - ✅ Free SSL certificate (HTTPS)
   - ✅ Auto-renewal of SSL
   - ✅ Redirect from www to non-www (or vice versa)

---

## 🔍 Troubleshooting

### Domain shows "Invalid Configuration" in Vercel

**Solution:** Wait longer. DNS takes time to propagate.

### "DNS_PROBE_FINISHED_NXDOMAIN" error

**Solution:** 
1. Check DNS records in Netlify are correct
2. Wait more time for propagation
3. Clear browser cache

### Site loads but shows "404"

**Solution:** 
1. Check root directory is set to `lodge-app` in Vercel
2. Redeploy in Vercel

### HTTPS/SSL not working

**Solution:** 
1. Wait 10-20 minutes after DNS propagates
2. Vercel automatically provisions SSL certificates
3. If still not working after 1 hour, contact Vercel support

---

## 💰 Cost Considerations

### Keeping Domain on Netlify:
- Domain renewal: ~$15-20/year (paid to Netlify)
- Netlify site: Pause or delete (saves build minutes)
- Vercel hosting: Free (for your usage)

### Total: ~$15-20/year

You're just using Netlify as a domain registrar, nothing else.

---

## 🔄 Alternative: Transfer Domain to Vercel Later

If you want everything in one place:

1. **Wait until site is stable on Vercel** (2-4 weeks)
2. **In Netlify:** Get domain authorization code
3. **In Vercel:** Initiate domain transfer
4. **Pay transfer fee:** ~$15 (includes 1 year renewal)
5. **Wait 5-7 days** for transfer to complete
6. **Cancel Netlify** subscription

**Note:** Not urgent! You can do this anytime.

---

## ✅ Quick Checklist

- [ ] Deploy site to Vercel
- [ ] Add `mikyhillsidelodge.com` in Vercel
- [ ] Add `www.mikyhillsidelodge.com` in Vercel
- [ ] Get DNS records from Vercel
- [ ] Update A record in Netlify DNS
- [ ] Update CNAME record in Netlify DNS
- [ ] Wait for DNS propagation (30-60 min)
- [ ] Test domain loads your site
- [ ] Verify HTTPS works
- [ ] Update Sanity CORS with new domain

---

## 📞 Need Help?

**Netlify DNS Help:**
- https://docs.netlify.com/domains-https/custom-domains/

**Vercel Domain Help:**
- https://vercel.com/docs/concepts/projects/domains

**DNS Propagation Checker:**
- https://dnschecker.org

---

## 🎉 Summary

1. Deploy to Vercel ✅
2. Add domain in Vercel ✅
3. Point Netlify DNS to Vercel ✅
4. Wait 30-60 minutes ⏱️
5. Your domain works! 🎉

**You keep paying Netlify for the domain but use Vercel for hosting.**

Simple and works great!
