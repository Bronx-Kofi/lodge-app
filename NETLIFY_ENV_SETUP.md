# Netlify Environment Variable Setup - URGENT

## ⚠️ CRITICAL: Form Submission Requires This!

Your check-in form is working perfectly on localhost but failing on the live site because Netlify doesn't have the Sanity write token.

---

## 🔧 How to Fix (Takes 2 Minutes)

### Step 1: Go to Netlify Dashboard
https://app.netlify.com

### Step 2: Select Your Site
Click on your lodge-app site

### Step 3: Go to Environment Variables
Site Settings → Environment Variables → Add a variable

### Step 4: Add This Variable

**Name:**
```
SANITY_API_TOKEN
```

**Value:**
```
sk42UyRaixoyLn5lK6Jrlp5PxObNlmy1puUx28PIhTAq2AcUrxJQy3f5KhtvyXPAteExIz0heFVX0huzdfqdoF7mVxT30uVqwMOYL5j2yUnB47wNAcNqlU3y2hhEhEHNzpe1JIiUH60C1cVNbK7IWYPfTnR8ptNwIsHNkVkHzrKs3WMlhRFl
```

### Step 5: Save
Click "Save" button

### Step 6: Redeploy
Netlify will auto-redeploy, or you can trigger manually:
Deploys → Trigger deploy → Deploy site

---

## ✅ Verify All Environment Variables

Make sure these are ALL set in Netlify:

```
NEXT_PUBLIC_SANITY_PROJECT_ID = jyrzp1q7
NEXT_PUBLIC_SANITY_DATASET = production
SANITY_API_READ_TOKEN = (your existing read token)
SANITY_API_TOKEN = sk42UyRai... (the write token above)
```

---

## 🧪 Test After Setup

1. Wait for deployment to finish (~2-3 minutes)
2. Go to your live site: your-domain.com/check-in-form
3. Fill out the form
4. Submit
5. ✅ SUCCESS!

---

## 🎉 What Happens Next

Once this is set:
- ✅ Form submissions work on live site
- ✅ Guests can book themselves
- ✅ Submissions appear in Sanity Studio
- ✅ You get notified of new bookings
- ✅ Your guests can book 24/7!

---

## ⏰ This is Urgent!

Your guests are trying to book RIGHT NOW. Add this environment variable immediately so they can complete their bookings!

**Estimated time: 2 minutes**
**Impact: CRITICAL - enables all bookings**

DO THIS NOW! 🚀
