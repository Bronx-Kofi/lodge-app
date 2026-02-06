# 🧪 Test Receipt Pricing - Simple Guide

## The Problem You're Experiencing

**"Receipts don't show actual room prices"**

This happens because:
1. ✅ Code is in GitHub - DONE
2. ❌ Code NOT deployed to live site yet - **YOU NEED TO DO THIS**
3. ❌ Sanity Studio needs refresh after deployment

---

## 🚀 Quick Fix (3 Steps - 5 Minutes)

### Step 1: Deploy to Vercel (2 minutes)

**Go to:** https://vercel.com/dashboard

**Find your project** → Click it

**Click:** "Deployments" tab

**Click:** "Redeploy" button on the latest deployment

**Wait for:** ✅ Success message (2-3 minutes)

---

### Step 2: Clear Browser Cache (30 seconds)

**Press:**
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

**Or use Incognito mode:**
- Windows: `Ctrl + Shift + N`
- Mac: `Cmd + Shift + N`

---

### Step 3: Test Receipt (1 minute)

**Go to Sanity Studio:**
```
https://your-domain.com/studio
```

**Open any booking** → Note booking reference and email

**Visit receipt:**
```
https://your-domain.com/receipt?ref=BOOKING_REF&email=GUEST_EMAIL
```

**Check:**
- ✅ Room rate shows a number (not 0 or blank)
- ✅ Total amount shows correctly
- ✅ If payment recorded, balance shows

---

## 🎯 What Fixed the Problem

### Before (Old Code):
```typescript
// Receipt calculated price WRONG way:
const pricePerNight = totalPrice / nights / rooms;
// Result: If totalPrice wrong, everything wrong!
```

### After (New Code):
```typescript
// Receipt uses ACTUAL room price:
const pricePerNight = 
  booking.roomPricePerNight ||  // 1. Stored rate (best!)
  room.receiptPrice ||           // 2. Receipt override
  room.price ||                  // 3. Display price
  (totalPrice / nights / rooms); // 4. Calculate (fallback)
// Result: Always shows correct price!
```

---

## 📋 Full Changes Summary

### 1. Room Schema - Added 3 Pricing Fields

**Old:**
- Only `price` field

**New:**
- `price` = Display Price (website)
- `receiptPrice` = Receipt Price (optional override) ← NEW!
- `bookingPrice` = Booking Price (optional override) ← NEW!
- `pricingNotes` = Internal notes ← NEW!

### 2. Booking Schema - Added Payment Tracking

**Old:**
- Only `totalPrice` and `paymentStatus`

**New:**
- `roomPricePerNight` = Stored nightly rate ← NEW!
- `amountPaid` = Amount paid ← NEW!
- `paymentMethod` = How they paid ← NEW!
- `paymentReference` = Transaction ID ← NEW!
- `paymentNotes` = Payment notes ← NEW!

### 3. Receipt API - Fetches All Price Fields

**Now fetches:**
- `room.price`
- `room.receiptPrice` ← NEW!
- `room.bookingPrice` ← NEW!
- `booking.roomPricePerNight` ← NEW!
- All payment fields ← NEW!

### 4. Receipt Display - Shows Correct Prices

**Before:**
- Calculated from total (often wrong)

**After:**
- Uses stored `roomPricePerNight` (accurate!)
- Fallback to room price if needed
- Shows partial payments
- Shows balance due

---

## 🔍 How to Verify It's Working

### Test 1: Check Sanity Studio (After Deployment)

1. Go to: `https://your-domain.com/studio`
2. Open any **Room**
3. Go to **"3. Pricing"** tab
4. **You should see 4 fields:**
   - Display Price ✓
   - Receipt/Invoice Price ✓ ← NEW!
   - Booking Widget Price ✓ ← NEW!
   - Pricing Notes ✓ ← NEW!

5. Open any **Booking**
6. **You should see 5 tabs:**
   - 1. Guest Info
   - 2. Dates & Room
   - 3. Pricing
   - 4. Payment ← NEW TAB!
   - 5. Additional Info

7. Click **"4. Payment"** tab
8. **You should see:**
   - Payment Status (with "Partial Payment" option)
   - Amount Paid (GH₵)
   - Payment Method (dropdown with Cash, Telecel, etc.)
   - Payment Reference
   - Payment Notes

**If you DON'T see these → Deployment not complete yet!**

---

### Test 2: Check Receipt Displays Prices

**Create test booking:**
1. Sanity Studio → Bookings → + Create
2. Fill in guest info
3. Select room & dates
4. Set: Total Price = 560, Room Price Per Night = 280
5. Publish
6. Note booking reference

