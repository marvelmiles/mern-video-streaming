import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: undefined,
  loading: true,
  error: false
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: state => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: state => {
      state.loading = false;
      state.error = true;
    },
    updateLikeState: state => {
      if (state.currentVideo.isLikedBy) state.currentVideo.likes -= 1;
      else {
        state.currentVideo.likes += 1;
        state.currentVideo.disLikes && (state.currentVideo.disLikes -= 1);
      }
      state.currentVideo.isLikedBy = !state.currentVideo.isLikedBy;
    },
    updateDisLikeState: state => {
      if (state.currentVideo.isDisLikedBy) state.currentVideo.disLikes -= 1;
      else {
        state.currentVideo.disLikes += 1;
        state.currentVideo.likes && (state.currentVideo.likes -= 1);
      }
      state.currentVideo.isDisLikedBy = !state.currentVideo.isDisLikedBy;
    }
  }
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  updateLikeState,
  updateDisLikeState
} = videoSlice.actions;

export default videoSlice.reducer;
