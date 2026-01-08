import { getDatabase } from '../services/database';
import { Place, PlaceCategory } from '../../types';

export class PlaceRepository {
  async getAll(): Promise<Place[]> {
    const db = getDatabase();
    const result = await db.getAllAsync<{
      id: string;
      name: string;
      short_description: string;
      description: string;
      practical_tips: string;
      category: string;
      latitude: number;
      longitude: number;
      opening_hours: string | null;
      images: string;
      address: string | null;
      estimated_visit_duration: number | null;
      price_range: string | null;
      is_premium: number;
      created_at: string;
      updated_at: string;
    }>('SELECT * FROM places ORDER BY name');

    return result.map(this.mapRowToPlace);
  }

  async getById(id: string): Promise<Place | null> {
    const db = getDatabase();
    const result = await db.getFirstAsync<{
      id: string;
      name: string;
      short_description: string;
      description: string;
      practical_tips: string;
      category: string;
      latitude: number;
      longitude: number;
      opening_hours: string | null;
      images: string;
      address: string | null;
      estimated_visit_duration: number | null;
      price_range: string | null;
      is_premium: number;
      created_at: string;
      updated_at: string;
    }>('SELECT * FROM places WHERE id = ?', [id]);

    return result ? this.mapRowToPlace(result) : null;
  }

  async getByCategory(category: PlaceCategory): Promise<Place[]> {
    const db = getDatabase();
    const result = await db.getAllAsync<{
      id: string;
      name: string;
      short_description: string;
      description: string;
      practical_tips: string;
      category: string;
      latitude: number;
      longitude: number;
      opening_hours: string | null;
      images: string;
      address: string | null;
      estimated_visit_duration: number | null;
      price_range: string | null;
      is_premium: number;
      created_at: string;
      updated_at: string;
    }>('SELECT * FROM places WHERE category = ? ORDER BY name', [category]);

    return result.map(this.mapRowToPlace);
  }

  async insert(place: Place): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `INSERT INTO places (
        id, name, short_description, description, practical_tips,
        category, latitude, longitude, opening_hours, images,
        address, estimated_visit_duration, price_range, is_premium,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        place.id,
        place.name,
        place.shortDescription,
        place.description,
        place.practicalTips,
        place.category,
        place.latitude,
        place.longitude,
        place.openingHours ? JSON.stringify(place.openingHours) : null,
        JSON.stringify(place.images),
        place.address || null,
        place.estimatedVisitDuration || null,
        place.priceRange || null,
        place.isPremium ? 1 : 0,
        place.createdAt.toISOString(),
        place.updatedAt.toISOString(),
      ]
    );
  }

  private mapRowToPlace(row: {
    id: string;
    name: string;
    short_description: string;
    description: string;
    practical_tips: string;
    category: string;
    latitude: number;
    longitude: number;
    opening_hours: string | null;
    images: string;
    address: string | null;
    estimated_visit_duration: number | null;
    price_range: string | null;
    is_premium: number;
    created_at: string;
    updated_at: string;
  }): Place {
    return {
      id: row.id,
      name: row.name,
      shortDescription: row.short_description,
      description: row.description,
      practicalTips: row.practical_tips,
      category: row.category as PlaceCategory,
      latitude: row.latitude,
      longitude: row.longitude,
      openingHours: row.opening_hours ? JSON.parse(row.opening_hours) : undefined,
      images: JSON.parse(row.images),
      address: row.address || undefined,
      estimatedVisitDuration: row.estimated_visit_duration || undefined,
      priceRange: (row.price_range as 'free' | 'low' | 'medium' | 'high') || undefined,
      isPremium: row.is_premium === 1,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}

