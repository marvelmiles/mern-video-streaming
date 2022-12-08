import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Menu from "./Menu";
import Navbar, { DashboardNavbar } from "./Navbar";
import styled, { css } from "styled-components";
import axios from "../api/axios";
import { Title, Button, Input, Stack, CheckContainer, Ul } from "./styled";
import { Checkbox, useMediaQuery, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Card, { VideoDesc } from "./Card";
import StudioSidebar from "./navbars/StudioSidebar";
import { useTheme } from "styled-components";
const Content = styled.div`
  ${({
    theme: {
      palette: {
        background: { main }
      }
    }
  }) => css`
    display: flex;
    position:relative
    width: 100%;
    margin-top: 56px;
    background-color: ${main};
  `}
`;

const Main = styled.main`
  ${({
    theme: {
      breakpoints: { values },
      palette: { primary }
    },
    $openDrawer,
    $fluid,
    $fullScreen
  }) => css`
    width: 100%;
    margin-left: auto;
    margin-right: ${$fluid ? "auto" : 0};
    padding: ${$fullScreen ? 12 : 0}px 0 12px;
    margin-top: 8px;
    background-color: ${primary.main};
    border: 3px solid orange;

    // padding-top: 8px;
    position: relative;
    min-height: calc(100vh - 64px);
    @media screen and (min-width: ${values.sm}) {
      width: calc(100% - 95px);
    }
    @media screen and (min-width: ${values.md}) {
      width: calc(
        100% - ${$openDrawer ? 220 : $fullScreen ? 0 : $fluid ? 50 : 95}px
      );
    }

    @media screen and (min-width: ${values.lg}) {
      width: calc(
        100% - ${!$openDrawer ? ($fluid ? 50 : 220) : $fullScreen ? 0 : 95}px
      );
      ${$fluid
        ? `
    max-width:85%;
    `
        : ``}
    }
  `}
`;
function Layout({
  children,
  fluid,
  fullScreen,
  rootPath,
  handleAction,
  showVideoPreview
}) {
  let { openDrawer } = useSelector(state => state.config);
  const {
    palette: {
      primary: { main }
    }
  } = useTheme();
  return (
    <div
      direction="row"
      style={{
        justifyContent: "normal",
        alignItems: "normal",
        backgroundColor: main
      }}
    >
      {{
        dashboard: <DashboardNavbar handleAction={handleAction} />
      }[rootPath] || <Navbar />}
      <Content>
        {!fluid &&
          ({
            dashboard: (
              <StudioSidebar
                showVideoPreview={showVideoPreview}
                $hideVideoInfoBp="xs"
                $showVideoInfoBp={openDrawer ? "md" : ""}
              />
            )
          }[rootPath] || <Menu />)}
        <Main $openDrawer={openDrawer} $fluid={fluid} $fullScreen={fullScreen}>
          {children}
        </Main>
      </Content>
    </div>
  );
}

Layout.propTypes = {};

export default Layout;

export const LayoutView = ({ url, withCredentials }) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        setList(
          (await axios.get(url, {
            withCredentials
          })).data
        );
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, [url, withCredentials]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : list.length ? (
        list.map(item => <Title>{item.name}</Title>)
      ) : (
        <Title style={{ color: "red" }}>List is empty</Title>
      )}
    </div>
  );
};

export const PlaylistDialogContent = ({
  handleAction,
  userId,
  videos,
  allowPrivacy,
  onSubmit
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [playlistsRef, setPlaylistsRef] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        setPlaylists(
          await axios.get(`/channels/playlists/${userId}`, {
            withCredentials: true
          })
        );
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, [userId]);
  const handleChange = e => {
    setValues({
      ...values,
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  onSubmit =
    onSubmit ||
    (async body => {
      try {
        await axios[body.playlists ? "put" : "post"](
          body.playlists
            ? "channels/playlists"
            : "`/playlists?tagPlaylist=true`",
          body
        );
        handleAction("success");
      } catch (err) {
        console.log(err.message);
        handleAction("error", err);
      } finally {
        setOpenDialog(false);
      }
    });

  return (
    <>
      <DialogTitle>
        Playlists
        <Button
          style={{ border: "1px solid green" }}
          onClick={() => setOpenDialog(true)}
        >
          Create
        </Button>
      </DialogTitle>
      <DialogContent>
        <div>
          {loading ? (
            <Loading />
          ) : playlists.length ? (
            playlists.map(item => (
              <div key={item.id} style={{ display: "flex" }}>
                <Checkbox
                  onChange={(_, checked) => {
                    if (checked) setPlaylistsRef([...playlistsRef, item.id]);
                    else
                      setPlaylists(playlistsRef.filter(id => id !== item.id));
                  }}
                />
                <Title key={item.id} style={{ color: "red" }}>
                  {item.name}
                </Title>
              </div>
            ))
          ) : (
            <Title style={{ color: "red" }}>Playlists is empty</Title>
          )}
        </div>
        {playlistsRef.length ? (
          <Button
            onClick={() =>
              onSubmit({
                videos,
                playlists: playlistsRef
              })
            }
          >
            Save
          </Button>
        ) : null}
      </DialogContent>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <DialogTitle>New playlist</DialogTitle>
          <Input
            placeholder="Name"
            name="name"
            value={values.name || ""}
            onChange={handleChange}
            style={{
              color: "red"
            }}
          />
          <Input
            placeholder="Description"
            name="desc"
            value={values.desc || ""}
            onChange={handleChange}
            style={{
              color: "red"
            }}
          />
          {allowPrivacy ? (
            <Input
              placeholder="Privacy"
              name="privacy"
              value={values.privacy || ""}
              onChange={handleChange}
              style={{
                color: "red"
              }}
            />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} style={{ color: "red" }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              values.videos = videos;
              !allowPrivacy && (values.privacy = "tagged");
              onSubmit(values);
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const CategoriesPopoverContent = ({ onSelect }) => {
  useEffect(() => {
    (async () => {
      try {
        // axios.get("");
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);
  return (
    <Ul>
      <li onClick={() => onSelect("music", 0)}>Music</li>
      <li>Dancehall</li>
      <li>Others</li>
    </Ul>
  );
};

export const Loading = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <CircularProgress />
  </div>
);

export const DeleteDialogContent = ({
  video = {
    title: "sngngnibnntefin"
  },
  handleAction
}) => {
  return (
    <>
      <DialogTitle>Permanently delete this draft video</DialogTitle>
      <DialogContent>
        <VideoDesc variant="compact" video={video} subtitle={"1 views"} />
      </DialogContent>
      <CheckContainer
        style={{
          border: "none"
        }}
      >
        <Checkbox />
        <div>
          <Title>
            I understand that deleting a draft video from YouTube is permanent
            and cannot be undone.
          </Title>
        </div>
      </CheckContainer>
      <DialogActions
        style={{
          justifyContent: "space-between"
        }}
      >
        <Button variant="text">Download Video</Button>
        <div>
          <Button variant="text">Cancel</Button>
          <Button variant="text" disabled>
            DELETE {video.visibility === "Draft" ? "DRAFT VIDEO" : "FOREVER"}
          </Button>
        </div>
      </DialogActions>
    </>
  );
};
