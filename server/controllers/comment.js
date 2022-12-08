import { createError } from "../utils/error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import { searchQueryNormalizer, addFieldToDocs } from "../utils/api.js";
import Channel from "../models/Channel.js";

export const addComment = async (req, res, next) => {
  try {
    req.query.channel_select = searchQueryNormalizer(
      req.query.channel_select,
      "channel_select"
    );
    if (req.query.channel_select.message) return next(req.query.channel_select);
    req.body.from = req.channel.id;
    if (req.body.commentId) {
      req.body.rootComments = (await Comment.findById(
        req.body.commentId
      )).rootComments.concat(req.body.commentId);
    }
    const comment = await new Comment(req.body).save();
    await comment.populate({
      path: "from",
      select: req.query.channel_select
    });
    res.json(comment);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (req.channel.id === comment.from.toString()) {
      await Comment.deleteMany({
        $or: [{ rootComments: req.params.id }, { _id: req.params.id }]
      });
      res.status(200).json("The comment has been deleted.");
    } else {
      return next(createError(403, "You can delete only your comment!"));
    }
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    await Comment.updateOne(
      {
        _id: req.params.id
      },
      {
        text: req.body.text,
        edited: true
      },
      {
        new: true
      }
    );
    return res.json("Comment updated successfully");
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    if (!(req.query.channelId || req.query.videoId))
      return next(createError("Expect a search param of channelId or videoId"));
    req.query.channel_select = searchQueryNormalizer(
      req.query.channel_select,
      "channel_select"
    );
    req.query.comment_select = searchQueryNormalizer(
      req.query.comment_select,
      "comment_select"
    );
    if (req.query.channel_select.message) return next(req.query.channel_select);
    if (req.query.comment_select.message) return next(req.query.comment_select);

    const query = {
      $where: `var id = this.rootComments.pop(); return id === ${
        req.query.commentId ? `"${req.query.commentId}"` : undefined
      }`
    };
    if (req.query.videoId) query.video = req.query.videoId;
    if (req.query.channelId) query.channel = req.query.channelId;
    let comments = await Comment.find(query)
      .select(req.query.comment_select)
      .populate(
        !req.query.comment_select ||
          req.query.comment_select.indexOf("from") >= 0
          ? {
              path: "from",
              select: req.query.channel_select
            }
          : ""
      );
    res.status(200).json(await addFieldToDocs(comments, req, "comment_select"));
  } catch (err) {
    next(err);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    await Comment.findByIdAndUpdate(req.params.id, {
      $addToSet: {
        likedBy: req.channel.id
      },
      $pull: {
        disLikedBy: req.channel.id
      }
    });
    return res.json("Liked comment!");
  } catch (err) {
    next(err);
  }
};

export const undoLikeComment = async (req, res, next) => {
  try {
    await Comment.findByIdAndUpdate(req.params.id, {
      $pull: {
        likedBy: req.channel.id
      }
    });
    return res.json("Undo liked comment!");
  } catch (err) {
    next(err);
  }
};

export const disLikeComment = async (req, res, next) => {
  try {
    await Comment.findByIdAndUpdate(req.params.id, {
      $addToSet: {
        disLikedBy: req.channel.id
      },
      $pull: {
        likedBy: req.channel.id
      }
    });
    res.json("Disliked comment!");
  } catch (err) {
    next(err);
  }
};

export const undoDisLikeComment = async (req, res, next) => {
  try {
    await Comment.findByIdAndUpdate(req.params.id, {
      $pull: {
        disLikedBy: req.channel.id
      }
    });
    res.json("Undo disliked comment!");
  } catch (err) {
    next(err);
  }
};
