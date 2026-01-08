import { importPlacesFromKML } from './importPlacesFromKML';

/**
 * Main script to delete all existing places and import new ones from KML
 * 
 * This script:
 * 1. Deletes all existing places from the database
 * 2. Imports new places from the specified KML file
 * 
 * Usage:
 * import { replacePlacesFromKML } from './scripts/replacePlacesFromKML';
 * await replacePlacesFromKML('./assets/places.kml');
 * 
 * Or call it directly in your app initialization (e.g., in App.tsx):
 * 
 * import { replacePlacesFromKML } from './scripts/replacePlacesFromKML';
 * // ... in your setup function
 * await replacePlacesFromKML('./assets/places.kml');
 */
export async function replacePlacesFromKML(kmlFilePath: string): Promise<void> {
  console.log('🔄 Starting place replacement from KML file...');
  console.log(`   KML file: ${kmlFilePath}`);
  
  await importPlacesFromKML(kmlFilePath, true);
  
  console.log('✅ Place replacement completed!');
}
