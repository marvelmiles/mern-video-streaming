import express from "express";
import { verifyToken } from "../controllers/auth.js";
import { createPlaylist, getPlaylist } from "../controllers/playlist.js";

const router = express.Router();

router.post("/", verifyToken, createPlaylist).get("/:id", getPlaylist);

export default router;
