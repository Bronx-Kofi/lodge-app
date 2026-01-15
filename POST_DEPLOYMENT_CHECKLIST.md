# ✅ Post-Deployment Testing Checklist

## 🎯 Complete Testing Guide for Your Lodge Website

Once your site is live on Vercel, follow this checklist to ensure everything works perfectly.

---

## 📋 Pre-Testing Requirements

Before you start testing:

- [ ] Vercel shows "Valid Configuration" for `mikyhillsidelodge.com`
- [ ] Site is accessible at `https://mikyhillsidelodge.com`
- [ ] SSL certificate is active (🔒 padlock in browser)
- [ ] Sanity Studio is accessible at `/studio`

---

## 🏠 Homepage Testing

### Landing Page
- [ ] Homepage loads correctly
- [ ] Hero section displays (image or video)
- [ ] All images load properly
- [ ] Navigation menu works
- [ ] Mobile menu opens/closes
- [ ] "Book Now" buttons work
- [ ] Scroll animations work smoothly

### Contact Information
- [ ] Phone number is clickable (opens dialer on mobile)
- [ ] Email is clickable (opens email client)
- [ ] WhatsApp button works (opens WhatsApp)
- [ ] Social media links work (if any)

---

## 🛏️ Rooms Section

### Rooms Listing Page (`/rooms`)
- [ ] All rooms display correctly
- [ ] Room images load
- [ ] Room descriptions are visible
- [ ] Prices display correctly
- [ ] "View Details" buttons work
- [ ] Filters work (if applicable)

### Individual Room Pages (`/rooms/[slug]`)
- [ ] Room details page loads
- [ ] Image gallery works
- [ ] Can navigate through images
- [ ] Amenities list displays
- [ ] Room description is readable
- [ ] Pricing information is clear
- [ ] Booking widget displays

---

## 📅 Booking System

### Booking Widget
- [ ] Date picker opens
- [ ] Can select check-in date
- [ ] Can select check-out date
- [ ] Guest selector works (adults/children)
- [ ] Price calculates correctly
- [ ] Availability check works
- [ ] "Book Now" button is visible

### Booking Form
- [ ] Form opens when clicking "Book Now"
- [ ] All fields are present:
  - [ ] Guest name
  - [ ] Email
  - [ ] Phone
  - [ ] Nationality
  - [ ] Passport number
  - [ ] Special requests
- [ ] Form validation works
- [ ] Required fields show errors if empty
- [ ] Email format validation works
- [ ] Phone format validation works

### Booking Submission
- [ ] Can submit booking successfully
- [ ] Loading indicator shows during submission
- [ ] Success message displays
- [ ] Redirects to confirmation page
- [ ] Booking reference is generated

---

## 🧾 Receipt System

### Standard Receipt (`/receipt`)
- [ ] Receipt page loads with booking reference
- [ ] Guest information displays correctly
- [ ] Room details are accurate
- [ ] Check-in/check-out dates are correct
- [ ] Price breakdown is visible
- [ ] Receipt number is generated
- [ ] "Print Receipt" button works
- [ ] "Download PDF" button works
- [ ] **"Visa Application Version" button is visible**

### Visa Receipt (`/receipt/visa`) ⭐ **IMPORTANT**
- [ ] Visa receipt page loads
- [ ] **"OFFICIAL DOCUMENT" header displays**
- [ ] **"TO WHOM IT MAY CONCERN" statement is present**
- [ ] Guest name displays correctly
- [ ] Passport number displays
- [ ] Nationality displays
- [ ] Check-in date in full format (e.g., "Monday, January 15, 2026")
- [ ] Check-out date in full format
- [ ] **"CONFIRMED AND GUARANTEED" status shows**
- [ ] Lodge contact information is complete:
  - [ ] Phone number
  - [ ] Email address
  - [ ] WhatsApp number
  - [ ] Full address
- [ ] Verification section is visible
- [ ] **Official lodge stamp/seal displays**
- [ ] Authorization section is present
- [ ] Important information section is readable
- [ ] "Download PDF" button works
- [ ] "Print" button works
- [ ] PDF output is clean (no cut-off text)
- [ ] All sections print correctly

