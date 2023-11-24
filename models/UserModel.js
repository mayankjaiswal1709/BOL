const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
 email: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
});
userSchema.set("timestamps", true);

module.exports = mongoose.model("userData", userSchema);
