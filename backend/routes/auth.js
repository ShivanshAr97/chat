import {
  login,
  register,
  getAllUsers,
  getAllUserData,
  setAvatar,
  logOut,
} from "../controllers/userController.js";

import express from "express"

const router = express.Router()

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.get("/alluserdata/:id", getAllUserData);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

export default router;
