@echo off
cd /d "%~dp0"
echo Starting the Souls for Christ Ministries Zambia website...
echo Open http://127.0.0.1:4173/ in your browser.
start "" http://127.0.0.1:4173/
python -m http.server 4173 --bind 127.0.0.1
pause
