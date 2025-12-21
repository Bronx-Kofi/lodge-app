# 📱 Complete Responsive Design System - Miky Hillside Lodge

## Current Status Audit

### ✅ What's Already Working
- Tailwind CSS configured with responsive utilities
- Basic breakpoint usage across components (sm:, md:, lg:, xl:, 2xl:)
- Mobile-first Tailwind approach
- Font variables and custom fonts loaded
- Some responsive typography (text-4xl md:text-5xl lg:text-6xl)

### ❌ What Needs Improvement
1. **No viewport meta tag configured**
2. **Inconsistent breakpoint usage**
3. **No responsive typography system**
4. **Images not optimized for different screen sizes**
5. **Mobile navigation needs work**
6. **Touch targets may be too small**
7. **No systematic responsive testing**

---

## 1. Viewport Configuration & Meta Tags

### Implementation: Root Layout
**File: `app/layout.tsx`**

```typescript
export const metadata: Metadata = {
  title: "Miky Hillside Lodge",
  description: "Off-Grid Luxury in Ghana's Bono Region",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5, // Allow zoom for accessibility
    userScalable: true,
  },
  // PWA Meta tags for mobile
  themeColor: '#FF6B35',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Miky Lodge',
  },
};
```

---

## 2. Breakpoint Strategy

### Standard Tailwind Breakpoints (Mobile-First)
```javascript
{
  'sm': '640px',   // Mobile landscape / Small tablets
  'md': '768px',   // Tablets
  'lg': '1024px',  // Laptop / Small desktop
  'xl': '1280px',  // Desktop
  '2xl': '1536px', // Large desktop / Ultra-wide
}
```

### Our Usage Convention
- **Default (< 640px)**: Mobile portrait - stack everything, large touch targets
- **sm (640px+)**: Mobile landscape - 2 columns for cards, compact spacing
- **md (768px+)**: Tablet - 2-3 columns, show more content
- **lg (1024px+)**: Laptop - Full layout, side-by-side content
- **xl (1280px+)**: Desktop - Maximum content width (1280px), generous spacing
- **2xl (1536px+)**: Ultra-wide - Same as xl but with more padding

---

## 3. Responsive Typography System

### Scale System
```javascript
// tailwind.config.ts additions
fontSize: {
  // Mobile-first with responsive scaling
  'display-xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],   // 48px mobile
  'display-lg': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }], // 40px mobile
  'display-md': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],    // 32px mobile
  
  // Desktop overrides
  'display-xl-lg': ['5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],   // 80px desktop
  'display-lg-lg': ['4rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],  // 64px desktop
  'display-md-lg': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }], // 56px desktop
}
```

### Usage Pattern
```tsx
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
  Hero Headline
</h1>
```

### Fluid Typography (Clamp)
```css
/* globals.css additions */
.heading-hero {
  font-size: clamp(2.5rem, 5vw, 5rem);
}

.heading-section {
  font-size: clamp(2rem, 4vw, 3.5rem);
}

.text-body-lg {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
}
```

---

## 4. Image & Media Responsiveness

### Next.js Image Component Usage
```tsx
import Image from 'next/image';

<Image
  src={imageSrc}
  alt="Description"
  width={1920}
  height={1080}
  sizes="(max-width: 640px) 100vw, 
         (max-width: 1024px) 80vw, 
         1280px"
  quality={85}
  priority={isAboveTheFold}
  className="object-cover"
/>
```

### Responsive Image Srcsets
```tsx
// For Sanity images
const imageUrl = urlForImage(image)
  .width(1920)
  .height(1080)
  .auto('format')
  .quality(85)
  .url();

// Responsive srcset
const srcset = [
  `${urlForImage(image).width(640).url()} 640w`,
  `${urlForImage(image).width(1024).url()} 1024w`,
  `${urlForImage(image).width(1920).url()} 1920w`,
  `${urlForImage(image).width(2560).url()} 2560w`, // Retina displays
].join(', ');
```

### Video Responsiveness
```tsx
<video
  className="w-full h-full object-cover"
  autoPlay
  muted
  loop
  playsInline // Critical for iOS
  preload="metadata"
>
  <source src={videoSrc} type="video/mp4" />
</video>
```

---

## 5. Touch-Friendly Interactive Elements

### Minimum Touch Target Sizes
```css
/* Following WCAG 2.1 Level AAA */
.touch-target {
  min-height: 44px; /* iOS minimum */
  min-width: 44px;
}

.touch-target-comfortable {
  min-height: 48px; /* Recommended */
  min-width: 48px;
}
```

