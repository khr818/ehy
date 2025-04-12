const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Send message
router.post("/", async (req, res) => {
  const { sender, receiver, content } = req.body;
  const message = new Message({ sender, receiver, content });
  await message.save();
  res.json(message);
});

// Get messages between two users
router.get("/:sender/:receiver", async (req, res) => {
  const { sender, receiver } = req.params;
  const messages = await Message.find({
    $or: [
      { sender, receiver },
      { sender: receiver, receiver: sender }
    ]
  }).sort({ timestamp: 1 });
  res.json(messages);
});

// ✅ Don't forget this!
module.exports = router;
