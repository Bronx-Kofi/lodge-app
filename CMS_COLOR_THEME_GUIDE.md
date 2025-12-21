# Color Theme Customization Guide

## ✨ New Feature: Control Your Site Colors from CMS!

You can now customize your website's entire color scheme without touching any code!

## How to Change Your Site Colors

### Step 1: Access the CMS
1. Go to: **http://localhost:3002/studio**
2. Click **"Site Settings"** in the left sidebar
3. Click the **"Color Theme"** tab

### Step 2: Choose Your Colors
You'll see 5 color controls:

#### 1. **Primary Color** (Default: Orange #FF6B35)
- Used for: Buttons, links, highlights, call-to-action elements
- This is your main brand color
- Example: Orange for energy, Blue for trust, Green for nature

#### 2. **Secondary Color** (Default: Dark Stone #1C1917)
- Used for: Headers, footers, dark sections
- Typically a dark or contrasting color
- Example: Dark brown, Navy blue, Charcoal

#### 3. **Background Color** (Default: Light Stone #FAFAF9)
- Used for: Page backgrounds, content areas
- Should be light for readability
- Example: White, Cream, Light gray

#### 4. **Text Color** (Default: Dark Stone #292524)
- Used for: Body text, paragraphs, descriptions
- Should contrast well with background
- Example: Dark gray, Black, Charcoal

#### 5. **Link Color** (Default: Same as Primary)
- Used for: Clickable text links
- Usually same as primary color or a variation
- Auto-uses primary color if not set

### Step 3: Save Your Changes
1. Click **"Publish"** at the bottom
2. Refresh your website
3. See your new colors live!

## Color Picker Tips

### Using the Color Picker:
- Click on any color field to open the picker
- Choose from:
  - **Color wheel**: Visual selection
  - **Hex code**: Enter exact color (e.g., #FF6B35)
  - **RGB values**: Fine-tune colors
  - **Alpha**: Control transparency (0-100%)

### Getting Color Codes:
1. **From your brand guidelines**: Use your exact brand colors
2. **From tools**:
   - Coolors.co - Generate color palettes
   - Adobe Color - Create harmonious schemes
   - Color Hunt - Browse trendy palettes
3. **From images**: Use browser extensions like "ColorPick Eyedropper"

## Recommended Color Combinations

### Warm & Welcoming (Current Default)
```
Primary:    #FF6B35 (Burnt Orange)
Secondary:  #1C1917 (Dark Stone)
Background: #FAFAF9 (Light Stone)
Text:       #292524 (Charcoal)
```

### Professional Blue
```
Primary:    #2563EB (Bright Blue)
Secondary:  #1E293B (Slate)
Background: #F8FAFC (Pale Blue)
Text:       #0F172A (Dark Slate)
```

### Natural Green
```
Primary:    #10B981 (Emerald)
Secondary:  #064E3B (Forest Green)
Background: #F0FDF4 (Mint Cream)
Text:       #14532D (Deep Green)
```

### Elegant Purple
```
Primary:    #8B5CF6 (Violet)
Secondary:  #1E1B4B (Deep Indigo)
Background: #FAF5FF (Lavender Mist)
Text:       #3730A3 (Indigo)
```

### Luxury Gold
```
Primary:    #F59E0B (Amber)
Secondary:  #78350F (Brown)
Background: #FFFBEB (Cream)
Text:       #451A03 (Dark Brown)
```

## How Colors Are Applied

### Automatically Updated Elements:
- ✅ All buttons (Book Now, CTAs)
- ✅ Links and hover states
- ✅ Page backgrounds
- ✅ Text throughout the site
- ✅ Navigation highlights
- ✅ Footer elements

### CSS Variables Created:
The system automatically creates these variables:
```css
--color-primary: Your Primary Color
--color-secondary: Your Secondary Color
--color-background: Your Background Color
--color-text: Your Text Color
--color-link: Your Link Color

/* Auto-generated variations */
--color-primary-hover: Darker primary (for hover states)
--color-primary-light: Lighter primary (for backgrounds)
```

## Best Practices

### ✅ DO:
- Choose colors that represent your brand
- Ensure good contrast (dark text on light background)
- Test on different devices
- Keep accessibility in mind (WCAG standards)
- Use complementary colors

### ❌ DON'T:
- Use very similar colors for primary and background
- Choose low-contrast combinations (hard to read)
- Use too many bright colors
- Forget about mobile users
- Change colors too frequently

## Color Accessibility

### Contrast Requirements:
- **Normal text**: 4.5:1 contrast ratio minimum
- **Large text**: 3:1 contrast ratio minimum
- **Buttons/UI**: 3:1 contrast ratio minimum

### Testing Tools:
- WebAIM Contrast Checker: webaim.org/resources/contrastchecker
- Chrome DevTools: Built-in color contrast tool
- Coolors: Has contrast checking feature

## Troubleshooting

### Colors not showing?
1. Make sure you clicked "Publish" in CMS
2. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
3. Clear browser cache
4. Check if colors were saved (go back to Color Theme tab)

### Text hard to read?
- Increase contrast between text and background
- Choose darker text color
- Choose lighter background color

### Buttons not visible?
- Make sure primary color contrasts with background
- Try a brighter or darker primary color

## Advanced: Color Psychology

Choose colors based on your lodge's personality:

- **Orange**: Energy, enthusiasm, warmth, adventure
- **Blue**: Trust, calm, professional, reliable
- **Green**: Nature, growth, health, sustainability
- **Purple**: Luxury, creativity, wisdom, spirituality
- **Red**: Passion, excitement, urgency, bold
- **Yellow**: Happiness, optimism, friendly, cheerful
- **Brown**: Earthy, stable, rustic, authentic

## Examples in Action

### Changing to Blue Theme:
1. Primary: #2563EB
2. Secondary: #1E293B
3. Background: #F8FAFC
4. Text: #0F172A
5. Publish → Refresh

**Result**: Professional, trustworthy feel with blue accents throughout

### Changing to Green Theme:
1. Primary: #10B981
2. Secondary: #064E3B
3. Background: #F0FDF4
4. Text: #14532D
5. Publish → Refresh

**Result**: Natural, eco-friendly feel with green highlights

## Support

Need help choosing colors?
- Check color palette generators online
- Look at competitor websites for inspiration
- Consider your brand identity and target audience
- Test multiple combinations before finalizing

---

**Quick Start**: Just want to try it? Go to CMS → Site Settings → Color Theme → Pick any primary color → Publish!