### Button Component Standards
```tsx
// Responsive button sizing
<button className="
  px-6 py-3           /* Mobile: 48px+ height */
  sm:px-8 sm:py-4     /* Tablet: 56px+ height */
  lg:px-10 lg:py-5    /* Desktop: 64px+ height */
  text-base sm:text-lg /* Scalable text */
  rounded-full
  touch-manipulation  /* Optimize for touch */
">
  Book Now
</button>
```

### Mobile Navigation
```tsx
// Mobile menu button
<button 
  className="md:hidden p-3 -mr-2" 
  aria-label="Toggle menu"
>
  <svg className="w-6 h-6" /> {/* 48px tap target */}
</button>

// Mobile menu
<nav className="
  fixed inset-0 z-50
  md:relative md:inset-auto
  bg-white md:bg-transparent
  transform transition-transform
  ${isOpen ? 'translate-x-0' : 'translate-x-full'}
  md:translate-x-0
">
  {/* Full-screen mobile menu */}
</nav>
```

---

## 6. Flexible Grid Systems

### Component Grid Pattern
```tsx
// Responsive card grid
<div className="
  grid
  grid-cols-1          /* Mobile: 1 column */
  sm:grid-cols-2       /* Small tablet: 2 columns */
  lg:grid-cols-3       /* Desktop: 3 columns */
  gap-6                /* Mobile gap */
  md:gap-8             /* Tablet gap */
  lg:gap-10            /* Desktop gap */
">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### Content Layout Pattern
```tsx
// Article layout with sidebar
<div className="
  grid 
  grid-cols-1          /* Mobile: Stack */
  lg:grid-cols-3       /* Desktop: 2/3 + 1/3 split */
  gap-8 
  lg:gap-12
">
  <article className="lg:col-span-2">
    {/* Main content */}
  </article>
  <aside className="lg:col-span-1">
    {/* Sticky sidebar */}
  </aside>
</div>
```

---

## 7. Responsive Tables & Data

### Mobile Card Pattern
```tsx
// Desktop table, mobile cards
<div className="hidden md:block">
  <table className="w-full">
    {/* Full table for desktop */}
  </table>
</div>

<div className="md:hidden space-y-4">
  {data.map(item => (
    <div key={item.id} className="card-elevated p-4">
      {/* Card layout for mobile */}
    </div>
  ))}
</div>
```

### Horizontal Scroll Pattern
```tsx
<div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
  <table className="w-full min-w-[600px]">
    {/* Table can scroll horizontally on mobile */}
  </table>
</div>
```

---

## 8. Responsive Forms

### Form Layout
```tsx
<form className="space-y-6">
  {/* Full width on mobile, side-by-side on desktop */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-medium mb-2">
        First Name
      </label>
      <input 
        type="text"
        className="
          w-full
          px-4 py-3        /* Touch-friendly */
          text-base        /* Prevents iOS zoom */
          rounded-lg
          border border-neutral-200
          focus:ring-2 focus:ring-orange
        "
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-2">
        Last Name
      </label>
      <input type="text" className="..." />
    </div>
  </div>
  
  {/* Full width textarea */}
  <div>
    <label className="block text-sm font-medium mb-2">
      Message
    </label>
    <textarea 
      rows="4"
      className="w-full px-4 py-3 text-base rounded-lg border"
    />
  </div>
  
  {/* Responsive button */}
  <button className="w-full md:w-auto px-8 py-4 btn-primary">
    Submit
  </button>
</form>
```

### iOS Input Zoom Prevention
```css
/* Prevents iOS from zooming on input focus */
input[type="text"],
input[type="email"],
input[type="tel"],
textarea,
select {
  font-size: 16px !important; /* Minimum to prevent zoom */
}
```

---

## 9. Cross-Browser Compatibility

### CSS Resets & Fixes
```css
/* globals.css additions */
@layer base {
  /* Smooth scrolling for all browsers */
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Fix for iOS Safari viewport height */
  body {
    min-height: 100vh;
    min-height: -webkit-fill-available;
  }
  
  /* Prevent text inflation on iOS */
  body {
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }
  
  /* Better touch scrolling on iOS */
  * {
    -webkit-overflow-scrolling: touch;
  }
  
  /* Fix for flexbox gap support */
  @supports not (gap: 1rem) {
    .gap-fallback > * + * {
      margin-top: 1rem;
    }
  }
}
```

### Feature Detection
```tsx
// Use CSS.supports for feature detection
const supportsGrid = CSS.supports('display', 'grid');
const supportsBackdrop = CSS.supports('backdrop-filter', 'blur(10px)');
```

---

## 10. Testing Strategy

### Device Testing Matrix
| Device Type | Screen Size | Test Priority |
|------------|-------------|---------------|
| iPhone SE | 375x667 | HIGH |
| iPhone 12/13 | 390x844 | HIGH |
| iPhone 14 Pro Max | 430x932 | HIGH |
| iPad | 768x1024 | MEDIUM |
| iPad Pro | 1024x1366 | MEDIUM |
| Laptop | 1366x768 | HIGH |
| Desktop | 1920x1080 | HIGH |
| Ultra-wide | 2560x1440 | LOW |

### Browser Testing Matrix
- ✅ Chrome (Desktop & Mobile)
- ✅ Safari (Desktop & iOS)
- ✅ Firefox (Desktop)
- ✅ Edge (Desktop)
- ✅ Samsung Internet (Mobile)

### Testing Tools
```bash
# Browser DevTools
# Chrome: F12 → Device Toolbar (Ctrl+Shift+M)
# Safari: Develop → Enter Responsive Design Mode

# Real device testing services
# - BrowserStack
# - LambdaTest
# - Sauce Labs

# Local responsive testing
npm run dev
# Then open in multiple browsers and use responsive modes
```

### Automated Testing
```typescript
// Playwright responsive tests
import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1920, height: 1080 },
];

