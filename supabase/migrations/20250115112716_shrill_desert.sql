/*
  # Insert background data

  1. Changes
    - Insert initial background records into the backgrounds table
    - Each record includes URL and thumbnail URL
    - All backgrounds are set as active by default
*/

INSERT INTO backgrounds (url, thumbnail) VALUES
  -- Mountain road at night
  ('https://images.unsplash.com/photo-1506744038136-46273834b3fb', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200'),
  -- Mountain landscape
  ('https://images.unsplash.com/photo-1469474968028-56623f02e42e', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200'),
  -- Desert landscape
  ('https://images.unsplash.com/photo-1580742314608-fbd345b5f3c7', 'https://images.unsplash.com/photo-1580742314608-fbd345b5f3c7?w=200'),
  -- Snow mountain
  ('https://images.unsplash.com/photo-1512453979798-5ea266f8880c', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200'),
  -- Lake view
  ('https://images.unsplash.com/photo-1518684079-3c830dcef090', 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=200'),
  -- Sunset mountains
  ('https://images.unsplash.com/photo-1534129313276-2e7ec6d2c62e', 'https://images.unsplash.com/photo-1534129313276-2e7ec6d2c62e?w=200'),
  -- Forest path
  ('https://images.unsplash.com/photo-1522614288668-a697127e9b21', 'https://images.unsplash.com/photo-1522614288668-a697127e9b21?w=200'),
  -- Northern lights
  ('https://images.unsplash.com/photo-1548013146-72479768bada', 'https://images.unsplash.com/photo-1548013146-72479768bada?w=200'),
  -- Snowy forest
  ('https://images.unsplash.com/photo-1582463782878-2dd2be0a4b86', 'https://images.unsplash.com/photo-1582463782878-2dd2be0a4b86?w=200'),
  -- Mountain lake
  ('https://images.unsplash.com/photo-1533606688480-b48717bc6c3c', 'https://images.unsplash.com/photo-1533606688480-b48717bc6c3c?w=200')
ON CONFLICT (id) DO NOTHING;