import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
  likeComment,
  disLikeComment,
  undoLikeComment,
  undoDisLikeComment
} from "../controllers/comment.js";
import { verifyToken } from "../controllers/auth.js";

const router = express.Router();

router
  .post("/", verifyToken, addComment)
  .get("/", getComments)
  .put("/:id", verifyToken, updateComment)
  .delete("/:id", verifyToken, deleteComment)
  .put("/:id/like", verifyToken, likeComment)
  .put("/:id/undo-like", verifyToken, undoLikeComment)
  .put("/:id/dislike", verifyToken, disLikeComment)
  .put("/:id/undo-dislike", verifyToken, undoDisLikeComment);
export default router;
