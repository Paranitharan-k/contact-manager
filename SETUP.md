# Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm run install:all
   ```

2. **Set up MongoDB**
   - Install MongoDB locally, or
   - Use MongoDB Atlas (cloud)
   - Get your connection string

3. **Configure Environment Variables**
   - Create a `.env` file in the `server` directory
   - Add the following:
     ```
     MONGODB_URI=mongodb://localhost:27017/contact-manager
     JWT_SECRET=your-secret-key-change-this-in-production
     PORT=5000
     CLIENT_URL=http://localhost:5173
     ```

4. **Start the Application**
   ```bash
   npm run dev
   ```

   This will start both the server (port 5000) and client (port 5173).

5. **Access the Application**
   - Open your browser and go to: http://localhost:5173
   - Register a new account
   - Start adding contacts!

## Troubleshooting

### MongoDB Connection Issues
- Make sure MongoDB is running if using local installation
- Check your connection string if using MongoDB Atlas
- Verify the database name in the connection string

### Port Already in Use
- Change the PORT in server/.env file
- Change the port in client/vite.config.ts
- Update CLIENT_URL in server/.env to match

### Authentication Errors
- Make sure JWT_SECRET is set in server/.env
- Clear browser localStorage and try logging in again

## Development

### Running Server Only
```bash
cd server
npm run dev
```

### Running Client Only
```bash
cd client
npm run dev
```

### Building for Production
```bash
# Build server
cd server
npm run build
npm start

# Build client
cd client
npm run build
```
