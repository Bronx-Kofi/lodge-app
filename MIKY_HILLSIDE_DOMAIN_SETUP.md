# 🏔️ Miky Hillside Lodge - Domain Setup

## Your Domain Options

### Option 1: mikyhillsidelodge.com
- **Extension**: .com (most popular, trusted)
- **Cost**: ~$9.77/year on Cloudflare
- **Best for**: Commercial business, international visitors
- **SEO**: Best for search engines
- **Recommendation**: ⭐⭐⭐⭐⭐ **HIGHLY RECOMMENDED**

### Option 2: mikyhillsidelodge.org
- **Extension**: .org (organization-focused)
- **Cost**: ~$9.93/year on Cloudflare
- **Best for**: Non-profits, community organizations
- **Note**: Usually for non-commercial entities
- **Recommendation**: ⭐⭐⭐ (Good, but .com is better for lodges)

### Alternative Variations (if your preferred is taken)
- `mikyhillside.com` (shorter)
- `miky-hillside.com` (with hyphen)
- `mikyhillsidelodge.co` (~$12/year - modern alternative)
- `mikyhillsidelodge.hotel` (~$40/year - industry-specific)

---

## My Recommendation

**Go with: `mikyhillsidelodge.com`**

**Why?**
- ✅ .com is the gold standard for businesses
- ✅ Better for SEO and Google rankings
- ✅ Easier for customers to remember
- ✅ More professional for hospitality industry
- ✅ Same price as .org on Cloudflare

---

## Step-by-Step: Purchase on Cloudflare

### 1. Create Cloudflare Account (2 min)

1. Go to: https://dash.cloudflare.com/sign-up
2. Enter email and create password
3. Verify email address
4. Login to dashboard

### 2. Search for Domain (1 min)

1. In Cloudflare dashboard, click **Domain Registration** (left sidebar)
2. Or go directly to: https://dash.cloudflare.com/domains
3. Click **Register Domains**
4. Search for: `mikyhillsidelodge` (without .com or .org)
5. Cloudflare will show available extensions and prices

### 3. Check Availability

**If Available**:
- ✅ Click **Purchase** on `mikyhillsidelodge.com`
- Proceed to checkout

**If Taken**:
- Try variations:
  - `mikyhillside.com`
  - `miky-hillside-lodge.com`
  - `mikyhillsidelodge.co`

### 4. Complete Purchase (2 min)

1. Review domain and price (~$9.77/year)
2. Choose registration period (1 year recommended to start)
3. Add payment method (credit card)
4. **Enable Auto-renew** (recommended)
5. Complete purchase

**Features Included FREE**:
- ✅ WHOIS privacy protection
- ✅ DNSSEC security
- ✅ Cloudflare DNS (fastest in the world)
- ✅ No hidden fees
- ✅ At-cost pricing (no markup)

---

## After Purchase: Configure for Netlify

### Option A: Use Cloudflare DNS (Recommended)

Your domain is already on Cloudflare DNS. Just add records:

1. **In Cloudflare Dashboard**:
   - Go to **Websites** → Click your domain
   - Go to **DNS** → **Records**

2. **Add DNS Records**:

   **For main domain (mikyhillsidelodge.com)**:
   ```
   Type: A
   Name: @
   IPv4 address: 75.2.60.5
   Proxy status: DNS only (gray cloud)
   TTL: Auto
   ```

   **For www subdomain**:
   ```
   Type: CNAME
   Name: www
   Target: [your-netlify-site].netlify.app
   Proxy status: DNS only (gray cloud)
   TTL: Auto
   ```

3. **In Netlify Dashboard**:
   - Go to **Domain settings**
   - Click **Add custom domain**
   - Enter: `mikyhillsidelodge.com`
   - Click **Verify** → **Add domain**
   - Netlify will provision SSL certificate automatically

4. **Enable Cloudflare Proxy** (Optional but recommended):
   - Back in Cloudflare DNS settings
   - Click the gray cloud icon to turn it orange
   - This enables Cloudflare's CDN and DDoS protection
   - Makes your site even faster and more secure!

---

### Option B: Use Netlify DNS (Simpler)

Let Netlify handle all DNS:

1. **In Netlify Dashboard**:
   - **Domain settings** → **Add custom domain**
   - Enter: `mikyhillsidelodge.com`
   - Choose **Use Netlify DNS**
   - Netlify provides nameservers (e.g., dns1.p03.nsone.net)

