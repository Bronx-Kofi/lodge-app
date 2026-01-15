# 📧 Email Confirmation Setup Guide

## Overview

Your booking system now automatically sends professional emails to guests with:
- ✅ Booking confirmation details
- ✅ **Direct link to download their receipt** (for visa applications!)
- ✅ Next steps and payment instructions
- ✅ Contact information

---

## 🚀 How to Enable Email Sending (5 Minutes)

### Step 1: Sign Up for Resend (Free)

1. Go to: https://resend.com/signup
2. Sign up with your email
3. Verify your email address
4. Log in to Resend dashboard

### Step 2: Get Your API Key

1. In Resend dashboard, go to **API Keys**
2. Click **"Create API Key"**
3. Name it: "Miky Hillside Lodge Production"
4. **Copy the API key** (starts with `re_...`)

### Step 3: Add to Netlify

1. Go to Netlify dashboard
2. Your site → **Site Settings** → **Environment variables**
3. Click **"Add a variable"**
4. Fill in:
   - Name: `RESEND_API_KEY`
   - Value: (paste the key from Resend)
   - Scopes: All
5. Click **"Create variable"**

### Step 4: Configure Your Sending Domain (Optional but Recommended)

**Option A: Use Your Custom Domain** (Professional)
1. In Resend dashboard, go to **Domains**
2. Click **"Add Domain"**
3. Add: `mikyhillsidelodge.com`
4. Follow the DNS setup instructions
5. Update the `from` address in code to use your domain

**Option B: Use Resend's Domain** (Quick Start)
- Emails will come from: `onboarding@resend.dev`
- Works immediately, no DNS setup needed
- Good for testing, but custom domain is better for production

### Step 5: Update Email Address in Code

Edit: `lodge-app/lib/email/send-confirmation.ts`

Change line 28 from:
```typescript
from: 'Miky Hillside Lodge <bookings@mikyhillsidelodge.com>',
```

To one of:
```typescript
// Option A: If you set up custom domain
from: 'Miky Hillside Lodge <bookings@mikyhillsidelodge.com>',

// Option B: Using Resend's default (for testing)
from: 'Miky Hillside Lodge <onboarding@resend.dev>',
```

### Step 6: Deploy

1. Commit and push changes (if you edited the from address)
2. Or just trigger a new deploy in Netlify
3. Wait for deployment to complete

### Step 7: Test!

1. Go to your website
2. Fill out the check-in form
3. Submit
4. **Check your email!** 📧

---

## 📧 What the Email Contains

### Email Subject:
```
Booking Confirmed - CHK-XXXXXX
```

### Email Content:
1. **Header** - Lodge branding
2. **Success Badge** - "Booking Confirmed!"
3. **Guest Name** - Personalized greeting
4. **Booking Details Card**:
   - Booking reference
   - Check-in/out dates
   - Number of guests
   - Room preference
5. **What's Next** - Payment instructions
6. **📄 RECEIPT DOWNLOAD BUTTON** ⭐
   - Direct link to professional receipt
   - Perfect for visa applications!
7. **Contact Information** - WhatsApp, phone, email
8. **Professional Footer** - Lodge info

---

## 💰 Resend Pricing

### Free Tier (Perfect for Starting):
- **3,000 emails per month** - FREE!
- All features included
- No credit card required

### Example Usage:
- If you get 100 bookings/month = 100 emails
- Well within free tier!
- Only pay if you go over 3,000 emails/month

---

## 🎯 Key Benefits

### For Guests:
- ✅ Instant email confirmation
- ✅ **Direct receipt download link** (for visa applications!)
- ✅ All booking details in one place
- ✅ Professional appearance
- ✅ Easy to reference later

### For You:
- ✅ Automatic - no manual work!
- ✅ Professional branded emails
- ✅ Guests get receipts immediately
- ✅ Reduces WhatsApp questions
- ✅ Better guest experience

---

## 🔧 Troubleshooting

### Email Not Sending?

1. **Check API Key**:
   - Is `RESEND_API_KEY` set in Netlify?
   - Did you trigger a new deploy after adding it?

2. **Check Resend Dashboard**:
   - Log in to resend.com
   - Go to "Logs"
   - See if emails are being sent

3. **Check Guest's Email**:
   - Check spam/junk folder
   - Some email providers are picky about new senders

4. **Check Logs**:
   - Check Netlify function logs
   - Look for `[Email]` messages

### Emails Going to Spam?

**Solution:** Set up custom domain in Resend
- Add SPF, DKIM records
- Use your own domain (mikyhillsidelodge.com)
- Greatly improves deliverability

---

## 📝 Testing Without Email Service

If you don't want to set up email yet:
- Bookings still work perfectly!
- Guests see confirmation on website
- They can download receipt from confirmation page
- You contact them via WhatsApp as usual

Email is **optional but highly recommended** for better guest experience!

---

## 🎨 Customizing the Email

Want to change the email design?

Edit: `lodge-app/lib/email/templates.ts`

You can customize:
- Colors (currently orange theme)
- Logo (add lodge logo image)
- Contact information
- Message text
- Add more sections

---

## ✅ Setup Checklist

- [ ] Sign up for Resend account
- [ ] Get API key from Resend
- [ ] Add `RESEND_API_KEY` to Netlify
- [ ] (Optional) Set up custom domain in Resend
- [ ] Update `from` email address in code
- [ ] Commit and deploy
- [ ] Test by making a booking
- [ ] Check email received successfully
- [ ] Verify receipt link works

---

## 🎉 Once Set Up

Every guest who books will automatically receive:
1. **Professional confirmation email**
2. **Direct link to download their receipt**
3. **Perfect for visa applications!**
4. **No manual work from you!**

---

## 💡 Quick Start (5 Minutes)

Don't want to set up custom domain yet?

1. Sign up: https://resend.com
2. Get API key
3. Add to Netlify as `RESEND_API_KEY`
4. Deploy
5. **Done!** Emails will work immediately!

(You can set up custom domain later for better deliverability)

---

## 📞 Need Help?

- Resend docs: https://resend.com/docs
- Resend support: support@resend.com
- Check the code: `lodge-app/lib/email/`

---

**Ready to enable automatic email confirmations with receipt links?**

**Follow the steps above and your guests will love it! 📧✨**
