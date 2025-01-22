/*
  # Add backgrounds table

  1. New Tables
    - `backgrounds`
      - `id` (uuid, primary key)
      - `url` (text, required) - Full resolution image URL
      - `thumbnail` (text, required) - Thumbnail image URL
      - `created_at` (timestamp)
      - `active` (boolean) - To control which backgrounds are available

  2. Security
    - Enable RLS on `backgrounds` table
    - Add policy for anonymous users to read active backgrounds
*/

CREATE TABLE IF NOT EXISTS backgrounds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  thumbnail text NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE backgrounds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active backgrounds"
  ON backgrounds
  FOR SELECT
  TO anon
  USING (active = true);