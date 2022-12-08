import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Card from "../components/Card";
import axios from "../api/axios";
import Layout from "../components/Layout";
import { CardLayout, Tab } from "../components/styled";
import { Tabs } from "@mui/material";

const Home = ({ type = "random" }) => {
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `/videos/${type}?video_select=likes=size views createdAt title imgUrl channel&channel_select=imgUrl name`
        );
        console.log(res);
        setVideos(res);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchVideos();
  }, [type]);
  return (
    <Layout>
      <Tabs
        sx={{
          position: "sticky",
          top: "64px",
          backgroundColor: "primary.main",
          pb: 2,
          pt: 1,
          zIndex: "appBar"
        }}
        TabIndicatorProps={{
          sx: {
            display: "none"
          }
        }}
        value={activeTab}
        variant="scrollable"
        scrollButtons="auto"
      >
        {Array.from(new Array(24)).map((tab = {}, i) => (
          <Tab
            key={i}
            label={tab.label || "Thriller"}
            onChange={(_, tab) => setActiveTab(tab)}
            variant="chip"
          />
        ))}
      </Tabs>

      <CardLayout>
        {videos.map((video = {}, i) => (
          <Card key={video.id} video={video} />
        ))}
      </CardLayout>
    </Layout>
  );
};

export default Home;
