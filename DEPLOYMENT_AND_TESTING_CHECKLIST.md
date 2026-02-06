# 🚨 Deployment & Testing Checklist - Fix Receipt Pricing

## Why You're Not Seeing Changes

✅ **Code is in GitHub** - All changes committed and pushed
❌ **Not deployed to live site** - Vercel needs to rebuild
❌ **Browser cache** - May be showing old version

---

## 🚀 Step 1: Deploy to Vercel (2 minutes)

### Option A: Automatic Deployment (Recommended)
1. Go to: https://vercel.com/dashboard
2. Find your project
3. You should see a deployment in progress OR
4. If no deployment, go to "Deployments" tab
5. Click "Redeploy" on the latest deployment

### Option B: Trigger from GitHub
1. Go to your GitHub repo
2. Make a small change (add a space to README.md)
3. Commit and push
4. Vercel will auto-deploy

### Option C: Force Deploy from Terminal
```bash
cd lodge-app
npm install -g vercel
vercel --prod
```

Wait for: **✅ Deployment Complete** (2-3 minutes)

---

## 🔍 Step 2: Verify Deployment

### Check Vercel Dashboard
1. Go to your deployment
2. Click on the deployment URL
3. Note the deployment ID (e.g., `abc123-xyz`)

### Check Live Site
```
https://your-domain.com
```

Look for:
- Last deployment time (should be recent)
- Build ID in page source

---

## 🧪 Step 3: Test Sanity Schema Changes

### A. Open Sanity Studio
```
https://your-domain.com/studio
```

### B. Check Room Schema
1. Go to: **Content** → **Rooms**
2. Open any room
3. Go to **"3. Pricing"** tab
4. **You should see 4 fields:**
   - ✅ Display Price (GH₵/night) [Required]
   - ✅ Receipt/Invoice Price (GH₵/night) [Optional] ← NEW!
   - ✅ Booking Widget Price (GH₵/night) [Optional] ← NEW!
   - ✅ Pricing Notes (Internal) ← NEW!

**If you DON'T see these fields:**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Try incognito/private window

### C. Check Booking Schema
1. Go to: **Content** → **Bookings**
2. Click **+ Create** (or open existing booking)
3. **You should see 5 TABS:**
   - ✅ 1. Guest Info
   - ✅ 2. Dates & Room
   - ✅ 3. Pricing
   - ✅ 4. Payment ← Check this one!
   - ✅ 5. Additional Info

4. Click **"4. Payment"** tab
5. **You should see:**
   - ✅ Payment Status (with "Partial Payment" option) ← NEW!
   - ✅ Amount Paid (GH₵) ← NEW!
   - ✅ Payment Method (Cash, Telecel, etc.) ← NEW!
   - ✅ Payment Reference/Transaction ID ← NEW!
   - ✅ Payment Notes ← NEW!

**If you DON'T see these fields:**
- Schema not deployed yet
- Wait 5 more minutes and refresh
- Check console for errors (F12)

---

## 📋 Step 4: Test Room Pricing

### A. Set Room Prices in Sanity
1. Open a room in Sanity Studio
2. Go to "3. Pricing" tab
3. **Set prices:**
   ```
   Display Price: 280
   Receipt Price: 300 (leave blank to use Display Price)
   Booking Price: (leave blank to use Display Price)
   ```
4. Click **Publish**

### B. Verify Price Shows on Website
1. Go to: `https://your-domain.com/rooms`
2. Find the room you edited
3. **Should show:** GH₵280 (Display Price)

---

## 🧾 Step 5: Test Receipt Generation

### A. Create or Find a Test Booking

**Option 1: Use Existing Booking**
1. Go to Sanity Studio → Bookings
2. Find any booking
3. Note: Booking Reference & Guest Email

**Option 2: Create New Test Booking**
1. Sanity Studio → Bookings → + Create
2. Fill in:
   ```
   Tab 1 - Guest Info:
     Guest Name: Test Guest
     Guest Email: test@example.com
     Guest Phone: 0244123456
   
   Tab 2 - Dates & Room:
     Room: [Select any room]
     Check-in: Today
     Check-out: Tomorrow
     
   Tab 3 - Pricing:
     Room Price Per Night: 280
     Total Price: 280
     Status: Confirmed
   
   Tab 4 - Payment:
     Payment Status: Paid in Full
     Amount Paid: 280
     Payment Method: Cash
   ```
3. Click **Publish**
4. Note the **Booking Reference** (e.g., MHL-12345678)

---

### B. Generate Receipt

**Visit receipt URL:**
```
https://your-domain.com/receipt?ref=BOOKING_REF&email=GUEST_EMAIL
```

**Example:**
```
https://your-domain.com/receipt?ref=MHL-12345678&email=test@example.com
```

---

### C. What to Check on Receipt

✅ **Room Rate Section:**
- Should show: "1 night @ GH₵280/night" (or whatever you set)
- Should NOT show: "0" or "NaN" or "Invalid"

✅ **Total Amount:**
- Should show: "GH₵280"
- Should match room price × nights

✅ **If Partial Payment:**
- Should show: "Amount Paid: GH₵XXX"
- Should show: "Balance Due: GH₵XXX"
- Should show payment method

