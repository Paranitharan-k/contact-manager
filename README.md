# Contact Manager

A full-stack contact manager web application built with React, Node.js, Express, and MongoDB. Similar to Google Contacts with user authentication and CRUD operations.

## Features

- 🔐 User authentication (Register/Login)
- 👥 Contact management (Create, Read, Update, Delete)
- 🔍 Search and filter contacts
- 📱 Responsive design
- 🎨 Material-UI components for a modern Google-like interface
- 🔒 Protected routes with JWT authentication

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite
- Material-UI (MUI)
- React Router v6
- Axios

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. Clone the repository or navigate to the project directory

2. Install dependencies for all packages:
```bash
npm run install:all
```

Or install manually:
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

## Configuration

1. Create a `.env` file in the `server` directory:
```env
MONGODB_URI=mongodb://localhost:27017/contact-manager
JWT_SECRET=your-secret-key-change-this-in-production
PORT=5000
CLIENT_URL=http://localhost:5173
```

2. Update the `MONGODB_URI` with your MongoDB connection string. If using MongoDB Atlas, use your Atlas connection string.

3. Change `JWT_SECRET` to a secure random string for production.

## Running the Application

### Development Mode

Run both client and server concurrently:
```bash
npm run dev
```

Or run separately:

**Server:**
```bash
cd server
npm run dev
```

**Client:**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Usage

1. Start by registering a new account
2. Login with your credentials
3. Add, edit, or delete contacts
4. Search contacts using the search bar
5. View contact details in the card view

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Contacts (Protected)
- `GET /api/contacts` - Get all contacts for the authenticated user
- `GET /api/contacts/:id` - Get a single contact
- `POST /api/contacts` - Create a new contact
- `PUT /api/contacts/:id` - Update a contact
- `DELETE /api/contacts/:id` - Delete a contact

## Project Structure

```
contact-manager/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Auth context
│   │   ├── services/      # API services
│   │   └── App.tsx
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth middleware
│   │   ├── controllers/   # Route controllers
│   │   └── server.ts
│   └── package.json
└── package.json
```

## License

ISC
