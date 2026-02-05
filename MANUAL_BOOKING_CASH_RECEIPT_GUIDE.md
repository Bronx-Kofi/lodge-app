# Manual Booking & Cash Receipt Guide

## 🎯 For Walk-In Guests Who Pay Cash

This guide shows you how to create a booking manually in the CMS and generate a receipt for guests who:
- Walk in without online booking
- Pay cash directly
- Don't use the online check-in form

---

## 📝 Step-by-Step: Create Manual Booking for Cash Payment

### **Step 1: Go to Sanity Studio**

Open your browser and go to:
```
https://your-domain.com/studio
```

Log in with your admin credentials.

---

### **Step 2: Create New Booking**

1. Click **"Bookings"** in the left menu
2. Click the **"+ Create"** button (top right)
3. You'll see 5 tabs:
   - **1. Guest Info** ← Start here
   - **2. Dates & Room**
   - **3. Pricing**
   - **4. Payment** ← Important for cash!
   - **5. Additional Info**

---

### **Step 3: Fill Guest Info Tab**

```
┌─────────────────────────────────────────────┐
│  TAB 1: GUEST INFO                          │
├─────────────────────────────────────────────┤
│                                             │
│ Booking Reference: MHL-12345678             │
│ (Auto-filled - you can edit if needed)     │
│                                             │
│ Guest Name: *                               │
│ └─> Enter: John Doe                        │
│                                             │
│ Guest Email: *                              │
│ └─> Enter: johndoe@email.com               │
│                                             │
│ Guest Phone: *                              │
│ └─> Enter: 0244123456                      │
│                                             │
│ Guest Nationality:                          │
│ └─> Enter: Ghana (or country)              │
│                                             │
│ Passport Number: (for international)       │
│ └─> Enter if available                     │
│                                             │
│ Ghana Card Number: (for locals)            │
│ └─> Enter: GHA-123456789-0                 │
│                                             │
└─────────────────────────────────────────────┘

* = Required field
```

Click **Next** or click **"2. Dates & Room"** tab

---

### **Step 4: Fill Dates & Room Tab**

```
┌─────────────────────────────────────────────┐
│  TAB 2: DATES & ROOM                        │
├─────────────────────────────────────────────┤
│                                             │
│ Room: *                                     │
│ └─> Select: Deluxe Suite (dropdown)        │
│                                             │
│ Check-in Date: *                            │
│ └─> Select: 2026-02-10                     │
│                                             │
│ Check-out Date: *                           │
│ └─> Select: 2026-02-12                     │
│                                             │
│ Number of Rooms: *                          │
│ └─> Enter: 1 (default)                     │
│                                             │
│ Number of Adults: *                         │
│ └─> Enter: 2                               │
│                                             │
│ Number of Children:                         │
│ └─> Enter: 0 (default)                     │
│                                             │
└─────────────────────────────────────────────┘
```

Click **"3. Pricing"** tab

---

### **Step 5: Fill Pricing Tab**

```
┌─────────────────────────────────────────────┐
│  TAB 3: PRICING                             │
├─────────────────────────────────────────────┤
│                                             │
│ Room Price Per Night (GH₵):                │
│ └─> Enter: 280                             │
│     (The nightly rate you're charging)     │
│                                             │
│ Total Price (GH₵): *                        │
│ └─> Enter: 560                             │
│     (280 × 2 nights = 560)                 │
│                                             │
│ Booking Status: *                           │
│ └─> Select: Confirmed                      │
│     (since guest is checking in)           │
│                                             │
└─────────────────────────────────────────────┘
```

Click **"4. Payment"** tab ← **MOST IMPORTANT!**

---

### **Step 6: Fill Payment Tab (Cash Payment)**

```
┌─────────────────────────────────────────────┐
│  TAB 4: PAYMENT  ← FOR CASH RECEIPT!        │
├─────────────────────────────────────────────┤
│                                             │
│ Payment Status:                             │
│ └─> Select: Paid in Full                   │
│     (since guest paid cash now)            │
│                                             │
│ Amount Paid (GH₵):                          │
│ └─> Enter: 560                             │
│     (full amount they paid in cash)        │
│                                             │
│ Payment Method:                             │
│ └─> Select: Cash                           │
│                                             │
│ Payment Reference/Transaction ID:           │
│ └─> Enter: Cash-2026-02-05                 │
│     (or any reference for your records)    │
│                                             │
│ Payment Notes:                              │
│ └─> Enter: "Paid in full on check-in.     │
│            Cash payment received."          │
│                                             │
└─────────────────────────────────────────────┘
```

---

### **Step 7: (Optional) Fill Additional Info**

```
┌─────────────────────────────────────────────┐
│  TAB 5: ADDITIONAL INFO                     │
├─────────────────────────────────────────────┤
│                                             │
│ Special Requests:                           │
│ └─> Enter any special requests             │
│                                             │
│ Receipt Number:                             │
│ └─> Enter: RCP-2026-001 (optional)         │
│                                             │
│ Receipt Issued:                             │
│ └─> Check if you want to mark it           │
│                                             │
│ (Other fields auto-filled)                 │
│                                             │
└─────────────────────────────────────────────┘
```

---

### **Step 8: Publish the Booking**

Click the **"Publish"** button (top right)

✅ Booking is now saved!

---

## 🧾 Step 9: Generate Receipt for Guest

Now that the booking is created, generate the receipt:

### **Option A: Direct Receipt URL**

