# 🌐 Custom Domain Setup Guide

## Option 1: Purchase Domain Through Netlify (Easiest)

### Advantages
- ✅ Automatic DNS configuration
- ✅ Free SSL certificate (automatic)
- ✅ No manual DNS setup needed
- ✅ Managed by Netlify
- ✅ Renewal reminders

### How to Buy Through Netlify

1. **Deploy to Netlify First** (follow QUICK_START_NETLIFY.md)
2. After deployment, go to your site dashboard
3. Click **Domain settings** → **Add custom domain**
4. Click **"Register a new domain"**
5. Search for available domains
6. Complete purchase (price varies by TLD)
7. Domain is automatically configured!

**Cost**: ~$15-20/year for .com domains

---

## Option 2: Purchase from External Registrar

### Recommended Domain Registrars

#### 1. **Namecheap** (Recommended)
- **Website**: https://www.namecheap.com
- **Price**: $10-15/year for .com
- **Pros**: Affordable, great UI, free WHOIS privacy
- **Rating**: ⭐⭐⭐⭐⭐

#### 2. **Google Domains** (Now Squarespace)
- **Website**: https://domains.google.com
- **Price**: $12/year for .com
- **Pros**: Simple, integrated with Google services
- **Rating**: ⭐⭐⭐⭐

#### 3. **Cloudflare**
- **Website**: https://www.cloudflare.com/products/registrar/
- **Price**: At-cost (cheapest, ~$8-10/year)
- **Pros**: No markup pricing, great DNS
- **Rating**: ⭐⭐⭐⭐⭐

#### 4. **GoDaddy**
- **Website**: https://www.godaddy.com
- **Price**: Variable (often with sales)
- **Pros**: Well-known, lots of options
- **Cons**: Upsells, renewal prices higher
- **Rating**: ⭐⭐⭐

#### 5. **Porkbun**
- **Website**: https://porkbun.com
- **Price**: $9-11/year for .com
- **Pros**: Affordable, free WHOIS privacy
- **Rating**: ⭐⭐⭐⭐

---

## Suggested Domain Names for Your Lodge

Based on your Bono Eco Lodge project:

### Premium Options (.com)
- `bonoeco.com` or `bono-eco.com`
- `bonoecolodge.com`
- `bonolodge.com`
- `ecobonosuite.com`
- `staybono.com`
- `bonohospitality.com`

### Ghana-Specific (.gh or .com.gh)
- `bonolodge.gh`
- `bono-eco.com.gh`
- `stayinbono.gh`

### Alternative TLDs (Cheaper, Modern)
- `bonolodge.co` (~$20/year)
- `bonolodge.io` (~$30/year) - Tech-focused
- `bonolodge.hotel` (~$40/year) - Industry-specific
- `bonolodge.eco` (~$70/year) - Perfect for eco-lodge!
- `bonolodge.africa` (~$30/year) - Regional

### Budget-Friendly
- `bonolodge.online` (~$3/year)
- `bonolodge.site` (~$3/year)
- `bonolodge.xyz` (~$2/year)

**Recommendation**: Go with `.com` for credibility, or `.eco` for brand alignment

---

## Step-by-Step: Buy from Namecheap (Recommended)

### 1. Search for Domain (2 minutes)
1. Go to https://www.namecheap.com
2. Search for your desired domain (e.g., "bonolodge")
3. Check availability
4. Add to cart

### 2. Purchase (3 minutes)
1. Review cart
2. Add **WhoisGuard** (usually FREE) - protects your privacy
3. Choose registration period (1 year = ~$10-15)
4. Create Namecheap account
5. Complete payment

### 3. Configure DNS for Netlify (5 minutes)

After purchase:

1. **In Namecheap Dashboard**:
   - Go to **Domain List** → Click **Manage** on your domain
   - Go to **Advanced DNS** tab

2. **Add These DNS Records**:

   | Type | Host | Value | TTL |
   |------|------|-------|-----|
   | A Record | @ | 75.2.60.5 | Automatic |
   | CNAME | www | [your-site].netlify.app | Automatic |

   Replace `[your-site]` with your actual Netlify site name

3. **In Netlify Dashboard**:
   - Go to **Domain settings** → **Add custom domain**
   - Enter your domain (e.g., `bonolodge.com`)
   - Click **Verify**
   - Click **Add domain**
   - Netlify will automatically provision SSL certificate

4. **Wait for DNS Propagation** (5 minutes - 48 hours, usually ~1 hour)

---

## Step-by-Step: Buy from Cloudflare (Cheapest)

### 1. Create Cloudflare Account
1. Go to https://dash.cloudflare.com/sign-up
2. Create free account

### 2. Purchase Domain
1. Go to **Domain Registration** → **Register Domains**
2. Search for your domain
3. Complete purchase at cost price (~$8-10/year)

