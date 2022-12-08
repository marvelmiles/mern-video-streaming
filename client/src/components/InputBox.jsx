import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import { Button, IconButton, Avatar, Caption, Input, Stack } from "./styled";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Checkbox, TextField } from "@mui/material";
import { Notice } from "./Card";

const NewComment = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 24px 0;
`;

const TextArea = styled.textarea`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme: { palette } }) => palette.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  resize: none;
`;

const ButtonGroup = styled.div`
  margin-left: 8px;
  & button {
    border-radius: 24px;
    margin-left: 8px;
  }
`;

const LabelContainer = styled.label`
  ${({
    theme: {
      palette: {
        divider,
        text: { primary, secondary }
      }
    }
  }) => css`
    border: 1px solid ${divider};
    display: block;
    margin: 24px 0;
    border-radius: 5px;
    width: 100%;
    padding: 8px;
    &:hover {
      border-color: ${secondary};
    }

    & label {
      color: ${secondary};
    }

    & textarea {
      width: 100%;
      background-color: transparent;
      width: 100%;
      color: ${primary};
      outline: 0;
      box-shadow: none;
      resize: none;
      padding: 12px;
    }

    & input,
    & textarea {
      border: none;
      padding-left: 0;
      margin: 0;
      &:focus + div {
        opacity: 1 !important;
      }
    }
  `}
`;

export const FeedbackInput = ({
  value = "",
  onChange,
  label,
  placeholder,
  name,
  max = 100,
  multiline,
  handleAction,
  variant,
  notice,
  error
}) => {
  switch (variant) {
    case "underline":
      return (
        <div>
          <TextField
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            sx={{
              color: "#fff",
              border: "1px solid #fff"
            }}
          />
          <Stack justify="space-between">
            <span>Required</span>
            <span>{value.length}</span>
          </Stack>
          <div>
            <Button onClick={() => handleAction("cancel")}>Cancel</Button>
            <Button onClick={() => handleAction("save")}>save</Button>
          </div>
        </div>
      );
    default:
      return (
        <LabelContainer htmlFor={`${label}-feedback-input`}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: 0
            }}
          >
            <label>{label}</label>
            <Notice message={notice} placement="top" />
          </div>
          {multiline ? (
            <textarea
              id={`${label}-feedback-input`}
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={e => e.currentTarget.value.length <= max && onChange(e)}
            />
          ) : (
            <Input
              id={`${label}-feedback-input`}
              name={name}
              value={value || ""}
              placeholder={placeholder}
              onChange={e => e.currentTarget.value.length <= max && onChange(e)}
            />
          )}
          <Caption style={{ textAlign: "right", opacity: 0, width: "100%" }}>
            {value.length}/{max}
          </Caption>
        </LabelContainer>
      );
  }
};

function InputBox({
  value,
  placeholder = "Add a comment",
  handleAction,
  showActionArea,
  variant,
  onCancel,
  style
}) {
  const { currentUser: channel } = useSelector(state => state.user);
  const [openActionArea, setOpenActionArea] = useState(showActionArea);
  const [_value, _setValue] = useState(value);
  return (
    <NewComment style={style}>
      <Avatar src={channel.imgUrl} variant={variant} />
      <div style={{ flex: 1 }}>
        <TextArea
          placeholder={placeholder}
          value={_value}
          onChange={({ currentTarget }) => _setValue(currentTarget.value)}
          onFocus={() => setOpenActionArea(true)}
        />
        {openActionArea ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px"
            }}
          >
            <IconButton>emo</IconButton>
            <ButtonGroup>
              <Button
                variant="bgHover"
                onClick={() =>
                  onCancel ? onCancel() : setOpenActionArea(false)
                }
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  if (channel.id) {
                    _value &&
                      handleAction(
                        value ? "update-comment" : "comment",
                        _value
                      );
                    _setValue("");
                  } else handleAction("no-login");
                }}
              >
                {value ? "Update" : "Post"}
              </Button>
            </ButtonGroup>
          </div>
        ) : null}
      </div>
    </NewComment>
  );
}

export const SelectInput = ({ onSelect, value, readOnly, placeholder }) => {
  return (
    <div
      style={{
        border: "1px solid red",
        maxWidth: "250px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Input
        style={{ margin: 0, border: 0 }}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
      />
      <ArrowDropDownIcon
        onClick={({ currentTarget }) => onSelect(currentTarget)}
        sx={{ color: "red", fontSize: "32px", cursor: "pointer" }}
      />
    </div>
  );
};

InputBox.propTypes = {};

export default InputBox;
