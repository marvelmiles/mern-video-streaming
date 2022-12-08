import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Popper, Popover } from "@mui/material";
import Caret from "@mui/icons-material/ThumbUp";
import { Ul, Input, Button } from "./styled";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "../api/axios";

const Container = styled.div`
  ${({
    $variant,
    theme: {
      palette: { divider }
    }
  }) => {
    let styles = `
   display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
   `;
    switch ($variant) {
      case "custom":
        styles += `
      border: 1px solid ${divider};
      `;
      default:
        break;
    }
    return styles;
  }}
`;
const Select = ({
  children,
  items,
  variant = "custom",
  placeholder,
  readOnly,
  value = "",
  close,
  allowInteraction = false,
  url,
  onSelect,
  withCredentials = true,
  selectKey,
  maxWidth = 400,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState(items);
  useEffect(() => {
    if (close) setAnchorEl(null);
    const fetchData = async () => {
      console.log("fetch once....");
      try {
        setData(
          await axios.get(url, {
            withCredentials
          })
        );
      } catch (err) {
        console.log(err.message);
      }
    };
    url && !items && fetchData();
  }, [close, url, items, withCredentials]);
  return (
    <>
      {
        {
          outlined: (
            <Container
              onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
              style={{ cursor: "pointer" }}
            >
              <span> {placeholder}</span>
              <Caret />
            </Container>
          ),
          custom: (
            <Button
              onClick={e => {
                e.stopPropagation();
                setAnchorEl(e.currentTarget);
              }}
              sx={{
                fontWeight: "normal",
                textTransform: "capitalize",
                border: "1px solid red",
                borderColor: "divider",
                width: "100%",
                justifyContent: "space-between",
                padding: "10px",
                width: "100%",
                maxWidth: "400px",
                "&:hover": {
                  // background: "none",
                  borderColor: "text.secondary"
                }
              }}
            >
              <span> {placeholder}</span>
              <ArrowDropDownIcon />
            </Button>
          )
        }[variant]
      }
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        elevation={0}
        sx={{
          pointerEvents: allowInteraction ? "none" : "all",
          maxWidth
        }}
        {...props}
      >
        {url || data ? (
          data ? (
            <>
              {data.length ? (
                <Ul>
                  <li
                    onClick={() => {
                      setAnchorEl(null);
                      onSelect("all");
                    }}
                  >
                    All
                  </li>
                  {data.map((item, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setAnchorEl(null);
                        onSelect(item, i);
                      }}
                    >
                      {item[selectKey] || item}
                    </li>
                  ))}
                </Ul>
              ) : (
                <div>no content</div>
              )}
            </>
          ) : (
            <div>loading....</div>
          )
        ) : (
          children
        )}
      </Popover>
    </>
  );
};

Select.propTypes = {};

export default Select;
