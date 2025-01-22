/*
  # Add original PNG URL column
  
  1. Changes
    - Add `original_png_url` column to `visitors` table to store the URL of the PNG image with removed background
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'visitors' AND column_name = 'original_png_url'
  ) THEN
    ALTER TABLE visitors ADD COLUMN original_png_url text;
  END IF;
END $$;