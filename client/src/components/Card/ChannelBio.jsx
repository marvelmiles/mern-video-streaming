import React from "react";
import PropTypes from "prop-types";
import { Avatar, Title, Caption, Button } from "../styled";

const ChannelBio = props => {
  return (
    <div style={{ textAlign: "center" }}>
      <Avatar $size="lg" style={{ marginInline: "auto" }} />
      <Title
        $textEllipsis
        $variant="body2"
        style={{ margin: "0 auto 8px auto" }}
      >
        lead nameaaaaa
      </Title>
      <Caption $textEllipsis>359k subscribers</Caption>
      <Button variant="crumb" style={{ margin: "16px auto", display: "block" }}>
        Subscribe
      </Button>
    </div>
  );
};

ChannelBio.propTypes = {};

export default ChannelBio;
