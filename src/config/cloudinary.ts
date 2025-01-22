import { Cloudinary } from '@cloudinary/url-gen';

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

if (!cloudName) {
  throw new Error('VITE_CLOUDINARY_CLOUD_NAME environment variable is not set');
}

export const cloudinary = new Cloudinary({
  cloud: {
    cloudName
  },
  url: {
    secure: true
  }
});