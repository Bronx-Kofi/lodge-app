# Professional Receipt System - User Guide

## Overview

Your lodge now has a **professional online receipt system** that generates official reservation receipts suitable for:
- ✈️ **International visa applications**
- 💼 **Business expense reports**
- 📁 **Guest record keeping**
- 🌍 **Immigration documentation**

---

## Features

### ✅ What's Included

1. **Professional Receipt Page**
   - Official lodge letterhead with branding
   - Unique receipt number for accounting
   - Complete guest information section
   - Detailed reservation breakdown
   - Pricing summary
   - Check-in/check-out instructions
   - Print-optimized design

2. **Visa-Ready Format**
   - International standard layout
   - Optional passport number field
   - Nationality field
   - Official confirmation statement
   - All dates and prices clearly displayed

3. **Easy Access**
   - Automatic link on confirmation page
   - Direct access via booking reference
   - Print or save as PDF
   - Share via email or WhatsApp

---

## How It Works

### For Guests

#### Step 1: Make a Booking
When a guest completes a booking, they receive a confirmation page with their booking reference.

#### Step 2: Access Receipt
On the confirmation page, guests will see a blue button:
**"View & Print Receipt"**

#### Step 3: Download/Print
- Clicking the button opens the professional receipt in a new tab
- Guests can print directly (Ctrl+P / Cmd+P)
- Or save as PDF for digital records

### For International Guests Requiring Visas

International guests can provide **optional information** during booking:
- **Nationality**: Their country of citizenship
- **Passport Number**: For official documentation

This information will appear on their receipt, making it suitable for visa applications.

---

## Receipt Information

Each receipt includes:

### Header Section
- Lodge name and branding
- Lodge address and contact information
- Unique receipt number (RCP-XXXXXX)
- Issue date

### Guest Information
- Full name
- Email address
- Phone number
- Nationality (if provided)
- Passport number (if provided)
- Booking reference

### Reservation Details
- Room type and description
- Check-in date and time (2:00 PM)
- Check-out date and time (12:00 PM)
- Number of nights
- Number of guests (adults/children)
- Booking status
- Special requests

### Pricing Summary
- Room rate per night
- Total nights
- **Total amount in GH₵**
- Payment status

### Important Information
- Check-in/check-out policies
- Cancellation policy
- Contact information
- Visa application notice

---

## How to Update Information in Sanity Studio

### Adding Nationality & Passport (for visa receipts)

You can add this information to existing bookings:

1. Open Sanity Studio: `https://your-domain.com/studio`
2. Navigate to **"Bookings"**
3. Select the booking
4. Scroll to find:
   - **Guest Nationality** field
   - **Passport Number** field (optional)
5. Fill in the information
6. Click **Publish**

The receipt will automatically include this information when accessed.

---

## Guest Instructions

### How Guests Access Their Receipt

**Method 1: From Confirmation Page**
1. After booking, guests land on confirmation page
2. Look for the blue "View & Print Receipt" button
3. Click to open receipt in new tab

**Method 2: Via Direct Link**
If guests have their booking reference and email:
```
https://your-domain.com/receipt?reference=MHL-123456ABC&email=guest@example.com
```

### How to Print

**Desktop/Laptop:**
1. Open the receipt page
2. Click "Print Receipt" button OR press `Ctrl+P` (Windows) / `Cmd+P` (Mac)
3. Select printer or "Save as PDF"
4. Print or save

**Mobile:**
1. Open the receipt page
2. Tap the browser menu (three dots)
3. Select "Print"
4. Choose printer or "Save as PDF"

---

## For Visa Applications

### What Makes This Receipt Visa-Ready?

✅ **Official Format**: Professional letterhead with lodge details  
✅ **Complete Information**: All required booking details  
✅ **Guest Identification**: Name, passport number, nationality  
✅ **Dates Clearly Stated**: Check-in and check-out dates  
✅ **Financial Details**: Total cost and payment status  
✅ **Contact Verification**: Lodge contact information for embassy verification  
✅ **Unique Reference**: Receipt and booking reference numbers  

### Typical Visa Requirements Met

Most embassies require proof of accommodation showing:
- ✅ Guest full name (as in passport)
- ✅ Passport number
- ✅ Dates of stay
- ✅ Accommodation address
- ✅ Contact details for verification
- ✅ Payment confirmation

**All of these are included in your receipt!**

---

## WhatsApp Integration

Guests can contact you directly from the confirmation page via WhatsApp with their booking reference pre-filled.

**Auto-generated message:**
```
Hello! I have a booking: MHL-123456ABC
```

This makes it easy for:
- Receipt requests
- Booking modifications
- Special requests
- Visa support letters

---

## Tracking Receipt Generation

