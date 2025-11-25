import db from './db.js';
import { schema } from './schema.js';

// Initialize schema
db.exec(schema);

// Seed demo data if not present
const hasStudent = db.prepare('SELECT COUNT(*) as c FROM students WHERE id = ?').get('S12345') as any;
if (!hasStudent || hasStudent.c === 0) {
  const addStudent = db.prepare('INSERT OR IGNORE INTO students(id,name,passwordHash,createdAt) VALUES (?,?,?,?)');
  addStudent.run('S12345','Afroz','password:demo', new Date().toISOString());

  const addCourse = db.prepare('INSERT OR IGNORE INTO courses(id,title,credit,teacher) VALUES (?,?,?,?)');
  addCourse.run('CS101','Intro to CS',3,'Dr. Ada');
  addCourse.run('CS201','Data Structures',4,'Dr. Turing');

  const addRoutine = db.prepare('INSERT INTO routine(courseId,day,time,room) VALUES (?,?,?,?)');
  addRoutine.run('CS101','Mon','09:00-10:30','R101');
  addRoutine.run('CS201','Wed','11:00-12:30','R202');

  const addResult = db.prepare('INSERT INTO results(studentId,periodType,periodLabel,gpa,details) VALUES (?,?,?,?,?)');
  addResult.run('S12345','semester','Fall 2025',3.7,'CS101:A-, CS201:B+');

  const addAssign = db.prepare('INSERT INTO assignments(courseId,title,dueDate) VALUES (?,?,?)');
  addAssign.run('CS101','Project 1','2025-12-10');
  addAssign.run('CS201','Lab 3','2025-12-15');
}
