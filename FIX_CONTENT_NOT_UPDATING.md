# 🔧 Fix: Content Not Updating from Sanity

## Problem
You update content in Sanity Studio (e.g., WhatsApp number) but changes don't show on the live site immediately.

## Why This Happens
Your site uses **caching** for performance:
- Site settings: Cached for **1 hour** (3600 seconds)
- Other pages: Cached for **30 minutes** (1800 seconds)

This is **GOOD** for performance but means changes take time to appear.

---

## ✅ Solution 1: Manual Revalidation (Quick Fix)

### For Local Development:

**Option A: Restart Dev Server**
```bash
cd lodge-app
# Stop the server (Ctrl+C)
npm run dev
# Changes will show immediately
```

**Option B: Clear Next.js Cache**
```bash
cd lodge-app
rm -rf .next
npm run dev
```

### For Production (Vercel):

**Option A: Redeploy**
- Go to Vercel Dashboard
- Click "Redeploy" on your deployment
- Wait 2-3 minutes

**Option B: Manual Revalidation API**
```bash
# Call the revalidate endpoint
curl -X POST "https://mikyhillsidelodge.com/api/revalidate?secret=YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"_type":"siteSettings"}'
```

---

## ✅ Solution 2: Automatic Revalidation (Best Solution)

Set up a webhook so Sanity automatically tells your site when content changes!

### Step 1: Add Secret to Environment Variables

**Local (.env.local):**
```bash
SANITY_REVALIDATE_SECRET=your-secret-key-change-this
```

**Vercel Dashboard:**
1. Go to Project Settings → Environment Variables
2. Add new variable:
   - Key: `SANITY_REVALIDATE_SECRET`
   - Value: `your-secret-key-change-this` (use a random string)
   - Environment: Production, Preview, Development

### Step 2: Set Up Sanity Webhook

1. **Go to Sanity Manage:**
   - Visit: https://sanity.io/manage
   - Select project: `jyrzp1q7`

2. **Navigate to Webhooks:**
   - Click "API" tab
   - Click "Webhooks" section
   - Click "Create webhook"

3. **Configure Webhook:**
   ```
   Name: Vercel Revalidation
   
   URL: https://mikyhillsidelodge.com/api/revalidate?secret=your-secret-key-change-this
   
   Dataset: production
   
   Trigger on: Create, Update, Delete
   
   Filter: Leave empty (or add specific types)
   
   HTTP method: POST
   
   API version: v2021-06-07 (or latest)
   
   Status: Enabled ✅
   ```

4. **Save Webhook**

### Step 3: Test It!

1. **Make a change in Sanity:**
   - Go to Sanity Studio
   - Edit site settings (e.g., change WhatsApp number)
   - Click "Publish"

2. **Check webhook fired:**
   - In Sanity Manage → Webhooks
   - Click on your webhook
   - Check "Deliveries" tab
   - Should show successful delivery (200 status)

3. **Verify on site:**
   - Wait 5-10 seconds
   - Refresh your site
   - Change should appear immediately!

---

## 🚀 Quick Setup (Copy-Paste)

### 1. Generate a Secret
```bash
# Generate random secret
openssl rand -base64 32
# Or use any random string: your-secret-key-12345
```

### 2. Add to .env.local
```bash
cd lodge-app
echo "SANITY_REVALIDATE_SECRET=your-generated-secret" >> .env.local
```

### 3. Add to Vercel
- Vercel Dashboard → Settings → Environment Variables
- Add `SANITY_REVALIDATE_SECRET` with same value
- Apply to all environments

### 4. Create Sanity Webhook
- URL: `https://mikyhillsidelodge.com/api/revalidate?secret=your-generated-secret`
- Dataset: production
- Trigger: Create, Update, Delete
- Save and enable

**Done! Content updates instantly! ✅**

---

## 🧪 Test the Webhook

### Test Locally:
```bash
# Make sure dev server is running
npm run dev

# In another terminal, test the endpoint
curl -X POST "http://localhost:3002/api/revalidate?secret=your-secret" \
  -H "Content-Type: application/json" \
  -d '{"_type":"siteSettings"}'

# Should return: {"revalidated":true,"now":...}
```

### Test on Vercel:
```bash
curl -X POST "https://mikyhillsidelodge.com/api/revalidate?secret=your-secret" \
  -H "Content-Type: application/json" \
  -d '{"_type":"siteSettings"}'
```

---

## 🔍 Troubleshooting

### Issue: Webhook Returns 401 (Unauthorized)
**Cause:** Secret mismatch  
**Fix:** 
- Check secret in webhook URL matches environment variable
- Redeploy Vercel after adding environment variable

### Issue: Webhook Returns 500 (Error)
**Cause:** Code error  
**Fix:**
- Check Vercel logs (Dashboard → Deployments → Click deployment → Functions)
- Check error message

### Issue: Webhook Shows Success but Content Doesn't Update
**Cause:** Browser cache  
**Fix:**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Try incognito/private mode

### Issue: Content Still Takes Long to Update
**Cause:** Multiple cache layers  
**Fix:**
- Wait 60 seconds after publishing
- Check if CDN caching is enabled
- Verify webhook is actually firing (check Sanity deliveries)

---

## ⚡ Reducing Cache Times (Alternative)

If you want faster updates without webhooks, reduce cache times:

**Edit `lodge-app/lib/sanity-queries.ts`:**

```typescript
// Before (1 hour cache for settings)
revalidate: 3600

// After (5 minutes cache)
revalidate: 300
```

**Trade-offs:**
- ✅ Changes appear faster (5 min instead of 1 hour)
- ❌ More requests to Sanity
- ❌ Slightly slower site performance

**Recommended:** Use webhooks instead for instant updates without performance cost!

---

## 📊 Cache Times Reference

Current cache settings:

| Content Type | Cache Time | Update Frequency |
|--------------|------------|------------------|
| Site Settings | 1 hour | Rarely changes |
| Navigation | 30 minutes | Rarely changes |
| Footer | 30 minutes | Rarely changes |
| Homepage | 30 minutes | Occasionally changes |
| Rooms | 30 minutes | Occasionally changes |
| About Page | 30 minutes | Rarely changes |
| Heritage Sites | 30 minutes | Rarely changes |

**With webhooks:** All updates instantly regardless of cache time!

---

## ✅ Recommended Setup

**Best practice for production:**

1. ✅ Keep cache times as they are (good for performance)
2. ✅ Set up Sanity webhook (instant updates)
3. ✅ Add `SANITY_REVALIDATE_SECRET` to Vercel
4. ✅ Test webhook works

**Result:**
- Fast site (cached content)
- Instant updates (webhook revalidation)
- Best of both worlds! 🎉

---

## 🎯 Quick Checklist

- [ ] Generate random secret
- [ ] Add `SANITY_REVALIDATE_SECRET` to `.env.local`
- [ ] Add `SANITY_REVALIDATE_SECRET` to Vercel environment variables
- [ ] Redeploy Vercel (to apply new env variable)
- [ ] Create webhook in Sanity Manage
- [ ] Webhook URL includes the secret
- [ ] Test: Edit content in Sanity
- [ ] Verify: Change appears on site within 10 seconds
- [ ] Check: Webhook delivery shows success in Sanity

---

## 🎉 Success!

Once set up correctly:
1. You edit content in Sanity Studio
2. Click "Publish"
3. Webhook fires automatically
4. Your site revalidates instantly
5. Changes appear within 10 seconds
6. No manual action needed!

**This is the professional way to handle content updates! ✅**
