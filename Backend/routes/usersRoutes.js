const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { sendBulkSms } = require("../atService");

router.get("/users", async (req, res) => {
  try {
  
    const totalCount = await User.countDocuments();

   
    res.set("Content-Range", `users 0-${totalCount - 1}/${totalCount}`);

    const users = await User.find();

    
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const formatPhoneNumber = (number) => {

  if (!number) return null;
  const cleanNumber = number.toString().replace(/[^0-9]/g, "");
  if (cleanNumber.startsWith("0")) {
    return "+254" + cleanNumber.substring(1);
  }
  if (cleanNumber.length === 9) {
    return "+254" + cleanNumber;
  }
  if (cleanNumber.startsWith("+")) {
    return cleanNumber;
  }
  return null; 
};

router.post("/users/send-sms", async (req, res) => {
  try {
    const { userIds, message } = req.body;

   
    const users = await User.find({
      _id: { $in: userIds },
    }).select("phone");

    const phoneNumbers = users
      .map((user) => formatPhoneNumber(user.phone))
      .filter(Boolean); 

    if (phoneNumbers.length === 0) {
      return res
        .status(400)
        .json({
          message: "No valid phone numbers found for the selected users.",
        });
    }
    const smsResults = await sendBulkSms(phoneNumbers, message);

    res.status(200).json({ success: true, results: smsResults });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to send bulk SMS.", error: err.message });
  }
});

module.exports = router;
