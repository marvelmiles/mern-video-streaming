import Channel from "../models/Channel.js";
import Video from "../models/Video.js";
import { createError } from "../utils/error.js";
import {
  searchQueryNormalizer,
  addFieldToDocs,
  createProjectPipeline,
  isAlphaNumeric
} from "../utils/api.js";
import { REGEX_ALPHA_NUMERIC } from "../utils/config.js";
import mongoose from "mongoose";
import path from "path";
import { deleteFile } from "../utils/fileHanadler.js";

export const addVideo = async (req, res, next) => {
  try {
    console.log("video........... ", req.files);
    const savedVideos = [];
    for (const file of req.files) {
      const newVideo = new Video({
        channel: req.channel.id,
        title:
          req.body.title ||
          file.originalname.slice(0, file.originalname.lastIndexOf(".")),
        videoUrl: file.publicUrl,
        desc: req.body.desc,
        imageUrl: req.body.imageUrl
      });
      savedVideos.push(await newVideo.save());
    }
    return res.json(savedVideos);
  } catch (err) {
    next(err);
  }
};
// tostring
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.channel.id === video.channel) {
      req.body.imgUrl = req.file?.publicUrl;
      res.json(
        await Video.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body
          },
          { new: true }
        )
      );
      await deleteFile(video.imgUrl).catch(err =>
        console.log(
          `[Error Deleting ${video.imgUrl}]: ${err.message} updated by ${
            req.channel.id
          } at ${new Date()}.`
        )
      );
      return;
    } else {
      return next(createError(403, "You can update only your video!"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.channel.id === video.channel) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("The video has been deleted.");
    } else {
      return next(createError(403, "You can delete only your video!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return next(createError("Invalid video id"));
    req.query.channel_select = searchQueryNormalizer(
      req.query.channel_select,
      "channel_select"
    );
    req.query.video_select = searchQueryNormalizer(
      req.query.video_select,
      "video_select"
    );

    if (req.query.channel_select.message) return next(req.query.channel_select);
    const video = await Video.findById(req.params.id)
      .populate(
        req.query.channel_select
          ? {
              path: "channel",
              select: req.query.channel_select
            }
          : ""
      )
      .select(req.query.video_select);
    res.json((await addFieldToDocs([video], req, "video_select"))[0]);
  } catch (err) {
    next(err);
  }
};

export const likeVideo = async (req, res, next) => {
  const id = req.channel.id;
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $addToSet: { likedBy: id },
      $pull: { disLikedBy: id }
    });
    res.status(200).json("The video has been liked.");
  } catch (err) {
    next(err);
  }
};

export const undoLikeVideo = async (req, res, next) => {
  const id = req.channel.id;
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $pull: { likedBy: id }
    });
    res.status(200).json("Video like has been undo.");
  } catch (err) {
    next(err);
  }
};

export const disLikeVideo = async (req, res, next) => {
  const id = req.channel.id;
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $addToSet: { disLikedBy: id },
      $pull: { likedBy: id }
    });
    res.status(200).json("The video has been disliked.");
  } catch (err) {
    next(err);
  }
};

export const undoDisLikeVideo = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $pull: { disLikedBy: req.channel.id }
    });
    res.status(200).json("Video dislikes has been undo.");
  } catch (err) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 }
    });
    res.status(200).json("The view has been increased.");
  } catch (err) {
    next(err);
  }
};

export const random = async (req, res, next) => {
  try {
    // Rm duplice: group by _id and project a new root of the first document
    // only which will verify no document is returned twice.
    let videos = await Video.aggregate([
      // {
      //   $match: {
      //     visibility: "public"
      //   }
      // },
      { $sample: { size: 40 } },
      {
        $group: {
          _id: "$_id",
          result: { $push: "$$ROOT" }
        }
      },
      {
        $replaceRoot: {
          newRoot: { $first: "$result" }
        }
      },
      createProjectPipeline(req.query.video_select, "video_select")
    ]);

    // isAlphaNumeric(req.query.channel_select, "channel_select");
    // await Video.populate(videos, {
    //   path: "channel",
    //   select: req.query.channel_select
    // });

    return res.json(videos);
  } catch (err) {
    next(err);
  }
};

export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const sub = async (req, res, next) => {
  try {
    const list = await Promise.all(
      (await Channel.findById(req.channel.id)).subscriptions.map(
        async channel => {
          return await Video.findOne({ channel });
        }
      )
    );
    res.status(200).json(list.sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({
      tags: { $in: tags },
      $where: `var id = this._id; return id != "${req.query.videoId}";`
    })
      .limit(20)
      .populate("channel");
    res.json(videos);
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" }
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
