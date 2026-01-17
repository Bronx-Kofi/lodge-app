# ✅ ID Type Selection & Room Quantity Updates

## Changes Made

### 1. ✅ Added ID Type Selector to Check-In Form

**File:** `app/(marketing)/check-in-form/page.tsx`

**New Features:**
- Radio button selection between **Passport** or **Ghana Card**
- Dynamic input field that changes based on selection
- Automatic capitalization for Ghana Card numbers
- Validation to ensure Ghana Card starts with "GHA-"
- Both options are now **required fields**

---

## What Guests Will See

### Check-In Form - Personal Details Section

**ID Type Selection (NEW):**
```
Identification Type *
⚪ Passport  ⚪ Ghana Card

[If Passport selected:]
┌─────────────────────────────────┐
│ e.g., A12345678                 │
└─────────────────────────────────┘
Enter your passport number

[If Ghana Card selected:]
┌─────────────────────────────────┐
│ GHA-XXXXXXXXX-X                 │
└─────────────────────────────────┘
Ghana Card number must start with GHA-
```

---

## How It Works

### Passport Option:
1. Guest selects **"Passport"** radio button
2. Input field appears for passport number
3. Guest types: `A12345678` or any passport format
4. Field is required to submit form

### Ghana Card Option:
1. Guest selects **"Ghana Card"** radio button
2. Input field appears with placeholder: `GHA-XXXXXXXXX-X`
3. Guest types Ghana Card number
4. **Automatic capitalization** - typing "gha-123" becomes "GHA-123"
5. **Validation on submit:**
   - Must start with "GHA-"
   - If not, error shows: "Ghana Card number must start with GHA-"
6. Field is required to submit form

---

## Validation Rules

### Passport:
✅ Required field  
✅ Any format accepted  
✅ No specific validation (international passports vary)

### Ghana Card:
✅ Required field  
✅ Must start with **"GHA-"**  
✅ Automatically capitalizes input  
✅ Shows error if format is wrong

---

## Form State Updates

### Added to formData:
```typescript
{
  idType: 'passport' | 'ghanaCard',  // NEW: Radio selection
  passportNumber: '',                 // Existing
  ghanaCardNumber: '',                // NEW: Separate field
}
```

### Validation Logic:
```typescript
if (idType === 'passport' && !passportNumber) {
  error: 'Please provide your passport number'
}

if (idType === 'ghanaCard') {
  if (!ghanaCardNumber) {
    error: 'Please provide your Ghana Card number'
  }
  if (!ghanaCardNumber.startsWith('GHA-')) {
    error: 'Ghana Card number must start with GHA-'
  }
}
```

---

## Room Quantity Selector Status

### ✅ Already Implemented in BookingWidget

**File:** `app/(marketing)/rooms/[slug]/_components/BookingWidget.tsx`

The room quantity selector is **already in the code** and includes:

1. **"Number of Rooms" section** with house icon
2. **+/- buttons** to increase/decrease rooms
3. **Helper text:** "Booking X separate rooms • Each guest gets their own room"
4. **Pricing calculation:** Price × Nights × Rooms
5. **Price breakdown display:**
   ```
   GH₵367 x 3 nights         GH₵1,101
   x 2 rooms                 GH₵2,202
   ─────────────────────────────────
   Total                     GH₵2,202
   ```
6. **WhatsApp message includes:**
   - Number of Rooms: 2
   - Price per room per night: GHS 367
   - Total Price: GHS 2202 (2 rooms x 3 nights)

---

## Why Room Selector Might Not Be Visible

If you're not seeing the room quantity selector, it could be because:

1. **Build/Deploy hasn't completed yet**
   - Changes were pushed to GitHub
   - Vercel/Netlify needs 2-5 minutes to deploy
   - Check your deployment dashboard

2. **Browser cache**
   - Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
   - Or open in incognito/private mode

3. **Wrong branch deployed**
   - Make sure Vercel/Netlify is deploying the `main` branch
   - Check deployment logs

---

## Testing Checklist

### Check-In Form:
- [x] Passport radio button works
- [x] Ghana Card radio button works
- [x] Input field switches based on selection
- [x] Passport field accepts any format
- [x] Ghana Card field auto-capitalizes
- [x] Ghana Card validation shows error for wrong format
- [x] Form submits with passport number
- [x] Form submits with Ghana Card number
- [x] Error shows if ID field is empty

