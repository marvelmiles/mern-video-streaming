import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import Card from "./Card";
import { Button } from "./styled";
import { useNavigate } from "react-router-dom";

const Recommendation = ({ tags, videoId }) => {
  const [videos, setVideos] = useState(Array.from(new Array(40)));

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `/videos/tags?tags=${tags}&videoId=${videoId}`
        );
        // setVideos(res);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchVideos();
  }, [tags, videoId]);
  return (
    <div>
      eerrr
      <div>
        {videos.map((video = { channel: {} }) => (
          <Card variant="list" key={video.id} video={video} />
        ))}
      </div>
      <Button
        variant="bgHover"
        $borderLine
        style={{
          width: "100%",
          marginTop: "16px",
          borderRadius: "24px"
        }}
      >
        Show more
      </Button>
    </div>
  );
};

export default Recommendation;
