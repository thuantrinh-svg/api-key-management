-- Optional: Seed data for testing
-- Run this AFTER creating the main schema (supabase-schema.sql)
-- This will create some sample API keys for testing

-- Insert sample API keys
-- Note: Replace the user_id with your actual user ID from auth.users
-- Or use the placeholder for testing without authentication

INSERT INTO api_keys (name, key, usage_count, user_id) VALUES
  ('Production API Key', 'thuantv-prod1234567890abcdef', 24, '00000000-0000-0000-0000-000000000000'),
  ('Development API Key', 'thuantv-dev1234567890abcdef', 156, '00000000-0000-0000-0000-000000000000'),
  ('Testing API Key', 'thuantv-test1234567890abcdef', 89, '00000000-0000-0000-0000-000000000000');

-- Verify the data was inserted
SELECT * FROM api_keys ORDER BY created_at DESC;

