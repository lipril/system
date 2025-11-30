# Vercel Deployment Guide

## 🚀 Deploy to Vercel

This guide will help you deploy the NCWU Academic Management System to Vercel successfully.

## 📋 Prerequisites

1. **Vercel Account** - Create account at https://vercel.com
2. **GitHub Account** - For automatic deployments
3. **Node.js** - Installed locally for testing

## 🛠️ Step-by-Step Deployment

### 1. Push to GitHub

First, push your code to GitHub:

```bash
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

### 2. Connect to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will automatically detect the framework

### 3. Configure Project Settings

#### Build Settings:
- **Framework Preset**: Vite
- **Root Directory**: `./`
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `client/dist`
- **Install Command**: `npm install && cd client && npm install`

#### Environment Variables:
Add these in Vercel dashboard → Settings → Environment Variables:

```
NODE_ENV=production
VITE_API_URL=/api
```

### 4. Deploy

Click "Deploy" and wait for the build to complete.

## ⚠️ Important Notes

### Database Limitations

**Current Setup**: Uses SQLite file-based database
- **Works for**: Development and small-scale testing
- **Limitations**: 
  - Database resets on each deployment
  - Not suitable for production data
  - No data persistence across deployments

### Production Database Options

For production, consider these alternatives:

#### Option 1: Vercel KV (Recommended)
```bash
npm install @vercel/kv
```
Update database calls to use Vercel KV instead of SQLite.

#### Option 2: External Database
- **PostgreSQL**: Supabase, PlanetScale, Neon
- **MongoDB**: Atlas
- **MySQL**: PlanetScale, Railway

#### Option 3: Keep SQLite (Limited)
- Only for demo/testing purposes
- Data will be lost on redeployments

### WebAuthn/Biometric Authentication

**Current Issue**: WebAuthn requires HTTPS and stable domain
- **Development**: Works on localhost
- **Production**: Needs proper HTTPS setup

**Solution**:
1. Deploy to get your Vercel domain
2. Update WebAuthn configuration in Vercel environment variables:
   ```
   WEBAUTHN_RP_ID=your-domain.vercel.app
   WEBAUTHN_RP_ORIGIN=https://your-domain.vercel.app
   ```

## 🔧 Configuration Files Created

### `vercel.json`
- Configures serverless functions
- Sets up routing
- Defines build settings

### `api/` directory
- Contains serverless API endpoints
- Each file is a separate function
- Handles CORS for cross-origin requests

### Updated `package.json`
- Added Vercel dependencies
- Updated build scripts
- Configured for serverless deployment

## 🧪 Testing After Deployment

1. **Basic Login Test**:
   - Admin: `admin` / `admin123`
   - Teacher: `T001` / `teacher123`
   - Student: `S12345` / `demo`

2. **API Endpoints Test**:
   - Visit `https://your-domain.vercel.app/api/login`
   - Should return JSON response

3. **Frontend Test**:
   - Visit `https://your-domain.vercel.app`
   - Login interface should load

## 🚨 Common Issues & Solutions

### Issue 1: "Database locked" error
**Cause**: SQLite file access in serverless environment
**Solution**: Use external database for production

### Issue 2: CORS errors
**Cause**: Missing CORS headers in API functions
**Solution**: Already added CORS headers to all API endpoints

### Issue 3: "Function not found" error
**Cause**: Incorrect file structure in `api/` directory
**Solution**: Ensure all API files follow `[method].ts` or `[param].ts` pattern

### Issue 4: Build fails
**Cause**: Missing dependencies or incorrect build command
**Solution**: Check that all dependencies are installed and build command is correct

## 📱 Mobile & Performance

The deployment includes:
- ✅ Responsive design for mobile devices
- ✅ Optimized build with Vite
- ✅ Proper caching headers
- ✅ Static asset optimization

## 🔄 Continuous Deployment

Once connected to GitHub:
- **Automatic deployments** on `git push`
- **Preview deployments** for pull requests
- **Rollback** to previous versions

## 💡 Pro Tips

1. **Custom Domain**: Add custom domain in Vercel dashboard
2. **Analytics**: Enable Vercel Analytics for usage insights
3. **Environment Branches**: Use different environments for staging/production
4. **Performance**: Monitor with Vercel Speed Insights

## 🆘 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints individually
4. Check browser console for errors

---

**🎉 Your NCWU Academic System is now ready for Vercel deployment!**

Follow these steps carefully and your application will be live without any connection errors.