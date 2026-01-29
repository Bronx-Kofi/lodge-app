# Dynamic Pricing System Guide

## Overview

Your lodge now uses **100% dynamic pricing** - there are no fixed prices on rooms. Instead, prices are determined by **Pricing Rules** that you create in Sanity CMS.

## Key Changes Made

### 1. Removed Fixed Prices
- ✅ Removed `price` field from Room schema
- ✅ Rooms no longer have a base price
- ✅ All pricing comes from Pricing Rules

### 2. Updated Pricing Rules
- ✅ Each pricing rule now has a `basePrice` field
- ✅ The highest priority active rule sets the base price for a booking
- ✅ Additional rules can modify that base price with discounts/surcharges

### 3. Frontend Updates
- ✅ Room cards show "Select dates for pricing" instead of fixed price
- ✅ Room detail pages say "Dynamic pricing - select dates below"
- ✅ Booking widget fetches real-time pricing when dates are selected
- ✅ Receipt pages handle bookings without fixed prices

## How to Set Up Pricing

### Step 1: Go to Sanity Studio
Open: `http://localhost:3000/studio` (or your production URL)

### Step 2: Create Your First Pricing Rule

Click **"Pricing Rules"** → **"Create"**

**Example: Standard Rate (High Season)**
```
Rule Name: Christmas/New Year Peak Season
Base Price: 350 (GH₵/night)
Active: ✅ Yes
Rule Type: Seasonal Pricing
Apply to Rooms: (Leave empty to apply to all rooms)
Start Date: 2025-12-15
End Date: 2026-01-10
Modifier Type: Percentage
Modifier Value: 0 (no modifier, just use base price)
Priority: 100 (highest)
```

**Example: Standard Rate (Low Season)**
```
Rule Name: Low Season Standard Rate
Base Price: 250 (GH₵/night)
Active: ✅ Yes
Rule Type: Seasonal Pricing
Apply to Rooms: (Leave empty)
Start Date: 2026-01-11
End Date: 2026-03-31
Modifier Type: Percentage
Modifier Value: 0
Priority: 50 (medium)
```

**Example: Weekend Surcharge**
```
Rule Name: Weekend Premium
Base Price: 250 (GH₵/night)
Active: ✅ Yes
Rule Type: Weekend Surcharge
Apply to Rooms: (Leave empty)
Start Date: 2026-01-11
End Date: 2026-03-31
Modifier Type: Percentage
Modifier Value: 20 (20% increase on weekends)
Priority: 75 (applied after base rate)
```

**Example: Weekly Stay Discount**
```
Rule Name: 7+ Night Discount
Base Price: 250 (GH₵/night)
Active: ✅ Yes
Rule Type: Length of Stay Discount
Apply to Rooms: (Leave empty)
Start Date: 2026-01-01
End Date: 2026-12-31
Modifier Type: Percentage
Modifier Value: -15 (15% discount)
Minimum Stay: 7 nights
Priority: 60
```

### Step 3: Understanding Priority

- **Higher priority = Applied first**
- The **highest priority rule** sets the base price
- Lower priority rules add modifiers
- Example flow:
  1. Rule Priority 100 (Base: GH₵350/night) ← Used as base
  2. Rule Priority 75 (Modifier: +20%) ← Applied to base
  3. Final: GH₵350 × 1.20 = GH₵420/night

## How Pricing Works for Customers

1. **Customer visits room page**: See "Dynamic pricing - select dates below"
2. **Customer selects check-in and check-out dates**
3. **System finds applicable pricing rules**:
   - Active rules
   - Date range overlaps with booking dates
   - Rule applies to the selected room (or all rooms)
4. **System calculates price**:
   - Uses highest priority rule's `basePrice`
   - Applies modifiers from other rules
   - Adds fees (cleaning, service)
   - Calculates taxes
5. **Customer sees total breakdown**

## Important Notes

### Must Have Pricing Rules
⚠️ **You MUST create at least one pricing rule for each date range you want to accept bookings**

If a customer selects dates with no active pricing rules, they'll see:
> "No pricing rules available for selected dates. Please contact us for pricing."

### Recommended Setup
Create pricing rules covering the entire year:
- Jan-Mar: Low season
- Apr-Jun: Mid season  
- Jul-Aug: High season (family travel)
- Sep-Nov: Mid season
- Dec: Peak season (holidays)

### Testing Your Pricing

1. Create at least one pricing rule in Sanity
2. Make sure it's `Active: Yes`
3. Set Start Date and End Date
4. Set a Base Price
5. Go to your website → Rooms → Select a room
6. Pick dates within your pricing rule's date range
7. The booking widget should fetch and display the price

## Troubleshooting

### "No pricing rules available"
- Check that you have an active pricing rule for those dates
- Verify the rule's date range includes the selected dates
- Make sure `Active` is set to `Yes`
- Ensure `Base Price` is filled in

### Price seems wrong
- Check if multiple rules are applying modifiers
- Review the `Priority` of your rules
- Look at `appliedRules` in the booking response to see which rules were used

### Room not showing on website
- Rooms will still show, but with "Select dates for pricing" instead of a price
- This encourages customers to select dates to see pricing

## API Response Example

When a customer selects dates, the `/api/pricing/calculate` endpoint returns:

```json
{
  "roomTitle": "Deluxe Suite",
  "nights": 3,
  "numberOfRooms": 1,
  "baseRate": 350,
  "basePrice": 1050,
  "cleaningFee": 50,
  "serviceFee": 105,
  "taxes": 151,
  "total": 1356,
  "appliedRules": [
    {
      "name": "Christmas Peak Season",
      "type": "base",
      "value": 350
    },
    {
      "name": "Weekend Premium",
      "type": "percentage",
      "value": 20
    }
  ]
}
```

## Next Steps

1. ✅ Create pricing rules in Sanity Studio
2. ✅ Test booking flow on your website
3. ✅ Adjust prices seasonally as needed
4. ✅ Monitor which rules are being applied
5. ✅ Update rules anytime without code changes

---

**Questions?** The system is now 100% dynamic and managed through your CMS. No more hardcoded prices! 🎉
