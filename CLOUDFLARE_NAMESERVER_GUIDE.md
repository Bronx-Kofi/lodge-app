# 🔧 How to Change Nameservers in Netlify

## Problem
Clicking on nameservers in Netlify does nothing - they're not editable from the main DNS page.

## Solution

### **Method 1: Use Netlify Domain Management**

1. **Go to:** https://app.netlify.com/account/dns
   - OR: Click your profile → **"Domains"** → **"DNS"** tab

2. **Find your domain:** `mikyhillsidelodge.com`

3. **Click the domain name** (not the DNS settings, the actual domain name)

4. **Look for:** "Domain management" or "Advanced settings" section

5. **Find:** "Use Netlify DNS" toggle or "Use external DNS" option

6. **Switch to:** "External DNS" or "Custom nameservers"

7. **Enter Cloudflare nameservers:**
   ```
   mike.ns.cloudflare.com
   ophelia.ns.cloudflare.com
   ```

---

### **Method 2: Through Netlify Registrar Interface**

1. **Go to:** https://app.netlify.com/account/domains
   - OR: Click your avatar → **"User settings"** → **"Domains"**

2. **Find:** `mikyhillsidelodge.com` in the list

3. **Click:** The **three dots (⋮)** or **"Options"** button next to the domain

4. **Select:** "Domain settings" or "Manage domain"

5. **Scroll down to:** "Nameservers" section

6. **Click:** "Change nameservers" or "Use external nameservers"

7. **Select:** "Custom nameservers" option

8. **Add:**
   ```
   mike.ns.cloudflare.com
   ophelia.ns.cloudflare.com
   ```

9. **Remove:** Existing NSOne nameservers

10. **Save changes**

---

### **Method 3: Contact Netlify Support**

If the above doesn't work, Netlify support is very responsive:

1. **Go to:** https://www.netlify.com/support/
2. **Click:** "Contact support"
3. **Say:** "I need to change nameservers for mikyhillsidelodge.com to Cloudflare nameservers"
4. **Provide:**
   ```
   Domain: mikyhillsidelodge.com
   New nameservers:
   - mike.ns.cloudflare.com
   - ophelia.ns.cloudflare.com
   ```

They usually respond within 1-2 hours.

---

## **Alternative: Keep Netlify DNS + Use Email Forwarding Service**

If changing nameservers is too difficult, you can:

### **Option A: Use ImprovMX (FREE)**
1. Go to https://improvmx.com
2. Add your domain
3. Add these MX records in **Netlify DNS:**
   ```
   Priority: 10, Value: mx1.improvmx.com
   Priority: 20, Value: mx2.improvmx.com
   ```
4. Set up forwarding: `info@mikyhillsidelodge.com` → your Gmail

### **Option B: Use Zoho Mail (FREE tier)**
1. Sign up at https://zoho.com/mail
2. Add MX records in Netlify DNS (Zoho provides them)
3. Set up email forwarding

---

## **Check Current Status**

Your domain currently uses:
- Nameservers: NSOne (Netlify's DNS provider)
- A Record: `216.198.79.1` (Vercel)
- CNAME: `www` → Vercel

---

## **What to Try Now**

1. Try Method 1 or 2 above
2. If stuck after 10 minutes, contact Netlify support
3. Or use Alternative option with ImprovMX

Let me know which method works!
