const express = require("express");
const router = express.Router();
const User = require('../models/User');

const INPUT_LENGTH = {
  name: {
    minValue: 2,
    maxValue: 50
  },
  email: {
    minValue: 5,
    maxValue: 100
  },
  phone: {
    minValue: 10,
    maxValue: 10
  }
};



router.post("/registration", async (req, res) => {
  const { name, email, phone} = req.body;
  console.log(`New signup requested: ${email}.`);

  try {
    if (
      !name ||
      name.length < INPUT_LENGTH.name.minValue ||
      name.length > INPUT_LENGTH.name.maxValue
    ) {
      return res
        .status(400)
        .json({
          error: `Name must be between ${INPUT_LENGTH.name.minValue} and ${INPUT_LENGTH.name.maxValue} characters.`,
        });
    }

    if (
      !email ||
      !email.includes("@") ||
      email.length < INPUT_LENGTH.email.minValue ||
      email.length > INPUT_LENGTH.email.maxValue
    ) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    const phoneRegex = /^\d{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
      return res
        .status(400)
        .json({
          error: "Invalid phone number. Please enter a 10-digit number.",
        });
    }

    if (phone.length !== 10) {
      return res.status(400).json({ error: "Phone number must be 10 digits." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered." });
    }

     const user = new User({ 
      name,
      email,
      phone,
      role: 'user'
     });
    await user.save();
    

    console.log(`New signup: ${email}.`);

   return res.status(201).json({ message: 'Registration successful!', user });
  } catch (err) {
    console.error(`New signup failed: ${err}`);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
});
module.exports = router;