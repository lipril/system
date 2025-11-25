# Deployment Guide - Computerestic Student Academic System

This guide provides step-by-step instructions to deploy your application to production.

## Table of Contents
1. [Quick Deploy (Recommended)](#quick-deploy-recommended)
2. [Manual Deploy](#manual-deploy)
3. [Advanced Options](#advanced-options)

---

## Quick Deploy (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Render account (free tier available)

### Step 1: Prepare Your Code

1. **Initialize Git** (if not already done):
   ```powershell
   cd c:/Users/afroz/CodeBuddy/20251125214834
   git init
   git add .
   git commit -m "Initial commit - Computerestic Academic System"
   ```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., `student-academic-system`)
   - Don't initialize with README (we already have code)

3. **Push to GitHub**:
   ```powershell
   git remote add origin https://github.com/YOUR_USERNAME/student-academic-system.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy Backend to Render

1. **Go to Render Dashboard**:
   - Visit https://render.com
   - Sign up/Login
   - Click "New +" → "Web Service"

2. **Connect Repository**:
   - Connect your GitHub account
   - Select your repository
   - Click "Connect"

3. **Configure Service**:
   - Name: `academic-system-api`
   - Environment: `Node`
   - Region: Choose closest to you
   - Branch: `main`
   - Root Directory: `.` (leave blank)
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

4. **Add Environment Variables** (Optional):
   ```
   NODE_ENV=production
   ```

5. **Add Persistent Disk** (for SQLite):
   - Scroll to "Disk"
   - Click "Add Disk"
   - Name: `academic-db`
   - Mount Path: `/app/data`
   - Size: 1GB

6. **Update Backend Code** for Persistent Storage:
   
   Edit `src/db.ts`:
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

7. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment (3-5 minutes)
   - Copy your backend URL (e.g., `https://academic-system-api.onrender.com`)

### Step 3: Deploy Frontend to Vercel

1. **Update API URL**:
   
   Edit `client/src/api.ts`:
   ```typescript
   const API = import.meta.env.PROD 
     ? 'https://academic-system-api.onrender.com/api'
     : 'http://localhost:3000/api';
   ```

2. **Update WebAuthn Config for Production**:
   
   Edit `src/webauthn.ts`:
   ```typescript
   const rpID = process.env.NODE_ENV === 'production' 
     ? 'student-academic-system.vercel.app' // Replace with your Vercel domain
     : 'localhost';

   const expectedOrigin = process.env.NODE_ENV === 'production'
     ? 'https://student-academic-system.vercel.app' // Replace with your Vercel domain
     : 'http://localhost:5173';
   ```

3. **Update CORS**:
   
   Edit `src/server.ts`:
   ```typescript
   const allowedOrigins = [
     'http://localhost:5173',
     'https://student-academic-system.vercel.app', // Replace with your Vercel domain
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

4. **Commit Changes**:
   ```powershell
   git add .
   git commit -m "Update for production deployment"
   git push
   ```

5. **Deploy to Vercel**:
   - Visit https://vercel.com
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: Vite
     - Root Directory: `client`
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click "Deploy"
   - Wait for deployment (1-2 minutes)

6. **Get Your URLs**:
   - Frontend: `https://student-academic-system.vercel.app`
   - Backend: `https://academic-system-api.onrender.com`

7. **Update WebAuthn rpID** (if different):
   - Go back to `src/webauthn.ts` and update with actual Vercel domain
   - Commit and push changes
   - Render will auto-redeploy

### Step 4: Test Production

1. Visit your Vercel URL
2. Try logging in with Student ID `S12345` and password `demo`
3. Register device authentication
4. Test face/passkey login
5. Test attendance recording

---

## Manual Deploy

### Option 1: Deploy to Railway

1. **Install Railway CLI**:
   ```powershell
   npm install -g @railway/cli
   ```

2. **Login**:
   ```powershell
   railway login
   ```

3. **Initialize Project**:
   ```powershell
   railway init
   ```

4. **Deploy Backend**:
   ```powershell
   railway up
   ```

5. **Add Custom Domain** (optional):
   ```powershell
   railway domain
   ```

### Option 2: Deploy to Fly.io

1. **Install Fly CLI**:
   ```powershell
   iwr https://fly.io/install.ps1 -useb | iex
   ```

2. **Login**:
   ```powershell
   fly auth login
   ```

3. **Create `fly.toml`**:
   ```toml
   app = "academic-system"

   [build]
     builder = "paketobuildpacks/builder:base"

   [[services]]
     internal_port = 3000
     protocol = "tcp"

     [[services.ports]]
       handlers = ["http"]
       port = 80

     [[services.ports]]
       handlers = ["tls", "http"]
       port = 443
   ```

4. **Deploy**:
   ```powershell
   fly launch
   fly deploy
   ```

### Option 3: VPS (DigitalOcean, AWS, Azure)

1. **Setup Server**:
   - Create Ubuntu 22.04 droplet
   - SSH into server

2. **Install Node.js**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone Repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/student-academic-system.git
   cd student-academic-system
   ```

4. **Install Dependencies**:
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

5. **Build**:
   ```bash
   npm run build
   cd client && npm run build && cd ..
   ```

6. **Install PM2**:
   ```bash
   sudo npm install -g pm2
   ```

7. **Start Backend**:
   ```bash
   pm2 start dist/server.js --name academic-api
   pm2 save
   pm2 startup
   ```

8. **Serve Frontend with Nginx**:
   ```bash
   sudo apt install nginx
   sudo cp -r client/dist/* /var/www/html/
   ```

9. **Configure Nginx**:
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```

   Add:
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;

     location / {
       root /var/www/html;
       try_files $uri $uri/ /index.html;
     }

     location /api {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

10. **Restart Nginx**:
    ```bash
    sudo systemctl restart nginx
    ```

11. **Setup SSL with Certbot**:
    ```bash
    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx -d your-domain.com
    ```

---

## Advanced Options

### Use PostgreSQL Instead of SQLite

For production with multiple instances, use PostgreSQL:

1. **Install Drizzle PostgreSQL**:
   ```powershell
   npm install pg drizzle-orm
   npm install -D @types/pg
   ```

2. **Update `src/db.ts`**:
   ```typescript
   import { drizzle } from 'drizzle-orm/node-postgres';
   import { Pool } from 'pg';

   const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
   });

   export const db = drizzle(pool);
   ```

3. **Add DATABASE_URL** to Render environment variables

### Add Redis for WebAuthn Challenges

1. **Install Redis Client**:
   ```powershell
   npm install redis
   ```

2. **Update `src/webauthn.ts`**:
   ```typescript
   import { createClient } from 'redis';

   const redis = createClient({ url: process.env.REDIS_URL });
   redis.connect();

   export function startRegister(studentId: string) {
     const opts = generateRegistrationOptions(/* ... */);
     await redis.setEx(`reg:${studentId}`, 300, opts.challenge); // 5 min TTL
     return opts;
   }
   ```

### Add Custom Domain

#### Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS with provided records

#### Render:
1. Go to Service Settings → Custom Domains
2. Add your domain
3. Update DNS with provided CNAME

### Environment Variables

Create `.env` files for different environments:

**Backend `.env.production`**:
```
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://host:6379
FRONTEND_URL=https://student-academic-system.vercel.app
```

**Frontend `.env.production`**:
```
VITE_API_URL=https://academic-system-api.onrender.com/api
```

Update code to use:
```typescript
const API = import.meta.env.VITE_API_URL;
```

---

## Post-Deployment Checklist

- [ ] Backend is accessible via HTTPS
- [ ] Frontend is accessible via HTTPS
- [ ] CORS is properly configured
- [ ] WebAuthn rpID matches frontend domain
- [ ] Database is persistent (disk attached or managed DB)
- [ ] Environment variables are set
- [ ] Test all features:
  - [ ] Login with ID
  - [ ] Register device auth
  - [ ] Login with Face/Passkey
  - [ ] View dashboard
  - [ ] Record attendance
  - [ ] View results and assignments

---

## Monitoring

### Render:
- View logs in Render dashboard
- Set up health checks
- Enable auto-deploy from GitHub

### Vercel:
- View deployment logs
- Check Analytics tab
- Set up alerts

### Error Tracking (Optional):
- Sentry: `npm install @sentry/node @sentry/react`
- LogRocket: For session replay

---

## Backup Strategy

### SQLite Backup:
```bash
# On server
sqlite3 academic.db ".backup academic-backup-$(date +%Y%m%d).db"
```

### PostgreSQL Backup:
```bash
pg_dump DATABASE_URL > backup.sql
```

### Automated Backups:
- Render: Enable automatic backups in disk settings
- Railway: Built-in backup system
- Fly.io: Use volumes with snapshots

---

## Troubleshooting Production

### "Cannot connect to backend"
- Check CORS settings
- Verify backend URL is correct
- Check Render logs for errors

### "WebAuthn not working"
- Ensure HTTPS is enabled
- Verify rpID matches domain
- Check browser compatibility

### "Database errors"
- Verify disk is attached (Render)
- Check DATABASE_URL (if using PostgreSQL)
- Review migration logs

### "Slow performance"
- Upgrade Render tier (free tier sleeps after inactivity)
- Add Redis caching
- Optimize database queries

---

**Congratulations! Your Computerestic Academic System is now live! 🚀**
