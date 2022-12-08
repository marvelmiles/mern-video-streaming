import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, CardLayout } from "../styled";
import { PlaylistGroup } from "../../pages/Dasboard/Playlists";

const PlaylistStreams = props => {
  const [playlists, setPlaylists] = useState(Array.from(new Array(10)));
  return (
    <div>
      <Button style={{ marginRight: "16px", borderRadius: "8px" }}>New</Button>
      <Button style={{ borderRadius: "8px" }}>Precursory</Button>
      <Button style={{ borderRadius: "8px" }}>Popular</Button>
      <CardLayout
        $gridCol={{
          md: 3,
          lg: 4,
          xl: 5,
          "1400px": 6,
          "1500px": 7,
          "2000px": 8
        }}
      >
        {playlists.map((p, i) => (
          <PlaylistGroup key={i} variant="block" />
        ))}
      </CardLayout>
    </div>
  );
};

PlaylistStreams.propTypes = {};

export default PlaylistStreams;
