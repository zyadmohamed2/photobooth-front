import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { removeBackground } from '../config/backgroundRemoval';
import axios, {Axios} from 'axios';

const locations = [
  'Studio A',
  'Studio B',
  'Garden Terrace',
  'Grand Hall',
  'Rooftop'
];

export default function VisitorInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setProgress('');
    
    const capturedImage = sessionStorage.getItem('capturedImage');
    const backgroundUrl = sessionStorage.getItem('selectedBackground');
    
    if (!capturedImage || !backgroundUrl) {
      alert('No photo captured. Please try again.');
      navigate('/capture');
      return;
    }
    console.log(`user image ${capturedImage}`);
console.log(`backgroundUrl image ${backgroundUrl}`);

    setIsSubmitting(true);
    
    try {
      // Step 1: Process image and remove background
      
      // let processedBlob: Blob;
      // try {
      //   processedBlob = await removeBackground(capturedImage);
      // } catch (error) {
      //   console.error('Background removal failed, using original image:', error);
      //   const response = await fetch(capturedImage);
      //   processedBlob = await response.blob();
      // }
      
      // // Step 2: Create final composite image
      // setProgress('Creating final image...');
      // const canvas = document.createElement('canvas');
      // const ctx = canvas.getContext('2d');
      // if (!ctx) throw new Error('Could not get canvas context');

      // // Set canvas dimensions to 640x950
      // canvas.width = 640;
      // canvas.height = 950;

      // // Load and draw background image
      // const bgImg = new Image();
      // await new Promise((resolve, reject) => {
      //   bgImg.onload = resolve;
      //   bgImg.onerror = reject;
      //   bgImg.crossOrigin = 'anonymous';
      //   bgImg.src = backgroundUrl;
      // });

      // // Calculate background dimensions to maintain aspect ratio
      // const bgAspectRatio = bgImg.width / bgImg.height;
      // let bgWidth = canvas.width;
      // let bgHeight = canvas.height;
      
      // if (bgAspectRatio > canvas.width / canvas.height) {
      //   bgHeight = canvas.width / bgAspectRatio;
      // } else {
      //   bgWidth = canvas.height * bgAspectRatio;
      // }
      
      // const bgX = (canvas.width - bgWidth) / 2;
      // const bgY = (canvas.height - bgHeight) / 2;
      
      // // Draw background
      // ctx.drawImage(bgImg, bgX, bgY, bgWidth, bgHeight);

      // // Load and draw the processed photo
      // const processedImg = new Image();
      // const processedUrl = URL.createObjectURL(processedBlob);
      // await new Promise((resolve, reject) => {
      //   processedImg.onload = resolve;
      //   processedImg.onerror = reject;
      //   processedImg.src = processedUrl;
      // });

      // // Calculate dimensions to maintain aspect ratio and fit within canvas
      // const scale = Math.min(
      //   canvas.width / processedImg.width,
      //   canvas.height / processedImg.height
      // ) * 0.95; // Scale to 95% to ensure it fits nicely
      // const width = processedImg.width * scale;
      // const height = processedImg.height * scale;
      // const x = (canvas.width - width) / 2;
      // const y = (canvas.height - height) / 2;

      // // Draw the processed image centered on the canvas
      // ctx.drawImage(processedImg, x, y, width, height);
      // URL.revokeObjectURL(processedUrl);

      // // Convert canvas to blob
      // const finalBlob = await new Promise<Blob>((resolve) => 
      //   canvas.toBlob((blob) => resolve(blob!), 'image/jpeg', 0.95)
      // );

      // // Step 3: Upload final image
      // setProgress('Saving your photo...');
      // const fileName = `photos/${Date.now()}.jpg`;
      // const { error: uploadError } = await supabase.storage
      //   .from('visitor-photos-final')
      //   .upload(fileName, finalBlob, {
      //     contentType: 'image/jpeg',
      //     cacheControl: '3600'
      //   });

      // if (uploadError) throw uploadError;

      // Get public URL
      // const { data: { publicUrl } } = supabase.storage
      //   .from('visitor-photos-final')
      //   .getPublicUrl(fileName);
          // Step 4: Upload to external API with both images (image 1 and image 2)
    setProgress('Uploading images to Server...');
    const imageBlob = await fetch(capturedImage)
    .then((res) => res.blob())
    .catch((err) => {
      throw new Error('Failed to convert captured image to Blob');
    });

  // Step 2: Convert background URL to Blob
  const backgroundBlob = await fetch(backgroundUrl)
    .then((res) => res.blob())
    .catch((err) => {
      throw new Error('Failed to fetch background image');
    });

  setProgress('Uploading images to external API...');
  const formUploadImages = new FormData();
  formUploadImages.append('UserImage', imageBlob, 'captured_image.jpg');
  formUploadImages.append('BackGround', imageBlob, 'background_image.jpg');

    const apiResponse = await fetch('http://108.181.169.244:9070/api/Home/Image', {
      method: 'POST',
      body: formUploadImages,
    });

    if (!apiResponse.ok) {
      throw new Error('Failed to upload images to the API');
    }
    const apiData = await apiResponse.json();
  //   console.log('API response:', apiData);
    // const removedImageReqBody = {
    //   userImageUrl: apiData[''],
    //   backgroundImageUrl: apiData['backGround'],
    // };
    const removedImageReqBody = {
      backgroundImageUrl: backgroundUrl,
    userImageUrl: apiData['userImage']
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    
    setProgress('Remove Image Background....');
    const removedImageResponse = await  axios.post("https://removenode.onrender.com/merge-images", removedImageReqBody, {
      headers: headers
    })

    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json' // تحديد نوع المحتوى (JSON)
    //   },
    //   body: JSON.stringify(removedImageReqBody),
    // });
    // const removeApiData = await removedImageResponse;
    // console.log('API response:', apiData);
    // const  = {
    //   : ,
    //   : formData.fullName,
    //   : formData.mobile,
    //   : removeApiData['imageUrl'],
    //   : formData.location,
    // };
    setProgress('Processing your photo...');
    const uploadInformationReqBody = new FormData();
    uploadInformationReqBody.append('Email', formData.email);
    uploadInformationReqBody.append('Name', formData.fullName);
    uploadInformationReqBody.append('PhoneNumber', formData.mobile);
    uploadInformationReqBody.append('PhotoUrl', removedImageResponse.data['imageUrl']);
    uploadInformationReqBody.append('Location', formData.location);
    setProgress('Saving your information...');
    const uploadInformationResponse = await fetch('http://108.181.169.244:9070/api/Home/Create', {
      method: 'POST',
      body: uploadInformationReqBody,
    });
    sessionStorage.setItem('photoUrl', removedImageResponse.data['imageUrl']);

      // Step 4: Save visitor data
      // setProgress('Saving your information...');
      // const { error: saveError } = await supabase
      //   .from('visitors')
      //   .insert([{
      //     full_name: formData.fullName,
      //     email: formData.email,
      //     mobile: formData.mobile,
      //     location: formData.location,
      //     photo_url: publicUrl,
      //     background_url: backgroundUrl
      //   }]);

      // if (saveError) throw saveError;

      // // Store the direct photo URL for QR code
      
      
      navigate('/qr');
    } catch (error) {
      console.error('Error processing photo:', error);
      setError(error instanceof Error ? error.message : 'Failed to process your photo. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-600 flex flex-col items-center justify-center p-8">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Your Information</h2>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-600 rounded-lg text-center">
            {error}
          </div>
        )}

        {progress && (
          <div className="mb-6 p-4 bg-white bg-opacity-20 text-white rounded-lg text-center">
            {progress}
          </div>
        )}
        
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
            className="w-full p-4 rounded-lg"
            required
            disabled={isSubmitting}
          />
          
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full p-4 rounded-lg"
            required
            disabled={isSubmitting}
          />
          
          <input
            type="tel"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
            className="w-full p-4 rounded-lg"
            required
            disabled={isSubmitting}
          />
          
          <select
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full p-4 rounded-lg"
            required
            disabled={isSubmitting}
          >
            <option value="">Select Location</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-8 bg-white text-red-600 text-xl font-bold py-4 px-12 rounded-full
                   hover:bg-yellow-300 transition-colors transform hover:scale-105
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? 'Processing...' : 'Continue'}
        </button>
      </form>
    </div>
  );
}