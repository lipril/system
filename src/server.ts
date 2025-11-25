import express from 'express';
import cors from 'cors';
import db from './db.js';
import './init.js';
import { startRegister, finishRegister, startAuth, finishAuth } from './webauthn.js';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({ 
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));
app.use(express.json({ limit: '1mb' }));

app.post('/api/login-id', (req, res) => {
  const { id, password } = req.body as { id: string; password: string };
  const row = db.prepare('SELECT * FROM students WHERE id=? AND passwordHash=?').get(id, `password:${password}`);
  if (row) return res.json({ ok: true });
  return res.status(401).json({ ok: false });
});

app.get('/api/webauthn/register/start', (req, res) => {
  const studentId = String(req.query.studentId || '');
  if (!studentId) return res.status(400).json({ error: 'studentId required' });
  // Ensure student exists (create demo if missing)
  db.prepare('INSERT OR IGNORE INTO students(id,name,passwordHash,createdAt) VALUES (?,?,?,?)')
    .run(studentId, studentId, 'password:demo', new Date().toISOString());
  const opts = startRegister(studentId);
  res.json(opts);
});

app.post('/api/webauthn/register/finish', async (req, res) => {
  const { studentId, cred } = req.body as any;
  try {
    await finishRegister(studentId, cred);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ ok: false, error: (e as Error).message });
  }
});

app.get('/api/webauthn/auth/start', (req, res) => {
  const studentId = String(req.query.studentId || '');
  if (!studentId) return res.status(400).json({ error: 'studentId required' });
  const opts = startAuth(studentId);
  res.json(opts);
});

app.post('/api/webauthn/auth/finish', async (req, res) => {
  const { studentId, cred } = req.body as any;
  try {
    await finishAuth(studentId, cred);
    res.json({ ok: true });
  } catch (e) {
    res.status(401).json({ ok: false, error: (e as Error).message });
  }
});

app.get('/api/dashboard/:id', (req, res) => {
  const id = req.params.id;
  const results = db.prepare('SELECT * FROM results WHERE studentId=?').all(id);
  const courses = db.prepare('SELECT * FROM courses').all();
  const routine = db.prepare('SELECT r.*, c.title FROM routine r JOIN courses c ON r.courseId=c.id').all();
  const assignments = db.prepare('SELECT a.*, c.title AS courseTitle FROM assignments a JOIN courses c ON a.courseId=c.id').all();
  const submissions = db.prepare('SELECT * FROM submissions WHERE studentId=?').all(id);
  const attendance = db.prepare('SELECT * FROM attendance WHERE studentId=?').all(id);
  res.json({ results, courses, routine, assignments, submissions, attendance });
});

app.post('/api/attendance', (req, res) => {
  const { studentId, courseId, method } = req.body as { studentId: string; courseId: string; method: 'webauthn' | 'id' };
  db.prepare('INSERT INTO attendance(studentId,courseId,ts,method) VALUES (?,?,?,?)')
    .run(studentId, courseId, new Date().toISOString(), method);
  res.json({ ok: true });
});

app.listen(3000, () => console.log('API running at http://localhost:3000'));
