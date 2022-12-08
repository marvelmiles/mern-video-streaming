import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { VideoDetails } from "../../components/VideoDetails";
import Layout from "../../components/Layout";
import { useTheme } from "styled-components";
export default function Details() {
  const state = useLocation().state;
  const { palette } = useTheme();
  return (
    <Layout rootPath="dashboard">
      <VideoDetails video={state} palette={palette} />
    </Layout>
  );
}
