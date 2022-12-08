import React from "react";
import styled, { css } from "styled-components";
import LamaTube from "../img/logo.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { useSelector } from "react-redux";
import { StyledLink, Navbar } from "./styled";
import { NavLink } from "react-router-dom";
const Hr = styled.hr`
  margin: 15px 0px;
  border: 1px solid ${({ theme }) => theme.palette.soft};
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ drawerMode = false }) => {
  const { currentUser, setDarkMode, darkMode } = useSelector(
    state => state.user
  );
  const { openDrawer } = useSelector(state => state.config);

  return (
    <Navbar $drawerMode={drawerMode} $fullWidth={openDrawer}>
      {[
        {
          to: "/",
          activeIcon: HomeIcon,
          icon: HomeOutlinedIcon,
          label: "Home"
        },
        {
          to: "/explore",
          activeIcon: ExploreIcon,
          icon: ExploreOutlinedIcon,
          label: "Explore"
        },
        {
          to: "/subscriptions",
          activeIcon: SubscriptionsIcon,
          icon: SubscriptionsOutlinedIcon,
          label: "Subscriptions"
        },
        {
          to: "/library",
          label: " Library",
          icon: VideoLibraryOutlinedIcon,
          activeIcon: VideoLibraryIcon
        }
      ].map(a => (
        <StyledLink key={a.label} to={a.to}>
          {({ isActive }) => (
            <li>
              {isActive ? <a.activeIcon /> : <a.icon />}
              {a.label}
            </li>
          )}
        </StyledLink>
      ))}

      <div className="sub-links">
        <Hr />
        {!currentUser && (
          <>
            <Login>
              Sign in to like videos, comment, and subscribe.
              <StyledLink to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </StyledLink>
            </Login>
            <Hr />
          </>
        )}
        <Title>BEST OF LAMATUBE</Title>
        <li>
          <LibraryMusicOutlinedIcon />
          Music
        </li>
        <li>
          <SportsBasketballOutlinedIcon />
          Sports
        </li>
        <li>
          <SportsEsportsOutlinedIcon />
          Gaming
        </li>
        <li>
          <MovieOutlinedIcon />
          Movies
        </li>
        <li>
          <ArticleOutlinedIcon />
          News
        </li>
        <li>
          <LiveTvOutlinedIcon />
          Live
        </li>
        <Hr />
        <li>
          <SettingsOutlinedIcon />
          Settings
        </li>
        <li>
          <FlagOutlinedIcon />
          Report
        </li>
        <li>
          <HelpOutlineOutlinedIcon />
          Help
        </li>
        <li onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </li>
        <li onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </li>
        <li onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </li>
        <li onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </li>
        <li onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </li>
        <li onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </li>
        <li onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </li>
      </div>
    </Navbar>
  );
};

export default Menu;
