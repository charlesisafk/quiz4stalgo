# Project Management System - Frontend

A React-based project management system with role-based access control, featuring project and task management capabilities similar to ClickUp.

## Features

### Role-Based Authentication
- Admin, Manager, and User roles
- Protected routes based on user permissions
- Secure login/logout functionality

### Dashboard
- View all projects (Admin) or assigned projects (Manager/User)
- Simple table view with project details
- Direct navigation to project details

### Project Management
- Create projects (Admin only)
- View project details with all information
- Track project status, dates, and hours consumed
- Manage assigned users

### Task Management
- Create tasks within projects (Admin & Manager)
- View all project tasks in detail screen
- Track task status and assignments
- Accessible from project detail page

### User Management
- Create users (Admin only)
- List all registered users (Admin only)
- Assign roles (Admin, Manager, User)
- Permission-based access control

## Technology Stack

- **React** - Frontend framework
- **Redux** - State management
- **React Router** - Routing and navigation
- **React Bootstrap** - UI components
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/charlesisafk/quiz4stalgo.git
cd frontend-template
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner in interactive watch mode

### `npm eject`
Ejects from Create React App (one-way operation)

## Test Credentials

For development/testing with dummy data:
- **Admin**: username: `admin`, password: `admin123`
- **Manager**: username: `manager`, password: `manager123`
- **User**: username: `user`, password: `user123`

## Project Structure

```
src/
├── actions/          # Redux actions
│   ├── projectActions.js
│   ├── taskActions.js
│   └── userActions.js
├── components/       # Reusable components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── PrivateRoute.jsx
│   └── ...
├── constants/        # Redux action types
│   ├── projectConstants.js
│   ├── taskConstants.js
│   └── userConstants.js
├── reducers/         # Redux reducers
│   ├── projectReducers.js
│   ├── taskReducers.js
│   └── userReducers.js
├── screens/          # Page components
│   ├── HomeScreen.jsx
│   ├── LoginScreen.jsx
│   ├── DetailScreen.jsx
│   ├── ProjectCreateScreen.jsx
│   ├── TaskCreateScreen.jsx
│   ├── UserCreateScreen.jsx
│   └── UserListScreen.jsx
├── utils/            # Utility files
│   └── dummyData.js
├── App.js            # Main app component
├── store.js          # Redux store configuration
└── index.js          # Entry point
```

## Routes

- `/` - Dashboard (Home)
- `/login` - Login page
- `/project/:id` - Project details (All authenticated users)
- `/project/:id/createtask` - Create task (Admin & Manager only)
- `/createproject` - Create project (Admin only)
- `/createuser` - Create user (Admin only)
- `/userlist` - User list (Admin only)

## Access Control

### Admin
- Full access to all features
- Create projects
- Create users
- View all projects and users
- Create and manage tasks

### Manager
- View assigned projects
- Create and manage tasks
- View project details

### User
- View assigned projects
- View project and task details
- Read-only access

## API Integration

The application is designed to work with a backend API. Expected endpoints:

- `POST /api/v1/users/login/` - User login
- `GET /api/v1/projects/` - List projects
- `POST /api/v1/projects/create` - Create project
- `GET /api/v1/projects/:id/` - Project details
- `GET /api/v1/projects/:id/tasks/` - List tasks
- `POST /api/v1/projects/:id/task/create/` - Create task
- `GET /api/v1/users/` - List users
- `POST /api/v1/users/create/` - Create user

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Project Link: [https://github.com/charlesisafk/quiz4stalgo](https://github.com/charlesisafk/quiz4stalgo)
