# 🎓 North China University of Water Resources and Electric Power
## Academic Management System

A comprehensive university management platform with three beautiful, feature-rich dashboards for **Admin**, **Teacher**, and **Student** roles.

---

## ✨ System Features

### 🔐 Multi-Role Authentication
- **Admin Portal** - Complete system management
- **Teacher Portal** - Course and student management  
- **Student Portal** - Academic tracking and information

### 🎨 Beautiful UI/UX
- Modern gradient designs with vibrant colors
- Responsive layouts for all devices
- Smooth animations and transitions
- Glassmorphism effects with backdrop blur
- Color-coded cards and badges

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Install Backend Dependencies**
```bash
cd c:/Users/afroz/CodeBuddy/20251125214834
npm install
```

2. **Install Frontend Dependencies**
```bash
cd client
npm install
```

### Running the Application

1. **Start Backend Server**
```bash
cd c:/Users/afroz/CodeBuddy/20251125214834
npm run dev
```
Server runs at: `http://localhost:3000`

2. **Start Frontend (New Terminal)**
```bash
cd c:/Users/afroz/CodeBuddy/20251125214834/client
npm run dev
```
App runs at: `http://localhost:5173`

---

## 👤 Demo Login Credentials

### Admin Dashboard
- **ID:** `admin`
- **Password:** `admin123`

### Teacher Dashboard
- **ID:** `T001`
- **Password:** `teacher123`

### Student Dashboard
- **ID:** `S12345`
- **Password:** `demo`

---

## 📊 Feature Breakdown

### 🎯 ADMIN DASHBOARD

#### Student Management
- ✅ Add new students with complete profile
  - Student ID, Name, Email
  - Department
  - Enrollment Date & Graduation Date
  - Password setup
  - **Photo Upload** for face recognition
  - **Face Descriptor** storage for biometric attendance

- ✅ View all students with detailed information
- ✅ Edit student profiles
- ✅ Delete students
- ✅ Search and filter students

#### Teacher Management
- ✅ Add new teachers
  - Teacher ID, Name, Email
  - Department assignment
  - Password setup
  - Photo upload

- ✅ View all teachers
- ✅ Edit teacher profiles
- ✅ Delete teachers
- ✅ Department-wise filtering

#### Class Routine Management
- ✅ Upload class routine photos
- ✅ Semester-wise routine organization
- ✅ Department-based routine distribution

#### Statistics Dashboard
- ✅ Total Students Count
- ✅ Total Teachers Count
- ✅ Total Courses Count
- ✅ Visual stat cards with gradients

#### Features:
- 🎨 Purple-Pink gradient theme
- 📸 Photo upload with preview
- 🔍 Real-time search functionality
- 📊 Interactive statistics cards
- 🎯 One-click student/teacher management

---

### 👨‍🏫 TEACHER DASHBOARD

#### Course Management
- ✅ View assigned courses
- ✅ See enrolled students in each course
- ✅ Course-wise student lists
- ✅ Student photos and face ID status

#### Attendance Management
- ✅ **Manual Attendance Marking**
  - Select student from dropdown
  - Choose date
  - Mark status: Present/Absent/Sick Leave
  
- ✅ **Face ID Attendance** (Placeholder for camera integration)
  - Automatic student recognition
  - One-click batch attendance
  - Face descriptor matching
  
- ✅ View attendance history
  - Student-wise records
  - Date-wise filtering
  - Method tracking (Manual/Face ID)
  - Status indicators (Present/Absent/Sick)

#### Marks & GPA Management
- ✅ Add exam marks for students
  - Select student
  - Exam type (Midterm, Final, Quiz, etc.)
  - Marks obtained / Total marks
  - **Automatic GPA calculation**
  - **Automatic Grade assignment** (A+, A, A-, B+, etc.)

- ✅ View student performance
  - Individual student GPA
  - All exam results
  - Grade distribution
  - Performance tracking

#### GPA Calculation System
```
A+ (4.0) = 90-100%
A  (3.7) = 85-89%
A- (3.3) = 80-84%
B+ (3.0) = 75-79%
B  (2.7) = 70-74%
B- (2.3) = 65-69%
C+ (2.0) = 60-64%
C  (1.7) = 55-59%
D  (1.0) = 50-54%
F  (0.0) = Below 50%
```

#### Features:
- 🎨 Emerald-Teal gradient theme
- 📊 Real-time GPA calculations
- ✅ Sick leave management
- 📸 Face recognition ready
- 📈 Performance analytics
- 🎯 Quick student lookup

---

### 👨‍🎓 STUDENT DASHBOARD

#### Overview Tab
- ✅ Complete student profile
  - Photo display
  - Personal information
  - Department details
  - Enrollment & graduation dates

