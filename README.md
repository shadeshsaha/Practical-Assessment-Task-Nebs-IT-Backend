# Notice Board Backend API

This is the backend API for the Notice Board application built using Node.js, Express.js, and MongoDB with Mongoose. It provides RESTful endpoints for creating, reading, updating, and filtering notices stored in a MongoDB database.

---

## Features

- Create notices with validation
- Retrieve all notices with pagination and status filtering (draft/published)
- Update notice publish status (draft/published)
- View a single notice by ID
- MongoDB Atlas integration for data persistence
- Modern ES6 import/export syntax
- Centralized error handling
- CORS enabled for frontend integration

---

## Technology Stack

- Runtime : Node.js
- Framework : Express.js
- Database : MongoDB, Mongoose
- Validation : Zod
- Security : Helmet, CORS
- Dev Tools : Nodemon, Postman Collection

---

## Getting Started

### Prerequisites

- Node.js installed ([Download](https://nodejs.org/))
- MongoDB Atlas cluster ([Setup](https://www.mongodb.com/cloud/atlas))
- Postman or any API testing tool (optional)

### Installation & Setup

# 1. Clone & Install

git clone <repo>
cd backend
npm install

# 2. Setup Environment

.env # Edit required vars

# 3. Run Server

npm run dev

---

## API Documentation

# Base URL: http://localhost:5000/api/v1

# Postman Collection

1. CREATE Notice: http://localhost:5000/api/v1/notices/
   {
   "title": "Meeting Tomorrow",
   "body": "Team meeting at 10:10 AM in conference room B",
   "targetEmployee": "testing",
   "targetType": "finance",
   "noticeType": "performance-improvement",
   "publishDate": "2025-10-10T10:10:00Z",
   "attachments": [],
   "status": "published",
   "priority": "high"
   }

2. GET All Notices: http://localhost:5000/api/v1/notices?page=1&limit=1&searchTerm=01

3. GET Published Notices: http://localhost:5000/api/v1/notices?status=published

4. GET Draft Notices: http://localhost:5000/api/v1/notices?status=draft

5. GET Single Notice: http://localhost:5000/api/v1/notices/6930b15b6724011b24241d21

6. UPDATE Status: http://localhost:5000/api/v1/notices/6930b15b6724011b24241d21/toggle-status
   {
   "status": "published"
   }
