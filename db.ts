import Database from 'better-sqlite3';
import { runAsync, getAsync, allAsync } from './api/db';

let db: Database.Database | null = null;

export function getDatabase() {
  if (!db) {
    // For Vercel, we'll use a file-based database
    // In production, consider using Vercel KV or another serverless database
    db = new Database('./academic.db');
    db.pragma('journal_mode = WAL');
  }
  return db;
}

export { runAsync, getAsync, allAsync };