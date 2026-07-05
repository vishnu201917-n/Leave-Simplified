const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("./models/User");
const Policy = require("./models/Policy");
const Leave = require("./models/Leave");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/leaveManagement");
    console.log("🌿 Connected to MongoDB");

    await User.deleteMany({});
    await Policy.deleteMany({});
    await Leave.deleteMany({});

    const hashedPass = await bcrypt.hash("12345", 10);

    // ---- USERS ----
    const users = await User.insertMany([
      {
        name: "Admin Manager",
        email: "manager@company.com",
        password: hashedPass,
        role: "manager",
        department: "HR",
      },
      {
        name: "Jane Employee",
        email: "employee@company.com",
        password: hashedPass,
        role: "employee",
        department: "Development",

        // ⭐ Leave Balance Added
        leaveBalance: {
          sick: 12,
          casual: 10,
          earned: 15
        }
      },
      {
        name: "John Employee",
        email: "employee2@company.com",
        password: hashedPass,
        role: "employee",
        department: "Testing",

        // ⭐ Leave Balance Added
        leaveBalance: {
          sick: 12,
          casual: 10,
          earned: 15
        }
      }
    ]);

    console.log("✅ Users Added");

    const jane = users[1];

    // ===== SAMPLE LEAVE RECORDS FOR JANE =====
    await Leave.insertMany([
      {
        user: jane._id,
        type: "Sick Leave",
        fromDate: new Date("2025-11-12"),
        toDate: new Date("2025-11-14"),
        status: "Approved",
        reason: "Fever and rest",
      },
      {
        user: jane._id,
        type: "Casual Leave",
        fromDate: new Date("2025-12-21"),
        toDate: new Date("2025-12-21"),
        status: "Approved",
        reason: "Personal work",
      },
      {
        user: jane._id,
        type: "Vacation",
        fromDate: new Date("2026-01-04"),
        toDate: new Date("2026-01-09"),
        status: "Pending",
        reason: "Family trip",
      }
    ]);

    console.log("🗂 Sample Leaves Added");

    // ---- POLICIES ----
    await Policy.insertMany([
      { title: "Sick Leave Policy", content: "Employees can take up to 12 sick leaves per year." },
      { title: "Casual Leave Policy", content: "Employees are allowed 7 casual leaves per year." },
      { title: "Maternity Leave Policy", content: "Female employees are allowed 6 months maternity leave." }
    ]);

    console.log("📘 Policies Added");
    console.log("🌱 Seeding Complete!");
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
