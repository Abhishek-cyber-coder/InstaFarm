const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res, next) => {
  try {
    const { name, mobile, email, address, password } = req.body;

    if (!name || !mobile || !email || !address || !password) {
      return res.status(400).json({
        message: "Bad Request!",
      });
    }

    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = new User({
      name,
      mobile,
      email,
      address,
      password: hashedPassword,
    });

    const userResponse = await userData.save();

    const token = jwt.sign(
      { userId: userResponse._id },
      process.env.JWT_SECRET_KEY
    );

    res.json({
      message: "User successfully registered",
      token: token,
      username: name,
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Bad Request!",
        success: false,
      });
    }

    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const isPasswordMatches = await bcrypt.compare(
      password,
      userDetails.password
    );

    if (!isPasswordMatches) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: userDetails._id },
      process.env.JWT_SECRET_KEY
    );

    res.json({
      message: "User loggedin successfully",
      token: token,
      username: userDetails.name,
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
