import * as FileSystem from 'expo-file-system';
import { initDatabase } from '../src/shared/services/database';
import { PlaceRepository } from '../src/shared/repositories/PlaceRepository';
import { parseKML } from '../src/shared/utils/kmlParser';
import { Place, PlaceCategory } from '../src/types';

/**
 * Imports places from a KML file into the database
 * 
 * @param kmlFilePath - Path to the KML file (relative to app bundle or absolute path)
 * @param deleteExisting - Whether to delete all existing places before importing (default: true)
 * 
 * Usage:
 * import { importPlacesFromKML } from './scripts/importPlacesFromKML';
 * await importPlacesFromKML('./assets/places.kml', true);
 */
export async function importPlacesFromKML(
  kmlFilePath: string,
  deleteExisting: boolean = true
): Promise<void> {
  try {
    // Initialize database
    await initDatabase();
    const placeRepository = new PlaceRepository();

    // Delete existing places if requested
    if (deleteExisting) {
      console.log('Deleting all existing places...');
      const db = await initDatabase();
      await db.runAsync('DELETE FROM places');
      console.log('✅ All existing places deleted');
    }

    // Read KML file
    console.log(`Reading KML file: ${kmlFilePath}`);
    const kmlContent = await FileSystem.readAsStringAsync(kmlFilePath);
    
    if (!kmlContent) {
      throw new Error('KML file is empty or could not be read');
    }

    // Parse KML
    console.log('Parsing KML content...');
    const parsedPlaces = parseKML(kmlContent);
    
    if (parsedPlaces.length === 0) {
      console.warn('⚠️ No places found in KML file');
      return;
    }

    console.log(`Found ${parsedPlaces.length} places in KML file`);

    // Convert parsed places to Place objects and insert
    const now = new Date();
    let successCount = 0;
    let errorCount = 0;

    for (const parsedPlace of parsedPlaces) {
      try {
        const place: Place = {
          id: generatePlaceId(parsedPlace.name, parsedPlace.latitude, parsedPlace.longitude),
          name: parsedPlace.name,
          shortDescription: parsedPlace.shortDescription || parsedPlace.description?.substring(0, 150) || 'A place to visit in Prague',
          description: parsedPlace.description || parsedPlace.shortDescription || 'No description available',
          practicalTips: parsedPlace.practicalTips || '',
          category: parsedPlace.category || PlaceCategory.SIGHTSEEING,
          latitude: parsedPlace.latitude,
          longitude: parsedPlace.longitude,
          address: parsedPlace.address,
          estimatedVisitDuration: parsedPlace.estimatedVisitDuration,
          priceRange: parsedPlace.priceRange,
          isPremium: parsedPlace.isPremium || false,
          images: [], // Empty array - you can add image mapping logic if needed
          createdAt: now,
          updatedAt: now,
        };

        await placeRepository.insert(place);
        successCount++;
      } catch (error) {
        console.error(`Error importing place "${parsedPlace.name}":`, error);
        errorCount++;
      }
    }

    console.log(`\n✅ Import completed!`);
    console.log(`   Successfully imported: ${successCount} places`);
    if (errorCount > 0) {
      console.log(`   Errors: ${errorCount} places`);
    }
  } catch (error) {
    console.error('❌ Error importing places from KML:', error);
    throw error;
  }
}

/**
 * Generates a unique ID for a place based on name and coordinates
 */
function generatePlaceId(name: string, latitude: number, longitude: number): string {
  // Create a simple hash from name and coordinates
  const str = `${name}-${latitude}-${longitude}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return `place-${Math.abs(hash).toString(36)}`;
}
