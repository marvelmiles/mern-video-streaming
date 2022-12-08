import React, { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import mp4 from "./video.mp4";
import { IconButton, StyledLink } from "../styled";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PictureInPictureAltIcon from "@mui/icons-material/PictureInPictureAlt";

const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  position: relative;
  display: flex;
  justify-content: center;
  background-color: black;
  margin-inline: auto;
  border-radius: inherit;

  & > video {
    height: 100%;
    width: 100%;
    border-radius: inherit;
  }
  &.theater,
  &.full-screen {
    max-width: initial;
    width: 100%;
  }
  &.theater {
    max-height: 90vh;
  }
  &.full-screen {
    max-height: 100vh;
  }
  // controls-container
  &:hover > div,
  &.paused > div,
  &:focus-within > div {
    opacity: 1;
  }

  & > div {
    z-index: 1;
    color: #fff;
    width: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    opacity: 0;
    transition: opacity 150ms ease-in-out;

    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
      width: 100%;
      aspect-ratio: 6 / 1;
      z-index: -1;
      pointer-events: none;
    }

    // controls
    & > div:nth-child(2) {
      display: flex;
      padding: 8px;
      align-items: center;
    }
  }
`;

const VideoPlayer = ({
  toNext,
  style,
  onClickTheaterMode,
  theaterMode = ""
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  // const [theaterMode, setTheaterMode] = useState("");
  const [fullScreenMode, setFullScreenMode] = useState("");
  const videoRef = useRef();
  const togglePlay = useCallback(() => {
    return;
    videoRef.current.paused
      ? videoRef.current.play()
      : videoRef.current.pause();
  }, []);
  const toggleFullScreenMode = useCallback(() => {
    if (document.fullscreenElement === null) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullScreenMode(prev => (prev ? "" : "full-screen"));
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    v.addEventListener("play", () => {
      setIsPlaying(true);
    });
    v.addEventListener("pause", () => {
      setIsPlaying(false);
    });
    v.addEventListener("click", togglePlay);

    document.addEventListener("keydown", e => {
      return e.stopPropagation();
      const tagName = document.activeElement.tagName.toLowerCase();
      switch (e.key.toLowerCase()) {
        case " ":
          if (tagName === "button") return;
        case "k":
          togglePlay();
          break;
        case "f":
          toggleFullScreenMode();
          break;
        case "t":
          onClickTheaterMode();
          break;

        default:
          break;
      }
    });
  }, [togglePlay, toggleFullScreenMode, onClickTheaterMode]);

  return (
    <Container className={`${theaterMode} ${fullScreenMode}`} style={style}>
      <video src={mp4} ref={videoRef} controls={false} />
      <div>
        <div id="timeline"></div>
        <div id="controls">
          <IconButton onClick={togglePlay}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <StyledLink
            to={toNext}
            style={{
              color: toNext ? "inherit" : "red"
            }}
          >
            Next
          </StyledLink>
          <IconButton>
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"
              />
            </svg>
          </IconButton>
          <IconButton onClick={onClickTheaterMode}>
            {theaterMode ? (
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
                />
              </svg>
            )}
          </IconButton>
          <IconButton onClick={toggleFullScreenMode}>
            {fullScreenMode ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </div>
      </div>
    </Container>
  );
};

VideoPlayer.propTypes = {};

export default VideoPlayer;
