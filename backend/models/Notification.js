const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  forRole: { type: String, default: "employee" },  // NEW
  message: String,
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Notification", NotificationSchema);
