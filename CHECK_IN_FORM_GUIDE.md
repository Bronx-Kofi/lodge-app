# Guest Check-In Form System - Complete Guide

## 🎯 What This Is

A **self-service pre-check-in form** that guests fill out BEFORE arriving at the lodge. This makes check-in smooth and fast when they arrive!

---

## 🌟 Perfect For Your Workflow

### Your Current Process:
1. Guest contacts you via WhatsApp
2. You discuss room, dates, and price
3. Guest agrees to book
4. Guest sends payment via Telecel Cash
5. You confirm booking
6. **Guest arrives and fills out forms at reception** ⏱️ (takes time)

### NEW Process with Check-In Form:
1. Guest contacts you via WhatsApp
2. You discuss room, dates, and price
3. Guest agrees to book
4. **You send them the check-in form link** 📱
5. **Guest fills it out online before arrival** ✅
6. Guest sends payment via Telecel Cash
7. You confirm booking
8. **Guest arrives - quick check-in!** ⚡ (info already collected)

---

## 📋 What Information Does It Collect?

### Personal Information:
- First Name & Last Name
- Email Address
- Phone Number
- Date of Birth (optional)
- Nationality (optional)
- Passport/ID Number (optional)

### Booking Details:
- Booking Reference (if they have one from WhatsApp)
- Expected Check-In Date
- Expected Check-Out Date
- Number of Guests
- Expected Arrival Time
- Room Preference

### Additional Info:
- Special Requests
- Dietary Restrictions/Allergies
- Need airport/station pickup? (checkbox)

### Emergency Contact:
- Name
- Phone Number
- Relationship

### Visa Receipt:
- Checkbox: "I need official receipt for visa purposes"
- If checked, must provide nationality and passport

---

## 🔗 How Guests Access the Form

### Direct Link:
```
https://your-domain.com/check-in-form
```

### You Can Send Via WhatsApp:
```
Hi [Guest Name]! To make your check-in quick and easy, 
please fill out this form before you arrive:
https://your-domain.com/check-in-form

It only takes 5 minutes! See you soon! 😊
```

---

## 🎯 Two Ways It Works

### Option 1: Guest HAS Booking Reference
If you gave them a booking reference (like `MHL-123456`) from an earlier booking:
1. Guest fills form
2. Enters booking reference
3. System **updates the existing booking** with check-in info
4. All data linked together!

### Option 2: Guest DOESN'T Have Booking Reference
If they're filling it out before you created the booking:
1. Guest fills form
2. Leaves booking reference blank
3. System **creates a check-in form submission** (CHK-XXXXXX)
4. You see it in Sanity Studio
5. You can manually link it to a booking later

---

## 📊 Where You See Submissions

### In Sanity Studio:

**Two New Sections:**

1. **Bookings** (existing, now enhanced)
   - Shows all bookings
   - If guest filled check-in form, shows extra data
   - See: dietary restrictions, emergency contact, arrival time, etc.

2. **Check-In Forms** (NEW!)
   - Shows all check-in form submissions
   - Reference number: CHK-XXXXXX
   - Status: Pending Review / Reviewed / Processed / Checked In
   - All guest information collected

---

## 🔄 Your Workflow

### Scenario 1: Guest Books via WhatsApp First

**Step 1:** Guest contacts you on WhatsApp
```
Guest: "Hi! I want to book the Hillside Suite for March 15-17"
```

**Step 2:** You discuss and agree on details
```
You: "Perfect! The suite is available. Total is GH₵600 for 2 nights."
```

**Step 3:** Send check-in form link
```
You: "Great! Please fill out this quick form so check-in is fast:
https://your-domain.com/check-in-form

Then send your Telecel Cash payment to [number]"
```

**Step 4:** Guest fills form online

**Step 5:** Guest sends payment screenshot

**Step 6:** You verify payment and create booking in Sanity
- Go to Bookings → Create new booking
- Fill in details
- Status: Confirmed
- Payment Status: Paid

**Step 7:** Check if they filled check-in form
- Go to Check-In Forms section
- Look for their name/email
- If found, click "Reviewed" or "Processed"

**Step 8:** Guest arrives - super fast check-in! ⚡

---

### Scenario 2: Guest Fills Form First

**Step 1:** You send form link during WhatsApp conversation

**Step 2:** Guest fills form immediately

**Step 3:** You see submission in Sanity → Check-In Forms

**Step 4:** Guest sends payment

**Step 5:** You create booking in Sanity
- Note their check-in reference (CHK-XXXXX)
- Add it to booking notes

**Step 6:** Update check-in form status to "Processed"

**Step 7:** Guest arrives - quick check-in!

---

## 🌍 For International Guests

### Visa Receipt Integration

The check-in form has a checkbox:
```
☐ I need an official receipt for visa purposes
```

If guest checks this:
1. **Must provide** nationality and passport number
2. After form submission, they get confirmation
3. **If linked to booking:** They can access receipt immediately
4. Receipt includes all visa-required info

---

## 📱 What Guest Sees

### Step 1: Open Form
- Clean, professional form
- "Takes about 5 minutes" notice
- Four sections numbered 1-4

### Step 2: Fill Information
- Section 1: Personal Info (required fields marked with *)
- Section 2: Booking Details
- Section 3: Additional Info
- Section 4: Emergency Contact