Give the guest this URL:
```
https://your-domain.com/receipt?ref=MHL-12345678&email=johndoe@email.com
```

Replace:
- `MHL-12345678` = Booking Reference
- `johndoe@email.com` = Guest Email

### **Option B: Visa Receipt (Cleaner Format)**

```
https://your-domain.com/receipt/visa?ref=MHL-12345678&email=johndoe@email.com
```

---

## 📄 What the Receipt Shows

The guest will see:

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃        MIKY HILLSIDE LODGE             ┃
┃           RECEIPT                      ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Receipt Date: February 5, 2026

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GUEST INFORMATION

Name: John Doe
Email: johndoe@email.com
Phone: 0244123456
Nationality: Ghana

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BOOKING DETAILS

Booking Reference: MHL-12345678

Room: Deluxe Suite
Check-in: February 10, 2026
Check-out: February 12, 2026
Duration: 2 nights

Number of Guests: 2 Adults

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PAYMENT DETAILS

Room Rate:
2 nights @ GH₵280/night           GH₵ 560

Amount Paid:                       GH₵ 560 ✅
via Cash
Ref: Cash-2026-02-05

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ PAID IN FULL

Balance Due:                       GH₵ 0

Status: Payment Complete

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thank you for staying with us!
```

---

## 💡 Common Scenarios

### **Scenario 1: Guest Pays Full Amount in Cash**

```
Payment Status: Paid in Full
Amount Paid: 560 (full total)
Payment Method: Cash
Payment Reference: Cash-2026-02-05
Payment Notes: "Full payment received in cash on check-in"
```

**Receipt shows:** Balance Due: GH₵0 ✅

---

### **Scenario 2: Guest Pays Deposit in Cash, Balance Later**

```
Payment Status: Partial Payment
Amount Paid: 300 (deposit only)
Payment Method: Cash
Payment Reference: Cash-Deposit-2026-02-05
Payment Notes: "Deposit received. Balance of 260 due on checkout"
```

**Receipt shows:** Balance Due: GH₵260 ⚠️

When they pay the balance:
```
Update the same booking:
Payment Status: Paid in Full
Amount Paid: 560 (total paid)
Payment Notes: "Deposit: 300 (Cash-2026-02-05). Balance: 260 (Cash-2026-02-07). Total: 560"
```

---

### **Scenario 3: Multiple Rooms, Cash Payment**

```
TAB 2 - Dates & Room:
  Number of Rooms: 2
  
TAB 3 - Pricing:
  Room Price Per Night: 280
  Total Price: 1120 (280 × 2 nights × 2 rooms)
  
TAB 4 - Payment:
  Payment Status: Paid in Full
  Amount Paid: 1120
  Payment Method: Cash
```

**Receipt shows:** 
- 2 rooms × 2 nights @ GH₵280/night
- Total: GH₵1,120
- Paid: GH₵1,120 ✅

---

## 🎯 Quick Reference Card

**For Walk-In Cash Payments:**

1. **Sanity Studio** → Bookings → + Create
2. **Tab 1:** Guest name, email, phone
3. **Tab 2:** Room, check-in, check-out dates
4. **Tab 3:** Total price
5. **Tab 4:** 
   - Status: **Paid in Full**
   - Amount: **[Total amount]**
   - Method: **Cash**
   - Reference: **Cash-[Date]**
6. **Publish**
7. **Give guest receipt URL:**
   - `your-domain.com/receipt?ref=BOOKING_REF&email=GUEST_EMAIL`

---

## 📱 How to Share Receipt with Guest

### **Option 1: QR Code**
Generate a QR code for the receipt URL and print it.

### **Option 2: SMS**
Send guest a text message with the receipt link.

### **Option 3: Email**
Email the receipt link to the guest.

### **Option 4: WhatsApp**
Share the link via WhatsApp.

### **Option 5: Print**
Open the receipt URL, press Ctrl+P to print.

---

## ❓ FAQ

### **Q: Do I need to fill all fields?**
A: Only fields marked with * are required. Minimum:
- Guest name, email, phone
- Room
- Check-in/out dates
- Total price

### **Q: What if guest doesn't have email?**
A: Create a generic email like `walkin-[date]@mikyhillside.com` or use your office email.

### **Q: Can I edit the booking later?**
A: Yes! Open the booking and click Edit, make changes, then Publish.

### **Q: What if I make a mistake?**
A: Edit the booking, fix the error, and Publish again. Receipt updates automatically.

### **Q: How do I print the receipt?**
A: Open the receipt URL in browser, press Ctrl+P (or Cmd+P on Mac).

### **Q: Can guests access the receipt anytime?**
A: Yes! As long as they have the booking reference and email, they can view it.

---

## ✅ Checklist for Cash Walk-Ins

- [ ] Create new booking in Sanity Studio
- [ ] Fill guest information
- [ ] Select room and dates
- [ ] Enter total price
- [ ] Set payment status to "Paid in Full"
- [ ] Enter amount paid
- [ ] Select "Cash" as payment method
- [ ] Add payment reference
- [ ] Click Publish
- [ ] Generate receipt URL
- [ ] Give receipt to guest (print/SMS/email)

---

## 🎉 You're Done!

The booking is created, payment is recorded, and the guest has their receipt!

**Related Guides:**
- `START_HERE_PARTIAL_PAYMENTS.md` - For partial payments
- `PARTIAL_PAYMENT_RECEIPT_GUIDE.md` - Detailed payment scenarios
- `PRICING_AND_RECEIPT_FIXES_SUMMARY.md` - Technical details
