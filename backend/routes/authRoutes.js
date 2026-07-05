const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// ------------------- LOGIN -------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ success: false, message: "Invalid password" });

  req.session.user = user;

  res.json({
    success: true,
    user,
    role: user.role
  });
});

// ------------------- LOGOUT -------------------
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// ------------------- CHECK LOGIN (VERY IMPORTANT) -------------------
router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.json({ success: false, message: "Not logged in" });
  }

  res.json({
    success: true,
    user: req.session.user,
  });
});


router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.json({ success: false, message: "Email not found" });

  const token = Math.random().toString(36).substring(2);
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 1000 * 60 * 10; // 10 minutes
  await user.save();

  // Simulated link
  const resetLink = `http://localhost:5173/reset-password/${token}`;

  res.json({
    success: true,
    message: "Reset link generated",
    resetLink: resetLink
  });
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user)
    return res.json({ success: false, message: "Invalid or expired token" });

  user.password = password;
  user.resetToken = null;
  user.resetTokenExpiry = null;

  await user.save();

  res.json({ success: true, message: "Password reset successful" });
});

module.exports = router;