**View receipt:**
```
https://your-domain.com/receipt?ref=BOOKING_REF&email=EMAIL
```

**Should show:**
```
Room Rate:
2 nights @ GH₵280/night     GH₵560
                            -------
Total Amount:               GH₵560
```

**Should NOT show:**
- GH₵0
- NaN
- Invalid
- Blank/empty

---

### Test 3: Check Partial Payments Work

**Edit the same booking:**
1. Go to Tab 4: Payment
2. Set:
   - Payment Status: Partial Payment
   - Amount Paid: 300
   - Payment Method: Cash
   - Payment Reference: CASH-TEST
3. Publish

**Refresh receipt page**

**Should NOW show:**
```
Room Rate:
2 nights @ GH₵280/night     GH₵560

Amount Paid:                GH₵300
via Cash
Ref: CASH-TEST

Balance Due:                GH₵260
Status: Partial Payment Received
```

---

## ⚠️ Common Issues & Solutions

### Issue: "I don't see new fields in Sanity Studio"

**Cause:** Deployment not complete or browser cache

**Solution:**
1. Check Vercel - is deployment "Ready"?
2. Wait 2 more minutes
3. Hard refresh: Ctrl+Shift+R
4. Try incognito window
5. Check different browser

---

### Issue: "Receipt still shows GH₵0"

**Cause:** Booking doesn't have prices set

**Solution:**
1. Open booking in Sanity
2. Check: Total Price > 0
3. Set: Room Price Per Night = actual nightly rate
4. Publish
5. Refresh receipt

---

### Issue: "Receipt shows wrong price"

**Possible causes:**
1. Room has Receipt Price override set
2. Booking has old stored price

**Solution:**
1. Check room → Pricing tab → Receipt Price field
   - If set, that's what receipt uses
   - Leave blank to use Display Price
2. Update booking → Room Price Per Night = correct amount
3. Publish

---

### Issue: "Changes deployed but still not showing"

**Nuclear option:**
1. Clear ALL browser data:
   - F12 → Application → Clear Storage → Clear site data
2. Close browser completely
3. Reopen in incognito
4. Visit studio again

---

## 📊 Verification Checklist

**Code:**
- [x] Pushed to GitHub ✅
- [ ] Deployed to Vercel ⏱️ **← YOU NEED TO DO THIS**
- [ ] Browser cache cleared ⏱️

**Sanity Studio:**
- [ ] Room shows 4 pricing fields
- [ ] Booking shows 5 tabs
- [ ] Can see payment fields in Tab 4

**Receipts:**
- [ ] Shows actual room price (not 0)
- [ ] Total calculates correctly
- [ ] Partial payments display
- [ ] Balance calculation works

---

## 🎉 Success Looks Like

**Sanity Studio - Room:**
```
3. PRICING

Display Price (GH₵/night): 280
Receipt/Invoice Price (GH₵/night): [Optional]
Booking Widget Price (GH₵/night): [Optional]
Pricing Notes (Internal): [Optional]
```

**Sanity Studio - Booking:**
```
4. PAYMENT

Payment Status: Partial Payment
Amount Paid (GH₵): 300
Payment Method: Cash
Payment Reference: CASH-2026-02-05
Payment Notes: Deposit received
```

**Receipt Page:**
```
MIKY HILLSIDE LODGE - RECEIPT

Room Rate:
2 nights @ GH₵280/night         GH₵560

Amount Paid:                     GH₵300 ✅
via Cash

Balance Due:                     GH₵260 ⚠️
```

---

## 🚀 DO THIS NOW

**Priority 1:** Deploy to Vercel
- Go to: https://vercel.com/dashboard
- Click: Redeploy
- Wait: 2-3 minutes

**Priority 2:** Test
- Clear browser cache
- Open Sanity Studio
- Check for new fields

**Priority 3:** Create test booking
- Set all prices correctly
- Generate receipt
- Verify prices show

---

## ⏱️ Timeline

| Step | Time | Status |
|------|------|--------|
| Code to GitHub | Done | ✅ |
| Deploy to Vercel | 2-3 min | ⏱️ **DO THIS** |
| Clear cache | 10 sec | ⏱️ |
| Test Sanity | 1 min | ⏱️ |
| Test receipt | 1 min | ⏱️ |
| **Total** | **5 min** | **⏱️** |

---

**NEXT ACTION: Go to Vercel and click "Redeploy"!**

Then come back and check Sanity Studio for the new fields.
