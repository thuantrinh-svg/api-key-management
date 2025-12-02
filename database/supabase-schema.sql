-- Create api_keys table
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  key TEXT UNIQUE NOT NULL,
  usage_count INTEGER DEFAULT 0,
  "limit" INTEGER DEFAULT 1000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NULL  -- Nullable for demo/testing without auth
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);

-- Enable Row Level Security (optional for demo)
-- For demo/testing without authentication, you can disable RLS or use permissive policies
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Permissive policy for demo/testing (allows all operations)
-- WARNING: Remove this in production and use user-specific policies
CREATE POLICY "Allow all operations for demo"
  ON api_keys FOR ALL
  USING (true)
  WITH CHECK (true);

-- Production policies (commented out for demo):
-- Uncomment these and remove the demo policy above when you add authentication
/*
CREATE POLICY "Users can view their own API keys"
  ON api_keys FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own API keys"
  ON api_keys FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own API keys"
  ON api_keys FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own API keys"
  ON api_keys FOR DELETE
  USING (auth.uid() = user_id);
*/
