const express = require("express");
const Leave = require("../models/Leave");
const User = require("../models/User");
const Policy = require("../models/Policy");

const router = express.Router();

// -------- AUTH PROTECTION --------
const requireManager = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== "manager") {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  next();
};

// -------- MANAGER DASHBOARD --------
router.get("/dashboard", requireManager, async (req, res) => {
  const pending = await Leave.countDocuments({ status: "Pending" });
  const approved = await Leave.countDocuments({ status: "Approved" });
  const employees = await User.countDocuments({ role: "employee" });

  res.json({ success: true, pending, approved, employees });
});

// -------- MANAGER REQUEST LIST --------
router.get("/requests", requireManager, async (req, res) => {
  const requests = await Leave.find().populate("user", "name email");
  res.json({ success: true, requests });
});

const Notification = require("../models/Notification");
// -------- UPDATE REQUEST (Approve / Reject) --------
router.post("/update-request", requireManager, async (req, res) => {
  try {
    const { id, status } = req.body;

    const leave = await Leave.findById(id).populate("user");
    if (!leave) {
      return res.json({ success: false, message: "Leave not found" });
    }

    // Update status
    leave.status = status;
    await leave.save();

    // ⭐ Deduct leave if Approved
    if (status === "Approved") {
      const user = await User.findById(leave.user._id);

      const days =
        (new Date(leave.toDate) - new Date(leave.fromDate)) /
          (1000 * 60 * 60 * 24) +
        1;

      if (leave.type.includes("Sick")) {
        user.leaveBalance.sick -= days;
      } else if (leave.type.includes("Casual")) {
        user.leaveBalance.casual -= days;
      } else {
        user.leaveBalance.earned -= days;
      }

      // Prevent negative values
      user.leaveBalance.sick = Math.max(0, user.leaveBalance.sick);
      user.leaveBalance.casual = Math.max(0, user.leaveBalance.casual);
      user.leaveBalance.earned = Math.max(0, user.leaveBalance.earned);

      await user.save();
    }

    // ⭐ Create Notification (WORKING NOW)
    await Notification.create({
      user: leave.user._id,
      message: `Your ${leave.type} leave from 
        ${new Date(leave.fromDate).toLocaleDateString("en-IN")} to 
        ${new Date(leave.toDate).toLocaleDateString("en-IN")} 
        was ${status}.`,
    });

    res.json({ success: true, message: "Leave updated & notification sent" });
  } catch (err) {
    console.error("UPDATE REQUEST ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});


// -------- EMPLOYEE LIST --------
router.get("/employees", requireManager, async (req, res) => {
  const employees = await User.find({ role: "employee" });
  res.json({ success: true, employees });
});

// -------- POLICIES --------
router.get("/policies", requireManager, async (req, res) => {
  const policies = await Policy.find();
  res.json({ success: true, policies });
});

// -------- PROFILE --------
router.get("/profile", requireManager, (req, res) => {
  res.json({ success: true, user: req.session.user });
});

router.put("/update-profile", requireManager, async (req, res) => {
  try {
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


router.get("/notifications", requireManager, async (req, res) => {
  try {
    // Manager receives notifications tagged as "manager"
    const notifications = await Notification.find({ forRole: "manager" })
      .sort({ createdAt: -1 });

    res.json({ success: true, notifications });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put("/policies/:id", requireManager, async (req, res) => {
  try {
    const updated = await Policy.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
      },
      { new: true }
    );

    res.json({ success: true, policy: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


module.exports = router;

