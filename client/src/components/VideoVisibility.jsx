import { Title, CheckContainer, Caption, StyledLink } from "./styled";
import { Radio, RadioGroup } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import DatetimePicker from "./DatetimePicker";
import { useState } from "react";
import { useTheme } from "styled-components";
import { VideoPreview } from "./Card";

export const VideoVisibility = ({ stateRef, palette = {} }) => {
  const {
    palette: { background }
  } = useTheme();
  const [visibility, setVisibility] = useState("private");
  const [date, setDate] = useState("");
  const handleChange = e => setVisibility(e.currentTarget.value);
  const isScheduled = visibility === "scheduled";
  stateRef.handleSubmit = () => {
    return {
      visibility,
      date
    };
  };
  return (
    <div
      style={{
        position: "relative",
        padding: "24px",
        display: "flex",
        gap: "16px",
        width: "100%",
        position: "relative",
        flexWrap: "wrap",
        alignItems: "flex-start"
      }}
    >
      <div style={{ flex: 1 }}>
        <Title>Visibility</Title>
        <Caption>Choose when to publish and who can see your video</Caption>
        <RadioGroup value={visibility} onChange={handleChange}>
          <CheckContainer
            $variant="outline"
            $checked={!isScheduled}
            style={{ margin: "16px 0" }}
          >
            <Radio value={isScheduled ? "" : visibility} />
            <div>
              <label>Save or publish</label>
              <Caption>
                Make your video <span>public</span>, <span>unlisted</span> or
                <span> private</span>
              </Caption>
              <CheckContainer>
                <Radio value="private" />
                <div>
                  <label>Private</label>
                  <Caption>
                    Only you and people you choose can watch your video
                  </Caption>
                </div>
              </CheckContainer>
              <CheckContainer>
                <Radio value="unlisted" />
                <div>
                  <label>Unlisted</label>
                  <Caption>
                    Anyone with the video StyledLink can watch your video
                  </Caption>
                </div>
              </CheckContainer>
              <CheckContainer>
                <Radio value="public" />
                <div>
                  <label>Public</label>
                  <Caption>Everyone can watch your video</Caption>
                </div>
              </CheckContainer>
            </div>
          </CheckContainer>

          <CheckContainer
            $variant="outline"
            $checked={isScheduled}
            style={{ marginBottom: "16px" }}
          >
            <Radio value="scheduled" />
            <div>
              <Title $variant="body1">Schedule</Title>
              <Caption>
                Select a date to make your video
                <span> public</span>
              </Caption>
              {isScheduled ? <DatetimePicker onClose={setDate} /> : null}
            </div>
          </CheckContainer>
        </RadioGroup>
        <div
          style={{
            backgroundColor: background.light,
            padding: "16px 24px",
            borderRadius: "2px"
          }}
        >
          <Title $variant="body1">
            Before you publish, check the following:
          </Title>
          <Caption $textColor="dark" style={{ margin: "16px 0" }}>
            Do kids appear in this video?
          </Caption>
          <Caption style={{ lineHeight: "16px" }}>
            Make sure you follow our policies to protect minors from harm,
            exploitation, bullying, and violations of labor law.{" "}
            <StyledLink>Learn more</StyledLink>
          </Caption>
          <Caption $textColor="dark" style={{ margin: "16px 0" }}>
            Looking for overall content guidance?
          </Caption>
          <Caption>
            Our Community Guidelines can help you avoid trouble and ensure that
            YouTube remains a safe and vibrant community.{" "}
            <StyledLink>Learn more</StyledLink>
          </Caption>
        </div>
      </div>
      <VideoPreview
        style={{
          position: "sticky",
          top: 25,
          left: 0
        }}
      />
    </div>
  );
};
