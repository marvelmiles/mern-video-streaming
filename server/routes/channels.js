import express from "express";
import {
  update,
  deleteChannel,
  getChannel,
  subscribe,
  unsubscribe,
  getPlaylists,
  addToPlaylist,
  getLibrary,
  channelExist,
  getVideos,
  getComments
} from "../controllers/channel.js";
import { verifyToken } from "../controllers/auth.js";
const router = express.Router();

router
  .put("/subscribe/:id", verifyToken, subscribe)
  .put("/unsubscribe/:id", verifyToken, unsubscribe)
  .delete("/:id", verifyToken, deleteChannel)
  .get("/find/:id", getChannel)
  .get("/library", verifyToken, getLibrary)
  .get("/videos", getVideos)
.get("/:id/comments", getComments)
  .get("/playlists", verifyToken, getPlaylists)
  .put("/playlists", verifyToken, addToPlaylist)
  .get("/library", verifyToken, getLibrary)
  .put("/:id", verifyToken, update)
  .get("/channel-exist", channelExist);

export default router;
