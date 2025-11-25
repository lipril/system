# Deployment Checklist ✅

Use this checklist to ensure successful deployment.

---

## Pre-Deployment

- [ ] Node.js installed locally (tested with `node --version`)
- [ ] All dependencies installed (`npm install` in root and `client/`)
- [ ] Local backend runs without errors (`npm run dev`)
- [ ] Local frontend runs without errors (`cd client && npm run dev`)
- [ ] Can login with demo credentials (S12345 / demo)
- [ ] Dashboard loads with demo data
- [ ] TypeScript build succeeds (`npm run build`)

---

## GitHub Setup

- [ ] Git installed
- [ ] GitHub account created
- [ ] Repository created on GitHub
- [ ] Code committed locally (`git commit`)
- [ ] Code pushed to GitHub (`git push`)

---

## Backend Deployment (Render)

- [ ] Render account created (free tier)
- [ ] GitHub connected to Render
- [ ] Web Service created
- [ ] Repository selected
- [ ] Build command: `npm install && npm run build`
- [ ] Start command: `npm start`
- [ ] Root directory: blank
- [ ] Persistent disk added (mount path: `/app/data`, size: 1GB)
- [ ] Environment variables set:
  - [ ] `NODE_ENV=production`
  - [ ] `FRONTEND_URL=https://your-frontend.vercel.app` (add after frontend deployed)
  - [ ] `FRONTEND_DOMAIN=your-frontend.vercel.app` (add after frontend deployed)
- [ ] Deployment successful (green status)
- [ ] Backend URL copied (e.g., `https://academic-system-api.onrender.com`)
- [ ] Can access `https://your-backend.onrender.com/api/dashboard/S12345`

---

## Frontend Deployment (Vercel)

- [ ] Vercel account created (free tier)
- [ ] GitHub connected to Vercel
- [ ] Project imported
- [ ] Root directory set to: `client`
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Framework preset: Vite
- [ ] Environment variable set:
  - [ ] `VITE_API_URL=https://your-backend.onrender.com/api`
- [ ] Deployment successful (green status)
- [ ] Frontend URL copied (e.g., `https://student-academic-system.vercel.app`)

---

## Post-Deployment Configuration

- [ ] Backend environment variables updated with frontend URL:
  - [ ] `FRONTEND_URL=https://your-frontend.vercel.app`
  - [ ] `FRONTEND_DOMAIN=your-frontend.vercel.app`
- [ ] Backend redeployed (auto or manual trigger)
- [ ] Waited for backend redeploy (2-3 minutes)
- [ ] Waited for frontend redeploy (1-2 minutes)

---

## Testing Production

- [ ] Frontend loads at `https://your-frontend.vercel.app`
- [ ] No CORS errors in browser console (F12)
- [ ] Login with Student ID works (S12345 / demo)
- [ ] Dashboard loads with results, assignments, routine
- [ ] Attendance button works
- [ ] Data persists after refresh
- [ ] (Optional) Register device auth works
- [ ] (Optional) Login with Face/Passkey works

---

## Browser Compatibility

Test on multiple browsers:
- [ ] Chrome/Edge (recommended for WebAuthn)
- [ ] Firefox
- [ ] Safari (mobile)

---

## Mobile Testing

- [ ] Responsive layout works on phone
- [ ] Login works on mobile
- [ ] Dashboard readable on small screen
- [ ] Buttons are tappable

---

## Performance Check

- [ ] First load < 5 seconds
- [ ] Dashboard loads < 2 seconds after login
- [ ] No console errors
- [ ] Images/icons load correctly

---

## Security Review

- [ ] HTTPS enabled on both frontend and backend
- [ ] CORS properly configured (only allowed origins)
- [ ] WebAuthn rpID matches frontend domain
- [ ] Database file is persistent (not recreated on deploy)
- [ ] Sensitive data not exposed in client-side code

---

## Documentation

- [ ] README.md updated with live URL
- [ ] Deployment guide saved
- [ ] Environment variables documented
- [ ] Troubleshooting steps documented

---

## Optional Enhancements

- [ ] Custom domain configured (Vercel + Render)
- [ ] SSL certificate verified
- [ ] Monitoring set up (Render dashboard)
- [ ] Error tracking added (Sentry)
- [ ] Analytics added (Vercel Analytics)
- [ ] Backup strategy implemented

---

## Maintenance Plan

- [ ] Schedule to check logs weekly
- [ ] Plan for database backups
- [ ] Monitor free tier limits
- [ ] Update dependencies monthly
- [ ] Test critical features monthly

---

## Share Your Success! 🎉

- [ ] Share live URL with users
- [ ] Create demo video/screenshots
- [ ] Add to portfolio
- [ ] Star the repo on GitHub

---

**Deployment Date:** _______________

**Frontend URL:** _______________

**Backend URL:** _______________

**Notes:**
_________________________________
_________________________________
_________________________________

---

✅ **All checks passed? Congratulations! Your app is live!** 🚀
