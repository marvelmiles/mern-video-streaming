import { createError } from "../utils/error.js";
import Channel from "../models/Channel.js";
import { searchQueryNormalizer } from "../utils/api.js";
import Playlist from "../models/Playlist.js";
import Video from "../models/Video.js";
import { verifyToken } from "./auth.js";
import Comment from "../models/Comment.js";
export const update = async (req, res, next) => {
  if (req.params.id === req.channel.id) {
    try {
      const updatedChannel = await Channel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        { new: true }
      );
      res.status(200).json(updatedChannel);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

export const deleteChannel = async (req, res, next) => {
  if (req.params.id === req.channel.id) {
    try {
      await Channel.findByIdAndDelete(req.params.id);
      res.status(200).json("Channel has been deleted.");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};

export const getChannel = async (req, res, next) => {
  try {
    const channel = await Channel.findById(req.params.id);
    res.status(200).json(channel);
  } catch (err) {
    next(err);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    if (req.channel.id !== req.params.id) {
      await Channel.findByIdAndUpdate(req.channel.id, {
        $addToSet: { subscriptions: req.params.id }
      });
      await Channel.findByIdAndUpdate(req.params.id, {
        $addToSet: { subscribers: req.channel.id }
      });
    } else return next(createError(400, "You can't subscribe to your channel"));
    res.status(200).json("Subscribe successfull.");
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    try {
      await Channel.findByIdAndUpdate(req.channel.id, {
        $pull: { subscriptions: req.params.id }
      });
      await Channel.findByIdAndUpdate(req.params.id, {
        $pull: { subscribers: req.channel.id }
      });
      res.status(200).json("Unsubscribe successfull.");
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export const getPlaylists = async (req, res, next) => {
  try {
    console.log("getting playlist... ");
    req.query.playlists_select = searchQueryNormalizer(
      req.query.playlists_select,
      "playlists_select"
    );
    return res.json(
      await Playlist.find({
        channel: req.channel.id
      }).select(req.query.playlists_select)
    );
  } catch (err) {
    next(err);
  }
};

export const addToPlaylist = async (req, res, next) => {
  try {
    if (req.body.videos) {
      for (const _id of req.body.playlists) {
        await Playlist.update(
          {
            _id,
            channel: req.channel.id
          },
          {
            $addToSet: {
              videos: req.body.videos
            }
          }
        );
      }
    }
    // playlist by other channels
    else if (req.body.playlists) {
      await Channel.update(
        {
          _id: req.channel.id
        },
        {
          $addToSet: {
            libs: req.body.playlists
          }
        }
      );
    }
    res.json("Video saved successfully");
  } catch (err) {
    next(err);
  }
};

export const getLibrary = async (req, res, next) => {
  try {
    res.json({
      playlists: (await Playlist.find({
        channel: req.channel.id,
        isTagged: true
      })
        .select(req.query.playlists_select)
        .populate("channel", req.query.channel_select)).concat(
        (await Channel.findById(req.channel.id).populate([
          {
            path: "libs",
            select: req.query.playlists_select
          }
        ])).libs
      ),
      likedVideos: []
    });
  } catch (err) {
    next(err);
  }
};

export const getVideos = async (req, res, next) => {
  try {
    const query = {
      channel: req.query.channelId
    };
    if (req.cookies?.access_token) {
      const err = await verifyToken(req, { _noNext: true });
      if (err?.message) return next(err);
    } else query.visibility = "public";
    res.json(await Video.find(query).select(req.query.select));
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const c = await Comment.find({
      channel: req.params.id
    });
    res.json(c);
  } catch (err) {
    next(err);
  }
};

export const channelExist = async (req, res, next) => {
  try {
    return res.json(!!(await Channel.findOne(req.body)));
  } catch (err) {
    next(err);
  }
};
