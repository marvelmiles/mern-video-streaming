import express from "express";
import {
  addVideo,
  addView,
  getByTag,
  getVideo,
  deleteVideo,
  updateVideo,
  random,
  search,
  sub,
  trend,
  likeVideo,
  disLikeVideo,
  undoLikeVideo,
  undoDisLikeVideo
} from "../controllers/video.js";
import { verifyToken } from "../controllers/auth.js";
import { uploadFile } from "../utils/fileHanadler.js";

const router = express.Router();

//create a video
router.post("/", verifyToken, uploadFile("video"), addVideo);
router
  .delete("/:id", verifyToken, deleteVideo)
  .put("/like/:id", verifyToken, likeVideo)
  .put("/undo-like/:id", verifyToken, undoLikeVideo)
  .put("/dislike/:id", verifyToken, disLikeVideo)
  .put("/undo-dislike/:id", verifyToken, undoDisLikeVideo)
  .put(
    "/:id",
    verifyToken,
    // uploadFile("image", "image", "images", 1),
    updateVideo
  );
router.put("/view/:id", addView);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub", verifyToken, sub);
router.get("/tags", getByTag);
router.get("/search", search);
router.get("/:id", getVideo);
export default router;
