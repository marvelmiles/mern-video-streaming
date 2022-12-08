import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: localStorage.getItem("channel")
    ? JSON.parse(localStorage.getItem("channel"))
    : {},
  loading: true,
  error: false,
  openDrawer: undefined
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: state => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      console.log(action);
      localStorage.setItem("channel", JSON.stringify(action.payload));
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: state => {
      state.loading = false;
      state.error = true;
    },
    logout: state => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    subscription: (state, action) => {
      if (action.payload.hasSub) {
        state.currentUser.subscriptions.splice(
          state.currentUser.subscriptions.findIndex(
            channelId => channelId === action.payload.channelId
          ),
          1
        );
      } else {
        state.currentUser.subscriptions.push(action.payload.channelId);
      }
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  subscription,
  toggleDrawer
} = userSlice.actions;

export default userSlice.reducer;
