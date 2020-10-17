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
});

module.exports = mongoose.model("User", UserSchema);
