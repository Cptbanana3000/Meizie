@echo off
echo Installing dependencies...
npm install

echo Creating .env file...
copy .env.example .env

echo.
echo Installation complete!
echo.
echo To start the development server, run: npm run dev
echo.
echo Don't forget to add your OpenAI API key to the .env file!
echo.
pause 