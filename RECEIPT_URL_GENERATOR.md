# 📄 Receipt URL Generator Guide

## Quick Receipt URL Builder

After creating a booking in Sanity CMS, use this template to generate the receipt URL:

---

## 🔗 URL Template

### **Standard Receipt:**
```
https://your-domain.com/receipt?ref=BOOKING_REF&email=GUEST_EMAIL
```

### **Visa Receipt (Recommended):**
```
https://your-domain.com/receipt/visa?ref=BOOKING_REF&email=GUEST_EMAIL
```

---

## 📋 Step-by-Step

### 1. Get Booking Information from Sanity

After creating a booking, note:
- ✅ Booking Reference: `MHL-12345678`
- ✅ Guest Email: `john@example.com`

### 2. Build the Receipt URL

Replace the placeholders:
```
Original:
https://your-domain.com/receipt/visa?ref=BOOKING_REF&email=GUEST_EMAIL

Your Receipt URL:
https://your-domain.com/receipt/visa?ref=MHL-12345678&email=john@example.com
```

### 3. Share with Guest

Copy the URL and send via:
- 📱 SMS
- 💬 WhatsApp
- 📧 Email
- 📄 Print it

---

## 💡 Quick Reference Table

| What You Need | Where to Find It |
|---------------|------------------|
| Booking Reference | Sanity Studio → Booking → bookingReference field |
| Guest Email | Sanity Studio → Booking → guestEmail field |
| Your Domain | Your website URL (e.g., mikyhillside.com) |

---

## 📝 Example Scenarios

### Example 1: Walk-In Cash Payment
```
Created in CMS:
- Reference: MHL-87654321
- Guest Email: sarah@email.com
- Paid: GH₵560 cash

Receipt URL:
https://your-domain.com/receipt/visa?ref=MHL-87654321&email=sarah@email.com

Send to guest via WhatsApp ✅
```

### Example 2: Phone Booking
```
Created in CMS:
- Reference: MHL-11223344
- Guest Email: mike@email.com
- Paid: GH₵300 deposit (Telecel)

Receipt URL:
https://your-domain.com/receipt/visa?ref=MHL-11223344&email=mike@email.com

Shows deposit + balance due ✅
```

### Example 3: Agency Booking
```
Created in CMS:
- Reference: MHL-99887766
- Guest Email: travel@agency.com
- Paid: Full amount

Receipt URL:
https://your-domain.com/receipt/visa?ref=MHL-99887766&email=travel@agency.com

Email to agency for records ✅
```

---

## 🎯 WhatsApp Message Template

Copy and customize:

```
✅ *Booking Confirmed* - Miky Hillside Lodge

*Booking Reference:* MHL-12345678
*Guest:* John Doe
*Dates:* Feb 10-12, 2026
*Room:* Executive Hillside Suite
*Total:* GH₵1,000
*Paid:* GH₵500
*Balance:* GH₵500

📄 *Official Receipt:*
https://your-domain.com/receipt/visa?ref=MHL-12345678&email=john@example.com

_Thank you for choosing Miky Hillside Lodge!_
📞 Contact: [Your Phone]
```

---

## 📧 Email Template

Subject: Booking Confirmation - Miky Hillside Lodge

```
Dear [Guest Name],

Your booking at Miky Hillside Lodge is confirmed!

📋 BOOKING DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Booking Reference: MHL-12345678
Check-in: February 10, 2026 (from 2:00 PM)
Check-out: February 12, 2026 (until 12:00 PM)
Room: Executive Hillside Suite
Guests: 2 Adults

💰 PAYMENT SUMMARY:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Amount: GH₵1,000
Amount Paid: GH₵500
Balance Due: GH₵500

📄 VIEW YOUR OFFICIAL RECEIPT:
━━━━━━━━━━━━━━━━━━━━━━━━━━
https://your-domain.com/receipt/visa?ref=MHL-12345678&email=guest@example.com

This receipt is suitable for visa applications and expense reports.

Looking forward to welcoming you!

Best regards,
Miky Hillside Lodge Team

━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Sunyani-Dumasua, Bono Region
📞 [Your Phone]
🌐 [Your Website]
```

---

## 🖨️ How to Print Receipt

1. **Open Receipt URL** in browser
2. **Press Ctrl+P** (Windows) or **Cmd+P** (Mac)
3. Choose:
   - Print to printer
   - Save as PDF
4. **Give to guest**

---

## 📱 Create QR Code for Receipt

1. Go to: https://www.qr-code-generator.com/
2. Select "URL"
3. Paste receipt URL
4. Download QR code
5. Add to printed materials

**Guest scans QR → Views receipt instantly!**

---

## ⚡ Speed Tips

### Create Bookmarklets

**Bookmark 1 - Receipt Generator:**
```javascript
javascript:void(function(){var ref=prompt('Booking Reference:');var email=prompt('Guest Email:');if(ref&&email){window.open('https://your-domain.com/receipt/visa?ref='+ref+'&email='+email)}})();
```

**How to use:**
1. Create bookmark in browser
2. Paste code above as URL
3. Click bookmark when needed
4. Enter ref + email
5. Receipt opens automatically!

---

## 🔍 Troubleshooting

### Issue: "Receipt shows 'Invalid booking data'"

**Cause:** Booking has no totalPrice or roomPricePerNight set

**Fix:**
1. Go to Sanity Studio
2. Open the booking
3. Tab 3: Set Total Price
4. Tab 3: Set Room Price Per Night
5. Publish
6. Refresh receipt

### Issue: "Receipt not found"

**Cause:** Wrong booking reference or email

**Fix:**
1. Double-check booking reference in Sanity
2. Double-check guest email (case-sensitive)
3. Make sure booking is Published
4. Try both receipt URLs (regular and visa)

### Issue: "Guest can't access receipt"

**Fix:**
1. Test URL yourself first
2. Check if deployment is live
3. Verify URL is correct
4. Send via different method (SMS/WhatsApp/Email)

---

## ✅ Checklist

After creating CMS booking:
- [ ] Booking is Published
- [ ] Note booking reference
- [ ] Note guest email
- [ ] Build receipt URL
- [ ] Test URL yourself
- [ ] Send to guest via WhatsApp/SMS/Email
- [ ] Confirm guest received it

---

## 🎉 Quick Summary

**To get receipt after creating booking in CMS:**

1. **Create booking** in Sanity Studio
2. **Note** booking ref + email
3. **Build URL:** 
   ```
   your-domain.com/receipt/visa?ref=REF&email=EMAIL
   ```
4. **Share** with guest
5. **Done!** ✅

**That's it!**
