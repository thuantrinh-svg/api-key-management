# Google SSO Setup Guide

Complete guide to set up Google authentication for the API Key Management system.

## Overview

This application uses NextAuth.js with Google OAuth 2.0 for secure authentication. Users can sign in with their Google account, and their profile information is automatically stored in Supabase.

## Prerequisites

- Google Cloud Project (free)
- Supabase project
- Environment variables setup

## Step 1: Create Google OAuth Credentials

### 1.1 Go to Google Cloud Console

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. If you don't have a project, you'll be prompted to create one

### 1.2 Create a New Project (if needed)

1. Click on the project dropdown at the top
2. Click **New Project**
3. Enter project name: `api-key-manager` (or your choice)
4. Click **Create**
5. Wait for the project to be created and selected

### 1.3 Enable Google+ API

1. In the top search bar, search for **"Google+ API"**
2. Click on **Google+ API** result
3. Click **Enable**
4. Wait for it to be enabled

### 1.4 Create OAuth 2.0 Credentials

1. Click **Create Credentials** button (top right)
2. Choose **OAuth client ID**
3. If prompted, click **Configure OAuth consent screen first**

### 1.5 Configure OAuth Consent Screen

1. Select **External** as User Type
2. Click **Create**
3. Fill in the form:
   - **App name**: API Key Manager
   - **User support email**: Your email
   - **Developer contact**: Your email
4. Click **Save and Continue**
5. Skip **Scopes** (use defaults)
6. Click **Save and Continue**
7. Skip **Test users** (optional)
8. Click **Save and Continue**
9. Review and click **Back to Dashboard**

### 1.6 Create OAuth 2.0 Credentials (Continued)

1. Click **Credentials** in the left sidebar
2. Click **Create Credentials** → **OAuth client ID**
3. Select **Web application**
4. Fill in the form:
   - **Name**: API Key Manager Web
   - **Authorized JavaScript origins**: 
     ```
     http://localhost:3000
     https://yourdomain.com
     ```
   - **Authorized redirect URIs**: 
     ```
     http://localhost:3000/api/auth/callback/google
     https://yourdomain.com/api/auth/callback/google
     ```
5. Click **Create**
6. Copy the credentials that appear:
   - **Client ID**
   - **Client Secret**

⚠️ **Important**: Keep your Client Secret secure. Never commit it to version control.

## Step 2: Configure Environment Variables

### 2.1 Update `.env.local`

Add the credentials from Google Cloud Console:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_here

# NextAuth Secret (generate a random string for production)
NEXTAUTH_SECRET=your_random_secret_here

# NextAuth URL (set for production)
NEXTAUTH_URL=http://localhost:3000
```

### 2.2 Generate NEXTAUTH_SECRET

For development, you can use any string. For production:

```bash
# On Linux/Mac
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 3: Setup Supabase Users Table

### 3.1 Create Users Table

1. Go to your Supabase project
2. Open **SQL Editor**
3. Create a new query
4. Copy and paste the contents of `database/users-schema.sql`
5. Click **Run**

This creates:
- `users` table to store user profiles
- Indexes for performance
- Row Level Security policies
- Relationships between users and API keys

### 3.2 Verify Table Creation

1. Go to **Table Editor** in Supabase
2. You should see the `users` table
3. Verify columns: `id`, `email`, `name`, `image`, `created_at`, `updated_at`

## Step 4: Update Database Schema (Optional)

If you already have the `api_keys` table without user references:

1. Go to **SQL Editor** in Supabase
2. Run this migration:

```sql
-- Make user_id nullable (for existing keys)
ALTER TABLE api_keys 
ALTER COLUMN user_id DROP NOT NULL;

-- Add foreign key constraint to users table
ALTER TABLE api_keys
ADD CONSTRAINT fk_api_keys_user_id
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
```

## Step 5: Test the Setup

### 5.1 Start Development Server

```bash
npm run dev
```

### 5.2 Test Authentication Flow

