<div align="center">
  <h1>🆘 ReliefCore</h1>
  <p><strong>Disaster Relief Management Platform</strong></p>
  <p>A centralized disaster response system connecting authorities, volunteers, and victims with AI-driven resource prediction and real-time camp management.</p>
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Demo Credentials](#demo-credentials)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

**ReliefCore** is a comprehensive disaster relief management platform designed to streamline coordination between disaster response authorities, camp managers, volunteers, and victims. The system provides role-based access control, real-time resource tracking, AI-powered resource prediction using Google Gemini AI, and efficient camp management capabilities.

### Key Capabilities

- **Multi-Role Access**: Separate dashboards for Admin, Camp Managers, Volunteers, and Victims
- **AI-Driven Insights**: Resource prediction and demand forecasting using Gemini AI
- **Real-Time Management**: Live tracking of camps, resources, victims, and volunteer tasks
- **Public Portal**: Transparent disaster information and camp locations for public access
- **Secure Authentication**: JWT-based authentication with role-based authorization

---

## ✨ Features

### 👨‍💼 Admin Features

- **Disaster Management**: Create and monitor disaster events with severity tracking
- **Camp Management**: Oversee all relief camps, capacity, occupancy, and status
- **Resource Allocation**: Centralized resource distribution and inventory management
- **AI Predictions**: Leverage Gemini AI for resource demand forecasting
- **Monitoring & Reports**: Comprehensive analytics and reporting dashboards
- **User Management**: Manage camp managers, volunteers, and system users

### 🏕️ Camp Manager Features

- **Victim Intake**: Register and track victims with detailed information
- **Inventory Management**: Real-time resource tracking and request management
- **Volunteer Coordination**: Assign and monitor volunteer tasks
- **Camp Status Updates**: Update camp capacity, occupancy, and operational status
- **Resource Requests**: Submit requests for critical supplies

### 🤝 Volunteer Features

- **Task Management**: View assigned tasks with priority levels
- **Schedule Management**: Track work schedules and availability
- **Activity Tracking**: Log completed tasks and hours worked
- **Real-Time Updates**: Receive notifications for new task assignments

### 🆘 Victim Features

- **Aid Requests**: Submit requests for specific resources and assistance
- **Status Tracking**: Monitor personal status and camp assignment
- **Camp Information**: View assigned camp details and available resources
- **Contact Support**: Direct communication channel with camp managers

### 🌐 Public Portal

- **Disaster Updates**: Real-time information about active disasters
- **Camp Locations**: Interactive map showing all relief camps
- **Resource Transparency**: View available resources across camps
- **Donation Information**: Guidelines for contributing to relief efforts

---

## 🛠️ Technology Stack

### Frontend

- **Framework**: React 19.2.3
- **Language**: TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Routing**: React Router DOM 7.12.0
- **Styling**: TailwindCSS (via tailwind-merge)
- **Animations**: Framer Motion 12.26.2
- **Charts**: Recharts 3.6.0
- **Icons**: Lucide React 0.562.0
- **AI Integration**: Google Gemini AI (@google/genai 1.37.0)

### Backend

- **Runtime**: Node.js
- **Framework**: Express 5.2.1
- **Database**: SQLite (better-sqlite3 12.6.0)
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Password Hashing**: bcryptjs 3.0.3
- **Validation**: express-validator 7.3.1
- **CORS**: cors 2.8.5
- **Environment**: dotenv 17.2.3

---

## 📦 Prerequisites

Before running ReliefCore, ensure you have the following installed:

- **Node.js** (v16 or higher recommended)
- **npm** (comes with Node.js)
- **Google Gemini API Key** ([Get one here](https://ai.google.dev/))

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ReliefCore
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 4. Configure Environment Variables

#### Frontend Environment (`.env.local`)

Create a `.env.local` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

#### Backend Environment (`backend/.env`)

The backend `.env` file should already exist with:

```env
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

---

## ▶️ Running the Application

### Development Mode

You need to run both the frontend and backend servers simultaneously.

#### Terminal 1 - Backend Server

```bash
cd backend
npm start
```

The backend server will start on `http://localhost:5000`

#### Terminal 2 - Frontend Development Server

```bash
npm run dev
```

The frontend will start on `http://localhost:5173` (or another port if 5173 is busy)

### Production Build

```bash
npm run build
npm run preview
```

---

## 🔐 Demo Credentials

The database is automatically seeded with demo accounts for testing:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@reliefcore.org | admin123 |
| **Camp Manager** | manager@reliefcore.org | manager123 |
| **Volunteer** | volunteer@reliefcore.org | volunteer123 |
| **Victim** | victim@reliefcore.org | victim123 |

> **Note**: Change these credentials in production environments!

---

## 📁 Project Structure

```
ReliefCore/
├── backend/
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── routes/
│   │   ├── admin.js             # Admin API endpoints
│   │   ├── auth.js              # Authentication endpoints
│   │   ├── manager.js           # Camp manager endpoints
│   │   ├── public.js            # Public portal endpoints
│   │   ├── victim.js            # Victim endpoints
│   │   └── volunteer.js         # Volunteer endpoints
│   ├── database.js              # SQLite database setup & schema
│   ├── server.js                # Express server configuration
│   ├── reliefcore.db            # SQLite database file
│   └── package.json
├── src/
│   ├── components/              # Reusable UI components
│   ├── context/
│   │   └── AuthContext.tsx      # Authentication context
│   ├── layout/
│   │   ├── MainLayout.tsx       # Public layout wrapper
│   │   └── DashboardLayout.tsx  # Protected dashboard layout
│   ├── pages/
│   │   ├── admin/               # Admin dashboard pages
│   │   ├── auth/                # Login page
│   │   ├── manager/             # Camp manager pages
│   │   ├── public/              # Public portal pages
│   │   ├── victim/              # Victim dashboard pages
│   │   └── volunteer/           # Volunteer pages
│   ├── services/
│   │   └── api.ts               # API service layer
│   ├── types/                   # TypeScript type definitions
│   ├── App.tsx                  # Main app component
│   ├── routes.tsx               # Route configuration
│   └── index.tsx                # App entry point
├── .env.local                   # Frontend environment variables
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🗄️ Database Schema

The SQLite database includes the following tables:

### Users
- `id`, `email`, `password_hash`, `role`, `full_name`, `phone`, `created_at`
- Roles: `admin`, `manager`, `volunteer`, `victim`

### Camps
- `id`, `name`, `location`, `capacity`, `occupancy`, `status`, `manager_id`, `created_at`
- Status: `Active`, `Full`, `Closed`

### Victims
- `id`, `full_name`, `age`, `gender`, `status`, `contact_number`, `assigned_camp_id`, `needs`, `registered_at`
- Status: `Safe`, `Injured`, `Missing`, `Deceased`, `Displaced`

### Resources
- `id`, `camp_id`, `name`, `quantity`, `unit`, `status`, `updated_at`
- Status: `Good`, `Low`, `Critical`

### Requests
- `id`, `camp_id`, `resource_name`, `quantity_requested`, `status`, `requested_by`, `created_at`
- Status: `Pending`, `Approved`, `In Transit`, `Delivered`

### Tasks
- `id`, `title`, `description`, `location`, `priority`, `status`, `assigned_to`, `due_time`, `created_at`
- Priority: `High`, `Medium`, `Low`
- Status: `Pending`, `In Progress`, `Completed`

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)
- `POST /login` - User login
- `POST /register` - User registration
- `GET /me` - Get current user

### Admin (`/api/admin`)
- `GET /dashboard` - Dashboard statistics
- `GET /camps` - List all camps
- `POST /camps` - Create new camp
- `PUT /camps/:id` - Update camp
- `DELETE /camps/:id` - Delete camp
- `GET /resources` - View all resources
- `POST /resources/allocate` - Allocate resources

### Camp Manager (`/api/manager`)
- `GET /dashboard` - Manager dashboard stats
- `GET /victims` - List victims in assigned camp
- `POST /victims` - Register new victim
- `GET /inventory` - View camp inventory
- `POST /requests` - Submit resource request

### Volunteer (`/api/volunteer`)
- `GET /tasks` - Get assigned tasks
- `PUT /tasks/:id` - Update task status

### Victim (`/api/victim`)
- `GET /status` - Get victim status
- `POST /aid-request` - Submit aid request

### Public (`/api/public`)
- `GET /camps` - List all active camps
- `GET /disasters` - View active disasters

---

## 🌍 Environment Variables

### Frontend (`.env.local`)

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini AI API key | Yes |

### Backend (`backend/.env`)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `JWT_SECRET` | Secret key for JWT tokens | Yes | - |
| `PORT` | Backend server port | No | 5000 |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**ReliefCore Development Team**

For questions or support, please open an issue on the repository.

---

## 🙏 Acknowledgments

- Google Gemini AI for resource prediction capabilities
- React and Vite communities for excellent tooling
- All contributors and disaster relief workers worldwide

---

<div align="center">
  <p>Built with ❤️ for disaster relief coordination</p>
  <p><strong>ReliefCore</strong> - Connecting help where it's needed most</p>
</div>
