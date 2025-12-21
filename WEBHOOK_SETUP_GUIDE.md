# Webhook Setup Guide - Instant CMS Updates

## What This Does
When you publish changes in Sanity CMS, your Netlify site will automatically update within seconds instead of waiting up to 1 hour.

---

## Step 1: Add Environment Variable to Netlify

1. Go to your Netlify dashboard: https://app.netlify.com/sites/miky-hillside-lodge/configuration/env
2. Click **"Add a variable"** → **"Add a single variable"**
3. Add this:
   - **Key:** `SANITY_REVALIDATE_SECRET`
   - **Value:** `miky-hillside-2024-webhook-secret` (or create your own secure string)
4. Click **"Save"**
5. Trigger a new deploy (or wait for the current one to finish)

---

## Step 2: Set Up Sanity Webhook

1. Go to: https://www.sanity.io/manage/personal/project/jyrzp1q7/api/webhooks
2. Click **"Create webhook"**
3. Fill in:
   - **Name:** `Netlify Production Deploy`
   - **URL:** `https://miky-hillside-lodge.netlify.app/api/revalidate?secret=miky-hillside-2024-webhook-secret`
     (Replace the secret with the one you used in Step 1)
   - **Dataset:** `production`
   - **Trigger on:** Check **"Create"**, **"Update"**, and **"Delete"**
   - **HTTP method:** `POST`
   - **API version:** Leave as default
   - **Include drafts:** Uncheck this
4. Click **"Save"**

---

## Step 3: Test the Webhook

1. Go to your Sanity Studio: https://miky-hillside-lodge.netlify.app/studio
2. Go to **"Site Settings"** → Edit the WhatsApp number
3. Click **"Publish"**
4. Wait 10-30 seconds
5. Refresh your site - the change should appear!

---

## How to Edit "Why Book Direct" Section

### In Sanity Studio:

1. Go to: https://miky-hillside-lodge.netlify.app/studio
2. Click **"Rooms Page"** in the sidebar
3. Scroll down to **"Why Book Direct"** section
4. You can now edit:
   - **Section Title** (e.g., "Why Book Directly With Us?")
   - **Benefits** (up to 5):
     - Choose an icon (💰 Money, ✨ Star, 📅 Calendar, 🎁 Gift, 💎 Diamond)
     - Add benefit title (e.g., "Best Price Guarantee")
     - Add description (e.g., "Save 15% when you book direct")
5. Click **"Publish"**
6. Your changes will appear within 30 seconds!

### Default Benefits (if nothing is set in CMS):
- Best Rate Guarantee
- Exclusive Perks
- Flexible Booking

---

## Troubleshooting

### Changes not appearing?
1. Check webhook was triggered: https://www.sanity.io/manage/personal/project/jyrzp1q7/api/webhooks
2. Verify the secret matches in both Netlify and Sanity webhook URL
3. Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
4. Check Netlify deploy logs for errors

### Webhook fails?
- Make sure the secret in the URL matches the environment variable in Netlify
- Ensure the URL is exactly: `https://miky-hillside-lodge.netlify.app/api/revalidate?secret=YOUR_SECRET`
- Check Netlify function logs for any errors

---

## What Gets Updated Instantly

When you publish changes to these in Sanity:
- ✅ Site Settings (WhatsApp, email, social links, logo)
- ✅ Navigation menu
- ✅ Footer content
- ✅ Homepage content
- ✅ Rooms Page (including "Why Book Direct")
- ✅ About Page
- ✅ Explore Page
- ✅ Individual rooms
- ✅ Heritage sites

Everything else updates automatically!