### Step 3: Submit
- Click "Submit Check-In Form"
- See success animation ✅

### Step 4: Confirmation Page
- Shows reference number
- "What's Next?" instructions
- Confirmation email mention

---

## 💡 Benefits

### For You:
✅ Less time at reception during check-in
✅ All guest info collected in advance
✅ Emergency contacts on file
✅ Know about dietary restrictions before arrival
✅ Can prepare room based on preferences
✅ Professional operation
✅ Data organized in Sanity Studio

### For Guests:
✅ Quick check-in when they arrive
✅ Can fill form at their convenience
✅ No waiting at reception
✅ Smooth, professional experience
✅ Can request special accommodations in advance

### For International Guests:
✅ Provide passport info in advance (required by law)
✅ Get visa receipt automatically
✅ Professional documentation

---

## 🎨 Form Features

### Smart Design:
- Mobile-friendly (works on phones!)
- Clear step-by-step sections
- Optional fields clearly marked
- Helpful placeholder text
- Real-time validation

### Special Features:
- **Conditional fields:** Visa info only shows if checkbox selected
- **Smart linking:** Automatically links to existing bookings
- **Pickup request:** Checkbox for transport needs
- **Date validation:** Ensures check-out is after check-in
- **Success animation:** Professional confirmation

---

## 🔧 Managing Submissions in Sanity

### Check-In Forms Section

Each submission shows:
- **Reference:** CHK-XXXXXX
- **Guest Name**
- **Check-In Date**
- **Status**

### You Can:
1. **View** all submitted information
2. **Update Status:**
   - Pending Review (default)
   - Reviewed (you've looked at it)
   - Processed (you've created booking)
   - Checked In (guest has arrived)
3. **Add Staff Notes**
4. **See if they need pickup**
5. **View emergency contacts**
6. **Check dietary restrictions**

---

## 📧 Integration Points

### With Existing Systems:

**Bookings:**
- Check-in form data can update existing bookings
- Extra info stored in `checkInFormData` field
- Includes: arrival time, pickup needs, dietary info, emergency contact

**Receipts:**
- If guest checked "needs visa receipt"
- Nationality and passport already collected
- Receipt generation automatic

**WhatsApp:**
- You contact guests as usual
- Just send form link during conversation

---

## 🚀 How to Start Using It

### Option 1: Add to Website Navigation
You could add a navigation link:
- "Pre-Check-In" or "Guest Forms"
- Links to `/check-in-form`

### Option 2: WhatsApp Template Message
Create a saved message:
```
Welcome to Miky Hillside Lodge! 

To make your arrival smooth and quick, please complete 
our online check-in form (takes 5 minutes):

🔗 https://mikyhillsidelodge.com/check-in-form

We look forward to welcoming you! 🏨
```

### Option 3: Email Template
For guests who book via email:
```
Subject: Quick Check-In Form for Your Stay

Dear [Guest Name],

Thank you for your booking! To ensure a smooth check-in 
experience, please complete this brief form before your arrival:

[Link to form]

See you soon!
```

---

## 🎯 Best Practices

### When to Send the Form:

**Best Time:** After payment is confirmed
```
You: "Payment received! Your booking is confirmed. 
Please fill this form before arrival: [link]"
```

**Also Good:** During initial conversation
```
You: "Great! I'll hold the room for you. 
Fill out this form and then send payment: [link]"
```

**For International Guests:** Send immediately
```
You: "Perfect! For visa documentation, please fill this 
form right away - it generates your receipt: [link]"
```

---

## 📊 Tracking & Reports

### In Sanity Studio You Can:

1. **See All Check-In Forms**
   - Sorted by submission date
   - Filter by status
   - Search by name/email

2. **Monitor Pending Forms**
   - Who needs review
   - Follow up if needed

3. **Track Check-Ins**
   - Change status when guest arrives
   - Keep accurate records

4. **Generate Reports** (future)
   - Common dietary restrictions
   - Popular room preferences
   - Average arrival times

---

## 🔐 Security & Privacy

- Form requires email validation
- Data stored securely in Sanity
- Only staff can access submissions
- GDPR-compliant data handling
- Guest information protected

---

## 🎨 Customization Options (Future)

You could add:
- Lodge logo at top
- Custom welcome message
- Additional questions
- Multiple languages
- Email notifications
- SMS confirmations

---

## ✅ Summary

### What You Get:

✅ **Self-service check-in form** at `/check-in-form`
✅ **Guest submissions** visible in Sanity Studio
✅ **Links to existing bookings** automatically
✅ **Collects all necessary info** before arrival
✅ **Emergency contacts** on file
✅ **Dietary/special needs** known in advance
✅ **Visa receipt ready** for international guests
✅ **Mobile-friendly** design
✅ **Professional experience** for guests

---

## 📞 Support Workflow

If guest has trouble with form:
1. They can contact you on WhatsApp
2. You can fill it out for them over phone
3. Or they can fill paper form at check-in (traditional way)

**The form is optional but highly recommended!**

---

## 🎉 Result

**Faster check-ins + Better guest data + Professional operation = Happy guests!**

Your lodge now offers a modern, convenient pre-check-in experience while keeping your existing WhatsApp + Telecel Cash workflow! 🏨✨
