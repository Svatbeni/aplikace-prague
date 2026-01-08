import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (db) {
    return db;
  }

  db = await SQLite.openDatabaseAsync('prague.db');

  // Create tables
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS places (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      short_description TEXT,
      description TEXT,
      practical_tips TEXT,
      category TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      opening_hours TEXT,
      images TEXT,
      address TEXT,
      estimated_visit_duration INTEGER,
      price_range TEXT,
      is_premium INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_places_category ON places(category);
    CREATE INDEX IF NOT EXISTS idx_places_premium ON places(is_premium);

    CREATE TABLE IF NOT EXISTS itineraries (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      type TEXT NOT NULL,
      theme TEXT,
      places TEXT NOT NULL,
      estimated_duration INTEGER,
      walking_distance REAL,
      transport_hints TEXT,
      difficulty TEXT,
      is_premium INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_itineraries_type ON itineraries(type);
    CREATE INDEX IF NOT EXISTS idx_itineraries_theme ON itineraries(theme);

    CREATE TABLE IF NOT EXISTS tours (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      short_description TEXT,
      description TEXT,
      duration TEXT,
      price_range TEXT,
      affiliate_link TEXT NOT NULL,
      provider TEXT,
      category TEXT,
      rating REAL,
      image_url TEXT,
      requires_online INTEGER DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tips (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      icon TEXT,
      priority INTEGER DEFAULT 0,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_tips_category ON tips(category);

    CREATE TABLE IF NOT EXISTS hotels (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      area TEXT NOT NULL,
      description TEXT,
      price_range TEXT,
      affiliate_link TEXT NOT NULL,
      image_url TEXT,
      rating REAL,
      features TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS favorites (
      id TEXT PRIMARY KEY,
      item_type TEXT NOT NULL,
      item_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      UNIQUE(item_type, item_id)
    );

    CREATE INDEX IF NOT EXISTS idx_favorites_type_id ON favorites(item_type, item_id);

    CREATE TABLE IF NOT EXISTS weather_cache (
      id TEXT PRIMARY KEY DEFAULT 'current',
      location TEXT NOT NULL,
      data TEXT NOT NULL,
      last_updated TEXT NOT NULL
    );
  `);

  return db;
};

export const getDatabase = (): SQLite.SQLiteDatabase => {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
};

