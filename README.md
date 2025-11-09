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
"# contact-manager" 
"# contactmanager" 
"# contactmanager" 
"# contact-manager" 
# Contact Manager

A feature-rich contact management application built with React, TypeScript, and Material-UI.

## Features

- Add, edit, and delete contacts
- Tags and groups support
- Set reminders with browser notifications
- Import/Export contacts via CSV
- Duplicate prevention
- Sort contacts by name or date added
- Search across all contact fields including tags

## Live Demo

Visit the live application at: https://paranitharan-k.github.io/contact-manager/

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/Paranitharan-k/contact-manager.git
cd contact-manager
```

2. Install dependencies:
```bash
npm run install:all
```

3. Start development servers:
```bash
npm run dev
```

The client will be available at http://localhost:5173 and the server at http://localhost:5000.

## Usage Guide

### Managing Contacts

- **Add Contact**: Click the "Add Contact" button and fill in the details
- **Edit Contact**: Click the edit icon on any contact card
- **Delete Contact**: Click the delete icon and confirm
- **Search**: Use the search bar to find contacts by name, email, phone, company, or tags
- **Sort**: Use the sort dropdown to sort alphabetically or by recently added

### Tags & Groups

Add tags to contacts by entering comma-separated values in the tags field:
```
Family, Friends, Work
```

### Reminders

1. When adding/editing a contact, set a reminder date/time
2. The app will show a browser notification when the reminder is due (while the app is open)
3. Allow notifications when prompted for the best experience

### Import/Export

- **Export**: Click the download icon to export all contacts as CSV
- **Import**: Click the upload icon and select a CSV file
	- CSV should have headers: name, email, phone, address, company, notes, tags, reminder
	- Tags should be semicolon-separated in the CSV
	- Duplicate contacts will be skipped during import
