# ⚡ Quick Fix - Content Not Updating

## 🎯 Immediate Solutions (Choose One)

### Solution 1: Restart Dev Server (30 seconds)
```bash
cd lodge-app
# Press Ctrl+C to stop server
npm run dev
# Refresh browser - changes will show!
```

### Solution 2: Hard Refresh Browser (5 seconds)
- **Windows:** `Ctrl + Shift + R`
- **Mac:** `Cmd + Shift + R`
- **Or:** Clear browser cache

### Solution 3: Wait (1 hour max)
Your site caches content for performance. Changes appear automatically after:
- Site settings (WhatsApp, etc.): **1 hour**
- Other content: **30 minutes**

---

## 🚀 Permanent Fix: Set Up Webhook (5 minutes)

Make content update instantly every time you publish in Sanity!

### Step 1: Add to Vercel Environment Variables
1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add new variable:
   - **Name:** `SANITY_REVALIDATE_SECRET`
   - **Value:** `your-secret-key-change-this-1768488316`
   - **Environments:** Production, Preview, Development
4. Click "Save"
5. **Redeploy** your site (important!)

### Step 2: Create Sanity Webhook
1. Go to: https://sanity.io/manage
2. Select project: `jyrzp1q7`
3. Click: **API** → **Webhooks**
4. Click: **Create webhook**
5. Fill in:
   ```
   Name: Vercel Auto-Update
   URL: https://mikyhillsidelodge.com/api/revalidate?secret=your-secret-key-change-this-1768488316
   Dataset: production
   Trigger on: Create, Update, Delete
   HTTP method: POST
   ```
6. Click **Save**
7. Toggle to **Enabled** ✅

### Step 3: Test It!
1. Edit something in Sanity Studio (e.g., WhatsApp number)
2. Click **Publish**
3. Wait 10 seconds
4. Refresh your website
5. Changes should appear! ✅

---

## 🆘 If Still Not Working

### Check 1: Are you viewing the live site?
- Local dev: `http://localhost:3002`
- Live site: `https://mikyhillsidelodge.com`
- They're different! Local needs restart, live needs webhook.

### Check 2: Did you redeploy Vercel?
After adding environment variable, you MUST redeploy:
- Vercel Dashboard → Deployments
- Click ⋯ menu → Redeploy

### Check 3: Is webhook firing?
- Sanity Manage → Webhooks → Your webhook
- Click to view details
- Check "Deliveries" tab
- Should show success (200 status)

---

## 💡 Understanding Cache

**Why cache?**
- Makes your site super fast ⚡
- Reduces API calls to Sanity
- Better performance for visitors

**Why webhook?**
- Updates content instantly when you publish
- Best of both worlds: fast site + instant updates
- Professional solution used by all major sites

---

## ✅ Quick Checklist

For immediate fix:
- [ ] Restart dev server OR hard refresh browser

For permanent fix:
- [ ] Add `SANITY_REVALIDATE_SECRET` to Vercel
- [ ] Redeploy Vercel site
- [ ] Create webhook in Sanity
- [ ] Test by publishing a change
- [ ] Verify change appears within 10 seconds

---

**Need detailed instructions? See: `FIX_CONTENT_NOT_UPDATING.md`**
