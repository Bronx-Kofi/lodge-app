# Partial Payment & Receipt Guide

## ✅ What's New: Partial Payment Support

You can now record partial payments (deposits) and generate receipts that show:
- Total amount due
- Amount already paid
- Balance remaining
- Payment method and reference
- Payment notes

## How to Record a Partial Payment

### Step 1: Find the Booking in Sanity CMS

1. Go to **Sanity Studio** (your-domain.com/studio)
2. Navigate to **Bookings** section
3. Find the booking by:
   - Booking Reference
   - Guest Name
   - Check-in Date

### Step 2: Add Payment Information

Once you open the booking, scroll down to the payment fields:

| Field | Description | Example |
|-------|-------------|---------|
| **Payment Status** | Select status | "Partial Payment" |
| **Amount Paid (GH₵)** | Enter amount received | 500 |
| **Payment Method** | How they paid | "Telecel Cash" |
| **Payment Reference/Transaction ID** | Transaction reference | "MP12345678" |
| **Payment Notes** | Additional details | "Deposit received. Balance due on check-in" |

### Step 3: Save & Generate Receipt

1. Click **Publish** to save the booking
2. Guest can now view their receipt at:
   - Receipt page: `/receipt?ref=BOOKING_REF&email=guest@email.com`
   - Visa receipt: `/receipt/visa?ref=BOOKING_REF&email=guest@email.com`

## Receipt Display Examples

### Example 1: No Payment Yet

**Booking Details:**
- Total: GH₵1,000
- Amount Paid: (empty)
- Status: Pending

**Receipt Shows:**
```
Total Amount: GH₵1,000
Payment Status: Reservation Confirmed
```

### Example 2: Partial Payment (Deposit)

**Booking Details:**
- Total: GH₵1,000
- Amount Paid: GH₵500
- Payment Method: Telecel Cash
- Reference: MP12345678
- Status: Partial Payment

**Receipt Shows:**
```
Total Amount: GH₵1,000

Amount Paid: GH₵500
via Telecel Cash
Ref: MP12345678

Balance Due: GH₵500
Payment Status: Partial Payment Received
```

### Example 3: Paid in Full

**Booking Details:**
- Total: GH₵1,000
- Amount Paid: GH₵1,000
- Payment Method: Bank Transfer
- Reference: TRF456789
- Status: Paid

**Receipt Shows:**
```
Total Amount: GH₵1,000

Amount Paid: GH₵1,000
via Bank Transfer
Ref: TRF456789

Status: Paid in Full ✓
Balance Due: GH₵0
```

### Example 4: Overpayment

**Booking Details:**
- Total: GH₵1,000
- Amount Paid: GH₵1,200
- Payment Method: Cash
- Status: Paid

**Receipt Shows:**
```
Total Amount: GH₵1,000

Amount Paid: GH₵1,200
via Cash

Status: Paid in Full ✓
Balance Due: GH₵0
```

## Common Scenarios

### Scenario 1: Guest Pays 50% Deposit

1. Total booking: GH₵2,000
2. Guest pays: GH₵1,000 via mobile money
3. **What to enter:**
   - Payment Status: `Partial Payment`
   - Amount Paid: `1000`
   - Payment Method: `Telecel Cash` (or MTN/Vodafone)
   - Payment Reference: Transaction ID from mobile money
   - Payment Notes: `50% deposit. Balance due on check-in`

### Scenario 2: Guest Pays in Installments

**First Payment:**
- Amount Paid: `500`
- Payment Method: `Telecel Cash`
- Payment Reference: `MP111`
- Payment Notes: `First installment - 500 received`

**Second Payment (Update same booking):**
- Amount Paid: `1000` (total paid so far)
- Payment Method: `Bank Transfer`
- Payment Reference: `TRF222`
- Payment Notes: `Second payment 500 received (total: 1000). First: MP111, Second: TRF222`

### Scenario 3: Multiple Payment Methods

If guest pays using different methods:
- Enter the **total** in Amount Paid
- Use Payment Notes to document each payment:

