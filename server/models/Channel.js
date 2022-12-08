import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    alias: String,
    desc: String,
    links: Object,
    email: {
      type: String,
      required: true
    },
    password: {
      type: String
    },
    imgUrl: String,
    subscribers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "channels",
        default: []
      }
    ],
    subscriptions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "channels",
        default: []
      }
    ],
    playlists: [
      {
        type: mongoose.Types.ObjectId,
        ref: "playlists",
        default: []
      }
    ],
    provider: {
      type: String,
      default: ""
    },
    libs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "playlists"
      }
    ]
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(_, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

// schema.virtual("subscribersCount").get(function() {
//   if (this.subscribers) return this.subscribers.length;
//   return 0;
// });

export default mongoose.model("channels", schema);
