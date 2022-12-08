import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/channels.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import playlistRoutes from "./routes/playlists.js";
import restRoutes from "./routes/rest.js";

import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config();
const connect = () => {
  mongoose
    .connect(
      "mongodb://localhost:27017/mern-streaming-app" || process.env.MONGO_URI
    )
    .then(() => {
      console.log("Connected to DB ");
    })
    .catch(err => {
      console.log("[Error MONGO_ATLAS_CONNECT] ", err.message);
    });
};

//middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/channels", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api", restRoutes);
//error handler
app.use((err, req, res, next) => {
  console.log("err checker.. ", err.name, err.message);
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to Server 8800");
});
