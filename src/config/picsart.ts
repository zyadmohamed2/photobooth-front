export const PICSART_API_KEY = import.meta.env.VITE_PICSART_API_KEY;

export async function removeBackground(imageUrl: string): Promise<Blob> {
  // If API key is not set, return the original image
  if (!PICSART_API_KEY) {
    const response = await fetch(imageUrl);
    return response.blob();
  }

  const url = "https://api.picsart.io/tools/1.0/removebg";
  
  const payload = {
    bg_blur: "0",
    scale: "fit",
    image_url: imageUrl,
    format: "PNG",
    output_type: "cutout"
  };
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'X-Picsart-API-Key': PICSART_API_KEY
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Background removal failed');
    }

    const result = await response.json();
    const imageResponse = await fetch(result.data.url);
    return imageResponse.blob();
  } catch (error) {
    // If background removal fails, return the original image
    console.warn('Background removal failed, using original image:', error);
    const response = await fetch(imageUrl);
    return response.blob();
  }
}