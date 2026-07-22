# Aman Srivastava — 3D Portfolio Website

An interactive 3D portfolio with a full admin panel. Dark, motion-heavy design with a floating 3D hero object, particles, stars, big display typography, and scroll animations — fully editable (photos, project details, videos, and even the 3D animation itself) from `/admin`.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Three.js via @react-three/fiber + drei, Framer Motion |
| Backend | Node.js, Express, JWT auth, Multer (file uploads) |
| Database | MongoDB (Atlas) with Mongoose |

## Features

- **3D hero section** — floating distorted shape (torus knot / sphere / cube…), particles, stars, mouse parallax
- **Admin panel at `/admin`** (password protected):
  - **Profile & Photo** — upload your photo, edit name, about, skills, contact info
  - **Projects & Videos** — add/edit/delete projects, upload images and videos (autoplay on cards), links
  - **3D Animation** — live preview editor: change the shape, colors, rotation speed, particles, wireframe, stars, background
  - **Messages** — read contact-form submissions
- Responsive on mobile/tablet/desktop, contact form, animated marquee, scroll-reveal animations

## Project Structure

```
aman-3d-portfolio/
├── client/          # React + Three.js frontend (Vite)
│   └── src/
│       ├── components/   # Navbar, Hero, About, Projects, Contact, Footer, Marquee
│       ├── three/        # Scene3D (R3F canvas)
│       └── admin/        # Admin dashboard (login, tabs, uploads)
└── server/          # Express API
    ├── src/
    │   ├── models/       # Project, Profile, Settings, Message
    │   ├── routes/       # auth, projects, profile, settings, contact, upload
    │   └── middleware/   # JWT auth
    └── uploads/          # Uploaded images/videos
```

## Setup (Local)

### 1. Get a free MongoDB Atlas database

1. Go to https://www.mongodb.com/cloud/atlas → create free account → create a free (M0) cluster
2. Database Access → add a user with a password
3. Network Access → add IP `0.0.0.0/0` (allow from anywhere)
4. Database → Connect → Drivers → copy the connection string

### 2. Configure the server

```bash
cd server
cp .env.example .env
# Edit .env:
#   MONGODB_URI   = your Atlas connection string
#   ADMIN_PASSWORD = your admin panel password
#   JWT_SECRET    = any long random string
```

### 3. Install & seed

```bash
cd server
npm install
npm run seed        # loads your profile + projects into the database

cd ../client
npm install
```

### 4. Run

```bash
# Terminal 1 — API on :5000
cd server && npm run dev

# Terminal 2 — frontend on :5173
cd client && npm run dev
```

Open http://localhost:5173 — admin panel at http://localhost:5173/admin

## Deployment

### Option A — Render (easiest, one service for everything)

The Express server serves the built React app, so one service is enough.

1. Push this folder to a GitHub repo
2. On https://render.com → New → Web Service → connect the repo
3. Settings:
   - **Build command:** `cd client && npm install && npm run build && cd ../server && npm install`
   - **Start command:** `cd server && npm start`
4. Environment variables: `MONGODB_URI`, `ADMIN_PASSWORD`, `JWT_SECRET`, `CLIENT_ORIGIN` (your Render URL)
5. Deploy. Run the seed once via Render Shell: `cd server && npm run seed`

> Note: on Render's free tier, uploaded files are lost on redeploy. For permanent media, use a paid disk or Cloudinary URLs (paste external URLs in the admin panel — it accepts both).

### Option B — Vercel (frontend) + Render (backend)

1. Deploy `server/` to Render as above
2. Deploy `client/` to Vercel; add a `vercel.json` rewrite proxying `/api` and `/uploads` to your Render URL
3. Set `CLIENT_ORIGIN` on the backend to your Vercel domain

### Option C — AWS (EC2)

1. Launch an Ubuntu EC2 instance, install Node.js 20 and nginx
2. Clone the repo, set up `.env`, build the client, run the server with `pm2`:
   ```bash
   cd client && npm install && npm run build
   cd ../server && npm install && pm2 start src/index.js --name portfolio
   ```
3. Point nginx at `localhost:5000` and add SSL with certbot

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/profile | — | Get profile |
| PUT | /api/profile | Admin | Update profile |
| GET | /api/projects | — | List projects |
| POST/PUT/DELETE | /api/projects/:id | Admin | Manage projects |
| GET | /api/settings | — | 3D animation settings |
| PUT | /api/settings | Admin | Update animation settings |
| POST | /api/contact | — | Submit contact message |
| GET | /api/contact | Admin | List messages |
| POST | /api/upload | Admin | Upload image/video/3D model |
| POST | /api/auth/login | — | Get admin JWT |
# 3d-portfolio
# 3d-portfolio
