/*
  # Create visitors table for photo booth application

  1. New Tables
    - `visitors`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text)
      - `mobile` (text)
      - `location` (text)
      - `photo_url` (text)
      - `background_url` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `visitors` table
    - Add policy for anonymous users to insert data
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS visitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  mobile text NOT NULL,
  location text NOT NULL,
  photo_url text NOT NULL,
  background_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can insert visitors" ON visitors;
DROP POLICY IF EXISTS "Users can read own data" ON visitors;

-- Create new policies
CREATE POLICY "Enable insert for anonymous users" 
ON visitors FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Enable read access for all users" 
ON visitors FOR SELECT 
TO anon 
USING (true);