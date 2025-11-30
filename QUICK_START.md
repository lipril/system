# Quick Start Guide - NCWU University Management System

## 🎯 Final Steps Before Running

### Step 1: Save the Images (REQUIRED)

You provided two images that need to be saved:

1. **picture1** → Save as `client/public/assets/logo.png`
2. **portal-background** → Save as `client/public/assets/portal-background.jpg`

**How to save**:
- Right-click each image
- "Save As..."
- Navigate to: `c:/Users/afroz/CodeBuddy/20251125214834/client/public/assets/`
- Use the exact filenames above

### Step 2: Install Dependencies

Open PowerShell and run:

```powershell
# Navigate to project
cd c:/Users/afroz/CodeBuddy/20251125214834

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Step 3: Start the Application

**Terminal 1 - Backend**:
```powershell
cd c:/Users/afroz/CodeBuddy/20251125214834
npm run dev
```

**Terminal 2 - Frontend** (open new terminal):
```powershell
cd c:/Users/afroz/CodeBuddy/20251125214834/client
npm run dev
```

### Step 4: Access the System

Open your browser to: **http://localhost:5173**

---

## 🔐 Login Credentials

### Admin Account
- **Email**: `admin@ncwu.edu.cn`
- **Password**: `admin123`
- **Can**: Manage students, teachers, courses, routines

### Teacher Account
- **Email**: `ada@ncwu.edu.cn`
- **Password**: `teacher123`
- **Can**: View students, create assignments, mark attendance, enter grades

### Student Account
- **Email**: `afroz@ncwu.edu.cn`
- **Password**: `demo`
- **Can**: View courses, assignments, grades, routines

---

## ✨ Key Features to Test

### As Admin:
1. ✅ Click "Students" → Add new student (try Grade 1 or Grade 2)
2. ✅ Click "Edit" on any student → Modify their information
3. ✅ Click "Teachers" → Add new teacher
4. ✅ Click "Courses" → Create course and assign to teacher + grade
5. ✅ Click "Routines" → Upload a class routine photo

### As Teacher:
1. ✅ View "My Courses" → See assigned courses
2. ✅ Click "Students" → Filter by grade
3. ✅ Click "Assignments" → Create new assignment with deadline
4. ✅ Click "Attendance" → Mark student attendance
5. ✅ Click "Exam Marks" → Enter student grades

### As Student:
1. ✅ View "Courses" → See enrolled subjects and teachers
2. ✅ View "Assignments" → See all assignments with deadlines
3. ✅ View "Results" → Check exam marks and GPA
4. ✅ View "Routine" → See class schedule
5. ✅ View "Attendance" → Check attendance records

---

## 🎨 Visual Themes

- **Admin Dashboard**: Purple/Indigo professional theme
- **Teacher Dashboard**: Emerald/Teal academic theme
- **Student Dashboard**: Cyan cyber/futuristic theme
- **Login Page**: Professional with university branding

---

## 📱 Responsive Design

The system works on:
- 💻 Desktop computers
- 📱 Tablets
- 📱 Mobile phones

---

## 🆘 Troubleshooting

### Images not showing?
- Verify images are saved in `client/public/assets/` with correct names
- Refresh the browser (Ctrl+F5)

### Can't login?
- Make sure backend is running (Terminal 1)
- Make sure frontend is running (Terminal 2)
- Check console for errors

### Port already in use?
- Backend uses port 3000
- Frontend uses port 5173
- Close any other applications using these ports

---

## 📊 System Features

✅ **Student Management**: Add, edit, delete with grade levels  
✅ **Teacher Management**: Full CRUD operations  
✅ **Course Management**: Assign teachers to subjects by grade  
✅ **Assignment System**: Create with deadlines and descriptions  
✅ **Attendance Tracking**: Mark by course and grade  
✅ **Exam Results**: Enter marks and calculate GPA  
✅ **Class Routines**: Upload schedule photos by grade  
✅ **Modern UI**: Three distinct themes for each role  
✅ **University Branding**: NCWU logo and name throughout  

---

## 🎓 University Information

**Full Name**: North China University of Water Resources and Electric Power  
**Short Name**: NCWU  
**System**: Comprehensive Academic Management Portal  

---

## 📝 Next Steps

After testing the demo accounts:

1. **Add Real Data**: Use admin account to add actual students and teachers
2. **Create Courses**: Set up real courses with teacher assignments
3. **Upload Routines**: Add actual class schedules
4. **Customize**: Modify themes or add features as needed

---

## 🚀 You're All Set!

Everything is ready. Just:
1. Save the two images
2. Run `npm install` in both directories
3. Start both servers
4. Access http://localhost:5173

**Enjoy your new NCWU University Management System!**
