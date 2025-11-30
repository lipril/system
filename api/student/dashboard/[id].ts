import { VercelRequest, VercelResponse } from '@vercel/node';
import { db, getAsync, allAsync } from '../../../db';
import { initDB } from '../../../init';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Initialize database if not already done
    await initDB();

    const { id } = req.query;
    
    const student = await getAsync.call(db, 'SELECT * FROM students WHERE id=?', id);
    const results = await allAsync.call(db, 
      `SELECT r.*, c.title as courseTitle FROM results r 
       JOIN courses c ON r.courseId=c.id 
       WHERE r.studentId=? ORDER BY r.createdAt DESC`, 
      id
    );
    const courses = await allAsync.call(db, 
      `SELECT c.*, t.name as teacherName FROM courses c 
       JOIN teachers t ON c.teacherId=t.id
       JOIN enrollments e ON c.id=e.courseId 
       WHERE e.studentId=? AND e.status='active'`, 
      id
    );
    const routine = await allAsync.call(db, 
      `SELECT r.*, c.title, c.id as courseId FROM routine r 
       JOIN courses c ON r.courseId=c.id
       JOIN enrollments e ON c.id=e.courseId
       WHERE e.studentId=? AND e.status='active'`, 
      id
    );
    const semesterRoutines = await allAsync.call(db,
      `SELECT * FROM semesterRoutines WHERE department=? OR grade=? ORDER BY uploadedAt DESC`,
      (student as any).department, (student as any).grade
    );
    const assignments = await allAsync.call(db, 
      `SELECT a.*, c.title AS courseTitle FROM assignments a 
       JOIN courses c ON a.courseId=c.id
       JOIN enrollments e ON c.id=e.courseId
       WHERE e.studentId=? AND e.status='active' ORDER BY a.dueDate`, 
      id
    );
    const attendance = await allAsync.call(db, 
      `SELECT a.*, c.title as courseTitle FROM attendance a 
       JOIN courses c ON a.courseId=c.id 
       WHERE a.studentId=? ORDER BY a.ts DESC LIMIT 10`, 
      id
    );
    
    res.json({ student, results, courses, routine, semesterRoutines, assignments, attendance });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}