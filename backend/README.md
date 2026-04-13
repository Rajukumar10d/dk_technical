# Gulf Job Guide Backend

## Setup

1. Install dependencies:
   ```
   cd backend
   npm install
   ```

2. Set up MongoDB: only if using the legacy backend flow.
   - Install MongoDB locally or use MongoDB Atlas.
   - Update MONGODB_URI in .env

3. Google login is handled by Supabase in this project.
   - The frontend uses `supabase.auth.signInWithOAuth({ provider: 'google' })`
   - The backend does not need `GOOGLE_CLIENT_ID` or `GOOGLE_CLIENT_SECRET` for Supabase auth
   - Instead, configure Google OAuth in the Supabase dashboard and Google Cloud Console with:
     ```
     https://your-project-id.supabase.co/auth/v1/callback
     ```

4. Start MongoDB (if local):
   ```
   mongod --dbpath /path/to/db
   ```

5. Start the backend:
   ```
   npm start
   ```

6. Start the frontend (in another terminal):
   ```
   cd frontend
   npm run dev
   ```

## API Endpoints

- GET /auth/google - Initiate Google login
- GET /auth/google/callback - Google callback
- GET /auth/logout - Logout
- GET /auth/user - Get current user
- PUT /auth/contact - Update contact number