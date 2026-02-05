# Quick Guide: Setting Room Prices

## Simple Setup (Most Common)

Just set the **Display Price** - done! This price will be used everywhere.

## Advanced Setup

### Scenario 1: Different Receipt Price
**When:** You need official receipts to show a different price
```
Display Price: GH₵250 (what guests see on website)
Receipt Price: GH₵280 (what appears on receipts)
```

### Scenario 2: Different Booking Price
**When:** You want to show one price but charge another
```
Display Price: GH₵300 (marketing/display)
Booking Price: GH₵280 (actual booking cost)
```

### Scenario 3: All Different (Maximum Flexibility)
**When:** You need complete control
```
Display Price: GH₵300 (shown on website)
Booking Price: GH₵280 (charged when booking)
Receipt Price: GH₵320 (shown on official receipts)
```

## In Sanity CMS

1. Go to **Rooms** section
2. Select a room
3. Go to **"3. Pricing"** tab
4. Set your prices:
   - **Display Price** (Required) - Base price
   - **Receipt/Invoice Price** (Optional) - Receipt override
   - **Booking Widget Price** (Optional) - Booking override
   - **Pricing Notes** (Optional) - Your internal notes

## What Gets Used Where?

| Location | Price Used |
|----------|------------|
| Room listing page | Display Price |
| Booking widget | Booking Price → Display Price |
| Checkout page | Booking Price → Display Price |
| Receipt/Invoice | Receipt Price → Display Price |
| Visa confirmation | Receipt Price → Display Price |

## Examples

### Example 1: Standard Hotel Room
```
Display Price: GH₵200
(Leave others blank)
Result: GH₵200 everywhere
```

### Example 2: Discounted Online Booking
```
Display Price: GH₵250 (walk-in rate)
Booking Price: GH₵200 (online discount)
Result: Website shows 250, but online bookings cost 200
```

### Example 3: Official Documentation
```
Display Price: GH₵200
Receipt Price: GH₵250
Result: Guests book at 200, but official receipts show 250
```

## Tips

- Leave fields **blank** to use Display Price
- Use **Pricing Notes** to remember your strategy
- Test receipts after changing prices
- Changes apply to NEW bookings only
