# Miky Hillside Lodge - CMS User Guide

## Getting Started

1. Open your browser and go to: **http://localhost:3002/studio**
2. You'll see the CMS dashboard with a sidebar menu

---

## Editing Content

### Homepage

Click **Homepage** to edit your landing page:

| Field | What it does |
|-------|--------------|
| **Hero Headline** | Main text visitors see first |
| **Hero Subtitle** | Text below the headline |
| **Hero Image** | Background image (1920x1080 recommended) |
| **Hero Video** | Optional video to play instead of image |
| **Features** | Add 3-4 selling points with title + description |
| **Featured Rooms** | Select which rooms show on homepage |
| **WhatsApp Button** | Enable/disable + set pre-filled message |

---

### Rooms

Click **Rooms** to manage your room listings:

**To add a new room:**
1. Click the **"+"** button
2. Fill in each tab:
   - **Basic Info**: Name, short description, full description
   - **Photos**: Main image + gallery images
   - **Price**: Nightly rate in GHC
   - **Who Can Stay**: Guests, beds, bathrooms
   - **What's Included**: Check amenities

**Important:** Click "Generate" for the Web Address - don't type it manually!

---

### Heritage Sites

Click **Heritage Sites** to manage explore/tourism content:

- Add nearby attractions
- Include travel time from lodge
- Categorize as Nature, Culture, or History

---

### Pages

Click **Pages** to edit page content:

- **Rooms Page**: Edit the header text
- **Explore Page**: Edit header and CTA text
- **About Page**: Edit your story and hero image

---

### Settings

Click **Settings** to edit global info:

**Contact & Branding:**
- Lodge name and tagline
- Logo image
- Phone, WhatsApp, email
- Address
- Check-in/out times

**Navigation Menu:**
- Edit header menu links

**Footer:**
- Edit copyright text
- Add footer links

---

## Tips

- **Always click Publish** (green button) to make changes live
- **Use high-quality images** - 1920x1080 for heroes, 800x600 for cards
- **Preview changes** at http://localhost:3002
- **Descriptions should be short** - 1-2 sentences max for taglines

---

## Fixing the "_type" Error

If you see an error about "Property value missing _type", you have old data in the CMS. To fix:

1. Go to Homepage in the CMS
2. Delete any "Featured Rooms" entries that show errors
3. Re-add them by clicking "Add item" and selecting rooms
4. Click Publish
