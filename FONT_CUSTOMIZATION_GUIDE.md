# Font Customization Guide

## ✨ Change Your Website Fonts from the CMS!

You can now customize your website's typography without touching any code!

---

## How to Change Fonts

### Step 1: Access the CMS
1. Go to: **http://localhost:3002/studio**
2. Click **"Site Settings"** in the left sidebar
3. Click the **"Fonts & Typography"** tab

### Step 2: Choose Your Font Style
You'll see 5 font pairing options to choose from:

---

## Font Pairing Options

### 1. **Elegant Serif** (Current Default)
**Fonts:** Playfair Display + Inter  
**Style:** Classic and sophisticated  
**Best for:** Luxury lodges, boutique hotels, upscale venues  
**Vibe:** Traditional, elegant, refined

**Example:**
- Headings: Beautiful flowing serif (Playfair Display)
- Body text: Clean modern sans-serif (Inter)

---

### 2. **Modern Sans**
**Fonts:** Poppins + Inter  
**Style:** Clean and contemporary  
**Best for:** Modern hotels, tech-forward venues, minimalist brands  
**Vibe:** Fresh, clean, professional

**Example:**
- Headings: Geometric sans-serif (Poppins)
- Body text: Neutral sans-serif (Inter)

---

### 3. **Professional**
**Fonts:** Montserrat + Open Sans  
**Style:** Business-friendly and readable  
**Best for:** Corporate lodges, conference centers, business hotels  
**Vibe:** Trustworthy, clear, professional

**Example:**
- Headings: Strong sans-serif (Montserrat)
- Body text: Highly readable (Open Sans)

---

### 4. **Classic Serif**
**Fonts:** Merriweather + Lato  
**Style:** Traditional and trustworthy  
**Best for:** Heritage properties, traditional inns, family-run lodges  
**Vibe:** Warm, established, reliable

**Example:**
- Headings: Traditional serif (Merriweather)
- Body text: Friendly sans-serif (Lato)

---

### 5. **Friendly Rounded**
**Fonts:** Nunito + Work Sans  
**Style:** Warm and approachable  
**Best for:** Family lodges, eco-retreats, youth hostels  
**Vibe:** Welcoming, casual, friendly

**Example:**
- Headings: Rounded friendly (Nunito)
- Body text: Modern geometric (Work Sans)

---

## Step 3: Save Your Changes
1. Select your preferred font pairing
2. Click **"Publish"** at the bottom
3. Refresh your website
4. See your new fonts live!

---

## What Changes?

### Automatically Updated:
- ✅ **All Headings** - Hero titles, section headers, page titles
- ✅ **All Body Text** - Paragraphs, descriptions, content
- ✅ **Navigation** - Menu items, links
- ✅ **Buttons** - Call-to-action text
- ✅ **Footer** - All footer content

### Where You'll See Changes:
- Homepage hero section
- About page
- Rooms page
- Heritage sites
- Navigation menu
- Footer
- All text across the site

---

## Font Psychology

Choose fonts based on your lodge's personality:

### Elegant Serif (Playfair + Inter)
- **Conveys:** Luxury, sophistication, tradition
- **Feeling:** Premium, established, refined
- **Good for:** High-end lodges, special occasions

### Modern Sans (Poppins + Inter)
- **Conveys:** Innovation, clarity, simplicity
- **Feeling:** Contemporary, fresh, efficient
- **Good for:** Modern travelers, younger audience

### Professional (Montserrat + Open Sans)
- **Conveys:** Trust, reliability, competence
- **Feeling:** Business-like, organized, clear
- **Good for:** Corporate events, conferences

### Classic Serif (Merriweather + Lato)
- **Conveys:** Heritage, warmth, stability
- **Feeling:** Established, trustworthy, comfortable
- **Good for:** Family atmosphere, traditions

### Friendly Rounded (Nunito + Work Sans)
- **Conveys:** Approachability, fun, warmth
- **Feeling:** Welcoming, casual, relaxed
- **Good for:** Families, eco-tourism, community

---

## Font Pairing Explained

### What is Font Pairing?
- **Heading Font** - Used for titles, headings, hero text
- **Body Font** - Used for paragraphs, descriptions, content

