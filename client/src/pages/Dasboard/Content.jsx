import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Tabs,
  Tab
} from "@mui/material";
import {
  Title,
  IconButton,
  Ul,
  StyledLink,
  ButtonGroup,
  Button,
  Paper,
  Stack
} from "../../components/styled";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useTheme } from "styled-components";
import UploadIcon from "@mui/icons-material/Upload";
import DragDropArea from "../../components/DragDropArea";
import axios from "../../api/axios";
import Layout, { Loading } from "../../components/Layout";
import VideoCrud from "../../components/VideoCrud";
import DatetimePicker from "../../components/DatetimePicker";
import CloseIcon from "@mui/icons-material/Close";
import { VideoList } from "../../components/DataTable";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { VideoDesc, Notice } from "../../components/Card";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Popper from "@mui/material/Popper";

export default function Content() {
  let {
    palette: { mode, background }
  } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [popper, setPopper] = useState({});
  const [dialog, setDialog] = useState({});
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState({
    id: "636693546030f9ce439448fe",
    title: "ss",
    visibility: "draft",
    createdAt: "2022-11-02T22:37:29.527+00:00"
  });
  //   {
  //   id: "636693546030f9ce439448fe",
  //   title: "ss",
  //   visibility: "draft",
  //   createdAt: "2022-11-02T22:37:29.527+00:00"
  // }
  const [tab, setTab] = useState(0);
  const {
    palette: { text, bgSoft }
  } = useTheme();
  let d = searchParams.get("d");
  d = video && d === "ud" ? "videoCrud" : d;
  const navigate = useNavigate();
  const closeDialog = () => {
    setSearchParams();
    setVideo(null);
  };

  const handleAction = (reason, data) => {
    switch (reason) {
      default:
        setVideos(videos.map(v => (v.id === data.id ? data : v)));
        closeDialog();
    }
  };
  const renderDialogContent = () => {
    switch (d) {
      case "ud":
        return (
          <>
            <DialogTitle>
              <Title $variant="subtitle">Upload Videos </Title>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <IconButton>
                  <ChatBubbleOutlineIcon />
                </IconButton>
                <IconButton style={{ fontSize: "1.2em" }} onClick={closeDialog}>
                  <CloseIcon />
                </IconButton>
              </div>
            </DialogTitle>
            <DialogContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center",
                padding: 2
              }}
            >
              <DragDropArea
                accept="video"
                reset={!!video}
                onFilesTransfer={async files => {
                  try {
                    console.log("uploading....");
                    const formData = new FormData();
                    for (const file of files) {
                      formData.append("videos", file);
                    }
                    const videos = await axios.post("/videos", formData, {
                      onUploadProgress(e) {
                        const pert = Math.round((e.loaded / e.total) * 100);
                        console.log(pert);
                      }
                    });
                    if (files.length === 1) {
                      setVideo(videos[0]);
                    } else closeDialog();
                  } catch (err) {
                    console.log(err.message);
                  }
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    color: text,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: background.light
                  }}
                >
                  <UploadIcon
                    sx={{
                      fontSize: "4.5em"
                    }}
                  />
                </div>
              </DragDropArea>
              <Title
                $variant="subtitle"
                style={{ lineHeight: "2", maxWidth: "75%", marginTop: "24px" }}
              >
                Drag and drop video files to upload Your videos will be private
                until you publish them.
              </Title>

              <label
                htmlFor="drag-drop-area-input-file-upload"
                style={{
                  padding: "16px",
                  backgroundColor: background.light,
                  borderRadius: "8px",
                  color: text,
                  cursor: "pointer"
                }}
                id=""
              >
                Select Files
              </label>
            </DialogContent>
            <DialogActions
              sx={{
                textAlign: "center",
                color: text,
                padding: 2
              }}
            >
              By submitting your videos to YouTube, you acknowledge that you
              agree to YouTube's Terms of Service and Community Guidelines.
              Please be sure not to violate others' copyright or privacy rights.
              Learn more
            </DialogActions>
          </>
        );
      case "videoCrud":
        return <VideoCrud video={video} handleAction={handleAction} />;
      default:
        return null;
    }
  };

  const renderPopper = () => {
    switch (popper.for) {
      default:
        return (
          <Paper>
            <Ul>
              <li>
                <ThumbDownIcon />
                Edit title and description
              </li>
              <li>
                <ThumbDownIcon />
                Download
              </li>
              <li
                onClick={({ currentTarget }) =>
                  setDialog({
                    open: true,
                    currentTarget,
                    for: "delete forever"
                  })
                }
              >
                <ThumbDownIcon />
                Delete forever
              </li>
            </Ul>
          </Paper>
        );
    }
  };
  mode = mode === "dark";
  return (
    <Layout rootPath="dashboard" handleAction={(reason, info) => {}}>
      <Title style={{ marginLeft: "16px", marginTop: "24px" }}>
        Channel Content
      </Title>
      <Tabs
        value={tab}
        onChange={(_, tab) => setTab(tab)}
        sx={{
          ".MuiTab-root": {
            fontWeight: "bold"
          },
          ".MuiTabs-indicator": {
            backgroundColor: mode ? "text.dark" : "primary.dark"
          },
          "button.Mui-selected": {
            color: mode ? "text.dark" : "primary.dark"
          },
          ".MuiTouchRipple-root": {
            color: mode ? "text.dark" : "primary.dark"
          }
        }}
      >
        <Tab label="Videos" />
        <Tab label={"Live"} />
      </Tabs>
      <VideoList
        url="/channels/videos"
        columns={[
          {
            field: "video",
            headerName: "Video",
            width: 450,
            renderCell({ row }) {
              return (
                <>
                  <VideoDesc
                    video={row}
                    title={row.title}
                    subtitle={row.desc}
                    hoverEl={
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px"
                        }}
                      >
                        <ModeEditOutlineIcon
                          onClick={() => {
                            if (row.visibility === "draft") {
                              setSearchParams({
                                d: "ud"
                              });
                            } else
                              navigate(`/dashboard/details/${row.id}`, {
                                state: row
                              });
                          }}
                        />
                        <YouTubeIcon />
                        <ClickAwayListener onClickAway={() => setPopper({})}>
                          <MoreVertIcon
                            onClick={({ currentTarget }) =>
                              setPopper({ el: currentTarget, for: "options" })
                            }
                          />
                        </ClickAwayListener>
                      </div>
                    }
                  />
                </>
              );
            }
          },
          {
            field: "visibility",
            headerName: "Visibility",
            width: 180,
            renderCell({ row }) {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  {
                    {
                      draft: <InsertDriveFileIcon />
                    }[row.visibility]
                  }
                  <span>{row.visibility}</span>
                </div>
              );
            }
          },
          {
            field: "restrictions",
            headerName: "Restrictions",
            width: 180
          },
          {
            field: "date",
            headerName: "Date",
            width: 180,
            renderCell({ row }) {
              return <div style={{ padding: 0 }}>Nov 12, 2022 uploaded</div>;
            }
          },
          {
            field: "views",
            headerName: "Views"
          },
          {
            field: "comments",
            hederName: "Comments",
            renderCell({ row }) {
              return <StyledLink>{row.comments}</StyledLink>;
            }
          },
          {
            field: "emojis",
            headerName: "Likes(Vs. dislikes)",
            width: 300,
            renderCell({ row }) {
              return (
                <>
                  <Stack>
                    <ThumbUpIcon /> <span>{row.likes}010</span>
                  </Stack>
                  <Stack>
                    <ThumbDownIcon /> <span>{row.dislikes}000</span>
                  </Stack>
                </>
              );
            }
          }
        ]}
      />
      <Dialog
        PaperProps={{
          sx: {
            height: "100%",
            maxWidth: "1024px"
          }
        }}
        open={
          {
            ud: true,
            videoCrud: true
          }[d] || false
        }
        onClose={() => {}}
      >
        {renderDialogContent()}
      </Dialog>
      <Popper open={!!popper.el} anchorEl={popper.el}>
        {renderPopper()}
      </Popper>
    </Layout>
  );
}
