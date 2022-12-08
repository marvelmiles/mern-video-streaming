import multer from "multer";
import FirebaseStorage from "multer-firebase-storage";
import { FIREBASE_BUCKET_NAME } from "./config.js";
import path from "path";
import firebase, { serviceAccount } from "../firebase/index.js";

export const deleteFile = async filePath => {
  return await firebase
    .storage()
    .bucket(FIREBASE_BUCKET_NAME)
    .file(decodeURIComponent("images/pexels-daniel-xavier-1239291.jpg"))
    .delete();
};

export const uploadFile = (type, directoryPath = "videos") => {
  return (req, res, next) => {
    return multer({
      storage: FirebaseStorage({
        directoryPath,
        bucketName: FIREBASE_BUCKET_NAME,
        credentials: firebase.credential.cert(serviceAccount),
        unique: true,
        public: true
      }),

      fileFilter: (_, file, cb) => {
        cb(null, file.mimetype.indexOf(type) >= 0);
      }
    }).array(
      req.query.fieldName || "videos",
      Number(req.query.maxUpload) || 20
    )(req, res, next);
  };
};
