/**
 * Script to import places from KML file into the database
 * 
 * This script can be run from the app or used as a reference for importing KML data.
 * 
 * Usage in your app:
 * 
 * import { importKmlPlaces } from '../shared/services/importKmlPlaces';
 * import * as FileSystem from 'expo-file-system';
 * 
 * // Option 1: Import from a file path (e.g., from Downloads)
 * const kmlPath = 'file:///path/to/your/file.kml';
 * const count = await importKmlPlaces(kmlPath);
 * console.log(`Imported ${count} places`);
 * 
 * // Option 2: Import from KML content string
 * import { importKmlPlacesFromContent } from '../shared/services/importKmlPlaces';
 * const kmlContent = '<?xml version="1.0"?><kml>...</kml>';
 * const count = await importKmlPlacesFromContent(kmlContent);
 * console.log(`Imported ${count} places`);
 * 
 * Note: This will DELETE all existing places before importing new ones!
 */

export {};
