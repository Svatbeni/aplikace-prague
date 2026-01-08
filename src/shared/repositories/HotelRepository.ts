import { getDatabase } from '../services/database';
import { Hotel } from '../../types';

export class HotelRepository {
  async getAll(): Promise<Hotel[]> {
    const db = getDatabase();
    const result = await db.getAllAsync<{
      id: string;
      name: string;
      area: string;
      description: string | null;
      price_range: string | null;
      affiliate_link: string;
      image_url: string | null;
      rating: number | null;
      features: string | null;
      created_at: string;
      updated_at: string;
    }>('SELECT * FROM hotels ORDER BY name');

    return result.map(this.mapRowToHotel);
  }

  async getById(id: string): Promise<Hotel | null> {
    const db = getDatabase();
    const result = await db.getFirstAsync<{
      id: string;
      name: string;
      area: string;
      description: string | null;
      price_range: string | null;
      affiliate_link: string;
      image_url: string | null;
      rating: number | null;
      features: string | null;
      created_at: string;
      updated_at: string;
    }>('SELECT * FROM hotels WHERE id = ?', [id]);

    return result ? this.mapRowToHotel(result) : null;
  }

  async getByArea(area: string): Promise<Hotel[]> {
    const db = getDatabase();
    const result = await db.getAllAsync<{
      id: string;
      name: string;
      area: string;
      description: string | null;
      price_range: string | null;
      affiliate_link: string;
      image_url: string | null;
      rating: number | null;
      features: string | null;
      created_at: string;
      updated_at: string;
    }>('SELECT * FROM hotels WHERE area = ? ORDER BY name', [area]);

    return result.map(this.mapRowToHotel);
  }

  async insert(hotel: Hotel & { createdAt: Date; updatedAt: Date }): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `INSERT INTO hotels (
        id, name, area, description, price_range,
        affiliate_link, image_url, rating, features,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        hotel.id,
        hotel.name,
        hotel.area,
        hotel.description || null,
        hotel.priceRange || null,
        hotel.affiliateLink,
        hotel.imageUrl || null,
        hotel.rating || null,
        hotel.features ? JSON.stringify(hotel.features) : null,
        hotel.createdAt.toISOString(),
        hotel.updatedAt.toISOString(),
      ]
    );
  }

  async update(hotel: Hotel & { createdAt: Date; updatedAt: Date }): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `UPDATE hotels SET
        name = ?, area = ?, description = ?, price_range = ?,
        affiliate_link = ?, image_url = ?, rating = ?, features = ?,
        updated_at = ?
      WHERE id = ?`,
      [
        hotel.name,
        hotel.area,
        hotel.description || null,
        hotel.priceRange || null,
        hotel.affiliateLink,
        hotel.imageUrl || null,
        hotel.rating || null,
        hotel.features ? JSON.stringify(hotel.features) : null,
        hotel.updatedAt.toISOString(),
        hotel.id,
      ]
    );
  }

  private mapRowToHotel(row: {
    id: string;
    name: string;
    area: string;
    description: string | null;
    price_range: string | null;
    affiliate_link: string;
    image_url: string | null;
    rating: number | null;
    features: string | null;
    created_at: string;
    updated_at: string;
  }): Hotel {
    return {
      id: row.id,
      name: row.name,
      area: row.area,
      description: row.description || '',
      priceRange: row.price_range || undefined,
      affiliateLink: row.affiliate_link,
      imageUrl: row.image_url || undefined,
      rating: row.rating || undefined,
      features: row.features ? JSON.parse(row.features) : undefined,
    };
  }
}
