# Database

This folder contains all SQL schemas and migrations for Supabase.

## Files

### Schema

- **`supabase-schema.sql`** - Initial database schema
  - Creates `api_keys` table
  - Sets up indexes
  - Configures Row Level Security (demo mode)
  - Use this for fresh installations

### Migrations

- **`supabase-fix-migration.sql`** - Foreign key constraint fix
  - Removes foreign key constraint
  - Makes `user_id` nullable
  - Updates RLS policies for demo mode
  - Use this if you already created the table with old schema

### Sample Data

- **`supabase-seed.sql`** - Sample data for testing
  - Inserts example API keys
  - Optional - for testing purposes only

## Usage

### Fresh Installation

1. Go to Supabase → SQL Editor
2. Run `supabase-schema.sql`
3. Optionally run `supabase-seed.sql` for test data

### Fixing Existing Installation

1. Go to Supabase → SQL Editor
2. Run `supabase-fix-migration.sql`
3. Verify the fix worked

## Notes

- The schema is configured for demo/testing without authentication
- For production, see `docs/TROUBLESHOOTING.md` for authentication setup
- Always backup your database before running migrations

