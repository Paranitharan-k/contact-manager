@echo off
echo Starting Contact Manager...
echo.
cd /d "%~dp0"
echo Current directory: %CD%
echo.
echo Installing dependencies if needed...
call npm install
echo.
echo Starting development server...
echo.
echo Server will be available at: http://localhost:5173
echo Press Ctrl+C to stop the server
echo.
call npm run dev
pause

