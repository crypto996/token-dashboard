@echo off
echo Starting deployment process...

:: Set Git path
set GIT_PATH="C:\Program Files\Git\bin\git.exe"

:: Set variables
set /p GITHUB_USERNAME="Enter your GitHub username: "
set REPO_NAME=token-dashboard

:: Initialize Git
echo Initializing Git repository...
%GIT_PATH% init

:: Add files
echo Adding all files...
%GIT_PATH% add .

:: Create commit
echo Creating initial commit...
%GIT_PATH% commit -m "Initial commit"

:: Create main branch
echo Setting up main branch...
%GIT_PATH% branch -M main

:: Add remote repository
echo Adding remote repository...
%GIT_PATH% remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

:: Push code
echo Pushing code to GitHub...
%GIT_PATH% push -u origin main

echo.
echo Deployment process completed!
echo Please complete the following steps on GitHub:
echo 1. Visit https://github.com/%GITHUB_USERNAME%/%REPO_NAME%/settings/pages
echo 2. Select "GitHub Actions" in the Source section
echo.
echo After deployment, your website will be available at:
echo https://%GITHUB_USERNAME%.github.io/%REPO_NAME%/
echo.
pause 