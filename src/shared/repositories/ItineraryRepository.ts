import { getDatabase } from '../services/database';
import { Itinerary, ItineraryType, ItineraryTheme, Difficulty } from '../../types';

export class ItineraryRepository {
  async getAll(): Promise<Itinerary[]> {
    const db = getDatabase();
    const result = await db.getAllAsync<{
      id: string;
      title: string;
      description: string | null;
      type: string;
      theme: string | null;
      places: string;
      estimated_duration: number | null;
      walking_distance: number | null;
      transport_hints: string | null;
      difficulty: string | null;
      is_premium: number;
      created_at: string;
      updated_at: string;
    }>('SELECT * FROM itineraries ORDER BY created_at DESC');

    return result.map(this.mapRowToItinerary);
  }

  async getById(id: string): Promise<Itinerary | null> {
    const db = getDatabase();
    const result = await db.getFirstAsync<{
      id: string;
      title: string;
      description: string | null;
      type: string;
      theme: string | null;
      places: string;
      estimated_duration: number | null;
      walking_distance: number | null;
      transport_hints: string | null;
      difficulty: string | null;
      is_premium: number;
      created_at: string;
      updated_at: string;
    }>('SELECT * FROM itineraries WHERE id = ?', [id]);

    return result ? this.mapRowToItinerary(result) : null;
  }

  async getByType(type: ItineraryType): Promise<Itinerary[]> {
    const db = getDatabase();
    const result = await db.getAllAsync<{
      id: string;
      title: string;
      description: string | null;
      type: string;
      theme: string | null;
      places: string;
      estimated_duration: number | null;
      walking_distance: number | null;
      transport_hints: string | null;
      difficulty: string | null;
      is_premium: number;
      created_at: string;
      updated_at: string;
    }>('SELECT * FROM itineraries WHERE type = ? ORDER BY created_at DESC', [type]);

    return result.map(this.mapRowToItinerary);
  }

  async insert(itinerary: Itinerary): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `INSERT INTO itineraries (
        id, title, description, type, theme, places,
        estimated_duration, walking_distance, transport_hints, difficulty,
        is_premium, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        itinerary.id,
        itinerary.title,
        itinerary.description || null,
        itinerary.type,
        itinerary.theme || null,
        JSON.stringify(itinerary.places),
        itinerary.estimatedDuration || null,
        itinerary.walkingDistance || null,
        itinerary.transportHints ? JSON.stringify(itinerary.transportHints) : null,
        itinerary.difficulty || null,
        itinerary.isPremium ? 1 : 0,
        itinerary.createdAt.toISOString(),
        itinerary.updatedAt.toISOString(),
      ]
    );
  }

  async update(itinerary: Itinerary): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `UPDATE itineraries SET
        title = ?, description = ?, type = ?, theme = ?, places = ?,
        estimated_duration = ?, walking_distance = ?, transport_hints = ?, difficulty = ?,
        is_premium = ?, updated_at = ?
      WHERE id = ?`,
      [
        itinerary.title,
        itinerary.description || null,
        itinerary.type,
        itinerary.theme || null,
        JSON.stringify(itinerary.places),
        itinerary.estimatedDuration || null,
        itinerary.walkingDistance || null,
        itinerary.transportHints ? JSON.stringify(itinerary.transportHints) : null,
        itinerary.difficulty || null,
        itinerary.isPremium ? 1 : 0,
        itinerary.updatedAt.toISOString(),
        itinerary.id,
      ]
    );
  }

  private mapRowToItinerary(row: {
    id: string;
    title: string;
    description: string | null;
    type: string;
    theme: string | null;
    places: string;
    estimated_duration: number | null;
    walking_distance: number | null;
    transport_hints: string | null;
    difficulty: string | null;
    is_premium: number;
    created_at: string;
    updated_at: string;
  }): Itinerary {
    return {
      id: row.id,
      title: row.title,
      description: row.description || '',
      type: row.type as ItineraryType,
      theme: row.theme as ItineraryTheme | undefined,
      places: JSON.parse(row.places),
      estimatedDuration: row.estimated_duration || 0,
      walkingDistance: row.walking_distance || undefined,
      transportHints: row.transport_hints ? JSON.parse(row.transport_hints) : undefined,
      difficulty: row.difficulty as Difficulty | undefined,
      isPremium: row.is_premium === 1,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}
