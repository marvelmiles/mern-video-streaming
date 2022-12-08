import Playlist from "../models/Playlist.js";
import { verifyToken } from "./auth.js";

export const createPlaylist = async (req, res, next) => {
  try {
    req.body.channel = req.channel.id;
    req.body.isTagged = req.query.tagPlaylist === "true";
    const playlist = await new Playlist(req.body).save();
    res.json(playlist);
  } catch (err) {
    next(err);
  }
};

export const getPlaylist = async (req, res, next) => {
  try {
    verifyToken(req, {
      _noNext: true
    });
    const query = {
      _id: req.params.id
    };
    if (!req.channel) query.visibility = "public";

    const t = await Playlist.findOne(query)
      .populate("videos")
      .populate("channel");

    res.json(t);
  } catch (err) {
    next(err);
  }
};
