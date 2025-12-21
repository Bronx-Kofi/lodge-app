# Netlify Deployment Guide for Lodge App

## Prerequisites
- A Netlify account (free tier works fine)
- Your Sanity project credentials
- Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Push Your Code to Git

Make sure all your code is committed and pushed to your Git repository:

```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

## Step 2: Connect to Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose your Git provider (GitHub/GitLab/Bitbucket)
4. Select your lodge-app repository
5. Configure build settings:
   - **Base directory:** `lodge-app`
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`

## Step 3: Configure Environment Variables

In Netlify, go to **Site settings** → **Environment variables** and add:

### Required Variables:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your-read-token
```

### How to Get These Values:

#### 1. Get Sanity Project ID:
```bash
cd lodge-app
cat sanity.cli.ts
```
Look for `projectId` in the output.

#### 2. Create Production Dataset (if not exists):
- Go to [Sanity Manage](https://www.sanity.io/manage)
- Select your project
- Go to "Datasets"
- Create a new dataset called `production` (or use existing)
- Copy all content from your development dataset to production

#### 3. Create Read Token:
- Go to [Sanity Manage](https://www.sanity.io/manage)
- Select your project
- Go to "API" → "Tokens"
- Click "Add API token"
- Name: "Netlify Production"
- Permissions: "Viewer" (read-only)
- Copy the token (you won't see it again!)

## Step 4: Install Netlify Next.js Plugin

The plugin is already configured in `netlify.toml`, but you need to enable it:

1. In Netlify dashboard, go to **Integrations** → **Build plugins**
2. Search for "Next.js"
3. Install "@netlify/plugin-nextjs"

Or Netlify will automatically detect and install it on first deploy.

## Step 5: Configure Sanity CORS Origins

Allow your Netlify domain to access Sanity:

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project
3. Go to "API" → "CORS origins"
4. Click "Add CORS origin"
5. Add your Netlify URL: `https://your-site-name.netlify.app`
6. Allow credentials: ✓

**Important:** Add both:
- `https://your-site-name.netlify.app` (for frontend)
- `https://your-site-name.netlify.app/studio` (for Sanity Studio)

## Step 6: Deploy!

1. Click "Deploy site" in Netlify
2. Wait for build to complete (3-5 minutes)
3. Your site will be live at `https://your-site-name.netlify.app`

## Step 7: Configure Custom Domain (Optional)

1. In Netlify, go to **Domain settings**
2. Click "Add custom domain"
3. Follow instructions to:
   - Add domain
   - Configure DNS (Netlify DNS recommended)
   - Enable HTTPS (automatic with Let's Encrypt)

**Don't forget:** After adding custom domain, update Sanity CORS origins!

## Step 8: Set Up Deploy Hooks (Optional but Recommended)

Auto-deploy when content changes in Sanity:

1. In Netlify: **Site settings** → **Build & deploy** → **Build hooks**
2. Click "Add build hook"
3. Name: "Sanity Content Update"
4. Copy the webhook URL

5. In Sanity Studio at `sanity.config.ts`, add deploy hook or use Sanity webhooks:
   - Go to [Sanity Manage](https://www.sanity.io/manage)
   - Select your project → "API" → "Webhooks"
   - Add webhook with your Netlify build hook URL
   - Trigger on: All datasets, All document types

## Troubleshooting

### Build Fails
- Check build logs in Netlify
- Verify all environment variables are set
- Make sure Node version is 20 (specified in `.nvmrc`)

### Sanity Studio Not Loading
- Verify CORS origins include your Netlify domain
- Check that `/studio` route is accessible
- Clear browser cache

### Images Not Loading
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Check Sanity image URL in browser console
- Ensure images are published in Sanity

### 404 Errors
- Netlify automatically handles Next.js routing
- If issues persist, check `netlify.toml` redirects

## Production Checklist

Before going live:

- [ ] All environment variables configured
- [ ] Sanity CORS origins added
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (automatic)
- [ ] Test all pages load correctly
- [ ] Test Sanity Studio access at `/studio`
- [ ] Verify image optimization working
- [ ] Check mobile responsiveness
- [ ] Test booking flow
- [ ] Set up Netlify forms (if using contact forms)
- [ ] Configure deploy hooks for auto-updates
- [ ] Set up monitoring/analytics

## Useful Commands

Test production build locally:
```bash
cd lodge-app
npm run build
npm start
```

Generate Sanity types:
```bash
cd lodge-app
npm run typegen
```

## Performance Tips

1. **Enable Netlify CDN** (automatic)
2. **Use Netlify Image CDN** for faster image delivery
3. **Enable Netlify Analytics** to monitor performance
4. **Set up Split Testing** for A/B tests (if needed)

## Support

- Netlify Docs: https://docs.netlify.com/
- Next.js on Netlify: https://docs.netlify.com/frameworks/next-js/
- Sanity Docs: https://www.sanity.io/docs

---

**Your site will be live at:** `https://your-site-name.netlify.app`

**Sanity Studio at:** `https://your-site-name.netlify.app/studio`
