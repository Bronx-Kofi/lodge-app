# 📁 WordPress-Style Media Library Guide

## 🎉 Your Gallery Now Works Like WordPress Media Library!

I've restructured your Sanity CMS to work exactly like WordPress Media Library where you:
1. **Upload media once** to a central library
2. **Reuse it everywhere** across multiple rooms, pages, etc.

---

## 🔄 What Changed?

### **Before (Inline Uploads)**
```
Room 1 → Upload Image A, B, C (stored in Room 1)
Room 2 → Upload Image A, D, E (duplicates Image A!)
```
❌ Duplicate uploads  
❌ Hard to manage  
❌ No central library

### **After (Media Library - WordPress Style)**
```
Media Library → Image A, B, C, D, E (stored once)
Room 1 → Reference Image A, B, C
Room 2 → Reference Image A, D, E
```
✅ Upload once, use everywhere  
✅ Easy to manage  
✅ Central media library  
✅ Organized by categories

---

## 📸 How to Use (WordPress-Style Workflow)

### **Step 1: Upload to Media Library**

1. **Open Sanity Studio:** http://localhost:3001/studio
2. **Click "Gallery (Images & Videos)"** in left sidebar (your Media Library!)
3. **Click "Create" button** (+ icon)
4. Fill in the fields:

**Required Fields:**
- **Media Title**: "Sunrise Suite Bedroom View"
- **Media Type**: Image or Video
- **Image/Video**: Upload your file
- **Category**: Select "Rooms & Accommodations"

**Optional but Recommended:**
- **Caption**: "Spacious bedroom with king-size bed"
- **Tags**: Add keywords like "bedroom", "suite", "luxury"
- **Featured Image**: Toggle if you want it on homepage
- **Display Order**: Lower numbers appear first

5. **Click Publish**

---

### **Step 2: Use in Your Room**

1. **Go to "Rooms"** in Sanity Studio
2. **Open your room** (e.g., "The Sunrise Suite")
3. **Scroll to "Gallery" field**
4. **Click "Add item"**
5. **Search and select** from your Media Library!
   - Type to search by title
   - Filter by category (automatically shows "Rooms" category)
   - Select multiple items

6. **Click Publish**

---

## 🎯 Media Library Features

### **Organized by Categories**
Your media is organized into categories just like WordPress:

- 🛏️ **Rooms & Accommodations** - Room photos
- 🎊 **Event Halls** - Hall and conference photos
- 🍽️ **Restaurant & Dining** - Food and dining area
- 👨‍🍳 **Kitchen & Catering** - Kitchen and food prep
- 🏨 **Hotel Exterior** - Building exterior shots
- 🏊 **Hotel Facilities** - Pool, gym, spa, etc.
- 🎉 **Events & Functions** - Wedding, conferences
- 👥 **Staff & Team** - Team photos
- 🗺️ **Nearby Attractions** - Local tourism spots

### **Smart Filtering**
When adding gallery items to a room, Sanity automatically:
- Shows only "Rooms & Accommodations" category
- But you can also select from other categories if needed
- Search by title, tags, or caption

### **Media Details**
Each media item can have:
- ✅ Title (required)
- ✅ Category (required)
- ✅ Caption/description
- ✅ Tags for searchability
- ✅ Featured flag
- ✅ Display order
- ✅ Photographer credit

---

## 📋 Workflow Examples

### **Example 1: Room with Gallery**

**Step 1 - Upload to Media Library:**
1. Gallery → Create → Upload "sunrise-bedroom.jpg" → Category: Rooms → Publish
2. Gallery → Create → Upload "sunrise-bathroom.jpg" → Category: Rooms → Publish
3. Gallery → Create → Upload "sunrise-balcony.jpg" → Category: Rooms → Publish
4. Gallery → Create → Upload "sunrise-tour.mp4" → Category: Rooms → Publish

**Step 2 - Add to Room:**
1. Rooms → The Sunrise Suite
2. Gallery → Add item → Search "sunrise"
3. Select all 4 items (3 images + 1 video)
4. Publish

**Result:** ✅ Mixed media gallery with images and videos!

---

### **Example 2: Reuse Across Multiple Rooms**

**Scenario:** You have a beautiful pool photo you want to show in multiple rooms.

**Step 1 - Upload Once:**
1. Gallery → Create
2. Upload "hotel-pool.jpg"
3. Category: "Hotel Facilities"
4. Tags: "pool", "swimming", "amenities"
5. Publish

**Step 2 - Use in Multiple Rooms:**
1. Room 1 → Gallery → Add → Search "pool" → Select
2. Room 2 → Gallery → Add → Search "pool" → Select
3. Room 3 → Gallery → Add → Search "pool" → Select

**Result:** ✅ Same image used in 3 rooms, stored only once!

---

### **Example 3: Update Media Once, Reflects Everywhere**

**Scenario:** You need to replace a photo across all rooms.

**Old Way (Inline):**
1. Open Room 1 → Replace image
2. Open Room 2 → Replace same image
3. Open Room 3 → Replace same image again
❌ Tedious and error-prone!

**New Way (Media Library):**
1. Gallery → Find the media item
2. Replace the image file
3. Publish
✅ **All rooms automatically show the new image!**

