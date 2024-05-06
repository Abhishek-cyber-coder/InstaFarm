const express = require("express");
const router = express.Router();
const Credits = require("../models/credit");

const verifyAuth = require("../middlewares/authMiddleware");

router.get("/", verifyAuth, async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const userCredits = await Credits.findOne({ user: userId });

    if (!userCredits) {
      userCredits = await Credits.create({ user: userId, credits: 0 });
    }

    res.status(200).json({ credits: userCredits.credits });
  } catch (error) {
    next(error);
  }
});

router.patch("/", verifyAuth, async (req, res, next) => {
  try {
    const { userId, amountOfCredits } = req.body;
    let credits = await Credits.findOne({ user: userId });

    if (!credits) {
      credits = new Credits({ user: userId, credits: amountOfCredits });
    } else {
      credits.credits += amountOfCredits;
    }

    await credits.save();

    res.json({ message: "Credits updated successfully", credits });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
