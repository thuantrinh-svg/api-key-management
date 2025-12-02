# Troubleshooting Guide

## Foreign Key Constraint Error

### Error Message
```
Error: 23503: insert or update on table "api_keys" violates foreign key constraint "api_keys_user_id_fkey"
DETAIL: Key (user_id)=(00000000-0000-0000-0000-000000000000) is not present in table "users".
```

### What This Means

This error occurs because:
1. The `api_keys` table has a foreign key constraint on `user_id`
2. The constraint requires `user_id` to reference an actual user in `auth.users`
3. We're using a placeholder UUID that doesn't exist in the users table

### Solution: Fix Your Database

You have two options:

---

## Option 1: Quick Fix (For Demo/Testing)

This removes the foreign key constraint so you can test without authentication.

### Step 1: Run the Migration

Go to your Supabase dashboard → **SQL Editor** → **New query**

Copy and paste the contents of `database/supabase-fix-migration.sql`:

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own API keys" ON api_keys;
DROP POLICY IF EXISTS "Users can insert their own API keys" ON api_keys;
DROP POLICY IF EXISTS "Users can update their own API keys" ON api_keys;
DROP POLICY IF EXISTS "Users can delete their own API keys" ON api_keys;

-- Drop the foreign key constraint
ALTER TABLE api_keys 
DROP CONSTRAINT IF EXISTS api_keys_user_id_fkey;

-- Make user_id nullable
ALTER TABLE api_keys 
ALTER COLUMN user_id DROP NOT NULL;

-- Create permissive policy for demo
CREATE POLICY "Allow all operations for demo"
  ON api_keys FOR ALL
  USING (true)
  WITH CHECK (true);
```

Click **Run** and you should see "Success. No rows returned"

### Step 2: Test It

Go back to your app and try creating an API key. It should work now!

---

## Option 2: Use Real Authentication (Production)

If you want to use real user authentication:

### Step 1: Enable Supabase Auth

1. Go to **Authentication** in Supabase dashboard
2. Enable your preferred providers (Email, Google, GitHub, etc.)
3. Configure the provider settings

### Step 2: Update Your Code

Update `app/api/api-keys/route.ts`:

```typescript
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  
  // Get authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name } = await request.json();
  const newKey = generateApiKey();

  const { data, error } = await supabase
    .from("api_keys")
    .insert([
      {
        name: name.trim(),
        key: newKey,
        usage_count: 0,
        user_id: user.id, // Use real user ID
      },
    ])
    .select()
    .single();

  // ... rest of code
}
```

### Step 3: Add Auth UI

Install auth helpers:
```bash
npm install @supabase/auth-helpers-nextjs @supabase/supabase-js
```

Create login page and protect routes with middleware.

---

## Other Common Issues

### Issue: "Failed to fetch API keys"

**Cause:** Supabase credentials not set or incorrect

**Fix:**
1. Check your `.env.local` file exists
2. Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
3. Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
4. Restart dev server: `npm run dev`

### Issue: "Table 'api_keys' does not exist"

**Cause:** Database table not created

**Fix:**
1. Go to Supabase SQL Editor
2. Run the complete `supabase-schema.sql` file
3. Verify table exists in Table Editor

### Issue: RLS Policy Blocks Access

**Cause:** Row Level Security policies are too restrictive

**Fix:**
1. For demo/testing, use the permissive policy (already in fix migration)
2. For production, ensure policies match your auth setup
3. Check policies in Supabase → Authentication → Policies

### Issue: API Route Returns 500 Error

**Cause:** Server-side error in API route

**Fix:**
1. Check terminal/console for error details
2. Verify Supabase client is configured correctly
3. Check API route has proper error handling
4. Verify environment variables are loaded

---

## Verification Steps

After applying the fix, verify everything works:

### 1. Check Database Structure

Run in Supabase SQL Editor:
```sql
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns
WHERE table_name = 'api_keys';
```

You should see `user_id` with `is_nullable = YES`

### 2. Check Policies

Run in Supabase SQL Editor:
```sql
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'api_keys';
```

You should see the "Allow all operations for demo" policy

### 3. Test API Endpoints

Test in your browser console or API client:

```javascript
// Test GET
fetch('http://localhost:3000/api/api-keys')
  .then(r => r.json())
  .then(console.log);

// Test POST
fetch('http://localhost:3000/api/api-keys', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Test Key' })
})
  .then(r => r.json())
  .then(console.log);
```

---

## Migration Path: Demo → Production

When you're ready to add real authentication:

1. **Enable Supabase Auth** in dashboard
2. **Install auth packages**: `@supabase/auth-helpers-nextjs`
3. **Update API routes** to check user sessions
4. **Replace demo policy** with user-specific policies
5. **Add login/signup pages**
6. **Protect routes** with middleware
7. **Update schema** to add foreign key back (optional)

---

## Need More Help?

- Check Supabase logs: Dashboard → Logs
- Check browser console for client errors
- Check terminal for server errors
- Review Supabase documentation: https://supabase.com/docs

## Quick Reference

| File | Purpose |
|------|---------|
| `database/supabase-schema.sql` | Initial database schema (updated for demo) |
| `database/supabase-fix-migration.sql` | Fix existing database |
| `database/supabase-seed.sql` | Sample data for testing |
| `.env.local` | Supabase credentials |
| `app/api/api-keys/route.ts` | API endpoints |

---