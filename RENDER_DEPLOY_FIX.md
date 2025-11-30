# Render Deployment Fix

## Issue
Error: `Cannot find module '/opt/render/project/src/dist/server.js'`

## Root Cause
TypeScript wasn't compiling the source files during build, so `dist/server.js` didn't exist.

## Solution Applied

### 1. Moved TypeScript to Dependencies
Updated `package.json` to include `typescript` in `dependencies` (not devDependencies) so it's available during Render build.

### 2. Correct Render Configuration

**In Render Dashboard**, ensure these settings:

#### Build & Deploy
- **Build Command:** `npm install && npm run build`
- **Start Command:** `node dist/server.js`

#### Environment Variables
Add these in Render dashboard:
- `NODE_ENV` = `production`
- `FRONTEND_URL` = `https://your-frontend.vercel.app` (replace with your actual Vercel URL)
- `FRONTEND_DOMAIN` = `your-frontend.vercel.app` (without https://)

#### Advanced Settings
- **Auto-Deploy:** Yes (optional - deploys on git push)
- **Root Directory:** Leave blank

### 3. Verify Build Output

The build process should:
1. Run `npm install` (installs all dependencies including TypeScript)
2. Run `npm run build` (runs `tsc` which compiles src/*.ts to dist/*.js)
3. Create `dist/server.js`
4. Run `node dist/server.js`

### 4. Check Render Logs

After deploying, check the logs for:
```
✓ Compiled successfully
API running at http://localhost:3000
```

## Quick Deploy Steps

1. **Commit changes:**
   ```powershell
   git add package.json
   git commit -m "Fix Render deployment - move TypeScript to dependencies"
   git push
   ```

2. **Render auto-deploys** (if enabled), or:
   - Go to Render dashboard
   - Click "Manual Deploy" → "Deploy latest commit"

3. **Wait 2-3 minutes** for build and deploy

4. **Check logs** for "API running at http://localhost:3000"

5. **Test API** by visiting:
   ```
   https://your-backend.onrender.com/api/dashboard/S12345
   ```
   
   You should see JSON data with results, courses, etc.

## Troubleshooting

### Still getting "Cannot find module"?

Check Render logs for TypeScript compilation:
- Look for "tsc" command running
- Verify "dist" folder is created
- Check for any TypeScript errors

### Build fails with TypeScript errors?

All type errors were fixed in `FIXES_APPLIED.md`, but if you see new errors:
1. Check the error message
2. Verify all @types packages are installed
3. Review `src/webauthn.ts` for correct type casts

### "Module not found: better-sqlite3"?

This is normal during build. better-sqlite3 compiles at install time and will work at runtime.

## Alternative: Use JavaScript Build

If TypeScript continues to cause issues, you can bypass compilation:

1. **Update package.json:**
   ```json
   "scripts": {
     "build": "echo 'Using source files directly'",
     "start": "node --loader ts-node/esm src/server.ts"
   }
   ```

2. **Add to dependencies:**
   ```json
   "ts-node": "^10.9.2"
   ```

3. **Redeploy**

This runs TypeScript directly without compiling (slightly slower startup but works).

## Verification Checklist

After deployment:
- [ ] Render build completes successfully (green checkmark)
- [ ] Logs show "API running at http://localhost:3000"
- [ ] Can access `https://your-backend.onrender.com/api/dashboard/S12345`
- [ ] Returns JSON with student data
- [ ] No CORS errors when testing from frontend

## Final Configuration Summary

**package.json scripts:**
```json
"scripts": {
  "dev": "ts-node src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

**Render settings:**
- Build: `npm install && npm run build`
- Start: `node dist/server.js`
- Node version: 20.x (auto-detected)

---

**Status:** ✅ Fixed - TypeScript now in dependencies, build should succeed
