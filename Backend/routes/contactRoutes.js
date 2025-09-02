const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const INPUT_LENGTH = {
  name: {
    minValue: 2,
    maxValue: 50,
  },
  email: {
    minValue: 5,
    maxValue: 100,
  },
  message: {
    minValue: 2,
    maxValue: 200,
  },
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    if (
      !name ||
      name.length < INPUT_LENGTH.name.minValue ||
      name.length > INPUT_LENGTH.name.maxValue
    ) {
      return res.status(400).json({
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

    const newContact = new Contact({
      name,
      email,
      message,
    });
    await newContact.save();

    const mailOptions = {
      from: email, 
      to: process.env.EMAIL_USER, 
      subject: `New Contact Form Submission from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong> ${message}</p>`,
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");

    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Received!",
      html: `<p>Hello ${name},</p>
                   <p>Thank you for contacting us! We have received your message and will get back to you shortly.</p>
                   <p>Best regards,<br/>The KSTVETCU Team</p>`,
    };
    await transporter.sendMail(userMailOptions);
    console.log("Confirmation email sent to user successfully!");

    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error(`failed to send message: ${err}`);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
});
module.exports = router;