```
Payment Notes example:
"1st: GH₵300 via Telecel (MP123456)
2nd: GH₵700 via Bank Transfer (TRF789)
Total: GH₵1,000"
```

### Scenario 4: Cash Payment on Arrival

When guest arrives and pays balance in cash:
- Update Amount Paid to full amount
- Set Payment Method: `Cash`
- Update Payment Status: `Paid in Full`
- Payment Notes: `Balance paid in cash on check-in`

## Payment Methods Available

Select from:
- **Telecel Cash (Mobile Money)** - Telecel network
- **MTN Mobile Money** - MTN network
- **Vodafone Cash** - Vodafone network
- **Bank Transfer** - Direct bank deposit
- **Cash** - Physical cash payment
- **Credit/Debit Card** - Card payment
- **Other** - Any other method

## Receipt Generation

### For Guests:
Guests can generate their own receipts by visiting:
```
https://your-domain.com/receipt?ref=BOOKING_REF&email=guest@email.com
```

### For Visa Applications:
Use the visa-friendly format:
```
https://your-domain.com/receipt/visa?ref=BOOKING_REF&email=guest@email.com
```

Both receipts automatically show:
- ✅ Partial payment information
- ✅ Balance due
- ✅ Payment method and reference
- ✅ Payment notes

## Important Notes

### 1. Update Amount Paid, Not Add
When recording additional payments, **update the total** amount paid (don't add to existing):
- ❌ Wrong: Guest paid 500, then 300 → Enter 300
- ✅ Correct: Guest paid 500, then 300 → Enter 800 (total)

### 2. Payment Status Options
- **Pending** - No payment received yet
- **Partial Payment** - Some payment received, balance due
- **Paid in Full** - Complete payment received
- **Refunded** - Payment was refunded

### 3. Payment Reference Best Practices
Always record:
- Mobile Money: Transaction ID (e.g., MP12345678)
- Bank Transfer: Reference number
- Cash: Date received or receipt number
- Card: Last 4 digits of card (for security)

### 4. Payment Notes Tips
Use notes to document:
- Multiple installments
- Special payment arrangements
- Balance due dates
- Payment agreements
- Any payment-related communication

## Troubleshooting

### Receipt Not Showing Payment Info
**Check:**
1. Is Amount Paid field filled in?
2. Did you click Publish after adding payment info?
3. Try refreshing the receipt page
4. Clear browser cache

### Balance Calculation Wrong
**Verify:**
1. Total Price is correct
2. Amount Paid is the **total** paid (not just last payment)
3. Payment Status matches actual situation

### Guest Can't Access Receipt
**Ensure:**
1. Booking Reference is correct
2. Email matches exactly (case-sensitive)
3. Booking is published in Sanity
4. Receipt URL is correct format

## Quick Reference Card

**Recording a Deposit:**
```
✓ Payment Status: Partial Payment
✓ Amount Paid: [deposit amount]
✓ Payment Method: [how they paid]
✓ Payment Reference: [transaction ID]
✓ Payment Notes: "Deposit received. Balance due on [date]"
✓ Click Publish
```

**Recording Full Payment:**
```
✓ Payment Status: Paid in Full
✓ Amount Paid: [total amount]
✓ Payment Method: [how they paid]
✓ Payment Reference: [transaction ID]
✓ Payment Notes: "Payment received in full"
✓ Click Publish
```

**Recording Additional Payment:**
```
✓ Update Amount Paid: [new total]
✓ Update Payment Status if fully paid
✓ Update Payment Reference if different
✓ Add to Payment Notes: "Additional payment of [amount]"
✓ Click Publish
```

## Support

For questions or issues with partial payments:
1. Check this guide first
2. Verify all fields are filled correctly
3. Test receipt generation
4. Check browser console for errors

---

**Related Guides:**
- `PRICING_AND_RECEIPT_FIXES_SUMMARY.md` - Pricing system details
- `QUICK_PRICING_GUIDE.md` - Room pricing setup
- `START_HERE_PRICING_FIX.md` - Getting started with pricing
