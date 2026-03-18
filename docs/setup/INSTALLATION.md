# 🚀 AptBites Installation & Setup Guide

Complete guide for setting up AptBites on your local machine (Mac, Windows, or Linux).

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Tech Stack](#tech-stack)
3. [Installation Steps](#installation-steps)
4. [Running the Application](#running-the-application)
5. [Troubleshooting](#troubleshooting)
6. [Next Steps](#next-steps)

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your computer.

### Required Software

#### 1. **Node.js** (v18 or higher)

**What is it?** JavaScript runtime needed to run Next.js applications.

**Check if installed:**
```bash
node --version
```

**Installation:**

##### 📱 **macOS**
```bash
# Option 1: Using Homebrew (recommended)
brew install node

# Option 2: Download from official website
# Visit: https://nodejs.org/
# Download and install the LTS version
```

##### 🪟 **Windows**
```bash
# Option 1: Using Chocolatey
choco install nodejs-lts

# Option 2: Download installer
# Visit: https://nodejs.org/
# Download and run the Windows Installer (.msi)
```

##### 🐧 **Linux (Ubuntu/Debian)**
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 2. **npm** (Node Package Manager)

**What is it?** Package manager that comes with Node.js.

**Check if installed:**
```bash
npm --version
```

**Note:** npm is automatically installed with Node.js. If not available, reinstall Node.js.

#### 3. **Git** (Optional but recommended)

**What is it?** Version control system for cloning repositories.

**Check if installed:**
```bash
git --version
```

**Installation:**

##### 📱 **macOS**
```bash
# Git is pre-installed on macOS
# Or install via Homebrew
brew install git
```

##### 🪟 **Windows**
```bash
# Download from: https://git-scm.com/download/win
# Run the installer with default settings
```

##### 🐧 **Linux**
```bash
sudo apt-get install git
```

#### 4. **Code Editor** (Recommended: VS Code)

**What is it?** Text editor for coding.

**Download:**
- **VS Code:** https://code.visualstudio.com/
- **Alternatives:** Sublime Text, Atom, WebStorm

---

## 🏗️ Tech Stack

AptBites is built with the following technologies:

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.x | React framework for web applications |
| **React** | 18.x | UI library for building interfaces |
| **TypeScript** | 5.x | Typed JavaScript for better code quality |
| **Tailwind CSS** | 3.x | Utility-first CSS framework |
| **Node.js** | 18+ | JavaScript runtime |
| **npm** | 9+ | Package manager |

### Additional Libraries

- **React Context API** - State management
- **localStorage** - Client-side data persistence
- No database required for MVP (using localStorage)

---

## 📥 Installation Steps

### Step 1: Download the Project

#### Option A: Using Git (Recommended)
```bash
# Clone the repository
git clone <your-repository-url>

# Navigate into the project
cd aptbites
```

#### Option B: Download ZIP
1. Download the project as ZIP file
2. Extract to your desired location
3. Open terminal/command prompt in that folder

### Step 2: Open in Code Editor

#### Using VS Code:
```bash
# Open VS Code in current directory
code .
```

#### Or:
- Open VS Code
- File → Open Folder
- Select the `aptbites` folder

### Step 3: Install Dependencies

Open terminal in your project directory and run:

```bash
npm install
```

**What this does:**
- Downloads all required packages
- Creates `node_modules` folder
- Takes 2-5 minutes depending on internet speed

**Expected output:**
```
added 300+ packages in 3m
```

### Step 4: Verify Installation

Check if everything installed correctly:

```bash
# Check Node.js version
node --version
# Should show: v18.x.x or higher

# Check npm version
npm --version
# Should show: 9.x.x or higher

# Verify project structure
ls -la
# Should see: node_modules, package.json, src, etc.
```

---

## 🏃 Running the Application

### Development Mode (Local Testing)

```bash
npm run dev
```

**What happens:**
- Starts development server
- Opens on http://localhost:3000
- Hot reload enabled (changes appear instantly)

**Expected output:**
```
  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

**If port 3000 is in use:**
```
⚠ Port 3000 is in use, trying 3001 instead
  - Local:        http://localhost:3001
```

### Open in Browser

1. Open your web browser
2. Go to: `http://localhost:3000` (or 3001 if 3000 was in use)
3. You should see the AptBites homepage! 🎉

### Stop the Server

Press `Ctrl + C` in the terminal

---

## 🔧 Additional Setup (Before Production)

### 1. Configure Contact Information

Edit `/src/app/cart/page.tsx`:

```typescript
// Line ~50: Your SMS phone number
const phoneNumber = '15551234567'  // ← Update this

// Line ~43: Your WhatsApp number
const whatsappNumber = '15551234567'  // ← Update this

// Line ~57: Your email
const email = 'hello@aptbites.com'  // ← Update this
```

### 2. Access Admin Dashboard

1. Go to: `http://localhost:3000/admin`
2. Password: `aptbites2026`
3. Add/edit your products

### 3. Customize Branding

Edit files in `/src/app/`:
- `page.tsx` - Home page content
- `about/page.tsx` - About page
- `/src/components/Header.tsx` - Logo and header
- `/src/components/Footer.tsx` - Footer content

---

## 🧪 Testing Your Setup

Run these commands to verify everything works:

```bash
# Check for errors
npm run lint

# Build for production (test)
npm run build

# If build succeeds, you're ready to deploy!
```

---

## 🐛 Troubleshooting

### Common Issues

#### ❌ "command not found: node"

**Problem:** Node.js not installed or not in PATH

**Solution:**
```bash
# macOS/Linux: Install using package manager
brew install node  # macOS
sudo apt install nodejs  # Linux

# Windows: Reinstall Node.js from nodejs.org
# Make sure to check "Add to PATH" during installation
```

#### ❌ "npm ERR! EACCES: permission denied"

**Problem:** Permission issues (mainly macOS/Linux)

**Solution:**
```bash
# Fix npm permissions
sudo chown -R $USER:$(id -gn $USER) ~/.npm
sudo chown -R $USER:$(id -gn $USER) ~/.config
```

#### ❌ "Port 3000 is already in use"

**Problem:** Another application using port 3000

**Solution:**
```bash
# Option 1: Next.js will auto-use port 3001
# Just use http://localhost:3001

# Option 2: Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Option 2: Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

#### ❌ "Module not found" errors

**Problem:** Dependencies not installed properly

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json  # macOS/Linux
# OR
rmdir /s node_modules && del package-lock.json  # Windows

# Reinstall
npm install
```

#### ❌ "npm install" takes forever

**Problem:** Slow network or npm registry issues

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install

# Or use yarn as alternative
npm install -g yarn
yarn install
```

#### ❌ TypeScript errors after editing

**Problem:** Stale TypeScript cache

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

---

## 🎯 Next Steps

After successful installation:

1. ✅ **Configure Settings**
   - Update contact information in cart page
   - Customize branding and content
   
2. ✅ **Add Products**
   - Go to `/admin`
   - Add your inventory
   
3. ✅ **Test Locally**
   - Browse products
   - Test shopping cart
   - Try order methods
   
4. ✅ **Deploy to Production**
   - Follow [MVP Setup Guide](./MVP_SETUP.md)
   - Deploy to Vercel (free)
   
5. ✅ **Launch**
   - Complete [Launch Checklist](../launch/LAUNCH_CHECKLIST.md)
   - Share with community

---

## 📚 Additional Resources

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **TypeScript Handbook:** https://www.typescriptlang.org/docs/

---

## 🆘 Need Help?

1. Check [Testing Guide](../testing/TESTING.md) for troubleshooting
2. Review [Launch Checklist](../launch/LAUNCH_CHECKLIST.md)
3. Verify all prerequisites are installed correctly

---

## 📝 Quick Reference Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Check for errors
npm run lint

# Start production server
npm start
```

---

## ✅ Installation Checklist

Use this checklist to verify your setup:

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Project downloaded/cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server runs (`npm run dev`)
- [ ] Can access http://localhost:3000
- [ ] Can access admin at /admin
- [ ] Contact info updated in cart page
- [ ] Products added via admin dashboard
- [ ] All pages load without errors

**All checked?** You're ready to go! 🚀

---

**Last Updated:** February 3, 2026  
**Guide Version:** 1.0
