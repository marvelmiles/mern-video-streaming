import React from "react";
import PropTypes from "prop-types";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import { useTheme } from "styled-components";
const Notification = ({ color = "primary" }) => {
  const {
    palette: { text }
  } = useTheme();
  return (
    <>
      <NotificationsIcon style={{ fontSize: "28px", color: text[color] }} />
    </>
  );
};

Notification.propTypes = {};

export default Notification;
