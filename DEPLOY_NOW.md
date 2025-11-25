# Deploy Now - Step by Step

All build errors are fixed! Follow these exact steps to deploy.

## Prerequisites

- GitHub account
- Git installed on your machine
- Vercel account (sign up at https://vercel.com)
- Render account (sign up at https://render.com)

---

## Step 1: Push to GitHub (5 minutes)

### 1.1 Install Git (if needed)
Download from: https://git-scm.com/download/win

### 1.2 Initialize Repository

```powershell
cd c:/Users/afroz/CodeBuddy/20251125214834
git init
git add .
git commit -m "Initial commit - Computerestic Academic System with build fixes"
```

### 1.3 Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `student-academic-system`
3. Keep it public or private (your choice)
4. **Do NOT** initialize with README
5. Click "Create repository"

### 1.4 Push to GitHub

```powershell
git remote add origin https://github.com/YOUR_USERNAME/student-academic-system.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 2: Deploy Backend to Render (10 minutes)

### 2.1 Sign Up/Login to Render
Go to https://render.com and create an account (free tier available)

### 2.2 Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Click **"Connect GitHub"** and authorize Render
3. Select your repository: `student-academic-system`
4. Click **"Connect"**

### 2.3 Configure Service

Fill in these settings:

- **Name:** `academic-system-api` (or any name you like)
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** Leave blank
- **Runtime:** `Node`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Instance Type:** `Free`

### 2.4 Add Environment Variables (Optional)

Click **"Advanced"** → **"Add Environment Variable"**:
- Key: `NODE_ENV`
- Value: `production`

### 2.5 Add Persistent Disk (for SQLite database)

1. Scroll down to **"Disk"**
2. Click **"Add Disk"**
3. **Name:** `academic-db`
4. **Mount Path:** `/app/data`
5. **Size:** `1 GB` (free tier)

### 2.6 Deploy!

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. You'll see build logs in real-time
4. When done, you'll get a URL like: `https://academic-system-api.onrender.com`

**Save this URL!** You'll need it for the frontend.

---

## Step 3: Update Configuration for Production

### 3.1 Update Database Path

Create file `c:/Users/afroz/CodeBuddy/20251125214834/src/db.ts`:

```typescript
import Database from 'better-sqlite3';
import { existsSync, mkdirSync } from 'fs';

const dbPath = process.env.NODE_ENV === 'production' 
  ? '/app/data/academic.db' 
  : 'academic.db';

// Ensure directory exists in production
if (process.env.NODE_ENV === 'production') {
  const dir = '/app/data';
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
export default db;
```

### 3.2 Update Frontend API URL

Edit `c:/Users/afroz/CodeBuddy/20251125214834/client/src/api.ts`:

```typescript
const API = import.meta.env.PROD 
  ? 'https://academic-system-api.onrender.com/api'  // Replace with YOUR Render URL
  : 'http://localhost:3000/api';
```

**Replace `academic-system-api.onrender.com` with your actual Render URL!**

### 3.3 Commit Changes

```powershell
git add .
git commit -m "Update config for production deployment"
git push
```

Render will auto-redeploy (wait 2-3 minutes).

---

## Step 4: Deploy Frontend to Vercel (5 minutes)

### 4.1 Sign Up/Login to Vercel
Go to https://vercel.com and sign in with GitHub

### 4.2 Import Project

1. Click **"Add New"** → **"Project"**
2. Click **"Import"** next to your `student-academic-system` repository
3. If not visible, click **"Adjust GitHub App Permissions"** and grant access

### 4.3 Configure Project

- **Framework Preset:** Vite
- **Root Directory:** `client` ⚠️ **Important!**
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 4.4 Deploy!

1. Click **"Deploy"**
2. Wait 1-2 minutes
3. You'll get a URL like: `https://student-academic-system.vercel.app`

---

## Step 5: Update WebAuthn Configuration

### 5.1 Copy Your Vercel URL

Example: `student-academic-system.vercel.app` (without https://)

### 5.2 Update Backend WebAuthn Config

Edit `c:/Users/afroz/CodeBuddy/20251125214834/src/webauthn.ts`:

```typescript
const rpID = process.env.NODE_ENV === 'production' 
  ? 'student-academic-system.vercel.app'  // Replace with YOUR Vercel domain (no https://)
  : 'localhost';

const expectedOrigin = process.env.NODE_ENV === 'production'
  ? 'https://student-academic-system.vercel.app'  // Replace with YOUR Vercel domain (with https://)
  : 'http://localhost:5173';
```

### 5.3 Update CORS

Edit `c:/Users/afroz/CodeBuddy/20251125214834/src/server.ts`:

```typescript
const allowedOrigins = [
  'http://localhost:5173',
  'https://student-academic-system.vercel.app',  // Replace with YOUR Vercel URL
];

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
```

### 5.4 Commit and Push

```powershell
git add .
git commit -m "Update WebAuthn and CORS for production"
git push
```

Wait for:
- Render to redeploy backend (2-3 minutes)
- Vercel to redeploy frontend (1-2 minutes)

---

## Step 6: Test Your Live Application! 🎉

### 6.1 Open Your Vercel URL

```
https://student-academic-system.vercel.app
```

### 6.2 Test Login

- **Student ID:** `S12345`
- **Password:** `demo`
- Click **"Login ID"**

### 6.3 Test Dashboard

You should see:
- Results section
- Assignments section
- Class routine
- Credits & teachers
- Progress tracker

### 6.4 Test Attendance

Click the **"Attend"** button on any class in the routine.

### 6.5 (Optional) Test Face/Passkey

1. Click **"Register Device Auth"**
2. Use your device's biometric (face/fingerprint/PIN)
3. Logout (refresh page)
4. Click **"Login Face/Passkey"**

---

## Your Live URLs

After deployment, you'll have:

- **Frontend:** `https://student-academic-system.vercel.app`
- **Backend API:** `https://academic-system-api.onrender.com`
- **Database:** Persistent on Render disk

---

## Troubleshooting

### Backend shows "Application failed to respond"
- Check Render logs (Dashboard → Service → Logs)
- Verify build completed successfully
- Check if disk is mounted at `/app/data`

### Frontend shows CORS errors
- Verify backend URL is correct in `client/src/api.ts`
- Verify frontend URL is in CORS allowlist in `src/server.ts`
- Check Render backend is running

### WebAuthn not working
- Ensure rpID matches your Vercel domain (no https://, no trailing slash)
- Ensure expectedOrigin has https://
- Use Chrome/Edge/Firefox (Safari may have issues)

### Database resets on every deploy
- Ensure persistent disk is attached in Render settings
- Verify mount path is `/app/data`
- Check `src/db.ts` uses correct path

---

## Custom Domain (Optional)

### Vercel Custom Domain

1. Go to Project Settings → Domains
2. Add your domain (e.g., `academic.yourdomain.com`)
3. Update DNS records as shown
4. Update `rpID` and CORS with new domain

### Render Custom Domain

1. Go to Service Settings → Custom Domains
2. Add your domain (e.g., `api.yourdomain.com`)
3. Update DNS with provided CNAME
4. Update frontend API URL

---

## Monitoring & Maintenance

### Render Dashboard
- View logs in real-time
- Check resource usage
- Monitor uptime

### Vercel Dashboard
- View deployment history
- Check analytics
- Monitor performance

### Free Tier Limits
- **Render:** Backend sleeps after 15 min inactivity (wakes on request)
- **Vercel:** 100 GB bandwidth/month, unlimited deployments

---

## Next Steps After Deployment

1. ✅ Test all features on live URL
2. ✅ Add more students/courses in `src/init.ts`
3. ✅ Customize UI colors in `client/src/App.tsx`
4. ✅ Share your live URL with users!

---

**Congratulations! Your Computerestic Academic System is now LIVE! 🚀**

Share your URL and let students access it from anywhere!
