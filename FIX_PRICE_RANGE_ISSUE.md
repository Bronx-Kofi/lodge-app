# ✅ Fixed: Price Range Issue & Sanity Schema Errors

## 🔍 What Was Wrong

### Problem 1: Showing Price Ranges
Your site was showing: **"GH₵250 - GH₵350 per night"** instead of fixed prices

### Problem 2: Sanity CMS Errors
```
Encountered 2 fields that are not defined in the schema:
- priceMin: 250
- priceMax: 350
```

---

## ✅ What Was Fixed

### 1. Removed All Price Range Code
- ✅ Updated `lib/rooms/sanity-queries.ts` - removed `priceMin/priceMax` from queries
- ✅ Updated `lib/landing/sanity-queries.ts` - removed price range from featured rooms
- ✅ Updated `RoomCard.tsx` - now shows single price: "GH₵280 per night"
- ✅ Updated room detail page - removed price range display
- ✅ Updated `BookingWidget.tsx` - removed all price range calculation logic

### 2. Schema Now Uses Fixed Pricing
- ✅ Room schema has `price` field (single fixed price)
- ✅ Room schema has `receiptPrice` (optional override for receipts)
- ✅ Room schema has `bookingPrice` (optional override for bookings)
- ✅ NO more `priceMin` or `priceMax` fields

### 3. All Code Pushed to GitHub
Commit: `79f207a` - "fix: Remove all priceMin/priceMax references"

---

## 🚀 IMPORTANT: You Must Do These 3 Things Now

### Step 1: Clean Old Data from Sanity (5 minutes)

Your room documents in Sanity still have old `priceMin/priceMax` data. Clean it:

```bash
cd lodge-app

# Install tsx if you don't have it
npm install -D tsx

# Run the cleanup script
npx tsx scripts/clean-old-price-fields.ts
```

**What this does:**
- Finds all rooms with old `priceMin/priceMax` fields
- Removes those fields from each room
- Keeps your `price` field intact

**Expected output:**
```
🔍 Finding rooms with old price fields...

📋 Found 3 room(s) with old price fields:

   - Deluxe Suite
     Old: priceMin=250, priceMax=350
     New: price=280

   - Garden View Room
     Old: priceMin=200, priceMax=300
     New: price=250

🧹 Cleaning up old price fields...

✅ Cleaned: Deluxe Suite
✅ Cleaned: Garden View Room

✅ Cleanup complete!
```

---

### Step 2: Deploy to Vercel (3 minutes)

**Go to:** https://vercel.com/dashboard

1. Find your project
2. Click "Deployments" tab
3. Click **"Redeploy"** on latest deployment
4. Wait for ✅ Success (2-3 minutes)

---

### Step 3: Verify Everything Works (2 minutes)

**After deployment completes:**

#### A. Check Sanity Studio
```
https://your-domain.com/studio
```

1. Go to **Rooms**
2. Open any room
3. **The error should be GONE!** ✅
4. You should see clean pricing fields:
   - Display Price: 280
   - Receipt/Invoice Price: (optional)
   - Booking Widget Price: (optional)

#### B. Check Your Website
```
https://your-domain.com/rooms
```

**Should now show:**
- ✅ "GH₵280 per night" (single price)
- ❌ NOT "GH₵250 - GH₵350 per night"

#### C. Check Room Detail Page
```
https://your-domain.com/rooms/[room-slug]
```

**Should show:**
- ✅ "GH₵280 per night"
- ✅ Booking widget shows: "GH₵280 x 2 nights = GH₵560"
- ❌ NOT price ranges

---

## 📋 Quick Verification Checklist

**After all 3 steps:**
- [ ] Ran cleanup script - old fields removed
- [ ] Deployed to Vercel - build successful
- [ ] Sanity Studio - no schema errors
- [ ] Rooms page - shows single prices
- [ ] Room detail - shows fixed price
- [ ] Booking widget - calculates correctly
- [ ] Receipts - show correct prices

---

## 🎯 What You'll See After Fixes

