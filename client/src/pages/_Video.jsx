import React, { useEffect, useState, useCallback, useRef } from "react";
import styled, { css } from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  useParams,
  useNavigate,
  useSearchParams,
  useLocation
} from "react-router-dom";
import axios from "../api/axios";
import {
  handleLikeState,
  fetchSuccess,
  updateDisLikeState,
  updateLikeState
} from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";
import Layout, {
  LayoutView,
  PlaylistDialogContent
} from "../components/Layout";
import {
  Title,
  Divider,
  Avatar,
  IconButton,
  Button,
  ButtonGroup,
  Paper,
  Link
} from "../components/styled";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { fetchPlaylistSuccess } from "../redux/playlistSlice";
import VideoPlayer from "../components/VideoPlayer";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Container = styled.div`
  ${({
    theme: {
      breakpoints: { values }
    },
    $theaterMode
  }) => css`
  display:grid;
  grid-template-columns: repeat(1,1fr);
  gap:16px;
  & > div:nth-child(2){
    & > div {
    max-height:800px;
    overflow:auto;  
    }
  }
  
@media screen and (min-width:${values[$theaterMode ? "" : "lg"]}){
& > div:nth-child(2){  
  margin:0;
  min-width:0;
  width:420px;
   grid-column: 2 / 4; 
   grid-row:1/4;  
  & > div {
      max-height:none; 
  }
  & > button {
    display:none;
  }
}
  `}
`;

const Content = styled.div``;
const VideoWrapper = styled.div``;

const Info = styled.span`
  color: ${({ theme: { palette } }) => palette.textSoft};
`;

const Channel = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  & * {
    max-width: 180px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 8px;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme: { palette } }) => palette.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
  max-width: 150px;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme: { palette } }) => palette.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Collapse = styled.div`
  ${({
    theme: {
      palette: {
        background,
        text: { primary }
      }
    },
    $open = true
  }) => css`
    cursor: pointer;
    padding: 16px;
    border-radius: 16px;
    word-break: break-word;
    background-color: ${background.light};
    margin: 16px 0 24px;
    & > div {
      height: ${$open ? "auto" : "0px"};
      overflow: hidden;
    }
    &:hover {
      background-color: ${background.dark};
    }
    & > p {
      color: ${primary};
      font-size: 16px;
    }
  `}
`;

const Details = styled.div`
  ${({
    theme: {
      breakpoints: { values }
    }
  }) => css`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 10px;
    justify-content: space-between;
    margin: 16px 0;

    & > div:nth-child(2) {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      & > * {
        display: none;
      }

      @media screen and (min-width: ${values.xs}) {
        & > button:last-child {
          display: inline-flex;
        }
        & > div {
          display: block;
        }
      }

      @media screen and (min-width: ${values.sm}) {
        & > button:nth-child(2) {
          display: inline-flex;
        }
        & > button:nth-child(3) {
          display: inline-flex;
        }
      }

      @media screen and (min-width: ${values.lg}) {
        & > button:nth-child(3) {
          display: none;
        }
      }

      @media screen and (min-width: ${values.xl}) {
        & > button:nth-child(3) {
          display: inline-flex;
        }
      }
    }

    & button {
      border-radius: 32px;
    }
  `}
`;

