import { getDatabase } from '../services/database';
import { PracticalTip, TipCategory } from '../../types';

export class TipRepository {
  async getAll(): Promise<PracticalTip[]> {
    const db = getDatabase();
    const result = await db.getAllAsync<{
      id: string;
      category: string;
      title: string;
      content: string;
      icon: string | null;
      priority: number;
      updated_at: string;
    }>('SELECT * FROM tips ORDER BY priority DESC, title');

    return result.map(this.mapRowToTip);
  }

  async getById(id: string): Promise<PracticalTip | null> {
    const db = getDatabase();
    const result = await db.getFirstAsync<{
      id: string;
      category: string;
      title: string;
      content: string;
      icon: string | null;
      priority: number;
      updated_at: string;
    }>('SELECT * FROM tips WHERE id = ?', [id]);

    return result ? this.mapRowToTip(result) : null;
  }

  async getByCategory(category: TipCategory): Promise<PracticalTip[]> {
    const db = getDatabase();
    const result = await db.getAllAsync<{
      id: string;
      category: string;
      title: string;
      content: string;
      icon: string | null;
      priority: number;
      updated_at: string;
    }>('SELECT * FROM tips WHERE category = ? ORDER BY priority DESC, title', [category]);

    return result.map(this.mapRowToTip);
  }

  async insert(tip: PracticalTip): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `INSERT INTO tips (id, category, title, content, icon, priority, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        tip.id,
        tip.category,
        tip.title,
        tip.content,
        tip.icon || null,
        tip.priority,
        tip.updatedAt.toISOString(),
      ]
    );
  }

  async update(tip: PracticalTip): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `UPDATE tips SET
        category = ?, title = ?, content = ?, icon = ?, priority = ?, updated_at = ?
       WHERE id = ?`,
      [
        tip.category,
        tip.title,
        tip.content,
        tip.icon || null,
        tip.priority,
        tip.updatedAt.toISOString(),
        tip.id,
      ]
    );
  }

  private mapRowToTip(row: {
    id: string;
    category: string;
    title: string;
    content: string;
    icon: string | null;
    priority: number;
    updated_at: string;
  }): PracticalTip {
    return {
      id: row.id,
      category: row.category as TipCategory,
      title: row.title,
      content: row.content,
      icon: row.icon || undefined,
      priority: row.priority,
      updatedAt: new Date(row.updated_at),
    };
  }
}
