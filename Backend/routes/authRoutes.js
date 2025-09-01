const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require('bcryptjs');



router.post("/login", async (req, res, next) => {
  try {
    
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    
    if (!isMatched) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    

    res.json({
      token,
      role: user.role,
      user: { _id: user._id, username: user.username, role: user.role },
      expiresIn: 3600,
    });
  } catch (err) {
    next(err); 
  }
});


module.exports = router;
