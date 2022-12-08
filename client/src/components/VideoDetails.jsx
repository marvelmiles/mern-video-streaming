import { useState, useEffect, useRef, useCallback } from "react";
import {
  Title,
  Button,
  Input,
  StyledLink,
  Caption,
  CheckContainer,
  Toolbox
} from "./styled";
import { FeedbackInput, SelectInput } from "./InputBox";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Notice, VideoPreview } from "./Card";
import { Popover, Checkbox, Radio, RadioGroup, Chip } from "@mui/material";
import { PlaylistDialogContent, CategoriesPopoverContent } from "./Layout";
import ChipInput from "./inputs/ChipInput";
import { useParams, useLocation } from "react-router-dom";
import useForm from "../hooks/useForm";
import axios from "../api/axios";
import UploadIcon from "@mui/icons-material/Upload";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Select from "./Select";
import { useTheme } from "styled-components";

const Container = styled.div`
  ${({
    theme: {
      palette: { text }
    }
  }) => {
    return `
  position: relative;
  padding:24px;
  `;
  }}
`;

export const VideoDetails = ({
  palette = {},
  video: _video,
  stateRef,
  handleAction
}) => {
  const { currentUser } = useSelector(state => state.user);
  let {
    reset,
    formData,
    errors,
    handleChange,
    handleSubmit,
    stateChanged
  } = useForm({
    placeholders: _video,
    required: {
      restriction: true,
      title: true,
      image: true
    },
    returnFormObject: true
  });
  const [closeSelect, setCloseSelect] = useState(false);

  const [openAdvRestriction, setOpenAdvRestriction] = useState(false);
  const { videoId } = useParams();
  const {
    palette: { divider, background }
  } = useTheme();
  const _stateRef = useRef({});
  useEffect(() => {
    (async () => {
      try {
        console.log("render once ", videoId);
        const data = await axios.get(`/videos/${videoId || _video.id}`);
        data.image = "";
        _stateRef.data = data;
        reset(data, {
          required: {
            image: !data.imgUrl
          }
        });
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, [_video?.id, reset, videoId]);

  if (stateRef) {
    stateRef.handleSubmit = e => {
      const form = handleSubmit(e);
      if (form) {
        form.append("tags", _stateRef.tags);
        return form;
      }
      return;
    };
  }
  console.log(errors, "details");
  const onChange = e => {
    handleChange(e);
    if (handleAction)
      handleAction(
        "update",
        {
          title: e.currentTarget.value
        }[e.currentTarget.name]
      );
  };
  return (
    <Container>
      {stateRef ? null : (
        <div>
          <Toolbox>
            <Title>Video details</Title>
            <div>
              <Button
                disabled={!stateChanged}
                onClick={() => reset(_stateRef.data)}
              >
                Undo changes
              </Button>
              <Button
                onClick={async e => {
                  const form = handleSubmit(e);
                  if (form) {
                    reset(await axios.put(`/videos/${formData.id}`, form));
                    console.log("done reseting...");
                  }
                }}
              >
                Save
              </Button>
            </div>
          </Toolbox>
        </div>
      )}
      <div
        style={{
          display: "flex",
          gap: "16px",
          width: "100%",
          position: "relative",
          flexWrap: "wrap",
          alignItems: "flex-start"
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Title style={{ marginBottom: 0 }}>Details</Title>
            <Button variant="text">REUSE DETAILS</Button>
          </div>
          <FeedbackInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="Add a title that describes your video"
            notice={
              <Caption style={{ lineHeight: "24px" }}>
                A catchy title can help you hook viewers. When you create video
                titles, it’s a good idea to include keywords your audience is
                likely to use when looking for videos like yours.
                <StyledLink style={{ display: "block", marginTop: "8px" }}>
                  LEARN MORE
                </StyledLink>
              </Caption>
            }
          />
          <FeedbackInput
            multiline
            label="Description"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Tell viewers about your video"
            notice={
              <Caption style={{ lineHeight: "24px" }}>
                Writing descriptions with keywords can help viewers find your
                videos more easily through search. You can give an overview of
                your video and place keywords in the beginning of the
                description.
                <StyledLink style={{ display: "block", marginTop: "8px" }}>
                  LEARN MORE
                </StyledLink>
              </Caption>
            }
          />
          <Title $variant="body1">Video image</Title>
          <div
            style={{
              border: `1px dashed ${divider}`,
              height: "80px",
              width: "150px",
              position: "relative",
              marginTop: "24px"
            }}
          >
            {formData.image ? (
              <img
                src={URL.createObjectURL(formData.image)}
                alt={formData.image.name}
                style={{
                  backgroundColor: "gray",
                  width: "100%",
                  height: "100%"
                }}
              />
            ) : (
              <label
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: "8px"
                }}
                htmlFor={`${formData.title}-file-input`}
              >
                <AddPhotoAlternateIcon />
                <p
                  style={{
                    fontSize: ".7em",
                    marginTop: "2px",
                    marginBottom: 0
                  }}
                >
                  Upload image
                </p>
              </label>
            )}
            <input
              type="file"
              accept="image/*"
              id={`${formData.title}-file-input`}
              style={{ display: "none" }}
              name="image"
              onChange={onChange}
            />
            <div
              style={{
                position: "absolute",
                top: "0px",
                right: "0px"
              }}
            >
              {formData.image ? (
                <label
                  htmlFor={`${formData.title}-file-input`}
                  style={{ backgroundColor: background.light }}
                >
                  <UploadIcon />
                </label>
              ) : (
                <Notice
                  message={
                    <>
                      Recommendations:
                      <ul style={{ padding: "8px 24px" }}>
                        <li style={{ marginTop: "8px" }}>
                          Make your image 1280 by 720 pixels (16:9 ratio){" "}
                        </li>
                        <li style={{ marginTop: "8px" }}>
                          Ensure that your image is less than 2MB Use a JPG,
                          PNG, or GIF file format
                        </li>
                        <li style={{ marginTop: "8px" }}>
                          Make sure your image follows
                          <StyledLink>Community Guidelines</StyledLink>
                        </li>
                      </ul>
                      <StyledLink
                        style={{ display: "block", marginTop: "8px" }}
                      >
                        LEARN MORE
                      </StyledLink>
                    </>
                  }
                />
              )}
            </div>
          </div>
          <Title $variant="body1" style={{ margin: "24px 0 8px" }}>
            Playlists
          </Title>
          <Caption style={{ marginBottom: "16px" }}>
            Adding your video to one or more playlists. Playlists can help
            viewers discover your content faster.{" "}
            <StyledLink>Learn more</StyledLink>
          </Caption>
          <Select placeholder="Select" close={closeSelect}>
            <PlaylistDialogContent
              onSubmit={body => {
                // stateRef.playlists = body;
                setCloseSelect(true);
              }}
              userId={currentUser.id}
            />
          </Select>
          <Title $variant="body1" style={{ margin: "24px 0 8px" }}>
            Tags
          </Title>
          <Caption>
            Tags can be useful if content in your video is commonly misspelled.
            Otherwise, tags play a minimal role in helping viewers find your
            video. <StyledLink>Learn more</StyledLink>
          </Caption>
          <ChipInput
            onAdd={chip => {
              if (_stateRef.tags) _stateRef.tags.push(chip);
              else _stateRef.tags = [chip];
            }}
            onDelete={index => _stateRef.tags.splice(index, 1)}
          />
          <Title $variant="body1" style={{ margin: "24px 0 8px" }}>
            Category
          </Title>
          <Select placeholder="Categories" close={closeSelect}>
            <CategoriesPopoverContent
              onSelect={category => {
                // stateRef.category = category;
                setCloseSelect(true);
              }}
            />
          </Select>
          <Title $variant="body1" style={{ margin: "24px 0 8px" }}>
            Audience
          </Title>
          <Title $variant="body2">
            This video is set to not made for kids
            <Caption
              style={{
                backgroundColor: background.light,
                padding: "5px",
                marginLeft: "16px"
              }}
            >
              Set by you
            </Caption>
          </Title>
          <Caption>
            Regardless of your location, you're legally required to comply with
            the Children's Online Privacy Protection Act (COPPA) and/or other
            laws. You're required to tell us whether your videos are made for
            kids. <StyledLink>What's content made for kids?</StyledLink>
          </Caption>
          <Caption
            style={{
              backgroundColor: background.light,
              padding: "16px",
              margin: "8px 0",
              borderRadius: "2px"
            }}
          >
            Features like personalized ads and notifications won’t be available
            on videos made for kids. Videos that are set as made for kids by you
            are more likely to be recommended alongside other kids’ videos.{" "}
            <StyledLink>Learn more</StyledLink>
          </Caption>
          <RadioGroup
            name="restriction"
            value={formData.restriction || ""}
            onChange={onChange}
          >
            <CheckContainer>
              <Radio value="Made for kids" id="for-kids-checkbox" />
              <label htmlFor="for-kids-checkbox">Yes, its made for kids</label>
            </CheckContainer>
            <CheckContainer>
              <Radio
                id="not-for-kids-checkbox"
                value="Not for kids"
                checked={
                  formData.restriction
                    ? formData.restriction !== "Made for kids"
                    : false
                }
              />
              <label htmlFor="not-for-kids-checkbox">
                No, it is not made for kids
              </label>
            </CheckContainer>

            <label
              onClick={() => setOpenAdvRestriction(!openAdvRestriction)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                cursor: "pointer",
                margin: "16px 0 8px"
              }}
            >
              {openAdvRestriction ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              Age restriction (advanced)
            </label>
            {openAdvRestriction ? (
              <>
                <Title $variant="body2" style={{}}>
                  Do you want to restrict your video to an adult audience?
                </Title>
                <CheckContainer>
                  <Radio value="18+" id="restriction-18+" />
                  <label htmlFor="restriction-18+">
                    Yes, restrict my video to viewers over 18
                  </label>
                </CheckContainer>
                <CheckContainer>
                  <Radio value="Not for kids" id="restriction-not-for-kids" />
                  <label htmlFor="restriction-not-for-kids">
                    No, don't restrict my video to viewers over 18
                  </label>
                </CheckContainer>
              </>
            ) : null}
          </RadioGroup>
        </div>

        <VideoPreview
          style={{
            position: "sticky",
            top: 25,
            left: 0
          }}
        />
      </div>
    </Container>
  );
};
