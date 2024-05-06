const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
