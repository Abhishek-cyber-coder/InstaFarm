const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const Cart = require("../models/cart");

const verifyAuth = require("../middlewares/authMiddleware");

router.post("/addToCart", verifyAuth, async (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    const price = product.price * quantity;
    const credits = product.calculatedCredits * quantity;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId });
    }

    const indexOfExistingItem = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (indexOfExistingItem !== -1) {
      cart.items[indexOfExistingItem].quantity += quantity;
      cart.items[indexOfExistingItem].price += price;
      cart.items[indexOfExistingItem].credits += credits;
    } else {
      cart.items.push({ product: productId, quantity, price, credits });
    }

    cart.totalPrice += price;
    cart.totalCredits += credits;
    cart.totalItems += quantity;

    await cart.save();

    res.status(200).json({
      message: "Item added to cart successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/cartDetails", verifyAuth, async (req, res, next) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

router.patch("/updateCart", verifyAuth, async (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
        success: false,
      });
    }

    let cartItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    const previousQuantity = cartItem.quantity;
    const priceDifference = (quantity - cartItem.quantity) * product.price;
    const creditDifference =
      (quantity - cartItem.quantity) * product.calculatedCredits;

    cartItem.quantity = quantity;
    cartItem.price += priceDifference;
    cartItem.credits += creditDifference;

    cart.totalPrice += priceDifference;
    cart.totalCredits += creditDifference;

    cart.totalItems += quantity - previousQuantity;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

router.put("/deleteCart/items", verifyAuth, async (req, res, next) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [], totalPrice: 0, totalCredits: 0, totalItems: 0 } },
      { new: true }
    );

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
