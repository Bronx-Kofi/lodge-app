# Video Upload & Management Guide

## Overview

The Lodge application now supports video uploads and playback across all major sections:

- **Hero Section**: Cinematic landing page videos with adaptive loading
- **Room Galleries**: Mixed media galleries with images and videos
- **Concierge Services**: Welcome videos and service demonstrations
- **Heritage Sites**: Tour videos and location showcases

## Features

### ✅ Video Support
- **Direct Uploads**: Upload MP4, MOV, WebM files directly to Sanity
- **External URLs**: Embed YouTube and Vimeo videos
- **Adaptive Loading**: Videos load based on connection speed (Bono-Speed tiering)
- **Fallback Images**: Poster images for slow connections
- **Responsive Player**: Industry-standard video player with controls

### ✅ Gallery Enhancement
- **Mixed Media**: Combine images and videos in galleries
- **Video Thumbnails**: Visual indicators for video content
- **Smooth Transitions**: Animated switching between media items
- **Lazy Loading**: Videos load only when visible

## How to Upload Videos in Sanity

### 1. Landing Page Hero Video

1. Navigate to **Sanity Studio** (`/studio`)
2. Open **Landing Page** (singleton document)
3. In the **Hero Section**:
   - Upload video in **Hero Video** field
   - Required: Add **Fallback Image** (shown on slow connections)
   - Optional: Add **Headline** and **Overlay Text**

**Recommended Settings:**
- Format: MP4 (H.264 codec)
- Resolution: 1920x1080 or 3840x2160
- Duration: 10-30 seconds (loop)
- File size: < 50MB for optimal performance

### 2. Room Gallery Videos

1. Go to **Rooms** in Sanity Studio
2. Select a room or create new
3. In **Gallery** section:
   - Add new gallery item
   - Select **Media Type**: Video
   - **Option A - Upload**: Use **Video** field for direct upload
   - **Option B - External**: Use **Video URL** for YouTube/Vimeo
   - Add **Caption** for accessibility
   - Optional: Upload thumbnail image

**Best Practices:**
- Mix videos with images for rich galleries
- First item (index 0) loads as default
- Use descriptive captions
- Provide poster images for better UX

### 3. Gallery Images Document

1. Navigate to **Gallery (Images & Videos)**
2. Click **Create New**
3. Fill in:
   - **Title**: Descriptive name
   - **Media Type**: Select Image or Video
   - **Video/Image Upload**: Upload your file
   - **Category**: Select appropriate category
   - **Tags**: Add searchable keywords
   - **Featured**: Toggle for homepage display

## Technical Implementation

### Components Created

#### `VideoPlayer.tsx`
Reusable video player component with:
- Native HTML5 video support
- YouTube/Vimeo iframe embedding
- Lazy loading with IntersectionObserver
- Loading states and error handling
- Customizable controls

#### `RoomGallery.tsx` (Enhanced)
Updated to support:
- Mixed media items (images + videos)
- Video indicators on thumbnails
- Seamless switching between media types
- Responsive grid layout

### Utilities Added

#### `sanity/lib/utils.ts`
```typescript
urlForVideo(source): string | undefined
urlForFile(source): string | undefined
```

#### `lib/rooms/gallery-helpers.ts`
```typescript
transformGalleryData(galleryData): GalleryItem[]
getVideoUrl(videoData): string | undefined
```

### Queries Updated

All Sanity queries now fetch video fields:
- `lib/rooms/sanity-queries.ts`: Room galleries with video support
- `lib/landing/sanity-queries.ts`: Landing page hero videos

## File Structure

```
lodge-app/
├── app/
│   ├── _components/
│   │   └── VideoPlayer.tsx (NEW)
│   └── (marketing)/
│       ├── page.tsx (UPDATED - hero video support)
│       └── rooms/[slug]/
│           └── _components/
│               └── RoomGallery.tsx (UPDATED)
├── lib/
│   ├── landing/
│   │   └── sanity-queries.ts (NEW)
│   └── rooms/
│       ├── gallery-helpers.ts (NEW)
│       └── sanity-queries.ts (UPDATED)
└── sanity/
    ├── lib/
    │   └── utils.ts (UPDATED - video utilities)
    └── schemas/
        ├── blocks/
        │   └── hero-block.ts (Already supports video)
        └── documents/
            ├── gallery-image.ts (Already supports video)
            ├── room.ts (Already supports welcomeVideo)
            └── landing-page.ts (Already supports hero video)
```

## Video Specifications

### Recommended Formats
- **Container**: MP4
- **Video Codec**: H.264 (high compatibility)
- **Audio Codec**: AAC
- **Frame Rate**: 24-30 fps

### Size Guidelines
| Usage | Max Size | Resolution | Duration |
|-------|----------|------------|----------|
| Hero Video | 50MB | 1920x1080+ | 10-30s |
| Gallery Video | 30MB | 1280x720+ | 30-60s |
| Welcome Video | 20MB | 1280x720 | 1-2min |
| Tour Video | 50MB | 1920x1080 | 2-5min |

### Compression Tips
Use tools like:
- **HandBrake** (free, open-source)
- **FFmpeg** command line
- **Adobe Media Encoder**

Example FFmpeg command:
```bash
ffmpeg -i input.mov -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4
```

## Browser Support

✅ Supported:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Chrome Android

❌ Limitations:
- Autoplay requires muted audio (browser policy)
- Mobile data connections may skip video (intentional)

## Performance Optimization

### Bono-Speed Tiering
The application automatically detects connection speed:

1. **Fast Connection (4G/WiFi)**: 
   - Loads video after image
   - Smooth progressive enhancement

2. **Slow Connection (2G/3G)**:
   - Shows image only
   - Skips video download
   - Ensures < 2s LCP (Largest Contentful Paint)

### Lazy Loading
- Videos load only when scrolled into view
- Reduces initial page load
- Saves bandwidth for users

## Troubleshooting

### Video Not Showing
1. Check file format (MP4 recommended)
2. Verify file uploaded to Sanity successfully
3. Ensure fallback image is set
4. Check browser console for errors

### Video Quality Issues
1. Re-encode with recommended settings
2. Reduce resolution if file size > 50MB
3. Use professional compression tools

### Slow Loading
1. Reduce file size (target < 30MB)
2. Use lower resolution for mobile
3. Consider external hosting (YouTube/Vimeo)

## Next Steps

### Potential Enhancements
- [ ] Video thumbnails auto-generation
- [ ] Multiple resolution support (adaptive bitrate)
- [ ] Video analytics tracking
- [ ] Caption/subtitle support
- [ ] Full-screen gallery lightbox
- [ ] Swipeable mobile gallery

### External Video Services
For high-traffic sites, consider:
- **Cloudflare Stream**: Optimized video delivery
- **Vimeo Pro**: Professional hosting
- **YouTube**: Free hosting with branding

## Support

For questions or issues:
- Review Sanity documentation: https://www.sanity.io/docs/file-type
- Check browser compatibility: https://caniuse.com/video
- Contact development team

---

Last Updated: 2025-12-18
Version: 1.0