---

## 📱 Mobile Responsiveness

### Test on Mobile Device (or Browser Dev Tools)
- [ ] Homepage looks good on mobile
- [ ] Navigation menu works
- [ ] Images are properly sized
- [ ] Text is readable (not too small)
- [ ] Buttons are easy to tap
- [ ] Booking widget works on mobile
- [ ] Date picker is mobile-friendly
- [ ] Forms are easy to fill on mobile
- [ ] Receipt is readable on mobile
- [ ] Visa receipt formats correctly on mobile

### Test on Tablet
- [ ] Site looks good on tablet (768px - 1024px)
- [ ] Navigation is appropriate for tablet size
- [ ] Images scale properly
- [ ] Booking flow works smoothly

---

## 🎨 Sanity CMS

### Sanity Studio Access (`/studio`)
- [ ] Studio loads at `https://mikyhillsidelodge.com/studio`
- [ ] Can log in with Sanity credentials
- [ ] Dashboard displays correctly
- [ ] Can see all content types:
  - [ ] Site Settings
  - [ ] Homepage
  - [ ] Rooms
  - [ ] About Page
  - [ ] Navigation
  - [ ] Footer

### Content Editing
- [ ] Can edit site settings
- [ ] Can edit homepage content
- [ ] Can edit room details
- [ ] Can upload images
- [ ] Can publish changes
- [ ] Changes reflect on live site (within 60 seconds)

### CORS Check
- [ ] No CORS errors in browser console
- [ ] Images from Sanity CDN load
- [ ] Studio functions without errors

**If CORS errors appear:**
1. Go to https://sanity.io/manage
2. Select your project (`jyrzp1q7`)
3. API → CORS Origins
4. Add:
   - `https://mikyhillsidelodge.com`
   - `https://www.mikyhillsidelodge.com`
   - `https://*.vercel.app`

---

## 🔍 SEO & Performance

### Meta Tags
- [ ] Page titles are appropriate
- [ ] Meta descriptions exist
- [ ] Open Graph tags present (for social sharing)
- [ ] Favicon displays correctly

### Performance
- [ ] Pages load in under 3 seconds
- [ ] Images are optimized (not huge file sizes)
- [ ] No console errors in browser
- [ ] Lighthouse score > 80 (optional)

### Search Engines
- [ ] `robots.txt` is accessible (`/robots.txt`)
- [ ] `sitemap.xml` is accessible (`/sitemap.xml`)
- [ ] Studio is not indexed (check `/studio` has noindex)

---

## 🌍 Domain & SSL

### Domain Configuration
- [ ] `mikyhillsidelodge.com` loads correctly
- [ ] `www.mikyhillsidelodge.com` works (redirects)
- [ ] HTTPS works (🔒 padlock icon)
- [ ] No mixed content warnings
- [ ] No SSL certificate errors

### DNS Check
Visit https://dnschecker.org:
- [ ] `mikyhillsidelodge.com` points to Vercel IP (`76.76.21.21`)
- [ ] DNS propagated worldwide (green checks)

---

## 📧 Email & Notifications

**Note:** Email system is disabled in your setup, but verify:
- [ ] Booking confirmation displays on screen
- [ ] Booking reference is shown to guest
- [ ] Receipt link is provided

---

## 🧪 Test Scenarios

### Scenario 1: New Guest Booking
1. [ ] Visit homepage
2. [ ] Navigate to rooms
3. [ ] Select a room
4. [ ] Choose dates (2 days from now to 4 days from now)
5. [ ] Add 2 adults
6. [ ] Click "Book Now"
7. [ ] Fill all form fields including passport number
8. [ ] Submit booking
9. [ ] Verify confirmation page
10. [ ] Click receipt link
11. [ ] Click "Visa Application Version"
12. [ ] Download PDF
13. [ ] Check PDF has all visa information

### Scenario 2: Mobile User
1. [ ] Open site on mobile device
2. [ ] Browse rooms
3. [ ] Complete a booking
4. [ ] Access receipt on mobile
5. [ ] Download visa receipt on mobile
6. [ ] Verify PDF is readable

