import { createError } from "./error.js";
import { verifyToken } from "../controllers/auth.js";

export const searchQueryNormalizer = (search, name) => {
  if (search) {
    if (!/^[a-zA-Z\d\s]+$/.test(search))
      return createError(
        400,
        `Invalid search query in ${name}: Expect a space separated alphanumeric characters only`
      );

    // search = /\bid\b/.test(search)
    //   ? search.replaceAll(/id/gim, "_id")
    //   : search + " -_id";
    search.indexOf("disLikedBy") === -1 && (search += " noDisLikedBy");
    search.indexOf("likedBy") === -1 && (search += " noLikedBy");
    search.indexOf("likes") >= 0 && (search += " likedBy");
    search.indexOf("dislikes") >= 0 && (search += " disLikedBy");
  }
  return search || "";
};

export const addFieldToDocs = async (docs, req, searchParam) => {
  const withLikes =
    !req.query[searchParam] || req.query[searchParam].indexOf("likes") >= 0;
  const withDisLikes =
    !req.query[searchParam] || req.query[searchParam].indexOf("dislikes") >= 0;
  if (withLikes || withDisLikes) {
    const isValid = !(await verifyToken(req, { _noNext: true }));
    docs = docs.map(doc => {
      if (!doc) return doc;
      withLikes &&
        (doc.isLikedBy = isValid && doc.likes.includes(req.channel.id));
      withDisLikes &&
        (doc.isDisLikedBy = isValid && doc.dislikes.includes(req.channel.id));
      return doc;
    });
  }
  return docs;
};

export const isAlphaNumeric = (search, name = "") => {
  if (/^[a-zA-Z\d\s=]+$/.test(search)) return true;
  throw createError(
    400,
    `Invalid search param${name &&
      " in " + name}: Expect a space separated alphanumeric characters only`
  );
};

export const createProjectPipeline = (search, name = "") => {
  isAlphaNumeric(search, name);
  let project = {};
  if (search) {
    search += " id";
    for (let select of search.split(" ")) {
      switch (select) {
        case "id":
          project.id = "$_id";
          project._id = 0;
          break;
        case "likes":
        case "likes=array":
          project.likes = 1;
          break;
        case "likes=size":
          project.likes = {
            $size: "$likes"
          };
          break;
        default:
          project[select] = 1;
          break;
      }
    }
    project = {
      $project: project
    };
  } else project.$addFields = {};
  return project;
};
