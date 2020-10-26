const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  adminApproved: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  code: {
    type: String,
  },
  role: {
    type: String,
  },
  newpassword: {
    type: String,
    require: true,
  },
  userHomeId: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
