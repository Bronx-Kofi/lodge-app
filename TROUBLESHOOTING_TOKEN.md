# 🔧 Troubleshooting the Token Issue

## Current Status
Still getting: "Unauthorized - Session not found"

## Most Common Causes

### 1. Deployment Not Finished
**Environment variables only take effect AFTER a new deployment!**

Check:
- Go to Netlify → Deploys tab
- Look at top deployment
- Status should be: ✅ **Published** (with green checkmark)
- Timestamp should be: **Within last 10 minutes**

If not:
- Click "Trigger deploy" → "Deploy site"
- Wait 2-3 minutes
- Test again

### 2. Token Might Be Invalid
The token in .env.local might be expired or not have correct permissions.

**Solution: Create Fresh Token**

1. Go to: https://www.sanity.io/manage/personal/project/jyrzp1q7
2. Click: **API** → **Tokens**
3. Click: **Add API token**
4. Name it: "Netlify Production"
5. **IMPORTANT:** Select **"Editor"** permissions (NOT Viewer!)
6. Click: Add token
7. **COPY THE TOKEN IMMEDIATELY** (shown once!)
8. Go to Netlify environment variables
9. Edit SANITY_API_TOKEN
10. Paste new token
11. Trigger new deploy
12. Test

### 3. Wrong Variable Name
Must be EXACTLY:
```
SANITY_API_TOKEN
```

NOT:
- SANITY_TOKEN ❌
- SANITY_WRITE_TOKEN ❌
- NEXT_PUBLIC_SANITY_TOKEN ❌

### 4. Token Scope Issue
When creating the token in Sanity:

✅ **CORRECT:**
- Editor (can read and write)
- Administrator (can do everything)

❌ **WRONG:**
- Viewer (read only - will fail!)
- Custom (unless write permissions added)

## Verification Checklist

- [ ] Variable name is EXACTLY: SANITY_API_TOKEN
- [ ] Token starts with "sk"
- [ ] Token has Editor or Administrator permissions
- [ ] Triggered new deploy after adding variable
- [ ] Deployment status shows "Published"
- [ ] Deployment timestamp is recent (< 10 minutes)
- [ ] Tested AFTER deployment completed

## Quick Test

After fixing, test with:
```
curl -X POST https://mikyhillsidelodge.com/api/check-in/submit \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@test.com","phone":"+233123456789","checkInDate":"2026-02-01","checkOutDate":"2026-02-03","numberOfGuests":2}'
```

Success looks like:
```json
{"success":true,"checkInReference":"CHK-...","message":"Check-in form submitted successfully"}
```

Failure looks like:
```json
{"error":"Failed to submit check-in form","details":"Unauthorized - Session not found"}
```

## If Still Failing

Please provide:
1. Screenshot of Netlify environment variables page
2. Screenshot of latest deployment status
3. Screenshot of Sanity token permissions
4. Exact error from browser console (F12)

This will help me pinpoint the exact issue!
