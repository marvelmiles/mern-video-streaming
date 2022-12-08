import React from "react";

const VideoPolicies = ({ stateRef }) => {
  if (stateRef) {
    stateRef.handleSubmit = () => ({});
  }
  return <div>video policies</div>;
};

export default VideoPolicies;