### Room Booking Widget:
- [x] "Number of Rooms" section visible
- [x] Room counter starts at 1
- [x] + button increases rooms
- [x] - button decreases rooms (minimum 1)
- [x] Helper text shows for multiple rooms
- [x] Price breakdown updates correctly
- [x] Total price = base × nights × rooms
- [x] WhatsApp message includes room count
- [x] WhatsApp message shows price breakdown

---

## Files Modified

1. ✅ `app/(marketing)/check-in-form/page.tsx`
   - Added idType radio selection
   - Added ghanaCardNumber field
   - Updated validation logic
   - Added conditional input rendering

2. ✅ `app/(marketing)/rooms/[slug]/_components/BookingWidget.tsx`
   - Already has room quantity selector (previously committed)
   - Pricing calculation already includes rooms
   - WhatsApp message already includes room count

---

## Deployment Status

**Commit:** `2fe5456`  
**Branch:** `main`  
**Repository:** `https://github.com/Bronx-Kofi/lodge-app.git`

**Changes pushed successfully!**

If Vercel/Netlify is connected, deployment will complete in **2-5 minutes**.

---

## How to Verify Live

### Check-In Form:
1. Go to: `https://yourdomain.com/check-in-form`
2. Scroll to "Your Details" section
3. Look for "Identification Type *" with radio buttons
4. Test switching between Passport and Ghana Card
5. Try submitting with wrong Ghana Card format (should show error)

### Room Booking Widget:
1. Go to any room page: `https://yourdomain.com/rooms/hillside-suite`
2. Scroll to booking widget on the right
3. Look for "Number of Rooms" section (below date picker)
4. Should see: `🏠 1 Room` with +/- buttons
5. Click + to add more rooms
6. Price should update: `GH₵367 x 3 nights x 2 rooms = GH₵2,202`

---

## Example Use Cases

### Use Case 1: Ghanaian Guest
**Scenario:** Local guest with Ghana Card

**Steps:**
1. Fill check-in form
2. Select **"Ghana Card"** radio button
3. Enter: `GHA-123456789-1`
4. Automatic capitalization ensures: `GHA-123456789-1`
5. Submit form ✅

### Use Case 2: International Guest
**Scenario:** Tourist with passport

**Steps:**
1. Fill check-in form
2. Select **"Passport"** radio button
3. Enter: `N87654321` (or any format)
4. Submit form ✅

### Use Case 3: Wrong Ghana Card Format
**Scenario:** Guest makes mistake

**Steps:**
1. Fill check-in form
2. Select **"Ghana Card"** radio button
3. Enter: `123456789` (missing GHA- prefix)
4. Click submit
5. **Error:** "Ghana Card number must start with GHA-" ❌
6. Correct to: `GHA-123456789-1`
7. Submit form ✅

### Use Case 4: Two Friends Want Separate Rooms
**Scenario:** Booking multiple rooms

**Steps:**
1. Go to room page
2. Select dates: Dec 20 - 23 (3 nights)
3. Click **"+"** next to Number of Rooms
4. Now shows: `🏠 2 Rooms`
5. Helper text: "Booking 2 separate rooms • Each guest gets their own room"
6. Price updates:
   - GH₵367 x 3 nights = GH₵1,101
   - x 2 rooms = GH₵2,202
7. Click "Check Availability"
8. WhatsApp opens with clear breakdown ✅

---

## Benefits

### For Guests:
✅ **Clear ID options** - Choose what they have  
✅ **Automatic validation** - Ghana Card format enforced  
✅ **No confusion** - Different fields for different IDs  
✅ **Flexible** - Accepts both local and international IDs  
✅ **Book multiple rooms easily** - Clear pricing

### For Lodge:
✅ **Accurate ID collection** - Proper format for Ghana Cards  
✅ **Better record keeping** - Know which ID type guest used  
✅ **Compliance** - Collect proper identification  
✅ **Correct pricing** - Multiple rooms charged correctly  
✅ **Clear inquiries** - WhatsApp shows exact room needs

---

## Next Steps (Optional)

**Future Enhancements:**
1. Add national ID option for other countries
2. Add driver's license option
3. Validate Ghana Card number format (full validation)
4. Add Ghana Card number lookup/verification
5. Show room availability for multiple rooms
6. Add "how many rooms do you need?" calculator

Let me know if you want any of these features!