- ✅ Performance Statistics
  - **Overall GPA** (calculated from all results)
  - Enrolled courses count
  - **Attendance percentage**
  - Pending assignments count

- ✅ Recent exam results (Top 4)
- ✅ Upcoming assignments list

#### Exam Results Tab
- ✅ Complete exam history
  - Course-wise results
  - Exam types (Midterm, Final, etc.)
  - Marks obtained / Total marks
  - Percentage calculation
  - **Grade with color coding**
  - Individual exam GPA

- ✅ Visual grade badges
  - Green for A grades
  - Blue for B grades
  - Yellow for C grades
  - Red for D/F grades

#### Class Routine Tab
- ✅ Weekly class schedule
  - Course title
  - Day and time
  - Room number
  - Class routine photos

- ✅ Enrolled courses details
  - Course credits
  - Teacher information
  - Department
  - Semester

#### Attendance Tab
- ✅ Complete attendance history
  - Course-wise records
  - Date and timestamp
  - **Status with icons**:
    - ✅ Present (Green)
    - 🤒 Sick Leave (Yellow)
    - ❌ Absent (Red)
  - Method indicator (Face ID/Manual)

- ✅ Overall attendance percentage

#### Features:
- 🎨 Blue-Cyan gradient theme
- 📊 Real-time statistics
- 📈 Performance tracking
- 📅 Interactive calendar
- 🎯 User-friendly navigation
- 📱 Fully responsive design

---

## 🎨 Color Scheme

### Admin Dashboard
- Primary: Purple (#9333EA) to Pink (#EC4899)
- Cards: White with glass effect
- Text: White/Purple contrast

### Teacher Dashboard
- Primary: Emerald (#10B981) to Teal (#14B8A6)
- Accent: Cyan highlights
- Status: Green/Yellow/Red indicators

### Student Dashboard
- Primary: Blue (#3B82F6) to Cyan (#06B6D4)
- Accent: Purple gradients
- Grades: Color-coded (A=Green, B=Blue, C=Yellow, D/F=Red)

---

## 📸 Face Recognition Feature

### Implementation Status
- ✅ Database schema ready for face descriptors
- ✅ Photo upload functionality
- ✅ Face ID status indicators
- ✅ Face-based attendance endpoints
- ⚠️ **Camera integration pending** (placeholder implemented)

### For Production Face Recognition:
1. Install face-api.js or similar library
2. Implement face detection on photo upload
3. Store face descriptors in database
4. Add live camera feed for attendance
5. Match detected faces with stored descriptors
6. Auto-mark attendance for matched faces

---

## 🗄️ Database Schema

### Tables:
- **users** - Admin accounts
- **students** - Student profiles with face data
- **teachers** - Teacher profiles
- **courses** - Course catalog
- **results** - Exam marks and GPAs
- **enrollments** - Student-course mappings
- **routine** - Class schedules
- **attendance** - Attendance records with method
- **assignments** - Assignment details
- **submissions** - Student submissions
- **semesterRoutines** - Semester routine photos

---

## 🔧 Technology Stack

### Backend
- **Framework:** Express.js + TypeScript
- **Database:** SQLite3 (file-based, zero setup)
- **Authentication:** Password-based (hash storage)
- **File Upload:** Multer (ready for images)

### Frontend
- **Framework:** React 18 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS
- **UI:** Custom gradient components
- **Icons:** Emoji-based (no dependencies)

### Key Libraries
- tsx - TypeScript execution
- sqlite3 - Database driver
- cors - Cross-origin support
- multer - File uploads

---

## 📱 Responsive Design

All dashboards are fully responsive:
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px)
- ✅ Tablet (768px)
- ✅ Mobile (375px)

---

## 🎓 University Information

**Name:** North China University of Water Resources and Electric Power  
**Chinese:** 华北水利水电大学  
**System:** Academic Management & Student Portal

---

## 🚀 Future Enhancements

### Planned Features:
1. **Face Recognition**
   - Live camera integration
   - Real-time face detection
   - Automatic attendance marking

2. **Advanced Analytics**
   - Department-wise performance
   - Course completion rates
   - Attendance trends

3. **Notifications**
   - Email/SMS alerts
   - Assignment reminders
   - Grade announcements

4. **File Management**
   - Assignment submissions
   - Study materials upload
   - Grade sheets download

5. **Communication**
   - Student-teacher messaging
   - Announcements board
   - Notice distribution

---

## 📞 Support

For issues or questions:
1. Check demo credentials are correct
2. Ensure both servers are running
3. Clear browser cache if UI issues
4. Check console for error messages

---

## 📝 License

MIT License - Free for educational use

---

**Made with ❤️ for North China University of Water Resources and Electric Power**

🎓 华北水利水电大学学术管理系统
