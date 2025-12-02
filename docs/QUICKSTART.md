# 🚀 Quick Start Checklist

Get your API Key Management system running in 5 minutes!

## ☑️ Pre-flight Checklist

- [ ] Node.js 20+ installed
- [ ] Supabase account created
- [ ] Project dependencies installed (`npm install` already done)

## 📋 Setup Steps

### Step 1: Supabase Setup (2 minutes)

- [ ] Go to [supabase.com](https://supabase.com) and create a new project
- [ ] Wait for project to finish setting up
- [ ] Go to **Settings** → **API**
- [ ] Copy your **Project URL** and **anon key**

### Step 2: Environment Variables (30 seconds)

- [ ] Create `.env.local` file in project root
- [ ] Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 3: Database Setup (1 minute)

- [ ] Open **SQL Editor** in Supabase dashboard
- [ ] Copy contents of `database/supabase-schema.sql`
- [ ] Paste and click **Run**
- [ ] Verify `api_keys` table appears in **Table Editor**

### Step 4: Run Application (30 seconds)

- [ ] Run `npm run dev` in terminal
- [ ] Open [http://localhost:3000](http://localhost:3000)
- [ ] You should see the Overview page with sidebar

### Step 5: Test Features (1 minute)

- [ ] Click "+ Create New Key" button
- [ ] Enter a name (e.g., "My First Key")
- [ ] Click "Create Key"
- [ ] See success toast notification
- [ ] Try clicking the eye icon to view the full key
- [ ] Try clicking the copy icon
- [ ] Try editing the key name
- [ ] Try deleting the key

## 🆘 Having Issues?

### Issue: Can't connect to Supabase
**Fix:** Double-check your `.env.local` credentials

### Issue: Table not found
**Fix:** Make sure you ran the SQL schema in Supabase

### Issue: No toast notifications
**Fix:** Check browser console for errors, restart dev server

## Next Steps

- [ ] Read `README.md` for full documentation
- [ ] Check `SETUP.md` for detailed setup instructions
- [ ] Review `IMPLEMENTATION.md` to understand the architecture
- [ ] Customize colors and styling to match your brand
- [ ] Deploy to Vercel or your preferred hosting

## Optional: Add Sample Data

Want to see the app with some data?

- [ ] Open SQL Editor in Supabase
- [ ] Run the queries in `database/supabase-seed.sql`
- [ ] Refresh your app to see sample keys

## Optional: Enable Authentication

Want multi-user support?

- [ ] Enable Auth in Supabase dashboard
- [ ] Update `useApiKeys.ts` to use real user IDs
- [ ] Add login/signup pages

---