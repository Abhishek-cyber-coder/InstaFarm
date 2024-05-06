const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },

  images: [String],
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

productSchema.virtual("calculatedCredits").get(function () {
  // Assuming 1 credit = 50 rupees
  return Math.ceil(this.price / 50);
});

productSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Product", productSchema);
