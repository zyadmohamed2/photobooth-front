/*
  # Set up storage buckets for background removal

  1. New Storage Buckets
    - PNG folder for processed images without background
    - finally folder for final composited images
    - temp folder for temporary processing

  2. Security
    - Enable public access for all buckets
    - Add policies for anonymous users
*/

-- Create buckets if they don't exist
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('visitor-photos-png', 'visitor-photos/PNG', true),
  ('visitor-photos-final', 'visitor-photos/finally', true),
  ('visitor-photos-temp', 'visitor-photos/temp', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anonymous uploads to all buckets
CREATE POLICY "Enable upload for anonymous users to PNG"
ON storage.objects FOR INSERT 
TO anon
WITH CHECK (bucket_id = 'visitor-photos-png');

CREATE POLICY "Enable upload for anonymous users to final"
ON storage.objects FOR INSERT 
TO anon
WITH CHECK (bucket_id = 'visitor-photos-final');

CREATE POLICY "Enable upload for anonymous users to temp"
ON storage.objects FOR INSERT 
TO anon
WITH CHECK (bucket_id = 'visitor-photos-temp');

-- Allow public downloads from all buckets
CREATE POLICY "Enable download for anonymous users from PNG"
ON storage.objects FOR SELECT 
TO anon
USING (bucket_id = 'visitor-photos-png');

CREATE POLICY "Enable download for anonymous users from final"
ON storage.objects FOR SELECT 
TO anon
USING (bucket_id = 'visitor-photos-final');

CREATE POLICY "Enable download for anonymous users from temp"
ON storage.objects FOR SELECT 
TO anon
USING (bucket_id = 'visitor-photos-temp');