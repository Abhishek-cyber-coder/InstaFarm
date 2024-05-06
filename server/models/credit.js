const mongoose = require("mongoose");

const creditsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  credits: {
    type: Number,
    default: 0,
    min: 0,
  },
});

module.exports = mongoose.model("Credits", creditsSchema);
