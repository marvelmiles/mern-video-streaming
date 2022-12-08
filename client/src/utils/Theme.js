// export const darkTheme = {
//   bg: "#181818",
//   bgLighter: "#202020",
//   text: "white",
//   textSoft: "#aaaaaa",
//   soft: "#373737"
// };
// export const lightTheme = {
//   bg: "#f9f9f9",
//   bgLighter: "white",
//   text: "black",
//   textSoft: "#606060",
//   soft: "#f5f5f5"
// };

// import { createSlice } from "@reduxjs/toolkit";

// const breakpoints = {
//   xs: "0px",
//   sm: "576px",
//   md: "768px",
//   lg: "1200px",
//   xl: "1500px",
//   s360: "360px"
// };

// export const darkTheme = {
//   bg: "#181818",
//   bgLighter: "#202020",
//   text: "white",
//   textSoft: "#aaaaaa",
//   soft: "#373737"
// };
// export const lightTheme = {
//   bg: "#f9f9f9",
//   bgLighter: "white",
//   text: "black",
//   textSoft: "#606060",
//   soft: "#f5f5f5"
// };

// const _initialState = true
//   ? {
//     palette: {
//       bg: "#181818",
//       bgSoft: "#202020",
//       bgDark: "#111",
//       text: "#fff",
//       textSoft: "#606060",
//       // textSoft: "#aaaaaa",
//       // soft: "#808080"
//       soft: "#373737",
//       gray: "#999",
//       disabled: "#373737"
//     },
//     mobile: "768px",
// shadows: [
//   "-2px 4px 8px 1px rgba(201, 201, 201, 0.47)",
//   "0px 2px 4px -1px rgba(201, 201, 201, 0.47),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
// ],
//     breakpoints,
//     darkMode: true
//   }
//   : {
//     palette: {
//       // bg: "#000",
//       bgSoft: "white",
//       // bgDark: "#171717",
//       text: "black",
//       textSoft: "#606060",
//       soft: "rgba(0,0,0,0.12)",
//       gray: "#999",
//       disabled: "#373737"
//     },
//     mobile: "768px",
//     shadows: [
//       "-2px 4px 8px 1px rgba(201, 201, 201, 0.47)",
//       "0px 2px 4px -1px rgba(201, 201, 201, 0.47),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
//     ],
//     breakpoints,
//     darkMode: false
//   };

// const themeSlice = createSlice({
//   name: "theme",
//   initialState,
//   reducers: {
//     setDarkTheme(state) {
//       state.colors.header = "#324B50";
//       state.colors.body = "#445155";
//       state.darkmode = true;
//     },
//     setDefaultTheme(state) {
//       state = initialState;
//     }
//   }
// });

// export const { setDarkTheme, setDefaultTheme } = themeSlice.actions;

// export default themeSlice.reducer;
