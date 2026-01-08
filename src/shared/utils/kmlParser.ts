import { XMLParser } from 'fast-xml-parser';
import { Place, PlaceCategory } from '../../types';

export interface KMLPlacemark {
  name?: string;
  description?: string;
  coordinates?: string;
  Point?: {
    coordinates?: string;
  };
  ExtendedData?: {
    Data?: Array<{
      name?: string;
      value?: string;
    }>;
  };
}

export interface ParsedKMLPlace {
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  address?: string;
  category?: PlaceCategory;
  shortDescription?: string;
  practicalTips?: string;
  estimatedVisitDuration?: number;
  priceRange?: 'free' | 'low' | 'medium' | 'high';
  isPremium?: boolean;
}

/**
 * Parses a KML file and extracts placemarks as places
 */
export function parseKML(kmlContent: string): ParsedKMLPlace[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    parseAttributeValue: true,
    trimValues: true,
  });

  const result = parser.parse(kmlContent);
  const kml = result.kml || result;
  const document = kml.Document || kml.Folder || {};
  const placemarks = Array.isArray(document.Placemark)
    ? document.Placemark
    : document.Placemark
    ? [document.Placemark]
    : [];

  const places: ParsedKMLPlace[] = [];

  for (const placemark of placemarks) {
    try {
      const place = parsePlacemark(placemark);
      if (place) {
        places.push(place);
      }
    } catch (error) {
      console.warn('Error parsing placemark:', error, placemark);
    }
  }

  return places;
}

/**
 * Parses a single KML placemark into a place
 */
function parsePlacemark(placemark: KMLPlacemark): ParsedKMLPlace | null {
  const name = placemark.name || 'Unnamed Place';
  const description = placemark.description || '';

  // Extract coordinates
  let coordinates: string | undefined;
  if (placemark.coordinates) {
    coordinates = placemark.coordinates;
  } else if (placemark.Point?.coordinates) {
    coordinates = placemark.Point.coordinates;
  }

  if (!coordinates) {
    console.warn(`No coordinates found for placemark: ${name}`);
    return null;
  }

  // Parse coordinates (format: longitude,latitude[,altitude])
  const coordParts = coordinates.trim().split(/[,\s]+/);
  if (coordParts.length < 2) {
    console.warn(`Invalid coordinates format for placemark: ${name}`);
    return null;
  }

  const longitude = parseFloat(coordParts[0]);
  const latitude = parseFloat(coordParts[1]);

  if (isNaN(latitude) || isNaN(longitude)) {
    console.warn(`Invalid latitude/longitude for placemark: ${name}`);
    return null;
  }

  // Extract extended data
  const extendedData = placemark.ExtendedData?.Data || [];
  const dataMap: Record<string, string> = {};
  for (const data of extendedData) {
    if (data.name && data.value) {
      dataMap[data.name.toLowerCase()] = data.value;
    }
  }

  // Map extended data to place properties
  const category = mapCategory(dataMap.category || dataMap.type);
  const address = dataMap.address || undefined;
  const shortDescription = dataMap.shortdescription || dataMap.short_description || undefined;
  const practicalTips = dataMap.practicaltips || dataMap.practical_tips || undefined;
  const estimatedVisitDuration = dataMap.estimatedvisitduration
    ? parseInt(dataMap.estimatedvisitduration, 10)
    : undefined;
  const priceRange = mapPriceRange(dataMap.pricerange || dataMap.price_range);
  const isPremium = dataMap.ispremium === 'true' || dataMap.is_premium === 'true';

  return {
    name,
    description: description || undefined,
    latitude,
    longitude,
    address,
    category,
    shortDescription,
    practicalTips,
    estimatedVisitDuration,
    priceRange,
    isPremium,
  };
}

/**
 * Maps category string to PlaceCategory enum
 */
function mapCategory(categoryStr?: string): PlaceCategory {
  if (!categoryStr) {
    return PlaceCategory.SIGHTSEEING; // Default category
  }

  const normalized = categoryStr.toLowerCase().trim();
  
  if (normalized.includes('sightseeing') || normalized.includes('attraction')) {
    return PlaceCategory.SIGHTSEEING;
  }
  if (normalized.includes('hidden') || normalized.includes('gem')) {
    return PlaceCategory.HIDDEN_GEMS;
  }
  if (normalized.includes('food') || normalized.includes('restaurant') || normalized.includes('cafe')) {
    return PlaceCategory.FOOD;
  }
  if (normalized.includes('nature') || normalized.includes('park') || normalized.includes('garden')) {
    return PlaceCategory.NATURE;
  }
  if (normalized.includes('viewpoint') || normalized.includes('view') || normalized.includes('tower')) {
    return PlaceCategory.VIEWPOINTS;
  }

  return PlaceCategory.SIGHTSEEING; // Default
}

/**
 * Maps price range string to price range enum
 */
function mapPriceRange(priceRangeStr?: string): 'free' | 'low' | 'medium' | 'high' | undefined {
  if (!priceRangeStr) {
    return undefined;
  }

  const normalized = priceRangeStr.toLowerCase().trim();
  
  if (normalized === 'free' || normalized === '0') {
    return 'free';
  }
  if (normalized === 'low' || normalized === '1') {
    return 'low';
  }
  if (normalized === 'medium' || normalized === '2') {
    return 'medium';
  }
  if (normalized === 'high' || normalized === '3') {
    return 'high';
  }

  return undefined;
}
