const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["employee", "manager"], default: "employee" },
  department: String,

  // ⭐ Leave balances
  leaveBalance: {
    sick: { type: Number, default: 12 },
    casual: { type: Number, default: 10 },
    earned: { type: Number, default: 15 }
  },

  // ⭐ Forgot password fields
  resetToken: String,
  resetTokenExpiry: Date
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