### Before (Old - WRONG):
```
Room Listing:
  Deluxe Suite
  GH₵250 - GH₵350 per night  ❌

Room Detail:
  GH₵250 - GH₵350 per night  ❌
  
Booking Widget:
  Estimated Total: GH₵500 - GH₵700  ❌

Sanity Studio:
  ⚠️  Error: priceMin, priceMax not defined  ❌
```

### After (New - CORRECT):
```
Room Listing:
  Deluxe Suite
  GH₵280 per night  ✅

Room Detail:
  GH₵280 per night  ✅
  
Booking Widget:
  Total: GH₵560 (GH₵280 x 2 nights)  ✅

Sanity Studio:
  Display Price: 280  ✅
  No errors!  ✅
```

---

## 🔧 Troubleshooting

### Issue: "Cleanup script says 'No rooms found'"

**Good!** This means:
- Either your rooms already have the new schema
- OR you need to check if rooms exist in Sanity

**Solution:**
```bash
# Check if you have rooms
cd lodge-app
npx tsx -e "
import { client } from './sanity/lib/client.js';
client.fetch('*[_type == \"roomSimplified\"]{title, price, priceMin, priceMax}')
  .then(rooms => console.log(rooms))
  .catch(err => console.error(err));
"
```

---

### Issue: "Still seeing price ranges after deployment"

**Cause:** Browser cache

**Solution:**
1. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache completely
3. Try incognito/private window
4. Check on different device/browser

---

### Issue: "Sanity errors still showing"

**Cause:** Old data not cleaned yet

**Solution:**
1. Make sure you ran the cleanup script
2. Refresh Sanity Studio (Ctrl+Shift+R)
3. Check browser console (F12) for errors
4. Try different browser

---

### Issue: "Rooms show 'Contact for pricing'"

**Cause:** Room doesn't have `price` field set

**Solution:**
1. Go to Sanity Studio
2. Open the room
3. Tab 3: Pricing
4. Set **Display Price** (e.g., 280)
5. Click **Publish**

---

## 📝 How to Set Prices Going Forward

### In Sanity Studio:

**Basic Setup:**
```
Room: Deluxe Suite
Tab 3: Pricing

Display Price: 280
(This shows on website and receipts)

Leave other fields blank if same price everywhere.
```

**Advanced Setup (Different Prices):**
```
Display Price: 280
  (What guests see on website)

Receipt/Invoice Price: 300
  (What appears on official receipts)

Booking Widget Price: 250
  (Discounted price for online bookings)
```

**Priority:**
- Website shows: Display Price
- Booking uses: Booking Price → Display Price
- Receipt uses: Receipt Price → Display Price

---

## 🎉 Summary

### What Changed:
- ✅ No more price ranges
- ✅ Single fixed pricing per room
- ✅ Clean Sanity schema (no errors)
- ✅ Accurate price display everywhere
- ✅ Correct receipt calculations

### Files Modified:
- `lib/rooms/sanity-queries.ts` - Queries
- `lib/landing/sanity-queries.ts` - Featured rooms
- `app/(marketing)/rooms/_components/RoomCard.tsx` - Display
- `app/(marketing)/rooms/[slug]/page.tsx` - Detail page
- `app/(marketing)/rooms/[slug]/_components/BookingWidget.tsx` - Widget
- `scripts/clean-old-price-fields.ts` - Cleanup tool (NEW)

### Total Changes:
- 6 files modified
- 85 additions
- 51 deletions
- All price range code removed

---

## ⏱️ Timeline

| Step | Time | Status |
|------|------|--------|
| Fix code | Done | ✅ |
| Push to GitHub | Done | ✅ |
| Run cleanup script | 5 min | ⏱️ **DO THIS** |
| Deploy to Vercel | 3 min | ⏱️ **DO THIS** |
| Verify fixes | 2 min | ⏱️ **DO THIS** |
| **Total** | **10 min** | **⏱️** |

---

## 🚨 IMPORTANT: Do All 3 Steps!

The fixes are in your code, but you MUST:
1. ✅ Run cleanup script
2. ✅ Deploy to Vercel
3. ✅ Verify it works

**Don't skip the cleanup script!** Your Sanity database still has old data.

---

**Next Action: Run the cleanup script NOW!**

```bash
cd lodge-app
npx tsx scripts/clean-old-price-fields.ts
```
