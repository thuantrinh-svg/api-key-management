-- Migration to fix foreign key constraint issue
-- Run this in your Supabase SQL Editor if you already created the table

-- Step 1: Drop existing policies
DROP POLICY IF EXISTS "Users can view their own API keys" ON api_keys;
DROP POLICY IF EXISTS "Users can insert their own API keys" ON api_keys;
DROP POLICY IF EXISTS "Users can update their own API keys" ON api_keys;
DROP POLICY IF EXISTS "Users can delete their own API keys" ON api_keys;

-- Step 2: Drop the foreign key constraint
ALTER TABLE api_keys 
DROP CONSTRAINT IF EXISTS api_keys_user_id_fkey;

-- Step 3: Make user_id nullable
ALTER TABLE api_keys 
ALTER COLUMN user_id DROP NOT NULL;

-- Step 4: Create permissive policy for demo/testing
CREATE POLICY "Allow all operations for demo"
  ON api_keys FOR ALL
  USING (true)
  WITH CHECK (true);

-- Verify the changes
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'api_keys';

