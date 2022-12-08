import { useState, useEffect, useCallback, useRef } from "react";
import { Loading, Categories } from "./Layout";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip
} from "@mui/material";
import { Title, Button, IconButton } from "./styled";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Stepper from "./Stepper";
import { useTheme } from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { VideoDetails } from "./VideoDetails";
import { VideoVisibility } from "./VideoVisibility";
import VideoElements from "./VideoElements";
import VideoPolicies from "./VideoPolicies";
import axios from "../api/axios";
import { VideoPreview } from "./Card";
function VideoCrud({ video: _video, handleAction }) {
  const [video, setVideo] = useState(_video);
  const [activeStep, setActiveStep] = useState(3);
  const [disabled, setDisabled] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { currentUser } = useSelector(state => state.user);
  const {
    palette: { background },
    breakpoints: { values }
  } = useTheme();
  const stateRef = useRef({}).current;
  const _handleAction = useCallback((reason, data) => {
    switch (reason) {
      default:
        setDisabled(false);
        data &&
          setVideo(prev => ({
            ...prev,
            ...data
          }));
    }
  }, []);

  if (!video) return <Loading />;
  const handleNext = step => {
    const data = stateRef.handleSubmit();
    step = step.target ? activeStep : step;
    if (data) {
      stateRef[step] = data;
      setActiveStep(step + 1);
      return true;
    } else setDisabled(true);
    return;
  };
  return (
    <>
      <DialogTitle
        component="div"
        sx={{
          display: "flex",
          flexWrap: "wrap-reverse",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2
        }}
      >
        <Title
          $variant="body1"
          style={{
            maxWidth: "420px",
            wordBreak: "break-word"
          }}
        >
          video3
          {video.title}
        </Title>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <Title
            $variant="body2"
            $bgColor="light"
            style={{ padding: "0 8px", textTransform: "none" }}
          >
            Saved as {video.privacy} private
          </Title>

          <Tooltip title="Send feedback">
            <ChatBubbleOutlineIcon />
          </Tooltip>

          <Tooltip title="Save and close" placement="bottom">
            <CloseIcon />
          </Tooltip>
        </div>
      </DialogTitle>
      <Stepper
        disabled={disabled}
        initStep={activeStep}
        onClick={() => {}}
        styled={` 
          z-index:1500;
          background:${background.main};
          position:sticky; 
          top:0;
          left:0;
          display: none;
          @media screen and (min-width:${values.sm}){
            display:flex;
          }  
          `}
        labels={[
          {
            label: "Details"
          },
          "Video elements",
          {
            label: "Checks"
          },
          "Visibility"
        ]}
      />
      <DialogContent sx={{ position: "relative", padding: 0 }}>
        {
          [
            <VideoDetails
              video={video}
              handleAction={_handleAction}
              currentUser={currentUser}
              stateRef={stateRef}
            />,
            <VideoElements stateRef={stateRef} />,
            <VideoPolicies stateRef={stateRef} />,
            <VideoVisibility stateRef={stateRef} />
          ][activeStep]
        }
      </DialogContent>
      <DialogActions>
        {activeStep ? (
          <Button onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
        ) : null}
        {stateRef[0] && activeStep === 3 ? (
          <Button
            onClick={async () => {
              try {
                stateRef[activeStep] = stateRef.handleSubmit();
                setIsSaving(true);
                const form = stateRef[0];
                for (let key in stateRef[1]) {
                  form.append(key, stateRef[1][key]);
                }
                for (let key in stateRef[2]) {
                  form.append(key, stateRef[2][key]);
                }
                for (let key in stateRef[3]) {
                  form.append(key, stateRef[3][key]);
                }
                await axios.put(`/videos/${video.id}`, form);
                handleAction("close-dialog");
              } catch (err) {
                console.log(err.message);
              }
            }}
          >
            Save
          </Button>
        ) : (
          <Button disabled={disabled} onClick={handleNext}>
            Next
          </Button>
        )}
      </DialogActions>
    </>
  );
}

export default VideoCrud;