### 3. Configure for Netlify
1. Domain is already on Cloudflare DNS
2. Add DNS records:
   - **A Record**: @ → 75.2.60.5
   - **CNAME**: www → [your-site].netlify.app

3. In Netlify:
   - Add custom domain
   - Verify ownership

4. **Bonus**: Enable Cloudflare's free CDN and DDoS protection!

---

## DNS Configuration Reference

### Required DNS Records for Netlify

#### Primary Domain (example.com)
```
Type: A
Name: @ (or leave blank)
Value: 75.2.60.5
TTL: Automatic
```

#### WWW Subdomain (www.example.com)
```
Type: CNAME
Name: www
Value: [your-site].netlify.app
TTL: Automatic
```

### Alternative: Netlify DNS (Easiest)

Instead of configuring DNS at your registrar:

1. Purchase domain anywhere
2. In Netlify: **Domain settings** → **Add domain**
3. Choose **Use Netlify DNS**
4. Netlify gives you nameservers (e.g., dns1.p03.nsone.net)
5. Update nameservers at your registrar
6. Everything auto-configured!

---

## SSL Certificate (HTTPS)

### Automatic with Netlify
- ✅ Free SSL certificate from Let's Encrypt
- ✅ Auto-renewal
- ✅ HTTPS enabled by default
- ✅ HTTP → HTTPS redirect automatic

**No action needed!** Netlify handles everything once DNS is configured.

---

## Email Setup (Optional)

Your domain registrar doesn't provide email. Options:

### 1. **Google Workspace** (Professional)
- Cost: $6/user/month
- Email: you@yourdomain.com
- Includes: Gmail, Drive, Calendar, Meet
- Setup: https://workspace.google.com

### 2. **Microsoft 365**
- Cost: $6/user/month
- Email: you@yourdomain.com
- Includes: Outlook, OneDrive, Teams

### 3. **Zoho Mail** (Budget)
- Cost: FREE for 5 users or $1/user/month
- Email: you@yourdomain.com
- Setup: https://www.zoho.com/mail/

### 4. **Email Forwarding** (Free, Basic)
- Forward: info@yourdomain.com → your-gmail@gmail.com
- Most registrars offer this free
- Good for small operations

---

## Recommended Setup for Your Lodge

### 1. Domain Strategy

**Best Option**: Buy `bonolodge.com` or `bono-eco.com`
- **Registrar**: Namecheap or Cloudflare
- **Cost**: ~$10-15/year
- **DNS**: Use Netlify DNS (easiest)

### 2. Subdomains (Optional)
- `www.bonolodge.com` - Main site (auto-configured)
- `admin.bonolodge.com` - Sanity Studio (optional, currently at /studio)
- `booking.bonolodge.com` - Future booking system

### 3. Email
- Start with email forwarding (free)
- Upgrade to Zoho Mail ($1/month) when ready
- Emails: info@, bookings@, concierge@

---

## Timeline & Costs

### Immediate Costs
- **Domain registration**: $10-15/year (.com)
- **Netlify hosting**: FREE (Pro: $19/month for better features)
- **SSL Certificate**: FREE (included)

### Optional Costs
- **Email service**: $0-6/month
- **Premium domain**: $20-70/year (if choosing .eco, .hotel, etc.)

### Time to Setup
- Domain purchase: 5 minutes
- DNS configuration: 10 minutes
- DNS propagation: 1-48 hours (usually < 1 hour)
- SSL activation: Automatic after DNS

---

## Quick Checklist

- [ ] Choose domain name
- [ ] Check availability at registrar
- [ ] Purchase domain
- [ ] Configure DNS (A + CNAME records) OR use Netlify DNS
- [ ] Add domain to Netlify
- [ ] Wait for DNS propagation
- [ ] Verify HTTPS is working
- [ ] Update Sanity CORS with new domain
- [ ] Test website on custom domain
- [ ] Set up email forwarding (optional)

---

## After Domain is Live

### Update These:

1. **Sanity CORS**:
   - Add `https://yourdomain.com` to CORS origins
   - Add `https://www.yourdomain.com` if using www

2. **Social Media**:
   - Update website URL on Facebook, Instagram, etc.

3. **Google My Business**:
   - Update website URL

4. **Business Cards/Marketing**:
   - Use new domain!

---

## Need Help?

- **Namecheap Support**: https://www.namecheap.com/support/
- **Netlify DNS Docs**: https://docs.netlify.com/domains-https/custom-domains/
- **Cloudflare Support**: https://support.cloudflare.com/

---

## My Recommendation for You

1. **Buy**: `bonolodge.com` or `bono-eco.com` from **Namecheap** (~$12/year)
2. **DNS**: Use **Netlify DNS** (easiest setup)
3. **Email**: Start with free forwarding, upgrade to Zoho Mail later
4. **Timeline**: Can be live in 1-2 hours!

**Total Cost**: ~$12/year (domain only), everything else is FREE!
