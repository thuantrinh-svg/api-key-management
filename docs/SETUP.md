# Quick Setup Guide

Follow these steps to get your API Key Management system up and running.

## Step 1: Install Dependencies

Dependencies are already installed in your project:
- Sonner (toast notifications)
- Lucide React (icons)
- Supabase JS client
- Tailwind CSS utilities

## Step 2: Configure Supabase

### 2.1 Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in your project details:
   - Name: `api-key-management` (or your choice)
   - Database Password: (save this securely)
   - Region: Choose closest to you
5. Click "Create new project" and wait for setup to complete

### 2.2 Get Your API Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

### 2.3 Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual values from step 2.2.

## Step 3: Create Database Table

### 3.1 Open SQL Editor

1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **New query**

### 3.2 Run the Schema

Copy and paste the entire contents of `database/supabase-schema.sql` into the SQL editor and click **Run**.

This will create:
- `api_keys` table with proper structure
- Indexes for performance
- Row Level Security with permissive policy (for demo)
- Permissions for CRUD operations

**Note:** The schema is configured for demo/testing without authentication. The `user_id` field is nullable and there's a permissive RLS policy that allows all operations.

### 3.3 Verify Table Creation

1. Go to **Table Editor** in the sidebar
2. You should see the `api_keys` table
3. Click on it to view the structure

### 3.4 If You Already Created the Table (Troubleshooting)

If you created the table with the old schema and are getting foreign key errors:

1. Go to **SQL Editor**
2. Run the migration from `database/supabase-fix-migration.sql`
3. This will remove the foreign key constraint and update policies

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed instructions.

## Step 4: Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Test the Application

### Create Your First API Key

1. Click the "+ Create New Key" button
2. Enter a name (e.g., "Test Key")
3. Click "Create Key"
4. You should see a success toast notification
5. Your new key appears in the table

### Test Other Features

- **View**: Click the eye icon to show/hide the full key
- **Copy**: Click the copy icon to copy the key to clipboard
- **Edit**: Click the edit icon to rename the key
- **Delete**: Click the delete icon to remove the key

## Troubleshooting

### Issue: "Failed to fetch API keys"

**Solution:**
- Check that your `.env.local` file has the correct credentials
- Verify the Supabase project is active
- Ensure you ran the SQL schema

### Issue: "Failed to create API key"

**Solution:**
- Check browser console for detailed errors
- Verify the `api_keys` table exists in Supabase
- Check that RLS policies are enabled

### Issue: No toast notifications appearing

**Solution:**
- Check that the Toaster component is in `layout.tsx`
- Clear browser cache and reload
- Check browser console for errors

### Issue: Styles look broken

**Solution:**
- Restart the dev server (`npm run dev`)
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `npm install`

## Optional: Enable Authentication

Currently, the app uses a placeholder user ID. To enable real authentication:

### 1. Enable Auth in Supabase

1. Go to **Authentication** in Supabase dashboard
2. Enable your preferred providers (Email, Google, GitHub, etc.)

### 2. Update the Hook

In `app/hooks/useApiKeys.ts`, replace the placeholder user_id:

```typescript
// Before
user_id: "00000000-0000-0000-0000-000000000000"

// After
user_id: (await supabase.auth.getUser()).data.user?.id
```

### 3. Add Auth UI

Create login/signup pages using Supabase Auth UI or custom forms.

## Next Steps

- 🎨 Customize the gradient colors in `api-key-card.tsx`
- 📊 Add usage tracking functionality
- 🔔 Implement email notifications for key usage
- 📱 Make the sidebar collapsible for mobile
- 🌙 Add dark mode toggle
- 📈 Create analytics dashboard
- 🔐 Add API key expiration dates
- 🏷️ Add tags/categories for keys

## Support

If you encounter any issues:

1. Check the browser console for errors
2. Review the Supabase logs in your dashboard
3. Verify all environment variables are set correctly
4. Ensure the database table and policies are created

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Sonner Documentation](https://sonner.emilkowal.ski/)

---

**You're all set!**

Your API Key Management system is ready to use. Start creating and managing your API keys with a beautiful, modern interface.

