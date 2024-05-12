const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatID } = req.body
    if (!content || !chatID) {
        console.log("Enter ID or Content");
        return res.status(400)
    }
    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatID
    }
    try {
        var message = await Message.create(newMessage)
        message = await message.populate("sender content")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path: "chat.users",
            select: "picture name email"
        })
        await Chat.findByIdAndUpdate(req.body.chatID, {
            latestMess: message
        })
        res.json(message)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const allMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatID }).populate("sender", "name picture email").populate("chat")
        res.json(messages)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = { sendMessage, allMessages }