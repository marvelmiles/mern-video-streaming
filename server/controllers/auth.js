import Channel from "../models/Channel.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { searchQueryNormalizer } from "../utils/api.js";

export const signup = async (req, res, next) => {
  try {
    if (
      await Channel.findOne({
        name: req.body.name
      })
    )
      return next(createError(403, "A channel with this name exist"));
    let provider = req.query.provider;
    switch (provider) {
      case "google":
        req.body.provider = provider;
        break;
      default:
        req.body.password = bcrypt.hashSync(
          req.body.password,
          bcrypt.genSaltSync(10)
        );
        break;
    }
    await new Channel(req.body).save();
    return res.json("Channel has been created!");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    console.log("signing....");
    req.query.channel_select = searchQueryNormalizer(
      req.query.channel_select,
      "channel_select"
    );
    let channel;
    if (!req.body.provider) {
      channel = await Channel.findOne({
        $or: [
          { name: req.body.placeholder },
          {
            email: req.body.placeholder
          }
        ]
      }).select(req.query.channel_select + " password");
      if (!channel) return next(createError(404, "Channel not found!"));
    }
    switch (req.body.provider) {
      case "google":
        d;
        channel = await new Channel(req.body).save();
        break;
      default:
        if (!(await bcrypt.compare(req.body.password, channel.password)))
          return next(createError(400, "Wrong credentials!"));
        break;
    }
    const token = jwt.sign({ id: channel._id }, process.env.JWT_SECRET);
    return res
      .cookie("access_token", token, {
        httpOnly: true
      })
      .json(channel);
  } catch (err) {
    next(err);
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token)
    return res._noNext
      ? createError(401, "You are not authenticated!")
      : next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_SECRET, (err, channel) => {
    if (err)
      return res._noNext
        ? createError(403, "Token is not valid!")
        : next(createError(403, "Token is not valid!"));
    req.channel = channel;
    console.log("token is valiad");
    !res._noNext && next();
  });
};

export const channelExist = async (req, res, next) => {
  try {
    return res.json(!!(await Channel.findOne(req.body)));
  } catch (err) {
    next(err);
  }
};
