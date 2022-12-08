import express from "express";
import { signin, signup, channelExist } from "../controllers/auth.js";

const router = express.Router();

//CREATE A USER
router.post("/signup", signup);

//SIGN IN
router.post("/signin", signin);

router.post("/channel-exist", channelExist);

export default router;
