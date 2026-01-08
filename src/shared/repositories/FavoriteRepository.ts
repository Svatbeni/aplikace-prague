import { getDatabase } from '../services/database';
import { Favorite, FavoriteType } from '../../types';

export class FavoriteRepository {
  async getAll(): Promise<Favorite[]> {
    const db = getDatabase();
    const result = await db.getAllAsync<{
      id: string;
      item_type: string;
      item_id: string;
      created_at: string;
    }>('SELECT * FROM favorites ORDER BY created_at DESC');

    return result.map((row) => ({
      id: row.id,
      itemType: row.item_type as FavoriteType,
      itemId: row.item_id,
      createdAt: new Date(row.created_at),
    }));
  }

  async getByType(type: FavoriteType): Promise<Favorite[]> {
    const db = getDatabase();
    const result = await db.getAllAsync<{
      id: string;
      item_type: string;
      item_id: string;
      created_at: string;
    }>('SELECT * FROM favorites WHERE item_type = ? ORDER BY created_at DESC', [type]);

    return result.map((row) => ({
      id: row.id,
      itemType: row.item_type as FavoriteType,
      itemId: row.item_id,
      createdAt: new Date(row.created_at),
    }));
  }

  async isFavorite(type: FavoriteType, itemId: string): Promise<boolean> {
    const db = getDatabase();
    const result = await db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM favorites WHERE item_type = ? AND item_id = ?',
      [type, itemId]
    );
    return (result?.count || 0) > 0;
  }

  async addFavorite(type: FavoriteType, itemId: string): Promise<void> {
    const db = getDatabase();
    const id = `${type}_${itemId}_${Date.now()}`;
    await db.runAsync(
      'INSERT INTO favorites (id, item_type, item_id, created_at) VALUES (?, ?, ?, ?)',
      [id, type, itemId, new Date().toISOString()]
    );
  }

  async removeFavorite(type: FavoriteType, itemId: string): Promise<void> {
    const db = getDatabase();
    await db.runAsync('DELETE FROM favorites WHERE item_type = ? AND item_id = ?', [
      type,
      itemId,
    ]);
  }

  async toggleFavorite(type: FavoriteType, itemId: string): Promise<boolean> {
    const isFav = await this.isFavorite(type, itemId);
    if (isFav) {
      await this.removeFavorite(type, itemId);
      return false;
    } else {
      await this.addFavorite(type, itemId);
      return true;
    }
  }
}

