import React from "react";

const VideoElements = ({ stateRef }) => {
  if (stateRef) {
    stateRef.handleSubmit = () => ({});
  }
  return <div>video elements</div>;
};

export default VideoElements;
