# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Cloud - Recommended for Quick Start)

### Steps:
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a free cluster (M0 - Free tier)
4. Create a database user:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `contactmanager` (or any username)
   - Password: Create a secure password (save it!)
5. Whitelist your IP:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add your IP
6. Get your connection string:
   - Go to "Clusters" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
7. Update the connection string:
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Add database name at the end: `...mongodb.net/contact-manager?retryWrites=true&w=majority`

### Update server/.env file:
```
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/contact-manager?retryWrites=true&w=majority
JWT_SECRET=contact-manager-secret-key-2024-change-in-production
PORT=5000
CLIENT_URL=http://localhost:5173
```

## Option 2: Local MongoDB Installation

### Windows:
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Install MongoDB
3. MongoDB usually runs as a Windows service automatically
4. If not running, start it:
   - Open Services (services.msc)
   - Find "MongoDB" service
   - Start it if it's not running

### Verify MongoDB is running:
```powershell
# Check if MongoDB is running on port 27017
Test-NetConnection -ComputerName localhost -Port 27017
```

### Default connection string (already in .env):
```
MONGODB_URI=mongodb://localhost:27017/contact-manager
```