✅ **Price Source Priority:**
The receipt should use prices in this order:
1. `roomPricePerNight` (stored in booking) ← Best
2. `room.receiptPrice` (if set in room)
3. `room.price` (Display Price)
4. Calculate from totalPrice ← Fallback

---

## 🐛 Troubleshooting

### Issue 1: "Changes not showing in Sanity Studio"

**Solution:**
```bash
# Clear browser cache
Ctrl+Shift+Delete (Windows)
Cmd+Shift+Delete (Mac)

# Hard refresh
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)

# Try incognito/private window
Ctrl+Shift+N (Windows)
Cmd+Shift+N (Mac)
```

### Issue 2: "Receipt shows GH₵0 or Invalid"

**Check:**
1. Does booking have `totalPrice` set? (required)
2. Does booking have `roomPricePerNight` set? (recommended)
3. Does room have `price` set? (required)
4. Are dates valid? (check-out > check-in)

**Fix:**
1. Edit booking in Sanity
2. Make sure `totalPrice` > 0
3. Set `roomPricePerNight` = nightly rate
4. Publish

### Issue 3: "Receipt shows wrong price"

**Possible causes:**
1. Room has `receiptPrice` set (it overrides display price)
2. Booking has old `roomPricePerNight` stored
3. Calculation fallback is being used

**Fix:**
1. Check room's "Receipt Price" field in Sanity
2. Update booking's `roomPricePerNight` to correct value
3. Publish changes

### Issue 4: "Partial payment not showing"

**Check:**
1. Is `amountPaid` > 0 in booking?
2. Is deployment complete?
3. Browser cache cleared?

**Fix:**
1. Edit booking
2. Set `amountPaid` to actual amount paid
3. Set `paymentStatus` to "Partial Payment"
4. Publish

### Issue 5: "Schema fields not appearing"

**This means deployment incomplete:**
1. Wait 5 more minutes
2. Check Vercel deployment status
3. Hard refresh Sanity Studio
4. Check browser console (F12) for errors
5. Try different browser

---

## 📊 Verification Checklist

**Before Testing:**
- [ ] Code pushed to GitHub (main branch)
- [ ] Vercel deployment triggered
- [ ] Deployment shows "Ready" status
- [ ] Browser cache cleared

**Sanity Studio:**
- [ ] Room schema shows new pricing fields
- [ ] Booking schema shows new payment fields
- [ ] Booking form has 5 tabs
- [ ] Can create new booking with payment info

**Room Pricing:**
- [ ] Can set Display Price
- [ ] Can set Receipt Price (optional)
- [ ] Can set Booking Price (optional)
- [ ] Prices save correctly

**Receipt Generation:**
- [ ] Receipt loads without errors
- [ ] Room rate shows correct price
- [ ] Total amount is correct
- [ ] Partial payment displays (if set)
- [ ] Balance calculation is correct
- [ ] Payment method shows (if set)

---

## 🎯 Quick Test Script

### 1-Minute Smoke Test

```bash
# 1. Check deployment
Visit: https://your-domain.com

# 2. Check Sanity Studio
Visit: https://your-domain.com/studio
- Open a room → Check for 4 pricing fields
- Open a booking → Check for 5 tabs

# 3. Test receipt
Visit: https://your-domain.com/receipt?ref=BOOKING_REF&email=EMAIL
- Check if price shows correctly
- Check if payment info shows (if set)
```

---

## 🔧 Force Schema Refresh

If Sanity Studio still doesn't show new fields:

### Option 1: Hard Refresh Studio
```
https://your-domain.com/studio?refresh=true
```

### Option 2: Clear Sanity Cache
1. F12 → Application → Storage
2. Clear Site Data
3. Reload

### Option 3: Redeploy Studio
```bash
cd lodge-app
npm run build
vercel --prod
```

---

## ✅ Success Criteria

You'll know everything is working when:

1. ✅ Sanity Studio shows all new fields
2. ✅ You can create bookings with payment info
3. ✅ Receipts show correct room prices
4. ✅ Partial payments display properly
5. ✅ Balance calculations are accurate

---

## 📞 Still Not Working?

If after following all steps you still don't see changes:

1. **Check Vercel deployment logs:**
   - Go to Vercel dashboard
   - Click on deployment
   - Check "Build Logs" for errors

2. **Check browser console:**
   - F12 → Console tab
   - Look for red errors
   - Take screenshot

3. **Verify Sanity connection:**
   ```
   Project ID: jyrzp1q7
   Dataset: production
   ```

4. **Test API directly:**
   ```
   https://your-domain.com/api/bookings/receipt
   ```
   (Should return 405 Method Not Allowed - that's OK)

---

**Expected Timeline:**
- Push to GitHub: Instant ✅
- Vercel rebuild: 2-3 minutes ⏱️
- Sanity Studio update: Instant after rebuild ✅
- Browser cache clear: Instant ✅
- **Total: 3-5 minutes** from push to working

---

**Current Status:**
- ✅ Code in GitHub
- ⏱️ Waiting for Vercel deployment
- ⏱️ Waiting for you to test

**Next Action: Deploy to Vercel NOW!**
