import React from "react";
import PropTypes from "prop-types";
import { Navbar, StyledLink, Avatar, Title, Caption } from "../styled";
import HomeIcon from "@mui/icons-material/Home";
import { useSelector } from "react-redux";
import { VideoPreview } from "../Card";

const StudioSidebar = ({
  drawerMode,
  showVideoPreview,
  $showVideoInfoBp,
  $hideVideoInfoBp
}) => {
  const { openDrawer } = useSelector(state => state.config);
  return (
    <Navbar $drawerMode={drawerMode} $fullWidth={openDrawer} $font="bold">
      {showVideoPreview ? (
        <VideoPreview
          $textEllipsis
          $showVideoInfoBp={$showVideoInfoBp}
          $hideVideoInfoBp={$hideVideoInfoBp}
        />
      ) : (
        <div id="bio">
          <Avatar />
          <div>
            <Title $variant="body1">Your channel</Title>
            <Caption
              $variant="subtitle1"
              style={{
                textTransform: "uppercase",
                marginTop: "8px"
              }}
            >
              Akinrinmola marvellous
            </Caption>
          </div>
        </div>
      )}
      <ul>
        {[
          {
            text: "Downloads"
          }
        ].map((item, i) => (
          <StyledLink>
            <li key={i}>
              <HomeIcon />
              {item.text}
            </li>
          </StyledLink>
        ))}
      </ul>
    </Navbar>
  );
};

StudioSidebar.propTypes = {};

export default StudioSidebar;