viewports.forEach(({ name, width, height }) => {
  test(`renders correctly on ${name}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await expect(page).toHaveScreenshot(`${name}.png`);
  });
});
```

---

## Implementation Checklist

### Phase 1: Foundation (Immediate)
- [ ] Add viewport meta tag to layout
- [ ] Configure Tailwind breakpoints documentation
- [ ] Add fluid typography utilities
- [ ] Fix iOS zoom issues on inputs
- [ ] Add touch-manipulation CSS

### Phase 2: Components (Week 1)
- [ ] Audit and fix all navigation components
- [ ] Standardize button touch targets (min 48px)
- [ ] Fix calendar modal responsiveness
- [ ] Optimize all images with Next.js Image
- [ ] Add responsive srcsets to Sanity images

### Phase 3: Pages (Week 2)
- [ ] Homepage: Test all breakpoints
- [ ] Rooms page: Fix card grid on mobile
- [ ] Room detail: Fix gallery and booking widget
- [ ] Explore page: Fix heritage cards layout
- [ ] About page: Fix map and content grid

### Phase 4: Testing (Week 3)
- [ ] Test on real iOS devices
- [ ] Test on real Android devices
- [ ] Test on tablets
- [ ] Browser compatibility testing
- [ ] Performance testing on slow connections

### Phase 5: Optimization (Ongoing)
- [ ] Lazy load images below fold
- [ ] Optimize font loading
- [ ] Add skeleton loaders
- [ ] Implement progressive enhancement
- [ ] Monitor Core Web Vitals

---

## Quick Reference: Common Patterns

### Responsive Container
```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

### Responsive Spacing
```tsx
<section className="py-12 sm:py-16 md:py-20 lg:py-24">
  {/* Section content */}
</section>
```

### Responsive Typography
```tsx
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
  Headline
</h1>
<p className="text-base sm:text-lg md:text-xl">
  Body text
</p>
```

### Responsive Images
```tsx
<Image
  src={src}
  alt={alt}
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover"
/>
```

### Show/Hide at Breakpoints
```tsx
<div className="block md:hidden">Mobile only</div>
<div className="hidden md:block">Desktop only</div>
<div className="hidden sm:block lg:hidden">Tablet only</div>
```

---

## Performance Targets

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Mobile Performance
- **First Contentful Paint**: < 1.8s (3G)
- **Time to Interactive**: < 3.8s (3G)
- **Speed Index**: < 3.4s (3G)

---

## Resources

### Documentation
- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Web.dev Responsive Design](https://web.dev/responsive-web-design-basics/)
- [MDN Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

### Tools
- [Responsively App](https://responsively.app/) - Multi-device testing
- [BrowserStack](https://www.browserstack.com/) - Real device testing
- [Chrome DevTools Device Mode](https://developer.chrome.com/docs/devtools/device-mode/)
- [PageSpeed Insights](https://pagespeed.web.dev/) - Performance testing

---

**Status**: Ready for implementation
**Last Updated**: 2025-12-21
**Next Review**: After Phase 1 completion
