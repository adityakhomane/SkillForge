# SkillForge - Frontend to Backend Connection Guide

## Overview
This guide helps you connect your React frontend to your Node.js/Express backend.

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install

# Copy .env.example to .env and configure
cp .env.example .env

# Edit .env file with your configuration
# Start MongoDB service

# Install dependencies
npm install

# Start backend server
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install

# Copy .env.example to .env and configure
cp .env.example .env

# Start frontend development server
npm run dev
```

## API Configuration

### Backend Configuration
- **Port**: 5000 (default)
- **CORS**: Configured for development (localhost:5173) and production
- **Routes**: All API routes prefixed with `/api`

### Frontend Configuration
- **Development Server**: Port 5173
- **Proxy**: Configured to forward `/api` requests to backend
- **API Base URL**: Configurable via environment variables

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/skillforge
JWT_SECRET=your-jwt-secret
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## API Usage Examples

### Using the API Service
```javascript
import apiService from './services/apiService';

// Get all courses
const courses = await apiService.courses.getAll();

// Login user
const response = await apiService.auth.login({ email, password });

// Get course details
const course = await apiService.courses.getById(courseId);
```

### Using Axios Directly
```javascript
import axios from 'axios';
import API_CONFIG from './config/api';

const response = await axios.get(`${API_CONFIG.BASE_URL}/courses`);
```

## Troubleshooting

### CORS Issues
- Ensure backend is running on port 5000
- Check CORS configuration in backend/server.js
- Verify frontend URL is allowed in CORS settings

### Connection Issues
- Check if backend is running: `http://localhost:5000/api/health`
- Verify MongoDB connection
- Check environment variables are properly set

### Port Conflicts
- Backend: Change PORT in backend/.env
- Frontend: Change port in frontend/vite.config.js

## Production Deployment
1. Set NODE_ENV=production in backend
2. Update FRONTEND_URL in backend/.env
3. Update VITE_API_URL in frontend/.env
4. Build frontend: `npm run build`
5. Serve static files from backend or use separate hosting
