const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      type: Object,
      required: true,
    },
  ],
  orderTotal: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Invoice", orderSchema);
