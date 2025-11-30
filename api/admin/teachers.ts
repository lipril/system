import { VercelRequest, VercelResponse } from '@vercel/node';
import { db, runAsync, allAsync } from '../../db';
import { initDB } from '../../init';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Initialize database if not already done
    await initDB();

    switch (req.method) {
      case 'GET':
        const teachers = await allAsync.call(db, 'SELECT * FROM teachers ORDER BY createdAt DESC');
        return res.json(teachers);

      case 'POST':
        const { id, name, email, department, password, photo } = req.body;
        await runAsync.call(db, 
          'INSERT INTO teachers(id,name,email,department,passwordHash,photo,createdAt) VALUES (?,?,?,?,?,?,?)',
          id, name, email, department, `password:${password}`, photo || null, new Date().toISOString()
        );
        return res.json({ ok: true });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Teachers API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}