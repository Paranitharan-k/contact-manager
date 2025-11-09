# Local-Only Mode (No Backend Required)

The Contact Manager now works completely offline using browser localStorage. No backend server or database is needed!

## Features

✅ **Complete Offline Functionality**
- All data stored in browser localStorage
- No backend server required
- No database connection needed
- Works completely offline

✅ **Full CRUD Operations**
- Create, Read, Update, Delete contacts
- User registration and login
- Search and filter contacts
- All features work without internet

✅ **Data Persistence**
- Data persists in your browser
- Each user's contacts are stored separately
- Data remains after browser refresh

## How to Run

### Quick Start

1. **Install dependencies:**
   ```powershell
   cd client
   npm install
   ```

2. **Start the frontend:**
   ```powershell
   npm run dev
   ```

3. **Open in browser:**
   - Go to: http://localhost:5173
   - Register a new account
   - Start adding contacts!

That's it! No backend setup needed.

## How It Works

### Data Storage
- **Users**: Stored in `localStorage` under `contact_manager_users`
- **Contacts**: Stored in `localStorage` under `contact_manager_contacts`
- **Current User**: Stored in `localStorage` under `contact_manager_current_user`

### Authentication
- Simple password-based authentication (stored in localStorage)
- No JWT tokens or backend validation
- Each user's data is isolated by user ID

### Contact Management
- All contacts are stored per user
- Full CRUD operations work with localStorage
- Search and filter work on local data

## Limitations

⚠️ **Important Notes:**
- Data is stored only in your browser
- Data is lost if you clear browser data
- Data is not shared between devices
- No password encryption (for demo purposes)
- No data backup or sync

## Data Location

You can view your data in browser DevTools:
1. Open DevTools (F12)
2. Go to "Application" tab
3. Click "Local Storage"
4. View keys: `contact_manager_users`, `contact_manager_contacts`, `contact_manager_current_user`

## Switching Back to Backend Mode

If you want to use the backend server:
1. Restore the original `client/src/services/api.ts` file
2. Update `client/src/context/AuthContext.tsx` to use API calls
3. Start the backend server
4. Configure MongoDB connection

## Troubleshooting

### Data Not Persisting
- Check browser localStorage is enabled
- Clear browser cache and try again
- Check browser DevTools for errors

### Can't Login
- Make sure you've registered an account first
- Check that email and password match
- Clear localStorage and register again

### Contacts Not Showing
- Check if you're logged in
- Verify data exists in localStorage (DevTools)
- Try refreshing the page

## Advantages of Local Mode

✅ **Fast Setup**: No server configuration needed
✅ **Offline First**: Works without internet
✅ **Quick Testing**: Perfect for development and demos
✅ **No Database**: No MongoDB setup required
✅ **Simple Deployment**: Just deploy the frontend

Perfect for:
- Quick demos
- Development and testing
- Learning and prototyping
- Offline applications
- Single-user scenarios

