/*
  # Configure storage for visitor photos

  1. Storage Configuration
    - Create bucket for visitor photos
    - Set up public access policies
  
  2. Security
    - Allow anonymous uploads
    - Allow public downloads
*/

-- Create bucket for visitor photos if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('visitor-photos', 'visitor-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anonymous uploads to the visitor-photos bucket
CREATE POLICY "Enable upload for anonymous users"
ON storage.objects FOR INSERT 
TO anon
WITH CHECK (bucket_id = 'visitor-photos');

-- Allow public downloads from the visitor-photos bucket
CREATE POLICY "Enable download for anonymous users"
ON storage.objects FOR SELECT 
TO anon
USING (bucket_id = 'visitor-photos');