import axios from "axios";
import React, { useState } from "react";
import styled, { css, useTheme } from "styled-components";
import { format } from "timeago.js";
import {
  Avatar,
  Title,
  Caption,
  StyledLink,
  Paper,
  Ul,
  Image,
  Stack
} from "./styled";
import MicIcon from "@mui/icons-material/Mic";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VideoPlayer from "./VideoPlayer";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Tooltip, Popover, Dialog, Popper } from "@mui/material";
import { isTouchDevice } from "../utils";
import bgUrl from "../img/bg.jpg";
import avatarUrl from "../img/avatar.jpg";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import PlaylistPlayOutlinedIcon from "@mui/icons-material/PlaylistPlayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import { PlaylistDialogContent } from "./Layout";
import ClickAwayListener from "@mui/material/ClickAwayListener";

Dialog.defaultProps = {
  open: false
};
const Container = styled.div`
  ${({
    sx,
    theme: {
      palette: { soft }
    }
  }) => css`
    display: flex;
    height: 100%;
    gap: 16px;
    width: 100%;
    align-items: center;
    white-space: nowrap;
    & > div {
      width: calc(100% - 140px);
      & > p,
      & > div > div {
        color: inherit;
        margin-bottom: 0;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      & > div {
        position: relative;
        width: 100%;
        margin-top: 8px;
        & > * {
          position: absolute;
        }
        & > div:nth-child(1) {
          visibility: visible;
          opacity: 1;
        }
        & > div:nth-child(2) {
          visibility: hidden;
          opacity: 0;
        }
      }

      & > div:nth-child(3) {
        color: ${soft};
      }
    }

    &:hover,
    &:focus {
      & > div > div {
        & > div:nth-child(1) {
          visibility: hidden;
          opacity: 0;
        }
        & > div:nth-child(2) {
          visibility: visible;
          opacity: 1;
        }
      }
    }
    ${sx}
  `}
`;

const Card = ({ variant, video = {}, sx, hideAvatar, handleAction }) => {
  const {
    palette: {
      background: { light }
    }
  } = useTheme();

  let styles = `    
      min-width:0; 
      width:100%;
        & a {
          display:block;
          width:100%;
          & > div {
            border-radius:8px;
          }
        } 
      `;
  switch (variant) {
    case "compact":
      styles += `    
      & > div  {
            padding: 8px;
        align-items: flex-start;
        display: flex;
        gap: 12px;
        flex: 1
        max-width: calc(100% - 30px);
      }
      `;
      break;
    case "list":
      styles += `
      margin-bottom:16px;
      gap:16px;
      align-items:center;
       & > div {
         display:flex;
         gap:16px; 
         align-items:flex-start;
       }
          `;
      break;
    default:
      styles += ` 
      flex-direction:column;
      align-items:flex-start;  
      & > div {
        display: flex;
        margin-top:8px;
        gap: 8px; 
      }
      `;
      break;
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialog, setDialog] = useState({});
  return (
    <>
      <Stack $sx={styles + sx}>
        <StyledLink $disableHover to={`/video/tyy`}>
          <VideoPlayer hoverMode />
          {/* <Image src={bgUrl} $variant={variant} /> */}
        </StyledLink>
        <div>
          {variant === undefined && !hideAvatar ? (
            <Avatar src={avatarUrl} />
          ) : null}
          <div>
            <StyledLink $disableHover>
              <Title
                $variant={"body1"}
                style={{
                  wordBreak: "break-word",
                  marginBottom: "8px"
                }}
              >
                {video.placeholder?.title || video.channel?.name}
                <span>Stormzy</span>
                <span
                  style={{
                    margin: "0 8px",
                    fontWeight: "400"
                  }}
                >
                  -
                </span>
                <span>
                  this is what i mean starring. amaarae, black, sherrif
                </span>
              </Title>
            </StyledLink>

            {variant === "list" ? null : (
              <Caption style={{ display: "block" }}>
                Category verifieddddd
              </Caption>
            )}
            <Caption $textColor="dull" style={{ display: "block" }}>
              {variant === "list" ? `${"Rema"} •` : ""} 5 views •{" "}
              {format(video.createdAt)}
            </Caption>
          </div>
          <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <MoreVertIcon
              onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
            />
          </ClickAwayListener>
        </div>
      </Stack>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        sx={{
          pointerEvents: "none",
          ".MuiPaper-root": {
            pointerEvents: "all"
          }
        }}
      >
        <Ul>
          <li>
            <PlaylistPlayOutlinedIcon /> Add to queue
          </li>
          <li>
            <AccessTimeOutlinedIcon /> Save to Watch later
          </li>
          <li onClick={() => setDialog({ open: true, for: "save-playlist" })}>
            <PlaylistAddOutlinedIcon /> Save to playlist
          </li>
          <li>
            <RedoOutlinedIcon /> Share
          </li>
          <li>
            <DoNotDisturbAltOutlinedIcon /> Not interested
          </li>
          <li>
            <CancelPresentationOutlinedIcon /> Don't recommend video category
          </li>
          <li>
            <DoDisturbOnOutlinedIcon /> Don't recommend channel
          </li>
        </Ul>
      </Popover>
      <Dialog open={dialog.open} onClose={() => setDialog({})}>
        <PlaylistDialogContent />
      </Dialog>
    </>
  );
};

export default Card;

export const VideoDesc = ({ video, hoverEl, sx, title, subtitle, caption }) => {
  return (
    <Container sx={sx}>
      <img
        src={video.imgUrl}
        style={{
          height: "80px",
          width: "140px",
          minHeight: "80px",
          minWidth: "140px",
          backgroundColor: "gray"
        }}
      />
      <div>
        <p style={{ marginBottom: 0 }}>
          {title}
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          sssssssssssssssssssssssssssssssssssssTITLE
        </p>
        <div>
          <div>
            {subtitle}
            cathaha
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            sssssssssssssssssssssssssssssssssssssSUBITL
          </div>
          <div>{hoverEl}</div>
        </div>
        <div>{caption}</div>
      </div>
    </Container>
  );
};

export const createStreamContent = (
  <Ul $hover="bg">
    <StyledLink to="/dashboard/content?d=ud">
      <li>
        <MicIcon />
        Upload video
      </li>
    </StyledLink>
    <StyledLink>
      <li>
        <MicIcon />
        Go live
      </li>
    </StyledLink>
  </Ul>
);

export const Notice = ({
  sx,
  styles = {},
  hasPaper = false,
  message,
  placement,
  onClick,
  Icon,
  noStyles
}) => {
  const {
    palette: { text }
  } = useTheme();
  const [open, setOpen] = useState(false);
  const isTouch = isTouchDevice();
  Icon = Icon || QuestionMarkIcon;
  return (
    <Tooltip
      title={message}
      placement={placement}
      componentsProps={{
        tooltip: {
          sx: hasPaper
            ? {
                color: "text.primary",
                backgroundColor: "background.paper",
                boxShadow: 0,
                p: 2
              }
            : {}
        }
      }}
      open={isTouch ? open : undefined}
      onClose={() => {
        console.log("ddd");
        setOpen(false);
      }}
      leaveTouchDelay={10000}
    >
      <Icon
        onClick={({ currentTarget }) => {
          setOpen(true);
          onClick && onClick(currentTarget);
        }}
        sx={
          noStyles
            ? {}
            : {
                color: text.light,
                m: 2,
                border: `1px solid ${text.secondary}`,
                borderRadius: `50%`,
                padding: `2px`,
                fontSize: `24px`,
                width: ".75em",
                height: ".75em",
                "&:hover": {
                  borderColor: text.primary,
                  color: text.primary
                },
                ...sx
              }
        }
      />
    </Tooltip>
  );
};

export const UploadDialog = () => {};

const VideoPreviewContainer = styled.div`
  ${({
    theme: {
      palette: {
        background: { light }
      },
      breakpoints: { values }
    },
    $showVideoInfoBp,
    $hideVideoInfoBp
  }) => `
    width: 100%;
    background: ${light};
    word-break: break-word;
    border-radius: 5px;
    overflow: hidden;
    @media screen and (min-width: ${values.md}) {
      max-width: 300px;
    }
    ${`
      @media screen and (min-width:${values[$hideVideoInfoBp]}){
      & > div:nth-child(2) {
     display:none;
    }
    }
     @media screen and (min-width:${values[$showVideoInfoBp]}){
      & > div:nth-child(2) {
     display:block;
    }
    }
    `}
  `}
`;

export const VideoPreview = ({
  onSelect,
  style,
  textEllipsis = true,
  title,
  desc,
  $hideVideoInfoBp,
  $showVideoInfoBp
}) => {
  return (
    <VideoPreviewContainer
      $showVideoInfoBp={$showVideoInfoBp}
      $hideVideoInfoBp={$hideVideoInfoBp}
      style={style}
      // onClick={({ currentTarget }) => onSelect(currentTarget)}
    >
      <VideoPlayer />
      <div style={{ padding: "16px" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          {title || true ? (
            <div
              style={{
                overflow: "hidden"
              }}
            >
              <Title $variant="body1" $textEllipsis>
                ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
              </Title>
            </div>
          ) : (
            <div>
              <Caption>Video StyledLink</Caption>
              <StyledLink
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginTop: "8px"
                }}
              >
                https://wwww.facebook.com/marvellous
              </StyledLink>
            </div>
          )}
          <Tooltip title="Copy video StyledLink">
            <ContentCopyIcon sx={{ flex: 1 }} />
          </Tooltip>
        </div>
        {desc || true ? (
          <Caption $textEllipsis={textEllipsis}>
            descccccccccccccccccrwrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
          </Caption>
        ) : (
          <>
            <Caption style={{ display: "block", marginTop: "8px" }}>
              Filename
            </Caption>
            <Title
              $variant="body2"
              style={{ marginTop: "8px", marginBottom: "0" }}
            >
              Vide03.mp4
            </Title>
          </>
        )}
      </div>
    </VideoPreviewContainer>
  );
};
