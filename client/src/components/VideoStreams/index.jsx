import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, CardLayout } from "../styled";
import Card from "../Card";

const VideoStreams = props => {
  const [videos, setVideos] = useState(Array.from(new Array(10)));

  return (
    <div>
      <Button style={{ marginRight: "16px", borderRadius: "8px" }}>
        Recently uploaded
      </Button>
      <Button style={{ borderRadius: "8px" }}>Popular</Button>
      <CardLayout>
        {videos.map((v = { channel: {} }, i) => (
          <Card video={v} hideAvatar />
        ))}
      </CardLayout>
    </div>
  );
};

VideoStreams.propTypes = {};

export default VideoStreams;
