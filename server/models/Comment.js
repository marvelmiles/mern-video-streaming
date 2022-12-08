import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Types.ObjectId,
      ref: "channels",
      required: true
    },
    video: {
      type: String,
      ref: "videos",
      required: true
    },
    text: {
      type: String,
      required: true
    },
    edited: {
      type: Boolean,
      default: false
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "channels",
        default: []
      }
    ],
    dislikes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "channels",
        default: []
      }
    ],
    rootComments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comments",
        default: []
      }
    ]
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        ret.commentId = ret.rootComments.pop();
        // doc.isSelected("likes") && (ret.likes = ret.likedBy.length);
        // doc.isSelected("disLikes") && (ret.disLikes = ret.disLikedBy.length);
        // doc.isSelected("noDisLikedBy") && delete ret.disLikedBy;
        // doc.isSelected("noLikedBy") && delete ret.likedBy;
      }
    }
  }
);
schema
  .virtual("isLikedBy")
  .set(function(v) {
    this._isLikedBy = v;
  })
  .get(function() {
    return this._isLikedBy;
  });
schema
  .virtual("isDisLikedBy")
  .set(function(v) {
    this._isDisLikedBy = v;
  })
  .get(function() {
    return this._isDisLikedBy;
  });

export default mongoose.model("comments", schema);
