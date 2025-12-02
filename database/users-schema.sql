-- Create users table for Google OAuth integration
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- If you already have existing rows in api_keys referencing a default user_id such as
-- '00000000-0000-0000-0000-000000000000', you must create this user in the users table
-- before adding the foreign key. Otherwise, you will get a foreign key violation.

-- Insert default user if needed (optional, only if you know you have api_keys with this user_id)
INSERT INTO users (id, email, name)
SELECT '00000000-0000-0000-0000-000000000000', 'placeholder@example.com', 'Placeholder User'
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE id = '00000000-0000-0000-0000-000000000000'
);

-- Now add the FK constraint to enforce referential integrity
ALTER TABLE api_keys 
ADD CONSTRAINT fk_api_keys_user_id 
FOREIGN KEY (user_id) 
REFERENCES users(id) 
ON DELETE CASCADE;

-- Create index on user_id in api_keys for faster queries
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);

-- Enable Row Level Security on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (true); -- Allow viewing any user profile (for UX like seeing collaborators)

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (true); -- Allow users to update their own profile

-- Update api_keys RLS policy to use user relationship
DROP POLICY IF EXISTS "Allow all operations for demo" ON api_keys;

CREATE POLICY "Users can view their own API keys"
  ON api_keys FOR SELECT
  USING (
    user_id IS NULL OR 
    user_id IN (
      SELECT id FROM users WHERE email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Users can insert their own API keys"
  ON api_keys FOR INSERT
  WITH CHECK (
    user_id IS NULL OR
    user_id IN (
      SELECT id FROM users WHERE email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Users can update their own API keys"
  ON api_keys FOR UPDATE
  USING (
    user_id IS NULL OR
    user_id IN (
      SELECT id FROM users WHERE email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Users can delete their own API keys"
  ON api_keys FOR DELETE
  USING (
    user_id IS NULL OR
    user_id IN (
      SELECT id FROM users WHERE email = auth.jwt() ->> 'email'
    )
  );

