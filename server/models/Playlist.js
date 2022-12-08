import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    desc: String,
    visibility: {
      type: String,
      default: "draft"
    },
    restriction: {
      type: String,
      default: "not for kids"
    },
    channel: {
      type: String,
      ref: "channels"
    },
    videos: [
      {
        type: String,
        ref: "videos",
        default: []
      }
    ],
    isTagged: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
);

export default mongoose.model("playlists", schema);