const Video = () => {
  const {
    user: { currentUser },
    video: { currentVideo, loading },
    playlist: { currentPlaylist }
  } = useSelector(state => state);
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [openCollapse, setOpenCollapse] = useState(false);
  const [dialog, setDialog] = useState({ open: false });
  const [searchParams, setSearchParams] = useSearchParams();
  const [theaterMode, setTheaterMode] = useState(false);
  const onClickTheaterMode = useCallback(() => {
    setTheaterMode(prev => !prev);
  }, []);
  const location = useLocation();
  const stateRef = useRef({}).current;
  useEffect(() => {
    const fetchData = async () => {
      try {
        let videoRes, playlist;
        const pid = searchParams.get("pid");
        if (pid) {
          playlist = await axios.get(`playlists/${pid}`, {
            withCredentials: true
          });
          if (playlist)
            videoRes = playlist.videos.find((v, i) => {
              if (v.id === videoId) {
                if (playlist.videos.length !== i + 1)
                  stateRef.nextVideo = i + 1;
                return true;
              }
              return false;
            });
        }
        if (!videoRes)
          videoRes = await axios.get(
            `/videos/${videoId}?video_select=title createdAt views videoUrl likes dislikes desc tags&channel_select=name imgUrl subscribersCount id`,
            {
              withCredentials: true
            }
          );
        if (videoRes) {
          if (playlist) dispatch(fetchPlaylistSuccess(playlist));
          dispatch(fetchSuccess(videoRes));
        } else console.log("no video for the current path");
        console.log(videoRes);
      } catch (err) {
        console.log(err.message, err.code);
      }
    };
    fetchData();
  }, [searchParams, videoId, dispatch, navigate, stateRef]);

  const handleLike = async () => {
    try {
      await axios.put(
        `/videos/${currentVideo.isLikedBy ? "undo-like" : "like"}/${
          currentVideo.id
        }`
      );
      dispatch(updateLikeState());
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleDislike = async () => {
    try {
      await axios.put(
        `/videos/${currentVideo.isDisLikedBy ? "undo-dislike" : "dislike"}/${
          currentVideo.id
        }`
      );
      dispatch(updateDisLikeState());
    } catch (err) {
      console.log(err.message);
    }
  };

  let hasSub = false;
  const handleSub = async () => {
    try {
      hasSub
        ? await axios.put(`/channels/unsubscribe/${currentVideo.channel.id}`)
        : await axios.put(`/channels/subscribe/${currentVideo.channel.id}`);
      dispatch(
        subscription({
          hasSub,
          channelId: currentVideo.channel.id
        })
      );
      console.log("subscribbed succesffully");
    } catch (err) {
      console.log(err.message);
    }
  };
  if (loading) return <div>loading...</div>;

  hasSub = false;
  // hasSub = currentUser.subscriptions?.includes(currentVideo.channel.id);

  const _renderDialogContent = () => {
    switch (dialog.openFor) {
      default:
        return (
          <PlaylistDialogContent
            videos={[videoId]}
            currentUser={currentUser.id}
            handleAction={(reason, data) => {
              setDialog({
                ...dialog,
                open: false
              });
              switch (reason) {
                case "error":
                  console.log(data.message);
                default:
                  console.log("success ...");
              }
            }}
          />
        );
    }
  };
  if (stateRef.nextVideo)
    location.pathname = `/videos/${currentPlaylist.videos[stateRef.nextVideo].id}`;
  return (
    <Layout fluid fullScreen={theaterMode}>
      <Container $theaterMode={theaterMode}>
        <Content>
          <VideoPlayer
            toNext={stateRef.nextVideo && location}
            theaterMode={theaterMode}
            onClickTheaterMode={onClickTheaterMode}
            style={{ maxWidth: theaterMode ? "100%" : "1024px" }}
          />
          <Title style={{ marginTop: "16px" }}>{currentVideo.title}</Title>
          <Details>
            <Channel>
              <ChannelInfo>
                <Avatar src={currentVideo.channel.imgUrl} />
                <ChannelDetail>
                  <ChannelName>
                    {currentVideo.channel.name}
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                  </ChannelName>
                  <ChannelCounter>
                    {currentVideo.channel.subscribersCount} 2.3M subscribers
                  </ChannelCounter>
                </ChannelDetail>
              </ChannelInfo>
              {currentVideo.channel.id === currentUser.id && false ? (
                <ButtonGroup variant="crumb">
                  <Button>
                    <DeleteIcon /> <span>Delete</span>
                  </Button>
                  <Button>
                    <EditIcon /> Edit
                  </Button>
                </ButtonGroup>
              ) : (
                <Button variant="contained" onClick={handleSub}>
                  {hasSub ? "Subscribed" : "Subscribe"}
                </Button>
              )}
            </Channel>
            <div>
              <ButtonGroup variant="crumb" $showDivider>
                <Button onClick={handleLike}>
                  {currentVideo.isLikedBy ? <ThumbUpIcon /> : <ThumbDownIcon />}
                  {currentVideo.likes} 3.4kmll
                </Button>
                <Button onClick={handleDislike}>
                  {currentVideo.isDisLikedBy ? (
                    <ThumbDownIcon />
                  ) : (
                    <ThumbDownOffAltOutlinedIcon />
                  )}
                  {currentVideo.disLikes} 1.4kmll
                </Button>
              </ButtonGroup>
              <Button variant="contained">
                <ReplyOutlinedIcon /> Share
              </Button>
              <Button variant="contained">
                <AddTaskOutlinedIcon /> Thanks
              </Button>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </div>
          </Details>
          <Collapse
            $open={openCollapse}
            onClick={e => {
              setOpenCollapse(true);
            }}
          >
            {currentVideo.desc ? (
              <Description>{currentVideo.desc}</Description>
            ) : null}
            <p>{currentVideo.title}</p>
            <p>
              Stream/Download:{" "}
              <Link style={{ color: "red" }}>http://rema.ink.to/rvaeeee</Link>{" "}
            </p>
            <div>
              <div>
                <p>
                  Get Rave & Roses World Tour Tickets:{" "}
                  <Link style={{ color: "red" }}>
                    http://rema.ink.to/rvaeeee
                  </Link>
                </p>
              </div>

              <div style={{ margin: "20px 0" }}>
                <p>Follow Rema</p>
                <p>
                  TikTok:{" "}
                  <Link
                    to="http://rema.ink.to/rvaeeee"
                    style={{ color: "red" }}
                  >
                    http://rema.ink.to/rvaeeee
                  </Link>
                </p>
              </div>

              <div>
                <span>#ravenrose</span> <span>#ravenrose</span>{" "}
                <span>#ravenrose</span>
              </div>
            </div>
            <Button
              style={{ marginTop: "8px", padding: 0 }}
              onClick={() => setOpenCollapse(!openCollapse)}
            >
              Show {openCollapse ? " less" : " more"}
            </Button>
          </Collapse>
        </Content>
        <Recommendation tags={currentVideo.tags} videoId={videoId} />
        <Comments videoId={videoId} />
      </Container>
      <Dialog
        open={dialog.open}
        onClose={() =>
          setDialog({
            ...dialog,
            open: false
          })
        }
      >
        {_renderDialogContent()}
      </Dialog>
    </Layout>
  );
};

export default Video;
