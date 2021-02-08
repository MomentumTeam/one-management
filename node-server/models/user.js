const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userId: String,
  favorites: [String],
  history: [String],
});

const User = mongoose.model("user", userSchema);
module.exports = User;
