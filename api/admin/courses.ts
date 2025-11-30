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
        const courses = await allAsync.call(db, 'SELECT * FROM courses ORDER BY title');
        return res.json(courses);

      case 'POST':
        const { id, title, credit, teacherId, department, grade, semester } = req.body;
        await runAsync.call(db, 
          'INSERT INTO courses(id,title,credit,teacherId,department,grade,semester) VALUES (?,?,?,?,?,?,?)',
          id, title, credit, teacherId || null, department, grade || null, semester
        );
        return res.json({ ok: true });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Courses API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}