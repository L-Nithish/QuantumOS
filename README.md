# QuantumOS 🌐✨

QuantumOS is an award-winning, premium, full-stack enterprise productivity platform. It unifies a high-fidelity project management SaaS dashboard with an interactive, web-based spatial operating system environment—complete with responsive applications, a virtual file system, system monitor, and an integrated AI command center.

---

## 🚀 Key Features

### 1. High-Fidelity Landing Page & Marketing Hub
* **Cinema-Grade Aesthetics**: Sleek modern typography, smooth micro-animations, and fluid interactive background canvases.
* **Responsive Routing**: Seamless navigation from marketing paths to full authentication flows.

### 2. Enterprise SaaS Workspace & Dashboard
* **Dynamic Overview**: Live status tracking of active projects, task completion rates, and recent team activity logs.
* **Robust Project & Task Boards**: Create, prioritize, and manage issues and workflows without UI lag or rendering overhead.
* **AI Command Center**: Interactive chat interface connected to the Spring Boot AI integration layer for contextual workflow answers.

### 3. Spatial OS Desktop Environment (`/os`)
* **Simulated Boot & Lock Screen**: An immersive spatial loading and authentication sequence.
* **Pre-Loaded Virtual Applications**:
  * **Terminal**: Functional shell supporting basic navigation and commands.
  * **File Manager**: Directory navigator powered by an in-memory Virtual File System (VFS).
  * **System Monitor**: Live performance tracking, memory profiling, and task lists.
  * **Text Editor & Calculator**: Utility apps with save-to-VFS capability.
  * **Settings**: Change background grid, animations, backdrop blur, and desktop wallpapers.
* **Interconnected Exit**: Jump directly back to the SaaS dashboard using the exit trigger inside the Start Menu.

---

## 🛠️ Technology Stack

### Frontend
* **Core**: React 18, TypeScript, Vite
* **Styling**: TailwindCSS, custom high-performance CSS
* **Animations**: Framer Motion
* **Routing**: React Router DOM v6

### Backend
* **Core**: Spring Boot 3.x, Java 17
* **Database**: PostgreSQL (Neon.tech Serverless Integration)
* **Security**: JWT-based session security and custom filters
* **AI Integration**: Custom Ollama / LangChain client modules

---

## 📦 Build & Running Locally

### Prerequisites
* **Java 17+ & Gradle 8.x**
* **Node.js 18+ & npm**

### Run Development Servers
To run both backend and frontend servers:

```bash
# Terminal 1: Backend
cd backend
./gradlew bootRun

# Terminal 2: Frontend
cd frontend
npm run dev
```

### Production Build & Packaging
Both components compile cleanly into static/executable distribution formats:

```bash
# Package Backend (generates executable JAR in backend/build/libs)
cd backend
./gradlew bootJar

# Build Frontend (generates static SPA in frontend/dist)
cd frontend
npm run build
```

---

## 🌐 Deployment Guide

### Frontend (Vercel / Netlify / GitHub Pages)
1. Initialize the deployment tool of choice:
   ```bash
   npm i -g vercel
   vercel
   ```
2. Configure build commands:
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`

### Backend (Render / Railway / Heroku)
1. Link your GitHub repository to your backend platform.
2. Set environment variables for production database access:
   * `SPRING_DATASOURCE_URL`
   * `SPRING_DATASOURCE_USERNAME`
   * `SPRING_DATASOURCE_PASSWORD`
3. Configure start command:
   * `java -jar backend/build/libs/quantumos-0.0.1-SNAPSHOT.jar`

---

## 🎨 Portfolio Description (Copy-Paste Ready)

> **QuantumOS** is a next-generation productivity hub that explores the boundaries of web UI. By combining a classic SaaS workspace layout with a responsive, in-browser window manager operating system, QuantumOS provides a spatial environment for managing code, planning sprints, and interacting with AI models. The frontend is powered by React, TypeScript, and TailwindCSS with fluid Framer Motion animations. The backend is a Spring Boot REST API backed by a Neon serverless PostgreSQL instance.
