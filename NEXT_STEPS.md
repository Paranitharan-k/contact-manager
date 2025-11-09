# Next Steps - Getting Your Contact Manager Running

## Current Status
✅ Frontend and Backend code is ready
✅ Dependencies installed
❌ MongoDB needs to be set up
❌ Servers need to be started

## Step-by-Step Instructions

### Step 1: Set Up MongoDB (Choose ONE option)

#### Option A: MongoDB Atlas (Easiest - 5 minutes)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Create a free cluster (M0)
4. Create database user (save username/password!)
5. Allow network access (add your IP or "Allow from anywhere")
6. Get connection string from "Connect" button
7. Update `server/.env` file with your connection string

**Example .env update:**
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/contact-manager?retryWrites=true&w=majority
```

#### Option B: Local MongoDB
1. Download from https://www.mongodb.com/try/download/community
2. Install MongoDB
3. MongoDB should start automatically as a Windows service
4. Verify it's running (check Services or port 27017)
5. The default connection in `.env` should work: `mongodb://localhost:27017/contact-manager`

See `MONGODB_SETUP.md` for detailed instructions.

### Step 2: Verify .env File
Check that `server/.env` exists and has:
```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=contact-manager-secret-key-2024-change-in-production
PORT=5000
CLIENT_URL=http://localhost:5173
```

### Step 3: Start the Servers

#### Method 1: Start Both Servers (Recommended)
From the project root directory:
```powershell
npm run dev
```

This will start both frontend and backend simultaneously.

#### Method 2: Start Servers Separately
**Terminal 1 - Backend:**
```powershell
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd client
npm run dev
```

### Step 4: Verify Everything is Running

1. **Check Backend:** Open http://localhost:5000/api/health
   - Should see: `{"status":"OK","message":"Server is running"}`
   - If you see "Connected to MongoDB" in terminal, backend is ready!

2. **Check Frontend:** Open http://localhost:5173
   - Should see the Contact Manager login page
   - If page loads, frontend is working!

### Step 5: Test the Application

1. **Register a new account:**
   - Go to http://localhost:5173
   - Click "Don't have an account? Sign Up"
   - Fill in username, email, and password
   - Click "Sign Up"

2. **Login:**
   - Use your credentials to log in
   - You should be redirected to the Contacts page

3. **Add a contact:**
   - Click "Add Contact" button
   - Fill in contact information
   - Click "Create"
   - Your contact should appear in the list

4. **Test CRUD operations:**
   - ✅ Create: Add a new contact
   - ✅ Read: View contacts in the list
   - ✅ Update: Click edit icon, modify contact, save
   - ✅ Delete: Click delete icon, confirm deletion

5. **Test Search:**
   - Use the search bar to filter contacts
   - Search by name, email, phone, or company

## Troubleshooting

### Backend won't start / MongoDB connection error
- **Problem:** "MongoDB connection error"
- **Solution:** 
  - Verify MongoDB is running (Atlas or local)
  - Check `.env` file has correct MONGODB_URI
  - For Atlas: Make sure IP is whitelisted
  - For local: Make sure MongoDB service is running

### Frontend shows API errors
- **Problem:** "Network Error" or "Failed to fetch"
- **Solution:**
  - Make sure backend is running on port 5000
  - Check browser console for detailed errors
  - Verify CORS settings in server

### Port already in use
- **Problem:** "Port 5000 already in use" or "Port 5173 already in use"
- **Solution:**
  - Change PORT in `server/.env` to another port (e.g., 5001)
  - Update CLIENT_URL if you change backend port
  - Or stop the process using that port

### Can't register/login
- **Problem:** Authentication errors
- **Solution:**
  - Check backend terminal for errors
  - Verify MongoDB is connected
  - Check browser console for API errors
  - Clear browser localStorage and try again

## Quick Start Commands

```powershell
# Install all dependencies (if not done)
npm run install:all

# Start both servers
npm run dev

# Or start separately:
# Terminal 1:
cd server
npm run dev

# Terminal 2:
cd client
npm run dev
```

## What You Should See

### Backend Terminal:
```
Connected to MongoDB
Server is running on port 5000
```

### Frontend Terminal:
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Browser:
- Login page at http://localhost:5173
- After login: Contacts page with "Add Contact" button
- Contact cards with edit/delete options
- Search bar at the top

## Need Help?

1. Check the terminal output for error messages
2. Check browser console (F12) for frontend errors
3. Verify MongoDB connection
4. Make sure all dependencies are installed
5. Check that ports 5000 and 5173 are available

## Success Indicators

✅ Backend shows "Connected to MongoDB"
✅ Backend shows "Server is running on port 5000"
✅ Frontend loads at http://localhost:5173
✅ You can register a new account
✅ You can login
✅ You can add, edit, and delete contacts
✅ Search functionality works

Once all these work, your Contact Manager is fully functional! 🎉

