const express = require("express")
const { protect } = require("../middlewares/authMiddleware")
const { accessChat, fetchChat, createGroupChat, renameChat, addChat, removeChat } = require("../controllers/chatController")

const router = express.Router()

router.post("/", protect, accessChat)
router.get("/", protect, fetchChat)
router.post("/creategroup", protect, createGroupChat)
router.put("/rename", protect, renameChat)
router.put("/add", protect, addChat)
router.put("/remove", protect, removeChat)

module.exports = router