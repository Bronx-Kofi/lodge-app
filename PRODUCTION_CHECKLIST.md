# Production Deployment Checklist

## Pre-Deployment

### 1. Environment Setup
- [ ] Push code to Git repository (GitHub/GitLab/Bitbucket)
- [ ] Get Sanity Project ID from `sanity.cli.ts` or Sanity dashboard
- [ ] Create or verify production dataset in Sanity
- [ ] Generate Sanity API Read Token (Viewer permissions)
- [ ] Have all environment variables ready

### 2. Sanity Configuration
- [ ] Production dataset created and populated with content
- [ ] All rooms have images uploaded
- [ ] Site settings configured (contact info, social links)
- [ ] Homepage content ready
- [ ] Test all content in Sanity Studio locally

### 3. Code Quality
- [ ] Run `npm run lint` - no errors
- [ ] Test production build locally (see below)
- [ ] All temporary test files removed
- [ ] No console.logs in production code

## Netlify Setup

### 4. Create Netlify Site
- [ ] Sign up/login to Netlify
- [ ] Import project from Git
- [ ] Set base directory to `lodge-app`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `.next`

### 5. Configure Environment Variables in Netlify
Go to: **Site settings → Environment variables**

Required variables:
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` = your-project-id
- [ ] `NEXT_PUBLIC_SANITY_DATASET` = production
- [ ] `SANITY_API_READ_TOKEN` = your-token

### 6. Install Netlify Plugin
- [ ] Enable @netlify/plugin-nextjs (automatic or manual)

### 7. Configure Sanity CORS
Go to: **Sanity Manage → Your Project → API → CORS origins**

Add these origins:
- [ ] `https://your-site-name.netlify.app`
- [ ] `https://your-site-name.netlify.app/studio`
- [ ] Enable "Allow credentials" for both

## First Deployment

### 8. Deploy
- [ ] Click "Deploy site" in Netlify
- [ ] Monitor build logs for errors
- [ ] Wait for deployment to complete (3-5 minutes)

### 9. Post-Deploy Verification
- [ ] Visit `https://your-site-name.netlify.app`
- [ ] Homepage loads correctly
- [ ] Images display properly
- [ ] All pages accessible (Rooms, About, Explore, etc.)
- [ ] Visit `/studio` - Sanity Studio loads
- [ ] Login to Studio works
- [ ] Can edit content in Studio

### 10. Test Key Features
- [ ] Hero section displays
- [ ] Room listings show
- [ ] Individual room pages work
- [ ] Booking calendar displays
- [ ] Heritage sites page loads
- [ ] About page with map
- [ ] Mobile responsiveness
- [ ] All amenities (including new Living Room & Car Park) display

## Optional Enhancements

### 11. Custom Domain (if applicable)
- [ ] Add custom domain in Netlify
- [ ] Configure DNS settings
- [ ] Wait for SSL certificate (automatic)
- [ ] Update Sanity CORS with custom domain
- [ ] Test site on custom domain

### 12. Webhooks for Auto-Deploy
- [ ] Create build hook in Netlify
- [ ] Add webhook to Sanity
- [ ] Test: Edit content in Sanity → Site rebuilds

### 13. Monitoring & Analytics
- [ ] Enable Netlify Analytics (optional, paid)
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure uptime monitoring

## Testing Production Build Locally

Before deploying, test the production build:

```bash
cd lodge-app

# Build for production
npm run build

# Start production server
npm start
```

Then visit:
- http://localhost:3000 (frontend)
- http://localhost:3000/studio (Sanity Studio)

Test:
- All pages load without errors
- Images display correctly
- No console errors
- Studio is accessible
- Content displays properly

## Quick Reference

### Your Sanity Project ID
Run this to find it:
```bash
cd lodge-app
grep -A 1 "projectId" sanity.cli.ts
```

Or check: https://www.sanity.io/manage

### Get Your Site URL
After first deploy: `https://[random-name].netlify.app`

You can customize this in: **Site settings → Domain management → Change site name**

## Troubleshooting

### Build fails
- Check environment variables are set correctly
- Review build logs in Netlify
- Test build locally first

### Images don't load
- Verify Sanity Project ID is correct
- Check image URLs in browser console
- Ensure images are published in Sanity

### Studio won't load
- Add Netlify URL to Sanity CORS origins
- Clear browser cache
- Check `/studio` route exists

### Content changes don't appear
- Content is cached for performance
- Set up webhooks for auto-rebuild
- Or manually trigger deploy in Netlify

## Support Resources

- **Netlify Docs**: https://docs.netlify.com/
- **Next.js on Netlify**: https://docs.netlify.com/frameworks/next-js/
- **Sanity Docs**: https://www.sanity.io/docs
- **Deployment Guide**: See `NETLIFY_DEPLOYMENT_GUIDE.md`

---

✅ **Once all items are checked, you're ready to go live!**
