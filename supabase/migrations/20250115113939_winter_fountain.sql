/*
  # Update background URLs to use local storage

  1. Changes
    - Update existing background records to use images from Supabase storage
    - Each record will be updated in order of creation date
    - Ensures no NULL values by using a more precise update strategy
*/

-- Update backgrounds one by one in order of creation
UPDATE backgrounds 
SET 
  url = new_values.new_url,
  thumbnail = new_values.new_url
FROM (
  SELECT 
    id,
    'https://wrnwpvikdvjgryhkfdbk.supabase.co/storage/v1/object/public/visitor-photos/frames/' || 
    (ROW_NUMBER() OVER (ORDER BY created_at)) || '.jpg' as new_url
  FROM backgrounds
  ORDER BY created_at
) new_values
WHERE backgrounds.id = new_values.id;