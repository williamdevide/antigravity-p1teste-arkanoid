$ErrorActionPreference = "Stop"

# Initializing Frontend
Set-Location -Path "f:\antigravity\projetos\antigravity-p1teste-arkanoid\frontend"
Write-Host "Creating Vite React App..."
npx -y create-vite@latest ./ --template react
Write-Host "Installing dependencies..."
npm install
Write-Host "Installing TailwindCSS..."
npm install -D tailwindcss@3.4.1 postcss autoprefixer
npx tailwindcss init -p

# Initializing Backend
Set-Location -Path "f:\antigravity\projetos\antigravity-p1teste-arkanoid\backend"
Write-Host "Initializing Backend Node/Express..."
npm init -y
npm install express cors

Write-Host "Initialization Complete!"
