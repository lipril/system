export const schema = `
CREATE TABLE IF NOT EXISTS students(
  id TEXT PRIMARY KEY,
  name TEXT,
  passwordHash TEXT,
  webauthnId TEXT,
  createdAt TEXT
);
CREATE TABLE IF NOT EXISTS results(
  id INTEGER PRIMARY KEY,
  studentId TEXT,
  periodType TEXT,
  periodLabel TEXT,
  gpa REAL,
  details TEXT
);
CREATE TABLE IF NOT EXISTS courses(
  id TEXT PRIMARY KEY,
  title TEXT,
  credit REAL,
  teacher TEXT
);
CREATE TABLE IF NOT EXISTS enrollments(
  id INTEGER PRIMARY KEY,
  studentId TEXT,
  courseId TEXT,
  status TEXT
);
CREATE TABLE IF NOT EXISTS routine(
  id INTEGER PRIMARY KEY,
  courseId TEXT,
  day TEXT,
  time TEXT,
  room TEXT
);
CREATE TABLE IF NOT EXISTS attendance(
  id INTEGER PRIMARY KEY,
  studentId TEXT,
  courseId TEXT,
  ts TEXT,
  method TEXT
);
CREATE TABLE IF NOT EXISTS assignments(
  id INTEGER PRIMARY KEY,
  courseId TEXT,
  title TEXT,
  dueDate TEXT
);
CREATE TABLE IF NOT EXISTS submissions(
  id INTEGER PRIMARY KEY,
  studentId TEXT,
  assignmentId INTEGER,
  status TEXT,
  submittedAt TEXT
);
`;
