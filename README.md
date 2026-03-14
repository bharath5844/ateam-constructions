# 🏗️ A-Team Constructions — Website + Admin Panel

Full-stack professional website built with **React** (frontend) + **Node.js/Express** (backend).

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v16+ → https://nodejs.org
- **npm** (comes with Node.js)

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install server + client dependencies
npm run install-all
```

### 2. Start Development

```bash
npm run dev
```

This starts:
- 🖥️ **Backend** on → http://localhost:5000
- 🌐 **Frontend** on → http://localhost:3000

---

## 📁 Project Structure

```
ateam-constructions/
├── server/                  # Node.js + Express backend
│   ├── routes/
│   │   ├── auth.js          # Login / JWT auth
│   │   ├── projects.js      # Project CRUD + image upload
│   │   ├── services.js      # Services management
│   │   ├── enquiries.js     # Contact enquiries
│   │   └── about.js         # Company info
│   ├── middleware/
│   │   └── auth.js          # JWT middleware
│   ├── uploads/             # Uploaded project images (auto-created)
│   ├── data/                # JSON database files (auto-created)
│   ├── .env                 # Environment config
│   └── index.js             # Main server entry
│
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/      # Navbar, Footer
│   │   │   ├── sections/    # Hero, Services, Projects, About, Contact
│   │   │   └── admin/       # Admin Login + Dashboard
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── assets.js        # Base64 embedded images
│   │   ├── App.js
│   │   └── index.js
│   └── public/
│       └── index.html
│
└── package.json             # Root scripts
```

---

## 🔐 Admin Panel

**URL:** http://localhost:3000/admin

**Default Login:**
- Username: `admin`
- Password: `ATeam@2025`

### Admin Features:
| Feature | Description |
|---------|-------------|
| 📊 Overview | Stats dashboard with project/enquiry counts |
| 🏗️ Projects | Upload, view, delete project photos |
| 📬 Enquiries | View & manage client contact requests |
| ⚙️ Services | Edit service names, descriptions, toggle on/off |
| 🏢 About Info | Edit company description, address, stats |

---

## ⚙️ Configuration

Edit `server/.env` to change settings:

```env
PORT=5000
JWT_SECRET=your_super_secret_key_here
ADMIN_USER=admin
ADMIN_PASS=YourNewPassword@2025
CLIENT_URL=http://localhost:3000
```

---

## 🌐 Deployment (Production)

### Option 1: Same Server
```bash
# Build React app
npm run build

# Set production env
NODE_ENV=production node server/index.js
```

### Option 2: Separate Hosting
- **Frontend**: Deploy `client/build` to Netlify / Vercel
- **Backend**: Deploy `server/` to Railway / Render / VPS
- Update `CLIENT_URL` in server `.env`
- Update proxy in `client/package.json`

---

## 📞 Contact
- **CEO:** Bharath Reddy Machannagari — +91 98665 15444
- **Founder:** Bhargav Reddy Machannagari — +91 95505 95000

---

*Sri Anantha Padmanabha Swamy* 🙏
