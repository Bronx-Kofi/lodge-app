# CMS Testing Guide

## Servers Running
- **Frontend**: http://localhost:3002
- **Sanity Studio**: http://localhost:3333 (starting...)

## Critical Tests to Perform

### Test 1: Room Description Display
**Issue**: You mentioned room descriptions don't appear

**Steps**:
1. Open Sanity Studio at http://localhost:3333
2. Navigate to "Room" in sidebar
3. Open an existing room or create a new one
4. In the "Description" field (under "1. Basic Info" tab):
   - Click the "+" button to add a text block
   - Type at least 2-3 paragraphs about the room
5. Click "Publish"
6. Go to frontend at http://localhost:3002/rooms
7. Click on the room you edited
8. **Expected**: Description should now appear under "Experience" section

### Test 2: Homepage Hero Content
**Steps**:
1. In Sanity Studio, click "Homepage"
2. Under "Hero Section" tab:
   - Change "Hero Headline" (e.g., "Welcome to Miky Hillside Lodge")
   - Change "Hero Subtitle" (e.g., "Luxury in the heart of Bono Region")
3. Click "Publish"
4. Go to http://localhost:3002
5. **Expected**: New hero text should appear immediately

### Test 3: Featured Rooms Title
**Steps**:
1. In Sanity Studio → "Homepage"
2. Under "Featured Rooms" tab:
   - Set "Rooms Section Title" (e.g., "Our Beautiful Rooms")
3. Click "Publish"
4. Refresh http://localhost:3002
5. **Expected**: New title appears above room cards

### Test 4: Value Propositions
**Steps**:
1. In Sanity Studio → "Homepage"
2. Under "Features" tab:
   - Set "Features Section Title" (e.g., "Why Stay With Us")
   - Add 3-4 features using the "+" button
3. Click "Publish"
4. Refresh http://localhost:3002
5. **Expected**: Your custom features appear with your custom title

### Test 5: Rooms Page Title
**Steps**:
1. In Sanity Studio, find and click "Rooms Page"
2. Change "Hero Title" and "Hero Subtitle"
3. Click "Publish"
4. Go to http://localhost:3002/rooms
5. **Expected**: Your custom title appears at the top

### Test 6: Site Settings (WhatsApp)
**Steps**:
1. In Sanity Studio → "Site Settings"
2. Under "Contact Info":
   - Update "WhatsApp Number" (format: 233240000000, no + or spaces)
3. Click "Publish"
4. Go to http://localhost:3002
5. Scroll down - click the floating WhatsApp button
6. **Expected**: Opens WhatsApp to your number

### Test 7: Gallery Images
**Steps**:
1. In Sanity Studio → "Room"
2. Open a room
3. Under "2. Photos" tab:
   - Add multiple images to "More Photos (5-10 images)"
4. Click "Publish"
5. Go to that room's detail page
6. **Expected**: Gallery should show all images

## Common Issues & Solutions

### Issue: Changes don't appear
**Solution**: 
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Wait 60 seconds (cache revalidation time)
- Check browser console for errors

### Issue: Sanity Studio won't load
**Solution**:
```bash
cd lodge-app
npx sanity dev --port 3333
```

### Issue: Description still not showing
**Possible Causes**:
1. Old text-based descriptions need to be converted to block content
2. Click "+ Add item" button, then select "Block" to add paragraphs
3. Make sure you clicked "Publish" not just "Save"

### Issue: Images don't upload
**Solution**:
- Check file size (should be under 10MB)
- Use JPG or PNG format
- Check Sanity project configuration

## Verification Checklist
- [ ] Room descriptions appear on detail pages
- [ ] Homepage hero title/subtitle updates from CMS
- [ ] Featured rooms section title updates from CMS
- [ ] Value propositions show CMS content
- [ ] Rooms page title updates from CMS
- [ ] WhatsApp button uses CMS number
- [ ] Gallery images display correctly
- [ ] All hardcoded content removed
