# ⚡ Quick Test Guide - 5 Minutes

## 🎯 Fast Testing After Deployment

Once your site is live, run these quick tests to verify everything works.

---

## ✅ 5-Minute Test (Essential)

### 1. Homepage (30 seconds)
```
✓ Visit: https://mikyhillsidelodge.com
✓ Page loads
✓ Images display
✓ Navigation works
```

### 2. Rooms Page (30 seconds)
```
✓ Visit: https://mikyhillsidelodge.com/rooms
✓ Rooms list displays
✓ Room images load
✓ Click on a room
```

### 3. Booking Widget (1 minute)
```
✓ Select check-in date (tomorrow)
✓ Select check-out date (day after)
✓ Price displays
✓ Click "Book Now"
```

### 4. Booking Form (1 minute)
```
✓ Form opens
✓ Fill in test data:
  Name: Test Guest
  Email: test@example.com
  Phone: +233123456789
  Nationality: Ghana
  Passport: G1234567
✓ Submit form
✓ Confirmation shows
```

### 5. Receipt Test (2 minutes) ⭐ **MOST IMPORTANT**
```
✓ Click receipt link
✓ Standard receipt loads
✓ Click "Visa Application Version"
✓ Visa receipt opens in new tab
✓ Check these are present:
  - "OFFICIAL DOCUMENT" header
  - "TO WHOM IT MAY CONCERN" statement
  - Guest passport number
  - "CONFIRMED AND GUARANTEED" status
  - Lodge stamp/seal
  - Contact information
✓ Click "Download PDF"
✓ PDF saves
✓ Open PDF and verify it looks professional
```

### 6. Sanity Studio (30 seconds)
```
✓ Visit: https://mikyhillsidelodge.com/studio
✓ Studio loads
✓ Login works
✓ Can see content
```

---

## 📱 Mobile Test (2 minutes)

```
✓ Open site on phone
✓ Homepage displays correctly
✓ Menu opens
✓ Navigate to rooms
✓ Booking widget works
✓ Receipt displays well
```

---

## 🎉 If All Tests Pass

**You're ready to:**
1. Send receipt link to your guest
2. Accept real bookings
3. Announce your launch

---

## 🆘 If Any Test Fails

**Check:**
1. Environment variables in Vercel
2. Sanity CORS settings
3. Browser console for errors
4. DNS propagation status

**Read:** `POST_DEPLOYMENT_CHECKLIST.md` for detailed troubleshooting

---

## ✅ Quick Checklist

- [ ] Homepage loads
- [ ] Rooms display
- [ ] Booking form works
- [ ] Receipt generates
- [ ] **Visa receipt has all visa information**
- [ ] **PDF downloads successfully**
- [ ] Mobile works
- [ ] Studio accessible

**All checked? You're live! 🚀**
