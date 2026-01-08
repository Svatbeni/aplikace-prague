import { getDatabase } from '../services/database';
import { Tour } from '../../types';

export class TourRepository {
  async getAll(): Promise<Tour[]> {
    const db = getDatabase();
    const result = await db.getAllAsync<{
      id: string;
      title: string;
      short_description: string | null;
      description: string | null;
      duration: string | null;
      price_range: string | null;
      affiliate_link: string;
      provider: string | null;
      category: string | null;
      rating: number | null;
      image_url: string | null;
      requires_online: number;
      created_at: string;
      updated_at: string;
    }>('SELECT * FROM tours ORDER BY title');

    return result.map(this.mapRowToTour);
  }

  async getById(id: string): Promise<Tour | null> {
    const db = getDatabase();
    const result = await db.getFirstAsync<{
      id: string;
      title: string;
      short_description: string | null;
      description: string | null;
      duration: string | null;
      price_range: string | null;
      affiliate_link: string;
      provider: string | null;
      category: string | null;
      rating: number | null;
      image_url: string | null;
      requires_online: number;
      created_at: string;
      updated_at: string;
    }>('SELECT * FROM tours WHERE id = ?', [id]);

    return result ? this.mapRowToTour(result) : null;
  }

  async insert(tour: Tour): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `INSERT INTO tours (
        id, title, short_description, description, duration,
        price_range, affiliate_link, provider, category, rating,
        image_url, requires_online, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        tour.id,
        tour.title,
        tour.shortDescription || null,
        tour.description || null,
        tour.duration || null,
        tour.priceRange || null,
        tour.affiliateLink,
        tour.provider || null,
        tour.category || null,
        tour.rating || null,
        tour.imageUrl || null,
        tour.requiresOnline ? 1 : 0,
        tour.createdAt.toISOString(),
        tour.updatedAt.toISOString(),
      ]
    );
  }

  async update(tour: Tour): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `UPDATE tours SET
        title = ?, short_description = ?, description = ?, duration = ?,
        price_range = ?, affiliate_link = ?, provider = ?, category = ?,
        rating = ?, image_url = ?, requires_online = ?, updated_at = ?
      WHERE id = ?`,
      [
        tour.title,
        tour.shortDescription || null,
        tour.description || null,
        tour.duration || null,
        tour.priceRange || null,
        tour.affiliateLink,
        tour.provider || null,
        tour.category || null,
        tour.rating || null,
        tour.imageUrl || null,
        tour.requiresOnline ? 1 : 0,
        tour.updatedAt.toISOString(),
        tour.id,
      ]
    );
  }

  private mapRowToTour(row: {
    id: string;
    title: string;
    short_description: string | null;
    description: string | null;
    duration: string | null;
    price_range: string | null;
    affiliate_link: string;
    provider: string | null;
    category: string | null;
    rating: number | null;
    image_url: string | null;
    requires_online: number;
    created_at: string;
    updated_at: string;
  }): Tour {
    return {
      id: row.id,
      title: row.title,
      shortDescription: row.short_description || undefined,
      description: row.description || undefined,
      duration: row.duration || undefined,
      priceRange: row.price_range || undefined,
      affiliateLink: row.affiliate_link,
      provider: row.provider || undefined,
      category: row.category || undefined,
      rating: row.rating || undefined,
      imageUrl: row.image_url || undefined,
      requiresOnline: row.requires_online === 1,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}
