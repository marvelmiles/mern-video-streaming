import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "../../api/axios";
import { useSelector } from "react-redux";
import { Title, Stack, Button } from "../styled";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Card from "../Card";
import { useTheme } from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { PlaylistGroup } from "../../pages/Dasboard/Playlists";
import ChannelBio from "../Card/ChannelBio";

const FeaturedStreams = props => {
  const {
    currentUser: { id }
  } = useSelector(state => state.user);
  const {
    palette: { divider }
  } = useTheme();
  const [featured, setFeatured] = useState(Array.from(new Array(10)));
  const [suggestions, setSuggestions] = useState(Array.from(new Array(20)));
  useEffect(() => {
    (async () => {
      try {
        const t = await axios.get(`/channels/${id}/featured`);
        console.log(t);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, [id]);
  const responsive = {
    7: {
      breakpoint: { min: 1400, max: Infinity },
      items: 6
    },
    6: {
      breakpoint: { min: 1200, max: 1399 },
      items: 5
    },
    5: {
      breakpoint: { min: 1024, max: 1999 },
      items: 4
    },
    4: {
      breakpoint: { min: 576, max: 1023 },
      items: 3
    },
    2: {
      breakpoint: { min: 400, max: 575 },
      items: 2
    },
    1: {
      breakpoint: { min: 0, max: 399 },
      items: 1
    }
  };
  return (
    <div>
      {featured.map(
        (
          f = {
            title: "How to make an API with Laravel",
            videos: Array.from(new Array(40))
          },
          i
        ) =>
          i === featured.length - 1 ? null : (
            <div
              key={i}
              style={{
                borderBottom: `1px solid ${
                  i === featured.length - 1 ? "transparent" : divider
                }`,
                paddingBottom: "32px",
                margin: "16px 0"
              }}
            >
              <Stack style={{ justifyContent: "normal", marginBottom: "16px" }}>
                <Title $variant="lead2">{f.title}</Title>
                <Button
                  variant="crumb"
                  style={
                    {
                      // backgroundColor: "transparent"
                    }
                  }
                >
                  <PlayArrowIcon /> Play all
                </Button>
              </Stack>
              <Carousel responsive={responsive}>
                {f.playlists
                  ? f.playlists.map((p, i) => (
                      <PlaylistGroup key={i} variant="compact" />
                    ))
                  : f.videos.map((v = { channel: {} }, i) => (
                      <Card key={i} video={v} variant="compact" />
                    ))}
              </Carousel>
            </div>
          )
      )}

      <div style={{ margin: "16px 0", borderBottom: `1px solid ${divider}` }}>
        <Title $variant="lead2" style={{ marginBottom: "16px" }}>
          Some more awesome dev channels
        </Title>
        <Carousel responsive={responsive}>
          {suggestions.map((c, i) => (
            <ChannelBio key={i} />
          ))}
        </Carousel>
      </div>
      <div style={{ margin: "16px 0" }}>
        <Title $variant="lead2" style={{ marginBottom: "16px" }}>
          Channels i want you to see
        </Title>
        <Carousel responsive={responsive}>
          {(
            featured[featured.length - 1] || {
              channels: Array.from(new Array(40))
            }
          ).channels.map((c, i) => (
            <ChannelBio key={i} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

FeaturedStreams.propTypes = {};

export default FeaturedStreams;
