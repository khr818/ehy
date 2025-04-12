const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
    const { sender, receiver, content } = req.body;
    const message = new Message({ sender, receiver, content });
    await message.save();
    res.json(message);
};

exports.getMessages = async (req, res) => {
    const { sender, receiver } = req.params;
    const messages = await Message.find({
        $or: [
            { sender, receiver },
            { sender: receiver, receiver: sender }
        ]
    }).sort({ timestamp: 1 });
    res.json(messages);
};
