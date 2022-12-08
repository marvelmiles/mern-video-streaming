import { useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Search from "./pages/Search";
import { useSelector } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./page.css";
import SignIn from "./pages/SignIn";
import { GloabalCSS } from "./components/styled";
import SignUp from "./pages/SignUp";
import Library from "./pages/Library";
import Content from "./pages/Dasboard/Content";
import { createTheme } from "@mui/material";
import Details from "./pages/Dasboard/Details";
import Playlists from "./pages/Dasboard/Playlists";
import PlaylistProfile from "./pages/Dasboard/Playlists/PlaylistProfile";
import VideoPlayer from "./components/VideoPlayer";
import { StyledEngineProvider } from "@mui/material/styles";
import Comments from "./pages/Dasboard/Comments";
import Channel from "./pages/Channel";

// ssss

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  position: relative;
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
  border: 1px solid green;
  min-height: 100vh;
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {
  const { mode } = useSelector(state => state.config);
  const location = useLocation();
  const darkMode = mode === "dark";
  const dark = {
    main: "#0F0F0F",
    light: "#282828",
    dark: "#000",
    hover: "#333",
    contrastText: "#fff"
  };

  const light = {
    main: "#fff",
    light: "#f1f1f1",
    dark: "#ccc", //"#e0e0e0",
    hover: "#e0e0e0",
    contrastText: dark.dark
  };

  const theme = createTheme({
    shadows: [
      "-2px 4px 8px 1px rgba(201, 201, 201, 0.47)",
      "0px 2px 4px -1px rgba(201, 201, 201, 0.47),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
    ],
    breakpoints: {
      values: {
        xs: "0px",
        sm: "576px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        s280: "280px"
      }
    },
    components: {
      MuiPopover: {
        styleOverrides: {
          root: {
            maxWidth: "300px"
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme: { shadows } }) => ({
            boxShadow: shadows[0],
            width: "100%"
          })
        }
      },
      MuiSnackbar: {
        styleOverrides: {
          root: {
            maxWidth: 400,
            bottom: 30,
            left: 15
          }
        }
      },
      MuiDialog: {
        styleOverrides: {
          paper: ({
            theme: {
              breakpoints: {
                values: { xs, s280 }
              }
            }
          }) => {
            return {
              borderRadius: "16px",
              backgroundImage: "none",
              [`@media (min-width:${xs})`]: {
                margin: 0
              },
              [`@media (min-width:${s280})`]: {
                margin: "32px"
              }
            };
          }
        }
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: ({
            theme: {
              palette: { divider }
            }
          }) => ({
            borderBottom: "1px solid red",
            borderBottomColor: divider,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "10px"
          })
        }
      }
    },
    palette: {
      mode,
      common: {
        black: dark.main,
        white: light.main,
        darkBlack: dark.dark
      },
      primary: darkMode ? dark : light,
      secondary: darkMode ? light : dark,
      // "#606060"
      divider: darkMode ? dark.light : "rgba(0,0,0,.12)",
      background: {
        paper: darkMode ? dark.light : light.main,
        mainBlue: "#33539c",
        lightBlue: "#a5d2f4",
        darkBlue: "#002984"
      },
      text: darkMode
        ? {
            primary: light.main,
            secondary: light.dark,
            caption: "#aaa"
          }
        : {
            primary: dark.main,
            secondary: dark.dark,
            caption: "#606060"
          }
    }
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GloabalCSS />
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            classNames="fade"
            timeout={300}
          >
            <Routes location={location}>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="@:channelName/*" element={<Channel />} />
                <Route path="/playground" element={<VideoPlayer />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="playlists">
                  <Route
                    path=":id"
                    element={<PlaylistProfile editorMode={false} />}
                  />
                </Route>
                <Route path="feed">
                  <Route path="library" element={<Library />} />
                </Route>
                <Route path="videos">
                  <Route path=":videoId" element={<Video />} />
                </Route>
                <Route path="dashboard">
                  <Route path="content" element={<Content />} />
                  <Route path="comments" element={<Comments />} />
                  <Route path="details/:videoId" element={<Details />} />
                  <Route path="playlists">
                    <Route index element={<Playlists />} />
                    <Route path=":id" element={<PlaylistProfile />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </CSSTransition>
        </TransitionGroup>
        {/* <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route
                    path="signin"
                    element={
                      currentUser ? <Home /> : <SignUpOrIn key="signin" />
                    }
                  />
                  <Route
                    path="signup"
                    element={<SignUpOrIn key="signup" hideLogin />}
                  />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        */}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
