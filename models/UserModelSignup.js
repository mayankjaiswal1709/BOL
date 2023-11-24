const { Schema, model } = require("mongoose");

const schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  mobileNumber: {
    type: Number,
    // required: true,
  },
  profilePhoto: {
    type: String,
    // required: false,
  },

});

module.exports = model("User", schema);
