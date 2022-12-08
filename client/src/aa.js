import { useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
// import Menu from "./components/Menu";
// import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import Home from "./pages/Home";
// import Video from "./pages/Video";
// import Search from "./pages/Search";
import { useSelector } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./page.css";
// import SignIn from "./pages/SignIn";
import { GloabalCSS } from "./components/styled";
// import SignUp from "./pages/SignUp";
// import Library from "./pages/Library";
import Content from "./pages/Dasboard/Content";
// import Details from "./pages/Dasboard/Details";
// import Playlists from "./pages/Dasboard/Playlists";
// import PlaylistProfile from "./pages/Dasboard/Playlists/PlaylistProfile";
// import VideoPlayer from "./components/VideoPlayer";
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
  const theme = useSelector(state => state.theme);
  const location = useLocation();
  return (
    <ThemeProvider theme={theme}>
      <GloabalCSS />
      <TransitionGroup>
        <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
          <Routes location={location}>
            <Route path="/">
              {/* <Route index element={<Home />} />
              <Route path="/playground" element={<VideoPlayer />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="feed">
                <Route path="library" element={<Library />} />
              </Route>
              <Route path="videos">
                <Route path=":videoId" element={<Video />} />
              </Route> */}
              <Route path="dashboard">
                <Route path="content" element={<Content />} />
                {/* <Route path="details/:videoId" element={<Details />} />
                <Route path="playlists">
                  <Route index element={<Playlists />} />
                  <Route path=":id" element={<PlaylistProfile />} />
                </Route> */}
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
  );
}

export default App;
