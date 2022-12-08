// www.youtube.com/watch?v=ww0_1UmDCLE MUSIC PLAYLIST
import React, { useState } from "react";
import styled, { css } from "styled-components";
import {
  Toolbox,
  Image,
  Title,
  Stack,
  Caption,
  Button,
  IconButton,
  StyledLink
} from "./styled";
import Select from "./Select";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import useForm from "../hooks/useForm";
import { FeedbackInput } from "./InputBox";
import axios from "../api/axios";

const Container = styled.div`
  ${({
    theme: {
      palette: {
        background: { light }
      },
      breakpoints: {
        values: { sm, xl }
      }
    }
  }) => css`
    padding: 24px;
    word-break: break-word;
    width: 100%;
    @media screen and (min-width: ${xl}) {
      align-self: flex-start;
      max-width: 380px;
      position: sticky;
      top: 64px;
      left: 0px;
      border: 1px solid blue;
    }

    & > a {
      width: 100%;
      margin: 8px 0;

      @media screen and (min-width: ${sm}) {
        width: 48%;
        margin-left: 5px;
      }
    }

    & > div {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: flex-start;
      @media screen and (min-width: 768px) {
        flex-direction: row;
      }

      @media screen and (min-width: 1200px) {
        flex-direction: column;
      }

      & > a {
        position: relative;
        width: 300px;
        min-height: 200px;
        border-radius: 12px;
        border: 1px solid red;
        width: 100%;
        & > img {
          width: 100%;
          height: 100%;
          border-radius: inherit;
        }
        & > h2 {
          opacity: 0;
          pointer-events: none;
        }
        &:hover {
          background-color: ${light};
          & > h2 {
            opacity: 1;
            pointer-events: all;
          }
        }
        @media screen and (min-width: ${sm}) {
          flex: 1;
        }
      }

      & > div {
        color: #fff;
        position: relative;
        width: 100%;
        & > button {
          position: absolute;
          right: 8px;

          &:nth-child(1) {
            top: 15px;
          }

          &:nth-child(2) {
            top: 50%;
            transform: translateY(-50%);
          }

          &:nth-child(3) {
            bottom: 10px;
          }
        }
      }
    }
  `}
`;

const PlaylistToolbox = ({ playlist = {}, editorMode }) => {
  const [editTitle, setEditTitle] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const {
    formData: { title, description },
    errors,
    handleChange
  } = useForm({ placeholders: playlist });
  return (
    <Container>
      <div>
        <StyledLink>
          <Title
            $varaint="body2"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}
          >
            Play all
          </Title>
          <img />
        </StyledLink>
        <div
          style={{
            flex: 1,
            padding: "8px"
          }}
        >
          <IconButton onClick={() => setEditTitle(true)}>
            <ModeEditOutlineIcon /> t1
          </IconButton>
          <IconButton>
            <ModeEditOutlineIcon />2
          </IconButton>
          <IconButton onClick={() => setEditDesc(true)}>
            <ModeEditOutlineIcon /> d3
          </IconButton>
          <div style={{ maxWidth: "75%" }}>
            {editTitle ? (
              <FeedbackInput
                name="title"
                value={title}
                onChange={handleChange}
                variant="underline"
                handleAction={async reason => {
                  switch (reason) {
                    case "cancel":
                      return setEditTitle(false);
                    default:
                      if (!errors.title) {
                        try {
                          setEditTitle(false);
                          await axios.put(`/playlists/${playlist.id}`, {
                            title
                          });
                        } catch (err) {
                          console.log(err.message);
                        }
                      }
                  }
                }}
              />
            ) : (
              <Title>{title}</Title>
            )}
            <Title
              $variant="body2"
              style={{
                textTransform: "uppercase",
                paddingBottom: "24px"
              }}
            >
              Marvellous akinrinmola
            </Title>

            <div>
              <Select
                label="Private"
                items={[
                  {
                    label: "Tem i1"
                  }
                ]}
              />
              <Caption style={{ paddingTop: "24px" }}>
                66 videos Last updated on Nov 13, 2022
              </Caption>
            </div>
            {editDesc ? (
              <FeedbackInput
                name="description"
                value={description}
                onChange={handleChange}
                variant="underline"
                handleAction={async reason => {
                  switch (reason) {
                    case "cancel":
                      return setEditTitle(false);
                    default:
                      if (!errors.title) {
                        try {
                          setEditDesc(false);
                          await axios.put(`/playlists/${playlist.id}`, {
                            description
                          });
                        } catch (err) {
                          console.log(err.message);
                        }
                      }
                  }
                }}
              />
            ) : (
              <Title
                $variant="body2"
                style={{ paddingTop: "24px", maxWidth: "80%" }}
              >
                {description}No
                descriptionrwgthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
              </Title>
            )}
          </div>
        </div>
      </div>

      {playlist.videos.length ? (
        <>
          <StyledLink
            $variant="crumb"
            to={`/videos/${playlist.videos[0].id}?pid=${playlist.id}`}
          >
            <ModeEditOutlineIcon />
            <span> Playall</span>
          </StyledLink>
          <StyledLink
            $variant="crumb"
            to={`/videos/${playlist.videos[0].id}?pid=${playlist.id}&s=true`}
          >
            <ModeEditOutlineIcon />
            Shuffle all
          </StyledLink>
        </>
      ) : (
        <div>No videos</div>
      )}
    </Container>
  );
};

export default PlaylistToolbox;
