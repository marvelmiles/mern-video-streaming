import React, { useState } from "react";
import PropTypes from "prop-types";
import MuiChipInput from "material-ui-chip-input";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from "@mui/icons-material/Close";
import { Caption } from "../styled";
import styled from "styled-components";
import { Tooltip } from "@mui/material";

const Container = styled.div`
  ${({
    theme: {
      palette: { divider, text }
    }
  }) => ` 
  width:100%;
  max-width:400px;
   & label {
    display: flex;
    gap: 8px;
    justify-content: space-between;
    align-items: flex-start;
    padding: 8px;
    margin: 16px 0 8px;
    border: 1px solid ${divider};
    &:hover {
      borderColor: ${text.primary};
    }
 
  }`}
`;

const ChipInput = ({ onAdd, onDelete, max = 100 }) => {
  const [chips, setChips] = useState([]);
  const key = `Mui-chip-input-${Date.now()}`;
  return (
    <Container>
      <label htmlFor={key}>
        <MuiChipInput
          disableUnderline
          id={key}
          value={chips}
          onAdd={chip => {
            setChips([...chips, chip]);
            onAdd(chip);
          }}
          onDelete={value => {
            let index;
            let arr = [];
            for (let i = 0; i < chips.length; i++) {
              if (chips[i] === value) {
                index = i;
                continue;
              }
              arr.push(chips[i]);
            }
            setChips(arr);
            index !== undefined && onDelete(index);
          }}
          newChipKeys={["Enter", ","]}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <Tooltip title="Copy all">
            <ContentCopyIcon />
          </Tooltip>
          <Tooltip title="Delete all">
            <CloseIcon onClick={() => setChips([])} />
          </Tooltip>
        </div>
      </label>
      <Caption
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>Enter a comma after each tag</div>
        <div>
          <span>
            {(() => {
              let len = 0;
              for (let chip of chips) {
                len += chip.length;
              }
              return len;
            })()}
          </span>
          /{max}
        </div>
      </Caption>
    </Container>
  );
};

ChipInput.propTypes = {};

export default ChipInput;
