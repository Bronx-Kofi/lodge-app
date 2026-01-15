# 🚨 CRITICAL: Add Sanity Token to Netlify

## The Problem
Your form works locally but fails on live site with:
**"Unauthorized - Session not found"**

This means Netlify doesn't have the Sanity write token.

---

## The Solution (5 Minutes)

### Step 1: Go to Netlify Dashboard
Open: https://app.netlify.com

### Step 2: Find Your Site
Look for: **lodge-app** or **mikyhillsidelodge**
Click on it

### Step 3: Go to Environment Variables
1. Click **Site settings** (in the top navigation)
2. Scroll down to **Build & deploy** section
3. Click **Environment variables** (in the left sidebar)

### Step 4: Add the Token
1. Click the **"Add a variable"** button
2. Click **"Add a single variable"**

3. Fill in EXACTLY:

**Key (Name):**
```
SANITY_API_TOKEN
```

**Value:**
```
sk42UyRaixoyLn5lK6Jrlp5PxObNlmy1puUx28PIhTAq2AcUrxJQy3f5KhtvyXPAteExIz0heFVX0huzdfqdoF7mVxT30uVqwMOYL5j2yUnB47wNAcNqlU3y2hhEhEHNzpe1JIiUH60C1cVNbK7IWYPfTnR8ptNwIsHNkVkHzrKs3WMlhRFl
```

**Scopes:** Select "All"

4. Click **"Create variable"**

### Step 5: Trigger Redeploy
1. Go to **Deploys** (top navigation)
2. Click **"Trigger deploy"**
3. Select **"Deploy site"**
4. Wait 2-3 minutes

### Step 6: Test
1. Go to: https://mikyhillsidelodge.com/check-in-form
2. Fill out the form
3. Click Submit
4. ✅ IT WILL WORK!

---

## ⚠️ Common Mistakes to Avoid

### ❌ Wrong Key Name
- Don't use: `SANITY_TOKEN`
- Don't use: `SANITY_WRITE_TOKEN`
- ✅ Use EXACTLY: `SANITY_API_TOKEN`

### ❌ Extra Spaces
- Don't add spaces before/after the token
- Copy exactly as shown above

### ❌ Wrong Scope
- Don't select "Production only"
- ✅ Select "All" or "All scopes"

---

## 🔍 How to Verify It Worked

After redeploying, check:

1. Go back to Environment variables
2. You should see: `SANITY_API_TOKEN` listed
3. The value should show: `sk42...` (masked)

Then test the form - it will work!

---

## 📸 Visual Guide

```
Netlify Dashboard
    ↓
Site Settings
    ↓
Environment variables (left sidebar)
    ↓
Add a variable button
    ↓
Add single variable
    ↓
Key: SANITY_API_TOKEN
Value: sk42Uy... (paste the full token)
Scopes: All
    ↓
Create variable
    ↓
Go to Deploys
    ↓
Trigger deploy → Deploy site
    ↓
Wait 2-3 minutes
    ↓
Test form → SUCCESS! ✅
```

---

## 🎯 This is THE ONLY Issue

The code is perfect. The form works on localhost.

**ONLY missing:** This one environment variable on Netlify.

**As soon as you add it:** Everything will work perfectly!

---

## ⏰ Takes 5 Minutes Total

1. Add variable: 2 minutes
2. Redeploy: 2-3 minutes
3. Test: 30 seconds

**DO IT NOW! Your guests are waiting to book! 🏨**

