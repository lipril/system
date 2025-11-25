# Quick Start Guide - 5 Minutes to Running

This guide gets you up and running in 5 minutes.

## Prerequisites Check

Do you have Node.js installed? Open PowerShell and run:
```powershell
node --version
```

- ✅ If you see a version number (e.g., v20.x.x), skip to [Step 2](#step-2-install-dependencies)
- ❌ If you see an error, continue to Step 1

---

## Step 1: Install Node.js (2 minutes)

1. **Download**: Go to https://nodejs.org/
2. **Click**: Download the LTS version (left button)
3. **Install**: Run the installer, click "Next" through all prompts
4. **Verify**: Close and reopen PowerShell, then run:
   ```powershell
   node --version
   npm --version
   ```

---

## Step 2: Install Dependencies (2 minutes)

### Backend

Open PowerShell in your project folder:

```powershell
cd c:/Users/afroz/CodeBuddy/20251125214834
npm install
```

Wait for installation to complete (1-2 minutes).

### Frontend

```powershell
cd client
npm install
```

Wait for installation to complete (1-2 minutes).

---

## Step 3: Start the Servers (1 minute)

### Terminal 1 - Backend

```powershell
cd c:/Users/afroz/CodeBuddy/20251125214834
npm run dev
```

You should see:
```
API running at http://localhost:3000
```

**Keep this terminal open!**

### Terminal 2 - Frontend

Open a **NEW** PowerShell window:

```powershell
cd c:/Users/afroz/CodeBuddy/20251125214834/client
npm run dev
```

You should see:
```
➜  Local:   http://localhost:5173/
```

**Keep this terminal open too!**

---

## Step 4: Open and Use (30 seconds)

1. **Open Browser**: http://localhost:5173

2. **Login**:
   - Student ID: `S12345`
   - Password: `demo`
   - Click "Login ID"

3. **Explore**:
   - View results, assignments, routine
   - Click "Attend" to record attendance
   - See your progress

4. **(Optional) Setup Face Login**:
   - Click "Register Device Auth"
   - Follow Windows Hello prompt
   - Use face/fingerprint/PIN
   - Next time, click "Login Face/Passkey"

---

## Done! 🎉

Your system is running! Here's what you can do now:

- **Add more students**: Edit `src/init.ts`
- **Add more courses**: Edit `src/init.ts`
- **Customize UI**: Edit `client/src/App.tsx`
- **Deploy online**: See `DEPLOYMENT.md`

---

## Common Issues

### "npm is not recognized"
→ Install Node.js (Step 1) and restart PowerShell

### "Port 3000 already in use"
→ Kill other processes: `npx kill-port 3000`

### "Cannot find module"
→ Run `npm install` again in the correct folder

### Frontend shows blank page
→ Check browser console (F12) for errors
→ Ensure backend is running on port 3000

### WebAuthn not working
→ Make sure you're using Chrome/Edge/Firefox
→ Windows Hello must be set up in Windows Settings

---

## Next Steps

- Read `README.md` for full documentation
- Read `DEPLOYMENT.md` to deploy online
- Customize the demo data in `src/init.ts`

**Need help?** Check the Troubleshooting section in README.md

---

**Enjoy your Computerestic Academic System!** 🚀
