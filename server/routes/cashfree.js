const express = require("express");
const router = express.Router();
const User = require("../models/user");

const axios = require("axios");
const verifyAuth = require("../middlewares/authMiddleware");

function generateRandomOrderId() {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return `ORD${timestamp}${random}`;
}

router.post("/payment", verifyAuth, async (req, res, next) => {
  const { userId, orderAmount } = req.body;
  try {
    const userDetail = await User.findById(userId);
    console.log("My User ID: ", userId);
    if (!userDetail) {
      return res.status(404).json({ error: "User not found" });
    }

    await axios
      .post(
        "https://sandbox.cashfree.com/pg/orders",
        {
          customer_details: {
            customer_id: userId,
            customer_email: userDetail.email,
            customer_phone: userDetail.mobile,
            customer_name: userDetail.name,
          },
          order_meta: {
            return_url: "http://localhost:3000/",
            notify_url:
              "https://webhook.site/1d1ec64c-9240-455d-9778-98079baa4d48",
            payment_methods: "cc,dc,upi",
          },
          order_id: generateRandomOrderId(),
          order_amount: orderAmount,
          order_currency: "INR",
          order_note: "Test order",
        },
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-api-version": "2023-08-01",
            "x-client-id": process.env.CASHFREE_CLIENT_ID,
            "x-client-secret": process.env.CASHFREE_SECRET_ID,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        return res.status(200).json(response.data.payment_session_id);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the order." });
  }
});

module.exports = router;
