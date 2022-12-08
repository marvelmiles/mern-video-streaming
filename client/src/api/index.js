import axios from "./axios";
export const addComment = async body => {
  try {
    console.log("adding comment..");
    return (await axios.post("/comments", body, {
      withCredentials: true
    })).data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getPlaylists = async (playlist_select, video_select) => {
  try {
    return (await axios.get(
      `/channels/playlists?playlist_select=${playlist_select}&video_select=${video_select}`,
      {
        withCredentials: true
      }
    )).data;
  } catch (err) {
    console.log(err.message);
  }
};
