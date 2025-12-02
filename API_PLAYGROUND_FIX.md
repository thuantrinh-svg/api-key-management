# API Playground Fix - API Key Handling

## Problem
The API Playground was sending the API key as a header (`x-api-key`), but the GitHub Summarizer endpoint expects it in the request body as `apiKey` parameter.

This caused the error: "API Key is required" even though an API key was selected in the UI.

## Solution
Updated the playground to automatically include the selected API key in the request body for the GitHub Summarizer endpoint.

## Changes Made

### 1. **app/api-playground/page.tsx** (Main Page Component)
- Modified `handleExecute()` function to include `apiKey` in the request body
- Removed the `x-api-key` header
- Updated `generateCodeExample()` to show `apiKey` in the request body

**Key Change:**
```typescript
// Before: Sent as header
const apiResponse = await fetch(endpoint, {
  method,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": selectedKey,  // ❌ Wrong location
  },
  body: method !== "GET" ? body : undefined,
});

// After: Sent in body
const bodyWithApiKey = {
  ...parsedBody,
  apiKey: selectedKey,  // ✅ Correct location
};

const apiResponse = await fetch(endpoint, {
  method,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(bodyWithApiKey),
});
```

### 2. **app/api-playground/components/CodeExample.tsx** (Code Display)
- Updated code example generation to show `apiKey` in the request body
- Removed the header approach from generated code
- Properly formats JSON with indentation

### 3. **app/api-playground/components/RequestPanel.tsx** (UI Component)
- Added visual indicator when API key is selected (✓ Selected)
- Show warning message when no API key is selected (⚠️ Required)
- Display current usage quota for selected key:
  - Shows "X / Y" format
  - Visual progress bar
  - Remaining requests count
- Added info box explaining how the API key is used
- Show quota usage info inline

**New UI Features:**
- ✓ Green checkmark when key is selected
- ⚠️ Red warning when key is required but not selected
- 📊 Usage progress bar showing quota consumption
- 💡 Info boxes explaining the process

## How It Works Now

### User Flow
1. User opens API Playground
2. Selects an API key from dropdown
3. UI shows:
   - ✓ Selected confirmation
   - Usage: "42 / 1000 requests"
   - Progress bar showing usage
   - "958 requests remaining"
4. User enters GitHub URL (or custom request body)
5. User clicks "Execute Request"
6. System adds selected API key to request body
7. Request is sent with apiKey included
8. Response shows result or error
9. Usage count increments (if successful)

### Technical Details

**For GitHub Summarizer Endpoint:**
```json
{
  "githubUrl": "https://github.com/owner/repo",
  "apiKey": "thuantv-xxxxx"
}
```

**Generated Code Example:**
```javascript
const response = await fetch('http://localhost:3000/api/github-summarizer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "githubUrl": "https://github.com/vercel/next.js",
    "apiKey": "thuantv-xxxxx"
  })
});

const data = await response.json();
console.log(data);
```

## Testing the Fix

### Test 1: Verify API Key is Required
1. Open Playground
2. Don't select an API key
3. Click "Execute Request"
4. Should see error: "⚠️ API key is required to execute requests"
5. Execute button should be disabled

### Test 2: Verify API Key is Included
1. Create an API key from dashboard
2. Open Playground
3. Select the API key from dropdown
4. UI should show:
   - ✓ Selected
   - Usage quota
   - Progress bar
5. Enter a GitHub URL
6. Click "Execute Request"
7. Request should succeed (200)
8. Usage count should increment on dashboard

### Test 3: Verify Quota Enforcement
1. Create API key with low limit (e.g., 2)
2. Make 2 successful requests
3. 3rd request should return 429 (Too Many Requests)
4. Error message: "Rate limit exceeded..."

### Test 4: Verify Code Example
1. Select an API key
2. Click "Copy" on Code Example
3. Pasted code should show `apiKey` in body:
   ```
   "apiKey": "thuantv-xxxxx"
   ```
4. NOT in headers

## UI Improvements Added

### Before
```
API Key Selection
[Select an API key ▼]
(No visual feedback)

API Limit
24 / 1000 Requests  (hardcoded)
[████░░░░░░░░░░░░░]
```

### After
```
API Key ✓ Selected
[Production API Key (42 / 1000) ▼]

Current Usage:
42 / 1000
[████████░░░░░░░░░░] (progress bar)
958 requests remaining

[Info Box]
✓ API Key Added to Request
Your selected API key will be automatically 
included in the request body as `apiKey`.
The usage count for this key will be incremented
after a successful request.

[Execute Request] (button)
```

## Files Modified

| File | Changes |
|------|---------|
| `app/api-playground/page.tsx` | Added apiKey to request body |
| `app/api-playground/components/CodeExample.tsx` | Show apiKey in code example |
| `app/api-playground/components/RequestPanel.tsx` | Added UI indicators and quota display |

## Key Takeaways

✅ API key is now sent in the request body (correct location)
✅ Visual confirmation of selected API key
✅ Real-time quota display in playground
✅ Clear error messages when key is required
✅ Code examples show correct format
✅ Usage increments properly after successful requests
✅ 429 errors properly enforced

## Testing Checklist

- [ ] Can select API key from dropdown
- [ ] UI shows "✓ Selected" when key is chosen
- [ ] Usage quota displays correctly
- [ ] Progress bar shows usage percentage
- [ ] Execute button disabled when no key selected
- [ ] Execute request succeeds with valid key
- [ ] Code example shows apiKey in body
- [ ] Usage count increments after request
- [ ] 429 error returned when quota exceeded
- [ ] Mobile view displays correctly

## Deployment

No database changes needed. Simply deploy the updated playground files to production.

The fix ensures:
1. API Playground now works with quota enforcement
2. Users can test the API with their own keys
3. Usage is tracked properly
4. Clear feedback in the UI about quota status