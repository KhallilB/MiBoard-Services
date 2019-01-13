const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name Required."]
  },
  email: {
    type: String,
    required: [true, "Email Required"],
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      "Enter A Valid Email."
    ]
  },
  password: {
    type: String,
    required: [true, "Password Required"],
    minlength: [6, "Password must be longer than 6 characters."]
  },
  saltSecret: String
});

module.exports = mongoose.model("User", userSchema);
