const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// -------------------- MIDDLEWARE --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS so React can talk to backend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Sessions (login persistence)
app.use(
  session({
    secret: "secretKey123",
    resave: false,
    saveUninitialized: false,
  })
);

// -------------------- STATIC FILES (uploads) --------------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// -------------------- ROUTES --------------------
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const managerRoutes = require("./routes/managerRoutes");

app.use("/auth", authRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/employee", employeeRoutes);

// ⭐ ONLY ONCE — MANAGER ROUTES
app.use("/api/manager", managerRoutes);


// -------------------- DB CONNECTION --------------------
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/leaveManagement")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// -------------------- START SERVER --------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