### Scenario 3: Content Update
1. [ ] Log into Sanity Studio
2. [ ] Edit a room description
3. [ ] Publish changes
4. [ ] Wait 60 seconds
5. [ ] Refresh room page on live site
6. [ ] Verify changes appear

---

## 🆘 Common Issues & Solutions

### Issue: Site Not Loading
**Solutions:**
- Check DNS propagation at dnschecker.org
- Wait up to 24 hours for full propagation
- Try in incognito/private browsing mode
- Clear browser cache

### Issue: Images Not Loading
**Solutions:**
- Check Sanity CORS settings
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` environment variable
- Check browser console for errors
- Verify Sanity CDN is accessible

### Issue: Booking Form Doesn't Submit
**Solutions:**
- Check browser console for errors
- Verify API routes are working
- Test with different form data
- Check network tab in browser dev tools

### Issue: Visa Receipt Missing Information
**Solutions:**
- Ensure booking form includes:
  - Nationality field
  - Passport number field
- Verify guest filled all fields
- Check Sanity site settings have contact info

### Issue: PDF Download Doesn't Work
**Solutions:**
- Use "Print" button and select "Save as PDF"
- Try different browser (Chrome/Firefox)
- Check browser's PDF viewer settings
- Disable browser extensions temporarily

### Issue: Sanity Studio Won't Load
**Solutions:**
- Check `/studio` URL is correct
- Verify `SANITY_API_TOKEN` environment variable in Vercel
- Check Sanity project is active
- Try logging in at sanity.io first

---

## ✅ Final Verification Checklist

Before telling your guest the site is ready:

### Must-Have Items
- [ ] Site loads on desktop and mobile
- [ ] Booking system works end-to-end
- [ ] Receipt displays correctly
- [ ] **Visa receipt has all required information**
- [ ] **Visa receipt PDF downloads successfully**
- [ ] Contact information is correct
- [ ] Room information is accurate
- [ ] Pricing is correct
- [ ] Sanity Studio is accessible for you

### Nice-to-Have Items
- [ ] All images are high quality
- [ ] Content is grammatically correct
- [ ] All links work
- [ ] Social media connected
- [ ] Google Analytics setup (if desired)

---

## 📊 Testing Tools

### Browser Testing
- **Chrome DevTools:** Press F12, check Console and Network tabs
- **Mobile Simulation:** Chrome DevTools → Toggle device toolbar (Ctrl+Shift+M)
- **Multiple Browsers:** Test in Chrome, Firefox, Safari, Edge

### Online Tools
- **DNS Checker:** https://dnschecker.org
- **SSL Checker:** https://www.sslshopper.com/ssl-checker.html
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly

---

## 🎉 Success Criteria

Your site is ready when:

✅ All pages load correctly
✅ Booking flow works without errors
✅ Receipt system generates properly
✅ **Visa receipt is embassy-compliant and downloadable**
✅ Mobile experience is smooth
✅ Sanity Studio is functional
✅ Domain works with SSL
✅ No console errors

---

## 📞 Post-Testing Actions

### For Your Guest (Visa Receipt)
Once testing is complete, message your guest:

```
Your visa application document is ready!

To access:
1. Visit: https://mikyhillsidelodge.com/receipt?reference=[REF]&email=[EMAIL]
2. Click "Visa Application Version"
3. Download PDF
4. Submit to embassy

Your booking is confirmed and the document is accepted 
by embassies worldwide.

Contact us anytime: [Your Phone/Email]
```

### For Your Business
- [ ] Add site to Google Search Console
- [ ] Set up Google Analytics (optional)
- [ ] Create social media posts announcing launch
- [ ] Update business listings with new website
- [ ] Add website to email signature
- [ ] Print website on business cards

---

## 🚀 You're Live!

Once this checklist is complete, your lodge website is:
- ✅ Live and accessible
- ✅ Accepting bookings
- ✅ Generating embassy-compliant receipts
- ✅ Mobile-friendly
- ✅ Professional and polished

**Congratulations on your launch! 🎉**

---

*Checklist created: January 15, 2026*
