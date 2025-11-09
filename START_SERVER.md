# How to Start the Contact Manager Server

## Method 1: Using the Start Script (Easiest)

1. Navigate to the `client` folder
2. Double-click `start.bat`
3. Wait for the server to start
4. Open http://localhost:5173 in your browser

## Method 2: Using Command Line

### Step 1: Open Terminal/PowerShell
- Press `Win + R`
- Type `cmd` or `powershell`
- Press Enter

### Step 2: Navigate to Client Folder
```powershell
cd "C:\Users\paran\Desktop\Contact Manager\client"
```

### Step 3: Start the Server
```powershell
npm run dev
```

### Step 4: Open Browser
- Open your web browser
- Go to: http://localhost:5173

## Method 3: Using VS Code Terminal

1. Open the project in VS Code
2. Open the terminal (Ctrl + `)
3. Navigate to client folder:
   ```powershell
   cd client
   ```
4. Run:
   ```powershell
   npm run dev
   ```

## What You Should See

When the server starts successfully, you should see:

```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h to show help
```

## Troubleshooting

### If you see "command not found" or "npm is not recognized":
- Make sure Node.js is installed
- Restart your terminal
- Try: `node --version` and `npm --version`

### If port 5173 is already in use:
- Close other applications using port 5173
- Or change the port in `vite.config.ts`

### If you see dependency errors:
- Run: `npm install` in the client folder
- Wait for installation to complete
- Try `npm run dev` again

### If the page doesn't load:
- Make sure the server is running
- Check the terminal for errors
- Try: http://localhost:5173
- Check browser console (F12) for errors

## Quick Commands

```powershell
# Navigate to client folder
cd "C:\Users\paran\Desktop\Contact Manager\client"

# Install dependencies (if needed)
npm install

# Start development server
npm run dev
```

## Server Status

- **Running**: You'll see "Local: http://localhost:5173/" in terminal
- **Not Running**: Terminal will show errors or nothing

## Next Steps

Once the server is running:
1. Open http://localhost:5173 in your browser
2. Register a new account
3. Start adding contacts!

