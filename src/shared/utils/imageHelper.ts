import { ImageSourcePropType } from 'react-native';

// Import all local images directly
// This ensures they are bundled with the app
import place1 from '../../../assets/images/places/place-1.jpg';
import place2 from '../../../assets/images/places/place-2.jpg';
import place3 from '../../../assets/images/places/place-3.jpg';
import place4 from '../../../assets/images/places/place-4.jpg';
import place5 from '../../../assets/images/places/place-5.jpg';
import place6 from '../../../assets/images/places/place-6.jpg';
import place7 from '../../../assets/images/places/place-7.jpg';
import place8 from '../../../assets/images/places/place-8.jpg';

/**
 * Maps local image file names to their imported sources
 * 
 * IMPORTANT: Add your images to assets/images/places/ before building the app.
 * 
 * To add a new image:
 * 1. Add the image file to assets/images/places/
 * 2. Import it at the top: import placeX from '../../../assets/images/places/place-X.jpg';
 * 3. Add it to the map below: 'place-X.jpg': placeX,
 */
const imageMap: Record<string, ImageSourcePropType> = {
  'place-1.jpg': place1,
  'place-2.jpg': place2,
  'place-3.jpg': place3,
  'place-4.jpg': place4,
  'place-5.jpg': place5,
  'place-6.jpg': place6,
  'place-7.jpg': place7,
  'place-8.jpg': place8,
};

/**
 * Converts an image reference (local filename) to a source
 * that can be used with React Native's Image component
 * 
 * ONLY supports local images - no remote URLs
 */
export const getImageSource = (
  imageRef: string
): ImageSourcePropType => {
  // Check if it's a local image in our map
  if (imageMap[imageRef]) {
    return imageMap[imageRef];
  }

  // If image not found, log error and return first image as fallback
  console.error(`Local image not found: ${imageRef}. Available images:`, Object.keys(imageMap));
  
  // Return first image as fallback (or you could return a placeholder)
  return imageMap['place-1.jpg'] || place1;
};