2. **In Cloudflare Dashboard**:
   - Go to your domain → **DNS** → **Nameservers**
   - Click **Change nameservers**
   - Enter Netlify's nameservers
   - Save

**Note**: With this option, you lose Cloudflare's CDN/protection features

---

## Complete Setup Timeline

### Immediate (10 minutes)
1. ✅ Create Cloudflare account
2. ✅ Search and purchase domain
3. ✅ Configure DNS records
4. ✅ Add domain to Netlify

### Within 1 Hour
- ✅ DNS propagates globally
- ✅ Domain resolves to your site
- ✅ SSL certificate issued (automatic)

### Within 24 Hours
- ✅ Full global propagation
- ✅ All regions can access site
- ✅ Search engines start indexing

---

## After Domain is Live

### 1. Update Sanity CORS
Add these origins in Sanity (https://www.sanity.io/manage):
- `https://mikyhillsidelodge.com`
- `https://www.mikyhillsidelodge.com`
- `https://mikyhillsidelodge.com/studio`

### 2. Test Everything
- [ ] Visit `https://mikyhillsidelodge.com`
- [ ] Check HTTPS works (🔒 padlock in browser)
- [ ] Test `/studio` access
- [ ] Check all pages load
- [ ] Test on mobile
- [ ] Verify images display

### 3. Update Marketing
- [ ] Update social media profiles
- [ ] Update Google My Business
- [ ] Update business cards
- [ ] Update booking platforms
- [ ] Notify existing customers

---

## Email Setup (Optional)

### Free Option: Email Forwarding
Forward emails to your existing Gmail/email:

1. **In Cloudflare Dashboard**:
   - Go to **Email** → **Email Routing**
   - Click **Get started**
   - Add destination email (your personal email)
   - Add forwarding addresses:
     - `info@mikyhillsidelodge.com` → your-email@gmail.com
     - `bookings@mikyhillsidelodge.com` → your-email@gmail.com
     - `reservations@mikyhillsidelodge.com` → your-email@gmail.com

2. **Verify** and you're done!

### Paid Option: Professional Email
- **Google Workspace**: $6/month - Full Gmail + Google Drive
- **Microsoft 365**: $6/month - Full Outlook + OneDrive
- **Zoho Mail**: $1/month - Budget-friendly

---

## Costs Summary

### One-Time Setup
- **Domain (1 year)**: ~$9.77
- **Netlify Hosting**: FREE
- **SSL Certificate**: FREE
- **DNS Service**: FREE (Cloudflare)
- **Email Forwarding**: FREE (Cloudflare)

### Annual Renewal
- **Domain renewal**: ~$9.77/year (auto-renew)
- Everything else: FREE

**Total First Year**: ~$10 (just the domain!)

---

## Bonus: Cloudflare Features (All FREE!)

With Cloudflare, you get:
- ✅ **CDN**: Faster site loading globally
- ✅ **DDoS Protection**: Enterprise-grade security
- ✅ **SSL/TLS**: Always-on HTTPS
- ✅ **Analytics**: Basic visitor stats
- ✅ **Email Routing**: Forward emails for free
- ✅ **Page Rules**: Advanced redirects (3 free)
- ✅ **Firewall**: Block malicious traffic
- ✅ **Caching**: Reduce server load

These features normally cost $20-200/month elsewhere!

---

## Quick Reference

### Your Domain
- **Name**: mikyhillsidelodge.com (recommended)
- **Registrar**: Cloudflare
- **Cost**: ~$9.77/year
- **DNS**: Cloudflare DNS

### Your Site
- **GitHub**: https://github.com/Bronx-Kofi/lodge-app
- **Netlify**: [Your site after deployment]
- **Live URL**: https://mikyhillsidelodge.com (after setup)
- **CMS**: https://mikyhillsidelodge.com/studio

### Important Links
- **Cloudflare Dashboard**: https://dash.cloudflare.com/
- **Netlify Dashboard**: https://app.netlify.com/
- **Sanity Dashboard**: https://www.sanity.io/manage

---

## Need Help?

- **Cloudflare Support**: https://support.cloudflare.com/
- **Domain Guide**: See `CUSTOM_DOMAIN_GUIDE.md`
- **Quick Setup**: See `DOMAIN_QUICK_SETUP.md`

---

## Ready to Purchase?

1. Go to: https://dash.cloudflare.com/sign-up
2. Search for: `mikyhillsidelodge`
3. Purchase `.com` extension
4. Follow DNS setup above
5. You'll be live in ~1 hour!

**Let's get your lodge online! 🚀**
