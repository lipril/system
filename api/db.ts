import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import { existsSync, mkdirSync } from 'fs';

const dbPath = process.env.NODE_ENV === 'production' 
  ? '/app/data/academic.db' 
  : 'academic.db';

// Ensure directory exists in production
if (process.env.NODE_ENV === 'production') {
  const dir = '/app/data';
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

const db = new sqlite3.Database(dbPath);

// Helper to promisify db methods
const runAsync = promisify(db.run.bind(db));
const getAsync = promisify(db.get.bind(db));
const allAsync = promisify(db.all.bind(db));

export { db, runAsync, getAsync, allAsync };
export default db;