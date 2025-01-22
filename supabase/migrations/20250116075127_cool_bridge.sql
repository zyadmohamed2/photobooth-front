/*
  # Add site configuration table

  1. New Tables
    - `site_config`
      - `id` (uuid, primary key)
      - `key` (text, unique) - Configuration key
      - `value` (text) - Configuration value
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `site_config` table
    - Add policy for anonymous users to read configuration
*/

CREATE TABLE IF NOT EXISTS site_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site config"
  ON site_config
  FOR SELECT
  TO anon
  USING (true);

-- Insert the logo URL
INSERT INTO site_config (key, value) VALUES 
  ('logo_url', 'https://wrnwpvikdvjgryhkfdbk.supabase.co/storage/v1/object/public/assets/alali-logo.png')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;