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
    - Add policy for authenticated users to insert data
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

CREATE POLICY "Anyone can insert visitors"
  ON visitors
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can read own data"
  ON visitors
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);