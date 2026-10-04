# 🌿 Urban Oasis — Free Deployment Guide
## Get a Public URL using Render + MongoDB Atlas (both FREE)

---

## WHAT YOU NEED
- A GitHub account → https://github.com
- A Render account → https://render.com
- A MongoDB Atlas account → https://mongodb.com/cloud/atlas
- Git installed → https://git-scm.com/download/win

---

## PART 1 — Install Git (if not installed)

1. Go to https://git-scm.com/download/win
2. Download and install Git (keep all default settings)
3. After install, open a new PowerShell window and type:
   ```
   git --version
   ```
   You should see something like: `git version 2.x.x`

---

## PART 2 — Push Your Project to GitHub

### Step 1 — Create a GitHub account
- Go to https://github.com and sign up (it's free)

### Step 2 — Create a new repository
- Click the **"+"** icon (top right) → **"New repository"**
- Repository name: `urban-oasis`
- Set to **Public**
- Do NOT check "Add README" or any other options
- Click **"Create repository"**

### Step 3 — Push your code from PowerShell
Open PowerShell and run these commands ONE BY ONE:

```powershell
cd "C:\Users\Hemanth\Desktop\cspp\urban-oasis"

git init

git add .

git commit -m "initial commit - urban oasis"

git branch -M main

git remote add origin https://github.com/YOUR_GITHUB_USERNAME/urban-oasis.git

git push -u origin main
```

> ⚠️ Replace YOUR_GITHUB_USERNAME with your actual GitHub username!

After pushing, refresh your GitHub page — you should see all your files there.

---

## PART 3 — Set Up MongoDB Atlas (Free Database)

### Step 1 — Create account
- Go to https://mongodb.com/cloud/atlas
- Click **"Try Free"** and sign up

### Step 2 — Create a free cluster
- After login, click **"Build a Database"**
- Choose **FREE (M0 Sandbox)** tier
- Select any cloud provider (AWS is fine) and region closest to you
- Click **"Create"**

### Step 3 — Create a database user
- On the left menu click **"Database Access"**
- Click **"Add New Database User"**
- Authentication: **Password**
- Username: `urbanoasis` (or anything you like)
- Password: Click **"Autogenerate"** and COPY the password somewhere safe
- Role: **"Atlas admin"**
- Click **"Add User"**

### Step 4 — Allow all IP addresses (important for Render)
- On the left menu click **"Network Access"**
- Click **"Add IP Address"**
- Click **"Allow Access from Anywhere"** (adds 0.0.0.0/0)
- Click **"Confirm"**

### Step 5 — Get your connection string
- On the left menu click **"Database"**
- Click **"Connect"** on your cluster
- Choose **"Connect your application"**
- Driver: **Node.js**, Version: **5.5 or later**
- Copy the connection string — it looks like:
  ```
  mongodb+srv://urbanoasis:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
  ```
- Replace `<password>` with the password you saved in Step 3
- Change the database name in the URL — add `urban-oasis` before the `?`:
  ```
  mongodb+srv://urbanoasis:YOURPASSWORD@cluster0.xxxxx.mongodb.net/urban-oasis?retryWrites=true&w=majority
  ```
- **Save this full string** — you'll need it in Part 4

---

## PART 4 — Deploy on Render

### Step 1 — Create Render account
- Go to https://render.com
- Click **"Get Started for Free"**
- Sign up with your **GitHub account** (easiest option)

### Step 2 — Create a new Web Service
- On the Render dashboard, click **"New +"** → **"Web Service"**
- Click **"Connect account"** if asked, then authorize GitHub
- Find your `urban-oasis` repository and click **"Connect"**

### Step 3 — Configure the service
Fill in these settings:

| Field | Value |
|-------|-------|
| **Name** | urban-oasis |
| **Region** | Oregon (US West) |
| **Branch** | main |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `node backend/server.js` |
| **Plan** | Free |

### Step 4 — Add Environment Variables
Scroll down to **"Environment Variables"** section and add these:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `MONGO_URI` | your MongoDB Atlas connection string from Part 3 |
| `JWT_SECRET` | any random long string e.g. `urbanoasis_super_secret_key_2024_xyzabc` |
| `JWT_EXPIRES_IN` | `30d` |

### Step 5 — Deploy!
- Click **"Create Web Service"**
- Render will start building your app (takes 2-5 minutes)
- Watch the logs at the bottom — you'll see:
  ```
  ✅ MongoDB connected successfully
  🌿 Urban Oasis Server Running!
  ```

### Step 6 — Get your public URL
- Once deployed, Render shows your URL at the top:
  ```
  https://urban-oasis.onrender.com
  ```
- Click it — your app is LIVE! Share this link with anyone 🎉

---

## PART 5 — After Deployment

### Free tier note
Render's free tier **spins down** after 15 minutes of inactivity.
The first visit after idle takes ~30 seconds to wake up. This is normal.

### Update your app later
Whenever you make changes to your code, just run:
```powershell
cd "C:\Users\Hemanth\Desktop\cspp\urban-oasis"
git add .
git commit -m "describe your change here"
git push
```
Render auto-detects the push and re-deploys automatically!

---

## TROUBLESHOOTING

**Build fails?**
- Check the logs on Render dashboard
- Make sure `package.json` has `"start": "node backend/server.js"`

**MongoDB not connecting?**
- Double-check your MONGO_URI has the correct password
- Make sure you allowed 0.0.0.0/0 in Network Access on Atlas

**App shows blank page?**
- Open browser DevTools (F12) → Console tab for errors
- Check that your frontend JS files are making API calls to relative paths (not localhost)

**Still getting errors?**
- On Render dashboard → your service → "Logs" tab shows real-time errors

---

## QUICK SUMMARY

```
GitHub (code storage)
      ↓
Render (runs your Node.js server) ← gives public URL
      ↓
MongoDB Atlas (stores your data)
```

Your public URL will be: **https://urban-oasis.onrender.com**
(or similar, Render may add a suffix if the name is taken)
