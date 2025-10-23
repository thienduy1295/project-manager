# TASKIO

<div align="center">
  <img src="https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
</div>

<br>

<div align="center">
  <h1>⚡ Enterprise-Grade Project Management Platform</h1>
  <p><strong>Streamline workflows, boost productivity, and scale your team's collaboration with our comprehensive project management solution.</strong></p>
  
  <p>
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-api-documentation">API Docs</a> •
    <a href="#-deployment">Deployment</a>
  </p>
</div>

---

## 🚀 Features

### 📊 **Advanced Analytics & Reporting**

- **Real-time Dashboard**: Live project metrics, completion rates, and team performance indicators
- **Interactive Data Visualization**: Comprehensive charts using Recharts for project trends and productivity analysis
- **Customizable Reports**: Generate detailed reports on project progress, team workload, and resource allocation
- **Performance Metrics**: Track velocity, sprint completion, and individual contributor statistics

### 👥 **Enterprise Workspace Management**

- **Multi-tenant Architecture**: Isolated workspaces with complete data separation and security
- **Role-based Access Control**: Granular permissions system with Admin, Manager, and Member roles
- **Team Collaboration**: Advanced member invitation system with email notifications and workspace onboarding
- **Smart Workspace Selection**: Intelligent workspace detection and seamless context switching

### 📋 **Comprehensive Project & Task Management**

- **Hierarchical Project Structure**: Organize projects within workspaces with custom categories and tags
- **Advanced Task Management**: Create tasks with priorities, due dates, assignees, and custom fields
- **Sub-task Dependencies**: Complex task hierarchies with dependency tracking and critical path analysis
- **Workflow Automation**: Custom status transitions, automated notifications, and rule-based task assignments
- **Activity Tracking**: Comprehensive audit logs with real-time activity feeds and change history

### 🔐 **Enterprise Security & Authentication**

- **Multi-factor Authentication**: Secure login with JWT tokens and refresh token rotation
- **Email Verification System**: Automated email verification with SendGrid integration
- **Password Security**: Bcrypt hashing with configurable complexity requirements
- **Session Management**: Secure session handling with automatic timeout and concurrent session control
- **API Security**: Rate limiting, request validation, and CORS protection with Arcjet integration

### 🎨 **Modern User Experience**

- **Responsive Design**: Mobile-first approach with adaptive layouts for all device types
- **Accessibility Compliance**: WCAG 2.1 AA compliant components with keyboard navigation support
- **Theme System**: Dark/light mode with system preference detection and custom theme support
- **Performance Optimization**: Code splitting, lazy loading, and optimized bundle sizes
- **Real-time Updates**: WebSocket integration for live collaboration and instant notifications

---

## 🛠️ Technology Stack

### **Frontend Architecture**

| Technology       | Version | Purpose                                                   |
| ---------------- | ------- | --------------------------------------------------------- |
| **React**        | 19.1.0  | Modern UI library with concurrent features and Suspense   |
| **TypeScript**   | 5.8.3   | Static type checking and enhanced developer experience    |
| **React Router** | 7.7.1   | File-based routing with data loading and error boundaries |
| **TailwindCSS**  | 4.1.4   | Utility-first CSS framework with JIT compilation          |
| **Radix UI**     | Latest  | Accessible, unstyled component primitives                 |
| **React Query**  | 5.85.5  | Server state management with caching and synchronization  |
| **Recharts**     | 2.15.4  | Composable charting library for data visualization        |
| **Lucide React** | 0.542.0 | Beautiful, customizable SVG icon library                  |

### **Backend Infrastructure**

| Technology     | Purpose             | Key Features                                 |
| -------------- | ------------------- | -------------------------------------------- |
| **Node.js**    | Runtime Environment | Event-driven, non-blocking I/O               |
| **Express.js** | Web Framework       | RESTful API with middleware support          |
| **MongoDB**    | Database            | Document-based NoSQL with horizontal scaling |
| **Mongoose**   | ODM                 | Schema validation and query building         |
| **JWT**        | Authentication      | Stateless token-based authentication         |
| **Bcrypt**     | Security            | Password hashing with salt rounds            |
| **SendGrid**   | Email Service       | Transactional email delivery                 |
| **Arcjet**     | Security            | Rate limiting and request validation         |

