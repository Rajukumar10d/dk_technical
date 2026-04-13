# Gulf App - Supabase Setup Guide

## 🚀 Migration Complete: MongoDB → Supabase

Your app has been successfully migrated from MongoDB to Supabase! Here's what changed:

### ✅ What's New:
- **Supabase Auth**: Built-in authentication with Google OAuth
- **Supabase Database**: PostgreSQL with real-time capabilities
- **Row Level Security**: Automatic data protection
- **Real-time subscriptions**: Live updates for data changes

### ❌ What's Removed:
- MongoDB connection and models
- Passport.js authentication
- Express sessions
- Manual user management

---

## 📋 Setup Instructions

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login to your account
3. Click **"New Project"** 
4. Fill in project details:
   - **Name**: `gulf-app` (or any name)
   - **Database Password**: Choose a strong password
   - **Region**: Select closest to your location
5. Click **"Create new project"**
6. Wait for project setup (2-3 minutes)

### Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (something like: `https://abcdefghijklmnop.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - **Keep this secret!**

### Step 3: Configure Environment Variables

#### Backend (.env)
Update `backend/.env`:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
FRONTEND_URL=http://localhost:5174
PORT=5000
```

#### Frontend (.env)
Update `frontend/.env`:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4: Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Copy the entire contents of `supabase-setup.sql`
3. Paste it into the SQL Editor
4. Click **"Run"**

This will create:
- `users` table (extends auth.users)
- `questions` table
- `videos` table
- Row Level Security policies
- Automatic user profile creation

### Step 5: Configure Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** and click to enable it
3. You'll need Google OAuth credentials:
   - **Client ID**: From your Google Cloud Console
   - **Client Secret**: From your Google Cloud Console
4. Add authorized redirect URIs in Google Cloud:
   ```
   https://your-project-id.supabase.co/auth/v1/callback
   ```
   This is the only Google redirect URI required for Supabase.
5. In Supabase **Authentication → Settings**, make sure your frontend origin is allowed, for example:
   ```
   http://localhost:5174
   ```
6. Save the settings

### Step 5a: Google Cloud OAuth setup

1. In Google Cloud Console, open your project and go to **APIs & Services → OAuth consent screen**.
2. Configure the consent screen with your app name and email.
3. Go to **Credentials** and create an **OAuth 2.0 Client ID**.
4. Choose **Web application** and add this authorized redirect URI:
   ```
   https://your-project-id.supabase.co/auth/v1/callback
   ```
5. Copy the generated Client ID and Client Secret into Supabase Provider settings.
6. Save and test the login flow.

> Note: This app uses Supabase auth directly. The backend does not perform the Google OAuth handshake itself.

### Step 6: Create Admin User

After your first user signs up, make them admin:

1. Go to **Table Editor** → **users** table
2. Find your user record
3. Change `role` from `"user"` to `"admin"`
4. Save the changes

---

## 🏃‍♂️ Running the App

### Start Backend:
```bash
cd backend
npm start
```

### Start Frontend:
```bash
cd frontend
npm run dev
```

### Test the Setup:
1. Open http://localhost:5174
2. Click "Sign in with Google"
3. You should be able to authenticate
4. Check admin panel at `/admin` (if you're admin)

---

## 🔧 API Changes

### Authentication:
- **Old**: `GET /auth/user` (with cookies)
- **New**: Uses Supabase Auth tokens in headers

### Data Fetching:
- **Old**: Direct MongoDB queries
- **New**: Supabase client queries with RLS

### Admin Routes:
- **Old**: Session-based auth
- **New**: JWT token-based auth

---

## 🛠 Troubleshooting

### "Invalid API key" error:
- Check your `.env` files have correct Supabase keys
- Make sure you're using `anon` key for frontend, `service_role` for backend

### "Table doesn't exist" error:
- Run the `supabase-setup.sql` script in SQL Editor
- Check Table Editor to confirm tables were created

### Authentication not working:
- Verify Google OAuth is enabled in Supabase
- Check redirect URIs match your domain
- Ensure Google Cloud Console has correct origins/redirects

### Admin access denied:
- Check if your user has `role = 'admin'` in users table
- Try logging out and back in

---

## 📁 File Structure Changes

```
backend/
├── config/
│   ├── supabase.js          # New: Supabase client
│   └── passport.js          # ❌ Removed
├── middleware/
│   └── auth.js              # ❌ Removed
├── models/                  # ❌ Removed all .js files
├── routes/
│   ├── auth.js              # ✅ Updated for Supabase
│   └── admin.js             # ✅ Updated for Supabase
└── server.js                # ✅ Simplified, no MongoDB

frontend/
├── .env                     # New: Frontend env vars
└── src/context/
    └── AuthContext.jsx      # ✅ Updated for Supabase Auth
```

---

## 🎉 You're Done!

Your app now uses Supabase for:
- ✅ User authentication (Google OAuth)
- ✅ Database storage (PostgreSQL)
- ✅ Real-time capabilities
- ✅ Automatic scaling
- ✅ Built-in security

Enjoy your new Supabase-powered app! 🚀