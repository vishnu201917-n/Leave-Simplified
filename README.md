# LeaveSimplified - Leave Management System

A full-stack Leave Management System that enables users to apply for, track, and manage leave requests through a secure and responsive web application.

---

## Features

- User Registration and Login
- Secure Authentication
- Apply for Leave
- View Leave History
- Leave Approval and Management
- Responsive User Interface
- MongoDB Database Integration

---

## Tech Stack

### Frontend
- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- React Router DOM
- Axios
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Express Session
- bcrypt
- Multer
- Nodemailer
- dotenv
- CORS

---

## Project Structure

```
LeaveSimplified/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/LeaveSimplified.git
```

```bash
cd LeaveSimplified
```

---

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

### 3. Install Frontend Dependencies

Open another terminal.

```bash
cd frontend
npm install
```

---

## Environment Variables

Create a `.env` file inside the **backend** folder.

Example:

```env
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
EMAIL=your_email
PASSWORD=your_email_password
```

Replace the values with your own credentials.

---

## Running the Project

### Start Backend

```bash
cd backend
npm start
```

Backend runs at:

```
http://localhost:3000
```

---

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```
## Future Enhancements

- Role-based access control
- Leave balance tracking
- Notifications
- Calendar Integration
- Dashboard Analytics
- Email Notifications

---