---

## 🎬 Video Support

Your Media Library supports videos too!

### **Upload Video:**
1. Gallery → Create
2. Media Type: **Video**
3. **Option A:** Upload MP4/MOV file directly
4. **Option B:** Paste YouTube/Vimeo URL
5. Add a poster image (optional but recommended)
6. Category: Select appropriate category
7. Publish

### **Use in Gallery:**
1. Room → Gallery → Add item
2. Search for your video
3. Select and publish
4. ✅ Video plays in the gallery with play button overlay!

---

## 🔍 Search & Filter

### **In Media Library:**
- Search by title: "sunrise bedroom"
- Filter by category: "Rooms & Accommodations"
- Sort by: Featured, Date, Order Priority

### **When Adding to Room:**
- Auto-filtered to show "Rooms" category first
- Type to search across all fields
- Tags make items easy to find

---

## 💡 Best Practices

### **Naming Convention:**
```
✅ Good: "sunrise-suite-bedroom-view.jpg"
✅ Good: "pool-area-evening-shot.jpg"
❌ Bad: "IMG_1234.jpg"
❌ Bad: "photo.jpg"
```

### **Categories:**
- Always assign a category
- Use consistent categorization
- One media item, one primary category

### **Tags:**
- Add 3-5 relevant tags per item
- Use lowercase
- Examples: "luxury", "suite", "bedroom", "view"

### **Captions:**
- Write descriptive captions
- Good for SEO and accessibility
- Explain what's in the image/video

### **Featured Images:**
- Mark best images as "Featured"
- These can appear on homepage
- Use sparingly (3-5 total)

---

## 📊 Before vs After Comparison

| Feature | Before (Inline) | After (Media Library) |
|---------|----------------|----------------------|
| Upload location | Inside each room | Central Gallery |
| Reusability | ❌ No | ✅ Yes |
| Update once | ❌ No | ✅ Yes |
| Organization | ❌ Scattered | ✅ Categorized |
| Search | ❌ Limited | ✅ Full search |
| Tagging | ❌ No | ✅ Yes |
| Video support | ✅ Yes | ✅ Yes |
| Mixed media | ✅ Yes | ✅ Yes |

---

## 🚀 Quick Start Checklist

- [ ] Go to "Gallery (Images & Videos)" in Studio
- [ ] Upload 5-10 media items with proper categories
- [ ] Add captions and tags to each
- [ ] Go to a Room
- [ ] Remove old inline images (if any)
- [ ] Add items from Media Library
- [ ] Publish and view on frontend
- [ ] ✅ See your media displaying perfectly!

---

## 🎯 Frontend Impact

**No changes needed on your part!**

The frontend automatically:
- ✅ Fetches referenced gallery items
- ✅ Displays images and videos
- ✅ Shows captions
- ✅ Handles mixed media
- ✅ Optimizes images through Next.js

Everything works exactly the same for visitors, but **much easier for you to manage!**

---

## 🔧 Technical Details

### **Schema Changes:**
```typescript
// OLD: Inline images
gallery: array of [image]

// NEW: References to Media Library
gallery: array of [reference to galleryImage]
```

### **Query Updates:**
```groq
// Fetches full gallery item details
gallery[]-> {
  _id,
  title,
  mediaType,
  image { asset-> { url } },
  video { asset-> { url } },
  videoUrl,
  caption,
  category,
  tags
}
```

### **Frontend:**
Gallery transformation handles both:
- Referenced gallery items (new)
- Inline images (backward compatible)

---

## ❓ FAQ

**Q: Can I still upload images directly in the Room?**  
A: Yes! The "Main Image" field still allows direct upload. But use the Media Library for galleries.

**Q: What happens to my old inline images?**  
A: They'll still work! The system is backward compatible. Migrate them when convenient.

**Q: Can I use the same media in Event Halls, Blog Posts, etc?**  
A: Yes! That's the beauty of it. Upload once, use everywhere.

**Q: How do I organize thousands of images?**  
A: Use categories, tags, and good naming. Consider adding more categories if needed.

**Q: Can I bulk upload?**  
A: Yes! In Gallery section, you can upload multiple files at once.

**Q: Does this work with videos too?**  
A: Absolutely! Upload videos once, reference them everywhere.

---

## 🎉 Benefits Summary

### **For You (Content Manager):**
✅ Upload media once  
✅ Reuse across entire site  
✅ Easy to find with search  
✅ Update once, reflect everywhere  
✅ Organized by categories  
✅ No duplicate uploads

### **For Visitors:**
✅ Faster page loads (no duplicates)  
✅ Consistent image quality  
✅ Better organized galleries  
✅ Optimized media delivery

### **For Your Business:**
✅ Better SEO (proper captions/alt text)  
✅ Reduced storage costs  
✅ Faster content updates  
✅ Professional media management

---

## 📞 Next Steps

1. **Upload your first media items** to the Gallery
2. **Add them to a room** to test
3. **Try reusing** the same item in multiple places
4. **Enjoy WordPress-style** media management! 🎉

---

**Your CMS now works like WordPress Media Library!** 🚀

Visit http://localhost:3001/studio to start managing your media the professional way.