### Why Two Fonts?
- **Contrast** - Creates visual hierarchy
- **Readability** - Body font optimized for long reading
- **Character** - Heading font adds personality
- **Balance** - Complimentary styles work together

---

## Technical Details

### Where Fonts Apply:

#### Heading Font (--font-heading):
```css
- h1, h2, h3, h4, h5, h6
- Hero titles
- Section headers
- Page titles
- .font-serif class
```

#### Body Font (--font-body):
```css
- Paragraphs
- Body text
- Navigation
- Buttons
- Default text
- .font-sans class
```

### How It Works:
1. You select a font pairing in CMS
2. System loads Google Fonts dynamically
3. CSS variables update automatically
4. All text updates on next page load

---

## Best Practices

### ✅ DO:
- Choose fonts that match your brand personality
- Consider your target audience
- Test readability on mobile devices
- Keep it consistent across all pages
- Think about the mood you want to create

### ❌ DON'T:
- Change fonts too frequently (confuses users)
- Choose hard-to-read fancy fonts
- Ignore mobile experience
- Mix too many different styles
- Use fonts that don't match your brand

---

## Testing Your Fonts

### After Changing:
1. ✅ Check homepage hero text
2. ✅ Read a full paragraph (is it comfortable?)
3. ✅ View on mobile device
4. ✅ Check navigation menu readability
5. ✅ Look at room descriptions
6. ✅ Review heritage site pages

### Questions to Ask:
- Is the text easy to read?
- Does it match our brand personality?
- Is the heading distinctive but not distracting?
- Does it work on mobile?
- Do the fonts complement each other?

---

## Troubleshooting

### Fonts not changing?
1. Make sure you clicked "Publish" in CMS
2. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
3. Clear browser cache
4. Wait 10 seconds for fonts to load

### Text looks weird?
- Try a different font pairing
- Check if your browser supports Google Fonts
- Refresh the page

### Can't decide?
- **Luxury lodge** → Elegant Serif
- **Modern hotel** → Modern Sans
- **Business venue** → Professional
- **Family lodge** → Friendly Rounded
- **Traditional inn** → Classic Serif

---

## Examples by Property Type

### Luxury Boutique Hotel
**Recommended:** Elegant Serif (Playfair + Inter)  
**Why:** Conveys sophistication and premium quality

### Eco-Lodge
**Recommended:** Friendly Rounded (Nunito + Work Sans)  
**Why:** Warm and approachable, nature-friendly vibe

### Business Hotel
**Recommended:** Professional (Montserrat + Open Sans)  
**Why:** Clear, trustworthy, efficient

### Backpacker Hostel
**Recommended:** Modern Sans (Poppins + Inter)  
**Why:** Fresh, young, contemporary

### Heritage Inn
**Recommended:** Classic Serif (Merriweather + Lato)  
**Why:** Traditional, established, warm

---

## Quick Reference

### Change Fonts:
```
CMS → Site Settings → Fonts & Typography → Select Style → Publish
```

### Preview Options:
1. Elegant Serif → Sophisticated
2. Modern Sans → Contemporary
3. Professional → Business-friendly
4. Classic Serif → Traditional
5. Friendly Rounded → Approachable

---

## Font Loading

### Automatic:
- ✅ Google Fonts loaded automatically
- ✅ Optimized for performance
- ✅ Cached for speed
- ✅ Fallback fonts included

### Performance:
- Fonts load in the background
- No impact on page speed
- Optimized with font-display: swap
- Minimal bandwidth usage

---

## Support

### Need Help Choosing?
- Think about your brand personality
- Look at competitor websites
- Ask your team for opinions
- Try different options (it's easy to change!)

### Resources:
- Google Fonts: fonts.google.com
- Font pairing guides online
- Typography best practices
- Web accessibility guidelines

---

## Summary

✅ **5 Font Pairings** - Pre-selected professional combinations  
✅ **One-Click Change** - Select and publish  
✅ **Instant Update** - See changes immediately  
✅ **No Coding** - Fully CMS-controlled  
✅ **Performance Optimized** - Fast loading  

**Quick Test**: Go to CMS → Fonts & Typography → Try "Modern Sans" → Publish → Refresh site!

---

**Status:** ✅ Ready to Use  
**Location:** http://localhost:3002/studio → Site Settings → Fonts & Typography
