import express from "express";
import { sendEmail } from "../utils/email.util.js";

const router = express.Router();

router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    await sendEmail({
      email: process.env.FROM_EMAIL, // Send to your support email
      subject: `Contact Form: ${subject}`,
      message: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b><br/>${message}</p>`
    });
    return res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send message." });
  }
});

export default router;
