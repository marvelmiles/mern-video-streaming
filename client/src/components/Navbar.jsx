import React, { useState } from "react";
import styled, { useTheme, css } from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Upload from "./Upload";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Logo,
  Button,
  IconButton,
  Avatar,
  Input,
  Paper,
  Ul,
  Toolbox,
  Caption,
  Title,
  Stack
} from "./styled";
import LogoIcon from "../img/logo.png";
import { toggleDrawer } from "../redux/configSlice";
import {
  useMediaQuery,
  Drawer,
  Dialog,
  DialogContent,
  DialogTitle,
  Popper,
  ClickAwayListener,
  Tooltip,
  Popover
} from "@mui/material";
import Menu from "./Menu";
import MicIcon from "@mui/icons-material/Mic";
import { createStreamContent, Notice, VideoDesc } from "./Card";
import StudioSidebar from "./navbars/StudioSidebar";
import { PlaylistGroup } from "../pages/Dasboard/Playlists";

export const Appbar = styled.div`
  ${({
    theme: {
      palette: {
        primary: { main },
        text,
        divider
      },
      shadows,
      zIndex
    }
  }) => {
    return css`
      position: fixed;
      top: 0;
      left: 0;
      background-color: ${main};
      height: 64px;
      width: 100%;
      // box-shadow: ${shadows[0]};
      z-index: ${zIndex.appBar};
      // border-bottom: 1px solid ${divider};
      & .MuiSvgIcon-root:not(button > svg) {
        fill: ${text.secondary};
        &:hover {
          fill: ${text.primary};
        }
      }
      & > div > div:nth-child(1) {
        & > a {
          color: ${text.dark};
        }
      }
    `;
  }}
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid
    ${({
      theme: {
        palette: { soft }
      }
    }) => soft};
  border-radius: 24px;
  & > input {
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
    border: transparent;
    margin: 0;
  }
  & > button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border: transparent;
    background-color: ${({
      theme: {
        palette: { bgDark }
      }
    }) => bgDark};
  }
`;

// const Button = styled.button`
//   padding: 5px 15px;
//   background-color: transparent;
//   border: 1px solid #3ea6ff;
//   color: #3ea6ff;
//   border-radius: 3px;
//   font-weight: 500;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 5px;
// `;

const Navbar = () => {
  const navigate = useNavigate();
  const [popperEl, setPopperEl] = useState(null);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const isMd = useMediaQuery("(min-width:768px)");
  const [openDrawer, setOpenDrawer] = useState(false);
  const {
    palette: { bg }
  } = useTheme();
  return (
    <>
      <Appbar>
        <Toolbox>
          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <IconButton
              onClick={() =>
                isMd ? dispatch(toggleDrawer()) : setOpenDrawer(true)
              }
            >
              <MenuIcon />
            </IconButton>
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alingSelf: "center"
              }}
            >
              <Logo>
                <img src={LogoIcon} />
                MernTube
              </Logo>
            </Link>
          </div>

          <div>
            <Search>
              <Input
                style={{}}
                placeholder="Search"
                onChange={e => setQ(e.target.value)}
              />
              <IconButton onClick={() => navigate(`/search?q=${q}`)}>
                <SearchOutlinedIcon />
              </IconButton>
            </Search>
            <IconButton>
              <MicIcon />
            </IconButton>
          </div>
          <div>
            {currentUser ? (
              <>
                <ClickAwayListener onClickAway={() => setPopperEl(null)}>
                  <IconButton
                    onClick={({ currentTarget }) => setPopperEl(currentTarget)}
                  >
                    <VideoCallOutlinedIcon />
                  </IconButton>
                </ClickAwayListener>
                <Avatar variant="sm" src={currentUser.img} />
              </>
            ) : (
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            )}
          </div>
        </Toolbox>
      </Appbar>

      <Drawer
        open={openDrawer}
        anchor="left"
        onClick={() => setOpenDrawer(false)}
      >
        <Menu drawerMode />
      </Drawer>
      <Popper
        keepMounted
        open={!!popperEl}
        anchorEl={popperEl}
        placement="bottom-start"
      >
        {createStreamContent}
      </Popper>
    </>
  );
};

export default Navbar;

const SearchVideoPlaylistDialogResult = ({ hasVideo, open, onClose }) => {
  const [list, setList] = useState(Array.from(new Array(40)));
  const [value, setValue] = useState("");
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            maxWidth: "576px"
          }
        }}
      >
        <DialogTitle compoent="div" sx={{ py: 0 }}>
          <Input
            placeholder="Find playlist across your channel"
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
          />
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "16px !important",
            border: "1px solid red"
          }}
        >
          {list.map((item, i) =>
            hasVideo ? (
              <VideoDesc />
            ) : (
              <PlaylistGroup hoverEl={<div>swdqd</div>} />
            )
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export const DashboardNavbar = () => {
  const [popperEl, setPopperEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSearchPlaylists, setOpenSearchPlaylists] = useState(false);
  const isMd = useMediaQuery("(min-width:768px)");
  const dispatch = useDispatch();

  return (
    <>
      <Appbar>
        <Toolbox>
          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <IconButton
              onClick={() =>
                isMd ? dispatch(toggleDrawer(!isMd)) : setOpenDrawer(true)
              }
            >
              <MenuIcon />
            </IconButton>
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alingSelf: "center",
                fontSize: "1.5em"
              }}
            >
              <Logo>
                <img src={LogoIcon} />
                Studio
              </Logo>
            </Link>
          </div>
          <div>
            <Tooltip title="Search">
              <SearchOutlinedIcon
                onClick={() => setOpenSearchPlaylists(true)}
              />
            </Tooltip>
            <Notice
              message={
                <>
                  <Title>FAQ</Title>
                </>
              }
            />
            <ClickAwayListener onClickAway={() => setPopperEl(null)}>
              <Button
                variant="outlined"
                sx={{
                  "&:hover": {
                    background: "none"
                  }
                }}
                onClick={({ currentTarget }) => setPopperEl(currentTarget)}
              >
                <VideoCallOutlinedIcon
                  sx={{
                    color: "error.main",
                    fontSize: "1.8em"
                  }}
                />
                <Caption style={{ textTransform: "uppercase" }}>Create</Caption>
              </Button>
            </ClickAwayListener>
            <Avatar />
          </div>
        </Toolbox>
      </Appbar>
      <Drawer
        open={openDrawer}
        anchor="left"
        onClick={() => setOpenDrawer(false)}
      >
        <StudioSidebar />
      </Drawer>
      <SearchVideoPlaylistDialogResult
        hasVideo={false}
        open={openSearchPlaylists}
        onClose={() => setOpenSearchPlaylists(false)}
      />
      <Popover
        sx={{
          maxWidth: "360px"
        }}
        open={!!popperEl}
        anchorEl={popperEl}
        placement="bottom-start"
      >
        {createStreamContent}
      </Popover>
    </>
  );
};
