import Database from 'better-sqlite3';
import { existsSync, mkdirSync } from 'fs';

const dbPath = process.env.NODE_ENV === 'production' 
  ? '/app/data/academic.db' 
  : 'academic.db';

// Ensure directory exists in production
if (process.env.NODE_ENV === 'production') {
  const dir = '/app/data';
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
export default db;