import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import {
  Image,
  Stack,
  StyledLink,
  Avatar,
  Title,
  Button
} from "../components/styled";
import { useParams, Routes, Route, Navigate } from "react-router-dom";
import Icon from "@mui/icons-material/Edit";
import bgUrl from "../img/bg.jpg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Notification from "../components/Notification";
import { Tabs, Tab, AppBar } from "@mui/material";
import FeaturedStreams from "../components/VideoStreams/FeaturedStreams";
import VideoStreams from "../components/VideoStreams";
import PlaylistStreams from "../components/VideoStreams/PlaylistStreams";

const NotFound = () => {
  return "Not found....";
};

const Channel = () => {
  let { channelName, "*": tab = "" } = useParams();
  tab = {
    featured: 0,
    videos: 1,
    playlists: 2
  }[tab.toLowerCase()];
  const [activeTab, setActiveTab] = useState(tab >= 0 ? tab : undefined);

  if (activeTab === undefined) return <NotFound />;
  return (
    <Layout>
      <div
        style={{ position: "relative", height: "300px", maxHeight: "300px" }}
      >
        <Image
          $variant="inherit"
          $bgFixed
          style={{
            backgroundImage: `url(${bgUrl})`
          }}
        />
        <Stack
          style={{
            border: "1px solid red",
            width: "auto",
            position: "absolute",
            right: 0,
            bottom: 24
          }}
        >
          <StyledLink
            color="primary"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <Avatar $size="xs" />
            Website & courses
          </StyledLink>
          <Icon />
          <Icon />
          <Icon />
          <Icon />
        </Stack>
      </div>
      <Stack $justify="space-around" style={{ marginTop: "24px" }}>
        <Stack style={{ gap: "24px" }}>
          <Avatar $size="lg" src={bgUrl} />
          <div>
            <Stack>
              <Title $variant="lead">{channelName}</Title>
              <CheckCircleIcon style={{ fontSize: "16px" }} />
            </Stack>
            <Title $textColor="secondary" $variant="subtitle">
              @{channelName}
            </Title>
            <Title $textColor="secondary" $variant="subtitle">
              162k subscribers
            </Title>
          </div>
        </Stack>
        <Stack>
          <Button variant="crumb">Subscribed</Button>
          <Notification />
        </Stack>
      </Stack>
      <Tabs
        value={activeTab}
        onChange={(_, tab) => {
          console.log(tab, "tbayy");
          setActiveTab(tab);
        }}
        variant="scrollable"
        scrollButtons="auto"
        // textColor="inherit"
        // indicatorColor="inherit"
        sx={{
          position: "sticky",
          top: "60px",
          left: "0",
          backgroundColor: "background.paper",
          borderBottom: "1px solid transparent",
          borderBottomColor: "divider",
          zIndex: "appBar"
        }}
      >
        {[
          {
            label: "Home",
            to: "featured"
          },
          {
            label: "Videos",
            to: "videos"
          },
          {
            label: "Playlists",
            to: "playlists"
          },
          {
            label: "Community"
          },
          {
            label: "Channels"
          },
          {
            label: "About"
          }
        ].map(t => (
          <Tab
            key={t.label}
            label={t.label}
            to={t.to}
            component={StyledLink}
            wrapped
          />
        ))}
      </Tabs>
      <Routes>
        <Route path="featured" element={<FeaturedStreams />} />
        <Route path="videos" element={<VideoStreams />} />
        <Route path="playlists" element={<PlaylistStreams />} />
        <Route index element={<Navigate to="featured" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default Channel;
