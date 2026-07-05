const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  title: String,
  description: String,
});

module.exports = mongoose.model("Policy", policySchema);