### In Sanity Studio

Each booking now tracks:
- **Receipt Number**: Unique identifier (auto-generated)
- **Receipt Issued**: Boolean flag when first accessed
- **Receipt Issued Date**: Timestamp of first generation

This helps you:
- Track which guests have accessed receipts
- Monitor receipt usage for accounting
- Identify guests who may need help

---

## Technical Details

### Receipt Number Format
```
RCP-[booking-suffix]-[timestamp]
Example: RCP-123456-567890
```

### API Endpoints

**Generate/View Receipt:**
```
POST /api/bookings/receipt
Body: { email, bookingReference }
```

**Access Receipt Page:**
```
GET /receipt?reference=[REF]&email=[EMAIL]
```

### Database Schema

New fields added to `booking` schema:
- `nationality` (string, optional)
- `passportNumber` (string, optional)
- `receiptNumber` (string, auto-generated)
- `receiptIssued` (boolean)
- `receiptIssuedAt` (datetime)

---

## Best Practices

### For Lodge Staff

1. **Encourage International Guests**: Ask international guests to provide nationality and passport number during booking
2. **Verify Information**: Double-check passport numbers are correct
3. **Update Status**: Mark bookings as "confirmed" in Sanity Studio after receipt is issued
4. **Provide Support**: Be ready to help guests access and print receipts

### For Guests

1. **Save Immediately**: Download/print receipt right after booking
2. **Check Details**: Verify all information is correct
3. **Keep Safe**: Store digital and physical copies
4. **Contact Early**: Reach out if any corrections needed

---

## Troubleshooting

### Guest Can't Access Receipt

**Problem**: "Receipt not found" error

**Solutions**:
1. Verify email address matches booking email exactly
2. Check booking reference is correct (case-sensitive)
3. Ensure booking exists in Sanity Studio
4. Try accessing from confirmation page link

### Receipt Doesn't Print Correctly

**Problem**: Colors missing or layout broken

**Solutions**:
1. Use "Print" button on receipt page (not browser print directly from confirmation)
2. In print dialog, ensure "Background graphics" is enabled
3. Try different browser (Chrome recommended)
4. Use "Save as PDF" then print PDF

### Missing Information

**Problem**: Nationality or passport number not showing

**Solutions**:
1. Guest didn't provide during booking (add in Sanity Studio)
2. Update booking in Studio and refresh receipt
3. Contact guest to collect information

---

## Adding Nationality & Passport to Booking Form (Optional)

Currently, guests can book without providing nationality/passport, and you can add this info in Sanity Studio later. But if you want guests to provide this during booking:

### Option 1: Simple (No Code Changes)
Update the "Special Requests" field label:
```
Special Requests (Optional)
International guests: Please include your nationality and passport number if you need this receipt for visa purposes.
```

### Option 2: Add Dedicated Form Fields
Edit `app/(marketing)/rooms/[slug]/_components/BookingWidget.tsx` and add:

```typescript
// Add to state
const [nationality, setNationality] = useState('');
const [passportNumber, setPassportNumber] = useState('');

// Add to form (after special requests)
<div>
  <label className="block text-sm font-medium text-neutral-700 mb-2">
    Nationality (Optional - for visa receipts)
  </label>
  <input
    type="text"
    value={nationality}
    onChange={(e) => setNationality(e.target.value)}
    placeholder="e.g., United States"
    className="w-full px-4 py-3 border border-neutral-300 rounded-lg"
  />
</div>

<div>
  <label className="block text-sm font-medium text-neutral-700 mb-2">
    Passport Number (Optional - for visa receipts)
  </label>
  <input
    type="text"
    value={passportNumber}
    onChange={(e) => setPassportNumber(e.target.value)}
    placeholder="e.g., A12345678"
    className="w-full px-4 py-3 border border-neutral-300 rounded-lg"
  />
</div>

// Include in booking data
nationality: nationality.trim(),
passportNumber: passportNumber.trim(),
```

---

## Future Enhancements

Potential additions you might want:
- Email receipt automatically to guest
- SMS receipt link
- Multi-language receipts
- QR code for verification
- Digital signature
- Custom branding per booking

---

## Support

**For Technical Issues:**
- Check Sanity Studio for booking data
- Review browser console for errors
- Test with different browsers

**For Guest Support:**
- Provide direct receipt link via WhatsApp
- Offer to email receipt manually
- Generate screenshot if needed

---

## Summary

✅ **Receipt system is live and ready to use**  
✅ **Automatically accessible after every booking**  
✅ **Visa-ready format for international guests**  
✅ **Print-optimized professional design**  
✅ **Tracked in Sanity Studio for accounting**

Your guests now have a professional, official receipt system suitable for visa applications and business use!
