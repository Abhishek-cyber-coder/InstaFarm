const express = require("express");
const router = express.Router();
const User = require("../models/user");

const verifyAuth = require("../middlewares/authMiddleware");

const Invoice = require("../models/invoice");

router.post("/", verifyAuth, async (req, res, next) => {
  try {
    const { userId, items, orderTotal } = req.body;

    if (!userId || !items || !orderTotal) {
      return res.status(404).json({
        message: "Bad Request",
        success: false,
      });
    }

    const newInvoice = new Invoice({
      items,
      orderTotal,
      user: userId,
    });

    await newInvoice.save();

    res.status(200).json({ newInvoice });
  } catch (error) {
    next(error);
  }
});

router.get("/detailAll", verifyAuth, async (req, res, next) => {
  try {
    const userId = req.body.userId;

    const invoices = await Invoice.find({ user: userId }).populate(
      "user",
      "name address",
      "User"
    );

    if (!invoices) {
      return res.status(404).json({
        message: "No orders are there for this user",
      });
    }

    res.status(200).json(invoices);
  } catch (error) {
    next(error);
  }
});

router.get("/detail/:invoiceId", verifyAuth, async (req, res, next) => {
  try {
    const invoiceId = req.params.invoiceId;
    const invoiceDetail = await Invoice.findById(invoiceId).populate(
      "user",
      "name address",
      "User"
    );

    if (!invoiceDetail) {
      return res.status(404).json({
        message: "Order related to this orderId not found",
        success: false,
      });
    }

    res.status(200).json({ invoiceDetail });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
