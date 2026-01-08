import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { PlaceRepository } from '../repositories/PlaceRepository';
import { Place, PlaceCategory } from '../../types';
import { initDatabase } from './database';

interface KmlPlacemark {
  name: string;
  description?: string;
  coordinates: {
    longitude: number;
    latitude: number;
  };
  folderName: string;
}

/**
 * Maps KML folder names to PlaceCategory
 */
function mapFolderToCategory(folderName: string): PlaceCategory {
  const lowerName = folderName.toLowerCase();
  
  if (lowerName.includes('essential') || lowerName.includes('sightseeing')) {
    return PlaceCategory.SIGHTSEEING;
  }
  if (lowerName.includes('hidden') || lowerName.includes('gems')) {
    return PlaceCategory.HIDDEN_GEMS;
  }
  if (lowerName.includes('food') || lowerName.includes('eat') || lowerName.includes('nightlife')) {
    return PlaceCategory.FOOD;
  }
  if (lowerName.includes('nature') || lowerName.includes('park') || lowerName.includes('family')) {
    return PlaceCategory.NATURE;
  }
  if (lowerName.includes('viewpoint') || lowerName.includes('tower') || lowerName.includes('hill')) {
    return PlaceCategory.VIEWPOINTS;
  }
  if (lowerName.includes('cultural') || lowerName.includes('art') || lowerName.includes('museum')) {
    return PlaceCategory.SIGHTSEEING;
  }
  
  // Default to sightseeing
  return PlaceCategory.SIGHTSEEING;
}

/**
 * Parses KML XML content and extracts placemarks
 */
function parseKml(kmlContent: string): KmlPlacemark[] {
  const placemarks: KmlPlacemark[] = [];
  
  // Extract all Folder elements
  const folderRegex = /<Folder>[\s\S]*?<\/Folder>/g;
  const folders = kmlContent.match(folderRegex) || [];
  
  for (const folder of folders) {
    // Extract folder name
    const folderNameMatch = folder.match(/<name>(.*?)<\/name>/);
    const folderName = folderNameMatch ? folderNameMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/, '$1') : '';
    
    // Extract all Placemark elements in this folder
    const placemarkRegex = /<Placemark>[\s\S]*?<\/Placemark>/g;
    const placemarksInFolder = folder.match(placemarkRegex) || [];
    
    for (const placemark of placemarksInFolder) {
      // Extract name
      const nameMatch = placemark.match(/<name>(.*?)<\/name>/);
      if (!nameMatch) continue;
      
      let name = nameMatch[1];
      // Remove CDATA wrapper if present
      name = name.replace(/<!\[CDATA\[(.*?)\]\]>/, '$1');
      
      // Extract description
      const descMatch = placemark.match(/<description>(.*?)<\/description>/);
      let description: string | undefined;
      if (descMatch) {
        description = descMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/, '$1');
        // Remove HTML tags
        description = description.replace(/<[^>]+>/g, '').trim();
        if (description === '') description = undefined;
      }
      
      // Extract coordinates
      const coordMatch = placemark.match(/<coordinates>(.*?)<\/coordinates>/);
      if (!coordMatch) continue;
      
      const coords = coordMatch[1].trim().split(',');
      if (coords.length < 2) continue;
      
      const longitude = parseFloat(coords[0]);
      const latitude = parseFloat(coords[1]);
      
      if (isNaN(longitude) || isNaN(latitude)) continue;
      
      placemarks.push({
        name,
        description,
        coordinates: { longitude, latitude },
        folderName,
      });
    }
  }
  
  return placemarks;
}

/**
 * Generates a unique ID for a place based on its name
 */
function generatePlaceId(name: string, index: number): string {
  // Create a simple ID from name (lowercase, replace spaces with dashes, remove special chars)
  const baseId = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
  
  return `${baseId}-${index}`;
}

/**
 * Imports places from KML content string into the database
 * @param kmlContent - KML file content as string
 */
export async function importKmlPlacesFromContent(kmlContent: string): Promise<number> {
  // Initialize database
  await initDatabase();
  
  // Parse KML
  const kmlPlacemarks = parseKml(kmlContent);
  
  if (kmlPlacemarks.length === 0) {
    throw new Error('No places found in KML file');
  }
  
  // Delete all existing places
  const placeRepo = new PlaceRepository();
  await placeRepo.deleteAll();
  
  // Convert KML placemarks to Place objects and insert
  const now = new Date();
  let insertedCount = 0;
  
  for (let i = 0; i < kmlPlacemarks.length; i++) {
    const kmlPlace = kmlPlacemarks[i];
    
    const place: Place = {
      id: generatePlaceId(kmlPlace.name, i),
      name: kmlPlace.name,
      shortDescription: kmlPlace.description || `Visit ${kmlPlace.name} in Prague`,
      description: kmlPlace.description || `Discover ${kmlPlace.name}, one of Prague's interesting locations.`,
      practicalTips: '',
      category: mapFolderToCategory(kmlPlace.folderName),
      latitude: kmlPlace.coordinates.latitude,
      longitude: kmlPlace.coordinates.longitude,
      images: [], // Empty images array - can be populated later
      estimatedVisitDuration: undefined,
      priceRange: undefined,
      isPremium: false,
      createdAt: now,
      updatedAt: now,
    };
    
    try {
      await placeRepo.insert(place);
      insertedCount++;
    } catch (error) {
      console.error(`Error inserting place "${kmlPlace.name}":`, error);
      // Continue with next place
    }
  }
  
  return insertedCount;
}

/**
 * Imports places from KML file into the database
 * @param kmlFilePath - Path to KML file (e.g., FileSystem URI or local path)
 */
export async function importKmlPlaces(kmlFilePath: string): Promise<number> {
  // Read KML file
  const kmlContent = await FileSystem.readAsStringAsync(kmlFilePath);
  return await importKmlPlacesFromContent(kmlContent);
}