---

## 📁 Project Structure

```
project-manager/
├── frontend/                 # React frontend application
│   ├── app/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/          # Base UI components
│   │   │   ├── dashboard/   # Dashboard-specific components
│   │   │   ├── task/        # Task management components
│   │   │   ├── workspace/   # Workspace components
│   │   │   └── layout/      # Layout components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   ├── provider/        # Context providers
│   │   ├── routes/          # Page components
│   │   └── types/           # TypeScript type definitions
│   ├── public/              # Static assets
│   └── package.json
├── backend/                  # Node.js backend API
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Express middleware
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── libs/                # Utility libraries
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Git

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/project-manager.git
   cd project-manager
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   Create `.env` file in the backend directory:

   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/taskio

   # JWT
   JWT_SECRET=your-super-secret-jwt-key
   JWT_REFRESH_SECRET=your-super-secret-refresh-key

   # Email (SendGrid)
   SENDGRID_API_KEY=your-sendgrid-api-key
   FROM_EMAIL=noreply@taskio.com

   # Server
   PORT=5000
   NODE_ENV=development
   ```

5. **Start the development servers**

   **Backend:**

   ```bash
   cd backend
   npm run dev
   ```

   **Frontend:**

   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

---

## 📖 API Documentation

### **Authentication Endpoints**

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset
- `POST /api/auth/verify-email` - Email verification

### **Workspace Endpoints**

- `GET /api/workspaces` - Get user workspaces
- `POST /api/workspaces` - Create workspace
- `GET /api/workspaces/:id` - Get workspace details
- `POST /api/workspaces/:id/invite-member` - Invite member
- `GET /api/workspaces/:id/stats` - Get workspace statistics

### **Project Endpoints**

- `GET /api/workspaces/:id/projects` - Get workspace projects
- `POST /api/workspaces/:id/projects` - Create project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### **Task Endpoints**

- `GET /api/projects/:id/tasks` - Get project tasks
- `POST /api/projects/:id/tasks` - Create task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/my-tasks` - Get user's tasks

---

## 🎨 Key Features Implementation

### **Smart Workspace Selection**

- Automatic workspace selection for single-workspace users
- Beautiful workspace selection UI
- Seamless navigation between workspaces

### **Real-time Dashboard**

- Live project statistics
- Interactive charts and graphs
- Recent projects and upcoming tasks
- Team productivity metrics

### **Advanced Task Management**

- Priority-based task organization
- Due date tracking and notifications
- Task comments and activity logs
- Sub-task support
- Task watchers and assignees

### **Responsive Design**

- Mobile-first approach
- Collapsible sidebar navigation
- Adaptive layouts for all screen sizes
- Touch-friendly interactions

---

## 🔧 Development

### **Available Scripts**

**Frontend:**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run typecheck    # TypeScript type checking
```

**Backend:**

```bash
npm run dev          # Start with nodemon
npm run start        # Start production server
npm run dev:clean    # Clean restart
npm run kill         # Kill all processes
```

### **Code Quality**

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Consistent component structure

---

## 🚀 Deployment

### **Frontend (Vercel/Netlify)**

```bash
cd frontend
npm run build
# Deploy the build folder
```

### **Backend (Railway/Heroku)**

```bash
cd backend
# Set environment variables
npm start
```

### **Database (MongoDB Atlas)**

- Create MongoDB Atlas cluster
- Update MONGODB_URI in environment variables
- Configure network access

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Duy Cao**

- GitHub: [@duycao](https://github.com/thienduy1295)
- Email: thienduy1295@gmail.com

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - Component primitives
- [Lucide](https://lucide.dev/) - Icon library
- [MongoDB](https://www.mongodb.com/) - Database
- [SendGrid](https://sendgrid.com/) - Email service

---

<div align="center">
  <p>Made with ❤️ by Duy Cao</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
