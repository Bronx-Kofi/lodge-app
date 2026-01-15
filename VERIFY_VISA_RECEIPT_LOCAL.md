# ✅ Verify Visa Receipt Works Locally

## 🎯 Quick Test to Confirm Everything Works

### Step 1: Start Dev Server
```bash
cd lodge-app
npm run dev
```

Wait for: `✓ Ready in X seconds`

### Step 2: Test Standard Receipt
Open browser and go to:
```
http://localhost:3002/receipt?reference=TEST123&email=test@example.com
```

**What you should see:**
- ✅ Standard receipt page loads
- ✅ "Download PDF" button at top
- ✅ **"Visa Application Version" button** (NEW!)
- ✅ Blue box at bottom saying "Need this for Visa Application?"

**If you see these → Code is working!** ✅

### Step 3: Test Visa Receipt
Click the **"Visa Application Version"** button OR go to:
```
http://localhost:3002/receipt/visa?reference=TEST123&email=test@example.com
```

**What you should see:**
- ✅ "OFFICIAL DOCUMENT" header
- ✅ "HOTEL BOOKING CONFIRMATION FOR VISA APPLICATION PURPOSES"
- ✅ "TO WHOM IT MAY CONCERN" section
- ✅ "Download PDF" button
- ✅ Official lodge stamp/seal
- ✅ All embassy-compliant formatting

**If you see this → Visa receipt works!** ✅

---

## 🔍 If It Works Locally But NOT on Vercel

This means:
1. ✅ Code is correct
2. ❌ Vercel deployment issue

**Solutions:**

### Solution A: Check Vercel Deployment Status
1. Go to Vercel Dashboard
2. Click on your project
3. Check "Deployments" tab
4. Latest deployment should show:
   - 🟢 **Ready** → Good! (try hard refresh)
   - 🟡 **Building** → Wait 2-3 minutes
   - 🔴 **Failed** → Click to see error logs

### Solution B: Force Redeploy
1. Vercel Dashboard → Deployments
2. Click ⋯ (three dots) on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes
5. Hard refresh browser (Ctrl+Shift+R)

### Solution C: Check Environment Variables
Vercel needs these variables:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=jyrzp1q7
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk8Ogt47...
SANITY_API_READ_TOKEN=sk42UyRa...
SANITY_REVALIDATE_SECRET=your-secret-key-change-this-1768488316
```

Missing any? Add them and redeploy!

### Solution D: Clear Browser Cache
- Hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
- OR: Open in **Incognito/Private** mode
- OR: Clear all browser cache

---

## 🔍 If It DOESN'T Work Locally

This means there's a code issue. Run these checks:

### Check 1: Are the files there?
```bash
cd lodge-app
ls -la app/\(marketing\)/receipt/
```

**Should show:**
- `page.tsx` (standard receipt)
- `visa-receipt.tsx` (visa receipt component)
- `visa/` (folder)
- `visa/page.tsx` (visa route)

### Check 2: Check for errors
Look at terminal where `npm run dev` is running.

**Look for:**
- ❌ Red error messages
- ⚠️ Build failures
- 🟡 TypeScript errors

### Check 3: View Dev Server Logs
```bash
# Check what server is showing
tail -50 /tmp/dev_server.log
```

---

## 🎯 Tell Me What You See

After running the local test, tell me:

1. **Does standard receipt show "Visa Application Version" button?**
   - YES → Code works, Vercel issue
   - NO → Code issue (shouldn't happen)

2. **Does visa receipt page load at `/receipt/visa`?**
   - YES → Code works, Vercel issue
   - NO → Route issue

3. **What's the Vercel deployment status?**
   - Ready → Clear cache issue
   - Building → Wait
   - Failed → Check logs

4. **Are you testing on live site or preview URL?**
   - mikyhillsidelodge.com → Main domain
   - xxx.vercel.app → Preview URL
   - Both should work when deployed

---

## ✅ Success Checklist

Local testing:
- [ ] Dev server starts without errors
- [ ] Standard receipt loads
- [ ] "Visa Application Version" button visible
- [ ] Visa receipt page loads
- [ ] "Download PDF" button visible
- [ ] All embassy sections present

Vercel testing:
- [ ] Latest deployment shows "Ready"
- [ ] Tried hard refresh (Ctrl+Shift+R)
- [ ] Tried incognito mode
- [ ] Environment variables all present
- [ ] Changes appear on live site

---

## 💡 Most Common Issue

**95% of the time it's:**
- Browser showing **cached old version**
- Solution: **Hard refresh** (Ctrl+Shift+R)

**The other 5%:**
- Vercel still building (wait 2-3 min)
- Environment variables missing (add and redeploy)
- Build failed (check logs)

---

## 🆘 Still Not Working?

Run this complete diagnostic:

```bash
# 1. Check local code
cd lodge-app
git log --oneline -5
# Should show visa receipt commits

# 2. Test locally
npm run dev
# Visit: http://localhost:3002/receipt?reference=TEST&email=test@test.com
# Look for "Visa Application Version" button

# 3. Check Vercel status
# Go to Vercel Dashboard
# Check deployment status

# 4. Force clean build locally
rm -rf .next
npm run dev
```

Then tell me the results of each step!
