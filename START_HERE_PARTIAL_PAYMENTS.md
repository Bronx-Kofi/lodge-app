# ✅ PARTIAL PAYMENTS - QUICK START

## What Can You Do Now?

✅ **Record partial payments (deposits)**
✅ **Track payment methods and references**
✅ **Generate receipts showing balance due**
✅ **Support multiple payment installments**
✅ **Accept any payment method**

---

## 🚀 How to Record a Partial Payment (3 Steps)

### Step 1: Open Booking in Sanity CMS
Go to **Bookings** → Find the booking → Open it

### Step 2: Fill Payment Fields
```
Payment Status: ▼ Select "Partial Payment"
Amount Paid (GH₵): [Enter amount] e.g., 500
Payment Method: ▼ Select method (Telecel, MTN, Bank, Cash, etc.)
Payment Reference: [Transaction ID] e.g., MP12345678
Payment Notes: [Optional notes] e.g., "Deposit - balance due on arrival"
```

### Step 3: Save & Done!
Click **Publish** → Receipt automatically shows payment info

---

## 📄 What the Receipt Shows

### Before Recording Payment:
```
┌─────────────────────────────────────┐
│ Total Amount: GH₵1,000              │
│ Payment Status: Reservation Confirmed│
└─────────────────────────────────────┘
```

### After Recording GH₵500 Deposit:
```
┌─────────────────────────────────────┐
│ Total Amount: GH₵1,000              │
│                                     │
│ Amount Paid: GH₵500                 │
│ via Telecel Cash                    │
│ Ref: MP12345678                     │
│                                     │
│ ⚠️  Balance Due: GH₵500             │
│ Status: Partial Payment Received    │
└─────────────────────────────────────┘
```

### After Full Payment:
```
┌─────────────────────────────────────┐
│ Total Amount: GH₵1,000              │
│                                     │
│ Amount Paid: GH₵1,000               │
│ via Bank Transfer                   │
│ Ref: TRF789456                      │
│                                     │
│ ✅ Status: Paid in Full             │
│ Balance Due: GH₵0                   │
└─────────────────────────────────────┘
```

---

## 💡 Common Scenarios

### Scenario 1: 50% Deposit
```
Booking Total: GH₵2,000
Guest pays: GH₵1,000 via Telecel

Enter in CMS:
→ Payment Status: Partial Payment
→ Amount Paid: 1000
→ Payment Method: Telecel Cash
→ Payment Reference: [Transaction ID]
→ Payment Notes: "50% deposit. Balance on check-in"
```

### Scenario 2: Multiple Payments
```
Booking Total: GH₵2,000

1st Payment: GH₵500 via Telecel
→ Amount Paid: 500
→ Notes: "First installment"

2nd Payment: GH₵800 via Bank Transfer
→ Amount Paid: 1300 (total paid so far!)
→ Notes: "1st: 500 Telecel, 2nd: 800 Bank. Total: 1300"

3rd Payment: GH₵700 Cash on arrival
→ Amount Paid: 2000
→ Payment Status: Paid in Full
→ Notes: "Balance paid in cash on check-in"
```

### Scenario 3: Different Payment Methods
```
Guest pays in 2 parts:
- GH₵600 via MTN
- GH₵400 via Cash

Enter:
→ Amount Paid: 1000 (total)
→ Payment Method: Other (or primary method)
→ Payment Notes: "MTN: 600 (MP123), Cash: 400"
```

---

## 🎯 Quick Tips

### ✅ DO:
- **Enter TOTAL amount paid** (not just the latest payment)
- **Record transaction IDs** for mobile money payments
- **Use Payment Notes** for details about installments
- **Update Payment Status** to "Paid in Full" when complete
- **Click Publish** after every update

### ❌ DON'T:
- Don't add amounts - always enter the total paid
- Don't forget to record payment reference
- Don't skip payment notes for multiple installments
- Don't forget to update status when fully paid

---

## 📋 Available Payment Methods

```
☑️ Telecel Cash (Mobile Money)
☑️ MTN Mobile Money  
☑️ Vodafone Cash
☑️ Bank Transfer
☑️ Cash
☑️ Credit/Debit Card
☑️ Other
```

---

## 🔧 New Fields in Booking Schema

| Field | Purpose | Required? |
|-------|---------|-----------|
| **Payment Status** | Pending / Partial / Paid / Refunded | Yes |
| **Amount Paid** | Total amount received so far | No |
| **Payment Method** | How guest paid | No |
| **Payment Reference** | Transaction ID / Reference | No |
| **Payment Notes** | Additional payment details | No |

---

## 📍 Guest Receipt Access

Guests can view receipts at:

**Regular Receipt:**
```
https://your-domain.com/receipt?ref=BOOKING_REF&email=guest@email.com
```

**Visa Receipt:**
```
https://your-domain.com/receipt/visa?ref=BOOKING_REF&email=guest@email.com
```

Both receipts automatically show:
- ✅ Total amount
- ✅ Amount paid
- ✅ Balance due
- ✅ Payment method & reference
- ✅ Payment notes

---

## 🎓 Example Workflow

### Guest Makes Booking
1. Guest books room: Total GH₵1,500
2. You tell them: "Pay 50% deposit to confirm"

### Guest Sends Deposit
3. Guest sends GH₵750 via Telecel Cash
4. You receive transaction ID: MP987654321

### You Record Payment
5. Open booking in Sanity CMS
6. Fill fields:
   ```
   Payment Status: Partial Payment
   Amount Paid: 750
   Payment Method: Telecel Cash
   Payment Reference: MP987654321
   Payment Notes: "50% deposit received. Balance due on check-in"
   ```
7. Click **Publish**

### Guest Checks Receipt
8. Guest visits receipt page
9. Sees:
   - Total: GH₵1,500
   - Paid: GH₵750
   - Balance: GH₵750
   - Status: Partial Payment Received

### Guest Pays Balance on Arrival
10. Guest pays GH₵750 cash on check-in
11. You update:
    ```
    Payment Status: Paid in Full
    Amount Paid: 1500
    Payment Method: Cash
    Payment Notes: "Deposit: 750 Telecel (MP987654321). Balance: 750 Cash on arrival. Total: 1500"
    ```
12. Click **Publish**

### Final Receipt Shows
13. Guest's receipt now shows:
    - Total: GH₵1,500
    - Paid: GH₵1,500
    - Balance: GH₵0
    - Status: Paid in Full ✅

---

## 📚 Full Documentation

For complete details, see:
- **PARTIAL_PAYMENT_RECEIPT_GUIDE.md** - Complete guide with examples
- **PRICING_AND_RECEIPT_FIXES_SUMMARY.md** - Technical pricing details
- **START_HERE_PRICING_FIX.md** - Room pricing setup

---

## ✅ You're Ready!

Start recording partial payments now:
1. Go to Sanity CMS
2. Open any booking
3. Scroll to payment fields
4. Fill them out
5. Click Publish
6. Generate receipt to verify

**That's it!** The receipt system handles everything automatically. 🎉