1. Open [http://localhost:3000](http://localhost:3000)
2. You should see the **Sign In with Google** button in the top right
3. Click it to sign in
4. You'll be redirected to Google's login page
5. After signing in, you should return to the app logged in
6. Check Supabase: Go to **Table Editor** → **users** table
7. You should see your new user record

## Step 6: Production Deployment

### 6.1 Update Environment Variables

On your hosting platform (Vercel, Netlify, etc.):

```env
GOOGLE_CLIENT_ID=your_production_client_id
GOOGLE_CLIENT_SECRET=your_production_client_secret
NEXTAUTH_SECRET=your_production_secret
NEXTAUTH_URL=https://yourdomain.com
```

### 6.2 Update Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Go to **Credentials**
3. Click your OAuth 2.0 client
4. Add your production URLs:
   - **Authorized JavaScript origins**: `https://yourdomain.com`
   - **Authorized redirect URIs**: `https://yourdomain.com/api/auth/callback/google`
5. Click **Save**

### 6.3 Update NEXTAUTH_URL

Make sure `NEXTAUTH_URL` matches your production domain:

```env
NEXTAUTH_URL=https://yourdomain.com
```

## Troubleshooting

### Issue: "Invalid Client ID or Secret"

**Solution:**
- Copy the credentials exactly from Google Cloud Console
- Check for trailing spaces
- Verify they're in the correct `.env.local` variables

### Issue: "Redirect URI mismatch"

**Solution:**
- Ensure redirect URIs match exactly in Google Cloud Console:
  - Development: `http://localhost:3000/api/auth/callback/google`
  - Production: `https://yourdomain.com/api/auth/callback/google`
- They're case-sensitive!

### Issue: "NextAuth Secret not configured"

**Solution:**
- Add `NEXTAUTH_SECRET` to `.env.local`
- For development, any string works
- For production, use a strong random string

### Issue: User not appearing in Supabase

**Solution:**
- Check `database/users-schema.sql` was run
- Verify RLS policies are enabled
- Check browser console for errors
- Check application logs in Supabase

### Issue: "Cannot find module 'next-auth'"

**Solution:**
```bash
npm install next-auth
```

## Security Best Practices

### 1. Keep Secrets Secure

- Never commit `.env.local` to version control
- Use `.gitignore` to exclude it
- Rotate `NEXTAUTH_SECRET` regularly

### 2. Configure NEXTAUTH_URL

- Always set `NEXTAUTH_URL` in production
- Use HTTPS only in production
- Match your actual domain exactly

### 3. Validate Redirect URIs

- Only allow trusted redirect URIs in Google Cloud Console
- Don't use wildcards in redirect URIs
- Regularly audit authorized URIs

### 4. Monitor Authentication

- Watch for suspicious login patterns
- Audit user table regularly
- Set up alerts for failed auth attempts

## Understanding the Flow

```
User → Click "Sign In with Google"
  ↓
NextAuth redirects to Google Login
  ↓
User authenticates with Google
  ↓
Google redirects back with auth code
  ↓
NextAuth exchanges code for token
  ↓
NextAuth creates session
  ↓
App creates/updates user in Supabase
  ↓
User redirected to dashboard
```

## API Key Management with Authentication

Once authenticated, users can:

1. **Create API Keys** - Generate unique keys stored with their user ID
2. **View Keys** - See only their own keys
3. **Manage Keys** - Update names, delete keys
4. **Track Usage** - See usage statistics for their keys

All API key operations are protected by:
- NextAuth session validation
- Supabase RLS policies
- User ID verification

## References

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0 Setup](https://support.google.com/cloud/answer/6158849)
- [Supabase Auth Setup](https://supabase.com/docs/guides/auth)
- [NextAuth with Supabase](https://next-auth.js.org/providers/supabase)

## Support

For issues or questions:

1. Check the [NextAuth.js Documentation](https://next-auth.js.org/)
2. Review [Google Cloud Documentation](https://cloud.google.com/docs)
3. Check Supabase [Auth Docs](https://supabase.com/docs/guides/auth)
4. See troubleshooting section above

---

**Status**: Setup complete - Your app now has secure Google authentication!

