# Sanity CMS Setup Guide - Miky Hillside Lodge

## ✅ Integration Complete!

The site is now connected to Sanity CMS. Managers can update all content through Sanity Studio.

## 🔐 Setting Up Sanity Project

### 1. Create a Sanity Account (If you haven't already)

Visit: https://www.sanity.io/signup

### 2. Get Your Project Credentials

```bash
cd lodge-app
npm run sanity init
```

This will:
- Create a new Sanity project
- Give you a PROJECT_ID
- Set up a dataset (usually "production")

### 3. Update Environment Variables

Update `lodge-app/.env.local` with your real Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your-read-token-here
```

To get a read token:
1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to "API" → "Tokens"
4. Create a new token with "Viewer" permissions

### 4. Seed Initial Data (Optional)

To populate Sanity with the current mock data:

```bash
cd lodge-app
npx tsx scripts/seed-sanity.ts
```

This will create:
- 3 Room types (Cliffside Suite, Forest Chalet, Hilltop Villa)
- 5 Heritage Sites (Waterfalls, Monkey Sanctuary, etc.)

## 🎨 Accessing Sanity Studio

### Local Development
```
http://localhost:3001/studio
```

### Production
```
https://yourdomain.com/studio
```

## 📝 What Managers Can Edit

### Rooms
- ✅ Room title and tagline
- ✅ Price per night
- ✅ Capacity
- ✅ Description and amenities
- ✅ Images (main + gallery)
- ✅ Wi-Fi credentials
- ✅ Welcome video URL
- ✅ Room instructions

### Heritage Sites
- ✅ Site name and category
- ✅ Summary and full description
- ✅ Travel time from lodge
- ✅ GPS coordinates
- ✅ Images (main + gallery)
- ✅ Secret history/backstory

### Landing Page
- ✅ Hero section (image/video)
- ✅ Value propositions
- ✅ Lifestyle identifiers
- ✅ SEO metadata

## 🔄 How It Works

1. **Manager logs into Sanity Studio** at `/studio`
2. **Edits content** (rooms, heritage sites, etc.)
3. **Saves changes** in Sanity
4. **Changes appear immediately** on the website

The site automatically:
- Fetches content from Sanity
- Falls back to mock data if Sanity is unavailable
- Handles image URLs from Sanity CDN

## 🛡️ Data Fallback

The integration includes automatic fallback to mock data if:
- Sanity is unavailable
- API credentials are incorrect
- Network issues occur

This ensures the site always works!

## 👥 Adding Team Members

To give managers access to Sanity Studio:

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to "Members"
4. Invite team members with appropriate roles:
   - **Administrator**: Full access
   - **Editor**: Can edit content
   - **Viewer**: Read-only access

## 🚀 Deployment Notes

When deploying to production:

1. Set environment variables on your hosting platform
2. Ensure `/studio` route is accessible
3. Configure CORS in Sanity settings to allow your domain
4. Consider adding authentication middleware if needed

## 📚 Resources

- Sanity Documentation: https://www.sanity.io/docs
- Sanity Studio: https://www.sanity.io/docs/sanity-studio
- Next.js + Sanity: https://github.com/sanity-io/next-sanity

## 🆘 Troubleshooting

### "No content showing"
- Check environment variables are set correctly
- Verify Sanity project ID and dataset name
- Run the seed script to populate initial data

### "Images not loading"
- Ensure NEXT_PUBLIC_SANITY_PROJECT_ID is set
- Check image references in Sanity Studio
- Verify images are uploaded to Sanity

### "Can't access /studio"
- Restart the dev server: `npm run dev`
- Check for console errors
- Verify Sanity config in `sanity.config.ts`

---

**Need help?** Check the Sanity docs or reach out to support.
