import { VercelRequest, VercelResponse } from '@vercel/node';
import { getDatabase, runAsync, getAsync, allAsync } from '../db';
import { initDB } from '../init';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Initialize database if not already done
    const db = getDatabase();
    await initDB();

    const { id, password, role } = req.body as { id: string; password: string; role: 'admin' | 'teacher' | 'student' };
    
    let row: any;
    if (role === 'admin') {
      row = await getAsync.call(db, 'SELECT * FROM users WHERE id=? AND passwordHash=? AND role=?', id, `password:${password}`, 'admin');
    } else if (role === 'teacher') {
      row = await getAsync.call(db, 'SELECT * FROM teachers WHERE id=? AND passwordHash=?', id, `password:${password}`);
    } else {
      row = await getAsync.call(db, 'SELECT * FROM students WHERE id=? AND passwordHash=?', id, `password:${password}`);
    }
    
    if (row) return res.json({ ok: true, user: { id: row.id, name: row.name, role } });
    return res.status(401).json({ ok: false });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}