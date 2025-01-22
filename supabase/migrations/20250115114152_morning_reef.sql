/*
  # Fix background URLs to use PNG extension

  1. Changes
    - Update existing background URLs to use .png extension instead of .jpg
    - Ensures URLs match the actual file format in storage
*/

UPDATE backgrounds 
SET 
  url = REPLACE(url, '.jpg', '.png'),
  thumbnail = REPLACE(thumbnail, '.jpg', '.png')
WHERE url LIKE '%visitor-photos/frames/%';