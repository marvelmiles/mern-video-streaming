import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    channel: {
      type: String,
      required: true,
      ref: "channels"
    },
    title: String,
    desc: String,
    imgUrl: {
      type: String,
      default: ""
    },
    videoUrl: {
      type: String,
      required: true
    },
    views: {
      type: Number,
      default: 0
    },
    tags: {
      type: [String],
      default: []
    },
    likes: {
      type: [String],
      default: []
    },
    dislikes: {
      type: [String],
      default: []
    },
    visibility: {
      type: String,
      default: "draft"
    },
    restriction: String
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        console.log("ddd");
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        console.log("vidoee...");
        doc.isSelected("likes") && (ret.likes = ret.likes.length);
        doc.isSelected("dislikes") && (ret.disLikes = ret.dislikes.length);
        doc.isSelected("noDisLikedBy") && delete ret.dislikes;
        doc.isSelected("noLikedBy") && delete ret.likes;
        return ret;
      }
    }
  }
);

// schema
//   .virtual("isLikedBy")
//   .set(function(v) {
//     this._isLikedBy = v;
//   })
//   .get(function() {
//     return this._isLikedBy;
//   });
// schema
//   .virtual("isDisLikedBy")
//   .set(function(v) {
//     this._isDisLikedBy = v;
//   })
//   .get(function() {
//     return this._isDisLikedBy;
//   });

export default mongoose.model("videos", schema);
