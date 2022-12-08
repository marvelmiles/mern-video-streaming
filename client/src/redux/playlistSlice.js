import { createSlice } from "@reduxjs/toolkit";

export const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    loading: true,
    error: false,
    currentPlaylist: null
  },
  reducers: {
    fetchPlaylistFailure(state) {
      state.error = true;
      state.loading = false;
    },
    fetchPlaylistStart(state) {
      state.loading = true;
      state.error = false;
    },
    fetchPlaylistSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.currentPlaylist = action.payload;
    }
  }
});

export const {
  fetchPlaylistSuccess,
  fetchPlaylistFailure
} = playlistSlice.actions;

export default playlistSlice.reducer;
