const express = require("express")
const { registerUser, loginUser, allUser } = require("../controllers/userController")
const { protect } = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/",registerUser)
router.get("/",protect,allUser)
router.post("/login",loginUser)

module.exports= router