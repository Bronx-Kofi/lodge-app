# Pricing System Flow Diagram

## Complete Pricing Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ROOM SCHEMA (CMS)                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────┐  ┌──────────────────┐  ┌──────────────────┐   │
│  │ Display Price   │  │ Booking Price    │  │ Receipt Price    │   │
│  │   (Required)    │  │   (Optional)     │  │   (Optional)     │   │
│  │   GH₵280        │  │   GH₵250         │  │   GH₵300         │   │
│  └────────┬────────┘  └────────┬─────────┘  └────────┬─────────┘   │
│           │                    │                      │              │
└───────────┼────────────────────┼──────────────────────┼──────────────┘
            │                    │                      │
            │                    │                      │
            ▼                    ▼                      ▼
┌───────────────────┐  ┌─────────────────┐  ┌──────────────────────┐
│  Website Display  │  │ Booking Process │  │  Receipt Generation  │
├───────────────────┤  ├─────────────────┤  ├──────────────────────┤
│                   │  │                 │  │                      │
│ Room Listing:     │  │ Widget Price:   │  │ Receipt Price:       │
│ Shows Display     │  │ bookingPrice    │  │ receiptPrice         │
│ Price (GH₵280)    │  │ OR price        │  │ OR price             │
│                   │  │ = GH₵250        │  │ = GH₵300             │
│ Room Details:     │  │                 │  │                      │
│ Shows Display     │  │ Stored as:      │  │ Display on Receipt:  │
│ Price (GH₵280)    │  │ roomPricePerNight│ │ GH₵300 × nights     │
│                   │  │ in booking      │  │ = Total             │
└───────────────────┘  └─────────────────┘  └──────────────────────┘
```

## Booking Creation Flow

```
User Selects Dates → Pricing API Called
                            │
                            ▼
                ┌────────────────────────┐
                │ /api/pricing/calculate │
                └───────────┬────────────┘
                            │
                ├───────────┴─────────────┐
                │ Fetch Room from Sanity  │
                │ - price                 │
                │ - bookingPrice         │
                │ - receiptPrice         │
                └───────────┬─────────────┘
                            │
                            ▼
                ┌──────────────────────────────┐
                │ Calculate Nightly Rate:      │
                │ roomPrice = bookingPrice OR  │
                │             price            │
                └───────────┬──────────────────┘
                            │
                            ▼
                ┌──────────────────────────────┐
                │ Calculate Total:             │
                │ basePrice = roomPrice × nights│
                │ + cleaningFee                │
                │ + serviceFee                 │
                │ + taxes (12.5%)              │
                └───────────┬──────────────────┘
                            │
                            ▼
                ┌──────────────────────────────┐
                │ Return to Frontend:          │
                │ {                            │
                │   roomPricePerNight: 250     │
                │   baseRate: 250              │
                │   total: 350                 │
                │   nights: 1                  │
                │ }                            │
                └───────────┬──────────────────┘
                            │
                            ▼
                    User Confirms Booking
                            │
                            ▼
                ┌────────────────────────┐
                │ /api/bookings/create   │
                └───────────┬────────────┘
                            │
                            ▼
                ┌──────────────────────────────┐
                │ Save to Sanity:              │
                │ {                            │
                │   roomPricePerNight: 250  ◄──┼── STORED!
                │   totalPrice: 350            │
                │   checkIn: "2026-02-10"      │
                │   checkOut: "2026-02-11"     │
                │   numberOfRooms: 1           │
                │ }                            │
                └──────────────────────────────┘
```

## Receipt Generation Flow

```
User Requests Receipt → /api/bookings/receipt
                              │
                              ▼
                    ┌──────────────────────┐
                    │ Fetch Booking:       │
                    │ - roomPricePerNight  │
                    │ - totalPrice         │
                    │ - room.receiptPrice  │
                    │ - room.price         │
                    └──────────┬───────────┘
                              │
                              ▼
                    ┌──────────────────────────────┐
                    │ Calculate Price Per Night:   │
                    │                              │
                    │ Priority Order:              │
                    │ 1. booking.roomPricePerNight │ ◄── NEW!
                    │ 2. room.receiptPrice         │
                    │ 3. room.price                │
                    │ 4. totalPrice/nights/rooms   │
                    └──────────┬───────────────────┘
                              │
                              ▼
                    ┌──────────────────────────────┐
                    │ Display on Receipt:          │
                    │                              │
                    │ Room Rate:                   │
                    │ 1 night @ GH₵300/night       │
                    │ = GH₵300                     │
                    │                              │
                    │ Total Amount: GH₵300         │
                    └──────────────────────────────┘
```

## Multi-Room Booking Example

```
Room: Hillside Suite
  - Display Price: GH₵280
  - Booking Price: GH₵250
  - Receipt Price: GH₵300

Booking Details:
  - 2 rooms
  - 3 nights
  - Check-in: Feb 10
  - Check-out: Feb 13

Calculation:
  basePrice = GH₵250 × 3 nights = GH₵750
  totalRooms = GH₵750 × 2 rooms = GH₵1,500
  cleaningFee = GH₵50 × 2 = GH₵100
  serviceFee = GH₵1,500 × 10% = GH₵150
  subtotal = GH₵1,750
  taxes = GH₵1,750 × 12.5% = GH₵218.75
  TOTAL = GH₵1,968.75

Stored in Booking:
  roomPricePerNight: GH₵250  ◄── This is saved!
  totalPrice: GH₵1,968.75

Receipt Display:
  Room Rate:
  2 rooms × 3 nights @ GH₵300/night  ◄── Uses receiptPrice!
  = GH₵1,800

  Total Amount: GH₵1,968.75  ◄── Uses stored total
```

## Key Points

✅ **Booking uses bookingPrice** (or falls back to price)
✅ **Receipt shows receiptPrice** (or falls back to price)
✅ **roomPricePerNight is stored** in every booking
✅ **Multi-room calculations work correctly**
✅ **Legacy bookings have fallback logic**

## Troubleshooting

| Issue | Check |
|-------|-------|
| Receipt shows wrong price | Verify room has receiptPrice set |
| Booking charges wrong amount | Check bookingPrice field |
| Price calculation error | Ensure roomPricePerNight is stored |
| Multi-room total wrong | Verify numberOfRooms is correct |
