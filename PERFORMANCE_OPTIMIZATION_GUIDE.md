# Performance Optimization Guide: Miky Hillside Lodge

This guide outlines actionable steps to make your Next.js + Sanity website load faster.

## 🚀 High Impact (Do These First)

### 1. Image Optimization (Critical)
**Why:** Images are usually the heaviest part of a lodge website.
**Strategy:**
- **Next.js Image Component:** Always use `<Image />` from `"next/image"` instead of `<img>`. It automatically resizes, lazy loads, and converts images to WebP/AVIF.
- **Sanity Image Loader:** Since you use Sanity, use a custom loader or the `next-sanity-image` package to request the exact size needed from Sanity's CDN.
- **Explicit Dimensions:** Always verify `width` and `height` props to prevent layout shift (CLS).
- **LCP Optimization:** For the "Hero" image (Main Homepage Image), add the `priority` prop. This tells the browser to load it immediately.

### 2. Optimize Fonts
**Why:** Custom fonts can block text from appearing (FOIT).
**Strategy:**
- **Use `next/font`:** You are likely already using this (checked `layout.tsx`). It downloads Google Fonts at build time and hosts them locally.
- **Subsetting:** Ensure you only load the subsets you need (e.g., `subsets: ['latin']`).

### 3. Database & Caching (Sanity)
**Why:** Fetching content on every page load is slow.
**Strategy:**
- **Stale-While-Revalidate (ISR):** In your `sanity-queries.ts`, ensure `fetch` calls use `next: { revalidate: 3600 }` (1 hour) or similar. This serves a cached page instantly while updating it in the background.
- **GROQ Projections:** Only fetch the fields you need. Don't fetch `*[_type == 'room']` without projections. Use `*[_type == 'room']{title, slug, price, "imageUrl": image.asset->url}`.

---

## ⚡ Medium Impact (Code & Delivery)

### 4. Code Splitting & Minification
**Why:** Loading huge JS bundles slows down interactivity.
**Strategy:**
- **Dynamic Imports:** If you have heavy components (like a complex Map or Video Player) that aren't visible immediately, use `next/dynamic`.
  ```tsx
  const HeavyMap = dynamic(() => import('./Map'), { ssr: false, loading: () => <p>Loading...</p> })
  ```
- **Next.js Defaults:** Next.js automatically minifies JS/CSS in production (`npm run build`). You don't need extra tools.

### 5. Render-Blocking Resources
**Why:** Browsers stop rendering to process CSS/JS in the `<head>`.
**Strategy:**
- **Inline Critical CSS:** Next.js does this automatically.
- **Defer Scripts:** Third-party scripts (analytics, chat widgets) should use the `Script` component with `strategy="lazyOnload"` or `strategy="afterInteractive"`.

### 6. Lazy Loading
**Why:** Don't load what the user doesn't see.
**Strategy:**
- **Images:** `<Image />` lazy loads by default.
- **Components:** See "Dynamic Imports" above.
- **Viewport Usage:** Use `IntersectionObserver` to only trigger animations when elements scroll into view.

---

## 🌐 Infrastructure (Server & CDN)

### 7. CDN (Content Delivery Network)
**Why:** Serve files from a server close to the user.
**Strategy:**
- **Vercel/Netlify:** If you deploy to Vercel, this is automatic.
- **Sanity CDN:** Ensure `useCdn: true` is set in your `sanity/lib/client.ts` for public data. This makes content fetch extremely fast from Sanity's edge locations.

### 8. Server Response Time (TTFB)
**Why:** If the server takes 2s to start sending data, the site feels broken.
**Strategy:**
- **Static Generation (Recommended):** Build pages statically (`generateStaticParams` for dynamic routes like `/rooms/[slug]`). This makes HTML response instant.
- **Edge Regions:** Deploy your database and frontend in the same region.

---

## 🛠️ Checklist for Miky Lodge

| Priority | Action Item | Estimated Impact |
|----------|-------------|------------------|
| 🔴 High | Add `priority` to Homepage Hero Image | Improves LCP by ~30% |
| 🔴 High | Set `useCdn: true` in Sanity Client | Faster content loading |
| 🟡 Med | Verify all `<Image />` tags have sizes | Zero Layout Shift |
| 🟡 Med | Convert heavy "Features" grid to static | Faster page navigation |
| 🟢 Low | Audit third-party scripts (if any) | Reduces main thread blocking |

## How to Measure?
Use **Lighthouse** (in Chrome DevTools > Lighthouse) or **PageSpeed Insights**.
- **LCP (Largest Contentful Paint):** Should be < 2.5s
- **CLS (Cumulative Layout Shift):** Should be < 0.1
- **INP (Interaction to Next Paint):** Should be < 200ms
