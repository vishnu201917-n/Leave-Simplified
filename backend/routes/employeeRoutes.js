const express = require("express");
const Leave = require("../models/Leave");
const User = require("../models/User");
const Notification = require("../models/Notification");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// -------- FILE UPLOAD (multer) ----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });


// ------------------ DASHBOARD DATA ------------------
router.get("/dashboard", async (req, res) => {
  const user = req.session.user;

  const pending = await Leave.countDocuments({ user: user._id, status: "Pending" });
  const approved = await Leave.countDocuments({ user: user._id, status: "Approved" });

  res.json({ success: true, user, pending, approved });
});


// ------------------ LEAVE HISTORY ------------------
router.get("/leave-history", async (req, res) => {
  if (!req.session.user)
    return res.json({ success: false, message: "Not logged in" });

  const userId = req.session.user._id;

  try {
    const leaves = await Leave.find({ user: userId }).sort({ fromDate: -1 });

    return res.json({
      success: true,
      user: req.session.user,
      leaves,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});


// ------------------ APPLY LEAVE ------------------
router.post("/applyLeave", upload.single("attachment"), async (req, res) => {
  try {
    if (!req.session.user)
      return res.status(401).json({ success: false, message: "Not logged in" });

    const leave = await Leave.create({
      user: req.session.user._id,
      type: req.body.type,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
      reason: req.body.reason,
      attachment: req.file ? req.file.filename : null,
      status: "Pending"
    });

    // NOTIFICATION TO MANAGER
    await Notification.create({
      forRole: "manager",
      message: `${req.session.user.name} applied for ${leave.type} leave from 
        ${new Date(leave.fromDate).toLocaleDateString("en-IN")} to 
        ${new Date(leave.toDate).toLocaleDateString("en-IN")}.`
    });

    // NOTIFICATION TO EMPLOYEE (only submitted)
    await Notification.create({
      user: leave.user._id,
      forRole: "employee",
      message: `Your ${leave.type} leave request from 
        ${new Date(leave.fromDate).toLocaleDateString("en-IN")} to 
        ${new Date(leave.toDate).toLocaleDateString("en-IN")} 
        was submitted.`
    });

    res.json({ success: true, leave });

  } catch (err) {
    console.error("❌ APPLY LEAVE ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});



// ------------------ PROFILE ------------------
router.get("/profile", async (req, res) => {
  res.json({ success: true, user: req.session.user });
});


// ------------------ NOTIFICATIONS ------------------
router.get("/notifications", async (req, res) => {
  try {
    if (!req.session.user)
      return res.json({ success: false, message: "Not logged in" });

    const notifications = await Notification.find({
      user: req.session.user._id
    }).sort({ createdAt: -1 });

    res.json({ success: true, notifications });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ------------------ UPCOMING LEAVES ------------------
router.get("/leaves/upcoming", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.json({ success: false, message: "Not logged in" });
    }

    const leaves = await Leave.find({
      user: req.session.user._id,
      status: { $ne: "Rejected" }
    })
    .sort({ fromDate: 1 })
    .limit(5);

    res.json({ success: true, leaves });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// ------------------ UPDATE PROFILE ------------------
router.put("/update-profile", async (req, res) => {
  try {
    if (!req.session.user)
      return res.json({ success: false, message: "Not logged in" });

    const updatedUser = await User.findByIdAndUpdate(
      req.session.user._id,
      {
        name: req.body.name,
        department: req.body.department,
      },
      { new: true }
    );

    req.session.user = updatedUser;

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


module.exports = router;


