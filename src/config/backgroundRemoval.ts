import { supabase } from './supabase';

const LOCAL_API_URL = 'http://localhost:5000/remove-background';

export async function removeBackground(imageBase64: string): Promise<Blob> {
  try {
    console.log('Starting background removal process...');
    
    // Call our local Flask server
    const response = await fetch(LOCAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageBase64
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Background removal error:', {
        status: response.status,
        error: errorText
      });
      throw new Error(`Background removal error: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.image) {
      throw new Error('Invalid response format from background removal service');
    }

    // Convert the data URL to blob
    const response2 = await fetch(result.image);
    const processedBlob = await response2.blob();
    console.log('Background removal successful');
    return processedBlob;
    
  } catch (error) {
    console.error('Background removal process failed:', error);
    console.log('Falling back to original image...');
    // Fallback to original image
    try {
      const response = await fetch(imageBase64);
      if (!response.ok) {
        throw new Error(`Failed to fetch original image: ${response.status}`);
      }
      const blob = await response.blob();
      console.log('Successfully fell back to original image');
      return blob;
    } catch (fallbackError) {
      console.error('Fallback to original image failed:', fallbackError);
      throw fallbackError;
    }
  }
}