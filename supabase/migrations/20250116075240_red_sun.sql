/*
  # Update site configuration logo URL
  
  Updates the logo URL in the site_config table
*/

-- Update the logo URL
INSERT INTO site_config (key, value) VALUES 
  ('logo_url', 'https://wrnwpvikdvjgryhkfdbk.supabase.co/storage/v1/object/public/assets/alali-logo.png')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;