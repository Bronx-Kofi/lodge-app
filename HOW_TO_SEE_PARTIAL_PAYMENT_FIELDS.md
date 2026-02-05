# How to See the New Partial Payment Fields

## ✅ The Schema Changes ARE in Your Code!

The new payment fields have been added to your code and pushed to GitHub. 
However, you need to **deploy your app** to see them in Sanity Studio.

## Why You Don't See Them Yet

Your Sanity Studio is part of your Next.js app (at `/studio`), not hosted separately.
This means:
- Schema changes are in your code ✓
- But you need to deploy/restart your app to see them

## 🚀 How to See the Changes

### Option 1: Deploy to Production (Recommended)

**If using Vercel:**
```bash
# Commit and push (already done!)
git push origin main

# Vercel will auto-deploy
# Wait 2-3 minutes
# Go to: https://your-domain.com/studio
```

**If using Netlify:**
```bash
# Trigger deployment
git push origin main

# Wait for build to complete
# Go to: https://your-domain.com/studio
```

### Option 2: Test Locally First

```bash
cd lodge-app

# Install dependencies (if needed)
npm install

# Start development server
npm run dev

# Open browser:
# http://localhost:3000/studio

# You should now see the new fields!
```

## 🔍 Where to Find the New Fields

Once deployed, go to your Sanity Studio:

1. **Open Studio:** `https://your-domain.com/studio`
2. **Go to:** Content → Bookings
3. **Open any booking**
4. **Scroll down** - You'll see new fields:

```
Payment Status: [Dropdown]
└─ Pending / Partial Payment / Paid in Full / Refunded

Amount Paid (GH₵): [Number input]

Payment Method: [Dropdown]
└─ Telecel Cash / MTN / Vodafone / Bank Transfer / Cash / Card / Other

Payment Reference/Transaction ID: [Text input]

Payment Notes: [Text area]
```

## ✅ Verify Schema Changes

To confirm the changes are in your code:

```bash
cd lodge-app
grep -A5 "amountPaid" sanity/schemas/documents/booking.ts
```

You should see:
```typescript
defineField({
  name: 'amountPaid',
  title: 'Amount Paid (GH₵)',
  type: 'number',
  description: 'Amount already paid (for partial payments or deposits)',
  validation: (Rule) => Rule.min(0),
}),
```

## 🐛 Troubleshooting

### Issue: "I deployed but still don't see the fields"

**Solution:**
1. Clear your browser cache (Ctrl+Shift+Delete)
2. Hard refresh the studio page (Ctrl+Shift+R)
3. Log out and log back into Sanity Studio
4. Check browser console for errors

### Issue: "Fields show but values don't save"

**Solution:**
1. Check that you clicked **Publish** (not just Save)
2. Verify no validation errors in the form
3. Check browser console for API errors

### Issue: "Receipt doesn't show payment info"

**Solution:**
1. Verify the booking has `amountPaid` filled in
2. Check that booking is published
3. Clear receipt page cache
4. Verify receipt API is fetching the new fields

## 📝 Quick Test Checklist

After deployment:

- [ ] Can access Sanity Studio
- [ ] Can see new payment fields in booking
- [ ] Can enter values in payment fields
- [ ] Can save and publish booking
- [ ] Receipt page shows payment information
- [ ] Balance calculation is correct

## 🎯 Next Steps After Deployment

1. **Open any existing booking**
2. **Add test payment:**
   - Payment Status: `Partial Payment`
   - Amount Paid: `500`
   - Payment Method: `Telecel Cash`
   - Payment Reference: `TEST123`
   - Payment Notes: `Test partial payment`
3. **Click Publish**
4. **Generate receipt** for that booking
5. **Verify** payment info appears on receipt

## 💡 Remember

The changes are **already in your GitHub repository**.
You just need to **deploy** to see them live!

---

**Files Modified:**
- ✅ sanity/schemas/documents/booking.ts
- ✅ app/api/bookings/receipt/route.ts
- ✅ app/(marketing)/receipt/page.tsx
- ✅ app/(marketing)/receipt/visa-receipt.tsx

All committed and pushed! 🎉
