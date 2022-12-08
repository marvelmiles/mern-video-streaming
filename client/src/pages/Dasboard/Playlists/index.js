import React, { useState } from "react";
import Layout from "../../../components/Layout";
import { VideoList } from "../../../components/DataTable";
import {
  StyledLink,
  Stack,
  Title,
  Button,
  Caption,
  Image
} from "../../../components/styled";
import { VideoDesc } from "../../../components/Card";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFileOutlined";
import styled from "styled-components";
import Popover from "@mui/material/Popover";
import { FeedbackInput } from "../../../components/InputBox";
import useForm from "../../../hooks/useForm";
import Select from "../../../components/Select";

const Container = styled.div`
  ${({
    $variant,
    theme: {
      palette: { text }
    }
  }) => {
    let styles = `
     position: relative;
  width: 100%;
  display: flex;
  & > div:nth-child(1) {
    position: relative;
    width: 100%;
    height: 100%; 
    word-break:break-word;
    border-radius:8px;
            & > a { 
              height:inherit;
              width:inherit; 
              border-radius:inherit;
              color:#fff;
       & > div:nth-child(1) {
         height:inherit;
         position:relative;
         color:#fff;
         border-radius:inherit;
         & * {
           color:inherit;
         }

         & > div {
           position:absolute;
           border-top-right-radius:inherit;
          border-bottom-right-radius:inherit;
           top:0;
           right:0;
           width:45%;
           height:100%;
           background: ${text.primary};
           display:flex;
           align-items:center;
           justify-content:center;
           gap:16px;
           flex-direction:column;
         }
       }
        
      }
  }

  & > div:nth-child(2){
    word-break:break-word;
  }

    `;
    switch ($variant) {
      case "block":
        styles += `
        flex-direction:column;
        &> div:nth-child(1){
          height:120px;
 &:hover  a > div:nth-child(2){
            opacity:1 !important;
            pointer-events:all !important; 
          }
        }
        `;
        break;
      default:
        break;
    }
    return styles;
  }}
`;

export const PlaylistGroup = ({ hoverEl, variant }) => {
  return (
    <Container $variant={variant}>
      <div>
        <StyledLink>
          <div>
            <Image $variant="inherit" />
            <div>
              <div>7</div>
              <ModeEditOutlineIcon sx={{ border: "1px solid red" }} />
            </div>
          </div>
          <Stack
            style={{
              position: "absolute",
              content: "",
              width: "inherit",
              height: "inherit",
              background: "red",
              top: 0,
              left: 0,
              borderRadius: "inherit",
              justifyContent: "center",
              opacity: 0,
              pointerEvents: "none"
            }}
          >
            play all
          </Stack>
          <Title $variant="body1" $textEllipsis style={{ marginTop: "8px" }}>
            jwgjrwirrrrrrriririririiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
          </Title>
        </StyledLink>
      </div>
      {variant === "compact" ? null : (
        <div>
          <div>
            {variant === "block" ? (
              <StyledLink
                $variant="caption"
                $color="primary"
                style={{
                  marginTop: "32px",
                  textDecoration: "none",
                  fontWeight: "500"
                }}
              >
                View full playlist
              </StyledLink>
            ) : (
              <>
                <Title $variant="body2" $textEllipsis style={{ color: "red" }}>
                  new
                  playliswrgewrwgkwfwfwrgrwg0wigjwrgjwgjrwirrrrrrriririririiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
                </Title>
                <Caption
                  $textEllipsis
                  style={{ marginTop: variant === "block" && "32px" }}
                >
                  Add
                  desgooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooorrwgrgrgrwgrwrwgwgg
                </Caption>
              </>
            )}
          </div>
          <div>{hoverEl}</div>
        </div>
      )}
    </Container>
  );
};

const Playlists = () => {
  const [popover, setPopover] = useState({});
  const { formData, errors, handleChange, handleSubmit } = useForm();
  const closePopover = () => setPopover({ ...popover, anchorEl: null });
  const renderPopoverContent = () => {
    switch (popover.for) {
      default:
        return (
          <>
            <FeedbackInput
              label="Playlist title (required)"
              placeholder="Add title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
            />
            <Select />
            <div
              style={{
                display: "inline-flex",
                float: "right",
                marginTop: "16px",
                gap: "16px"
              }}
            >
              <Button onClick={closePopover}>Cancel</Button>
              <Button>Create</Button>
            </div>
          </>
        );
    }
  };
  return (
    <>
      <Layout rootPath="dashboard">
        <Stack $justify="space-between" style={{ padding: "24px" }}>
          <Title>Playlists</Title>
          <Button
            variant="text"
            onClick={({ currentTarget }) =>
              setPopover({
                anchorEl: currentTarget,
                open: true,
                for: "new-playlist"
              })
            }
          >
            Create Playlists
          </Button>
        </Stack>
        <VideoList
          url="/channels/playlists"
          columns={[
            {
              field: "playlist",
              headerName: "Playlist",
              width: 450,
              renderCell({ row }) {
                return (
                  <>
                    <PlaylistGroup
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
                          <StyledLink
                            to={`/dashboard/playlists/${row.id}`}
                            state={row}
                          >
                            <ModeEditOutlineIcon />
                          </StyledLink>
                          <StyledLink>
                            <YouTubeIcon />
                          </StyledLink>
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
              width: 150,
              renderCell({ row }) {
                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#fff"
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
              field: "lastUpdated",
              headerName: "Last updated",
              width: 150,
              renderCell({ row }) {
                return (
                  <span style={{ lineHeight: "2" }}>Nov 12, 2022 uploaded</span>
                );
              }
            },
            {
              field: "count",
              headerName: "Video count"
            }
          ]}
        />
      </Layout>
      <Popover
        disablePortal={true}
        open={!!popover.anchorEl}
        anchorEl={popover.anchorEl}
        PaperProps={{
          sx: {
            p: 1,
            pb: 2
          }
        }}
        onClose={closePopover}
      >
        {renderPopoverContent()}
      </Popover>
    </>
  );
};

export default Playlists;
