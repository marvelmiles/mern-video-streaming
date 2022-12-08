import React, { useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
const Steps = styled.div`
  ${({
    $activeStep,
    theme: {
      palette: { primary }
    },
    $styled
  }) => {
    let style = ` 
  display: flex; 
  width:100%;
  max-width:1024px; 
  padding:24px 8px;
  margin-inline: auto;
  & > div {
    cursor: pointer;
    padding: 8px 0px;
    border-radius: 8px;
    position:relative;
    flex:1;  
    min-height:85px;   
    & > * {
      color: ${primary.main};
      word-break: break-word;
      text-align: center;
      position:absolute;
      left:50%;
      transform: translateX(-50%);
    }
 
    & > div:nth-child(1) { 
      font-size:14px;
      font-weight:500;
      top:20px; 
    }

        & > div:nth-child(2) {  
          bottom: 10px;
          width:100%;
    }


    &:hover { 
      background-color: ${primary.light};
      z-index:-1;

    }
  }
  
  & > div:last-child > div:nth-child(2) > div:nth-child(2) {   
   width:0;
  }
 
   & > div:nth-child(${$activeStep + 1}) > div > div:nth-child(1) {   
   transform:scale(1);
  }
    `;
    for (let i = 0; i <= $activeStep; i++) {
      style += `           
  & > div:nth-child(${i}) > div > div:nth-child(2) {   
    &::after {
        width: 100%;
        background-color: ${primary.dark};
      }
  }
  `;
    }
    return css`
      ${style};
      ${$styled};
    `;
  }}
`;

const Step = styled.div`
  ${({
    theme: {
      palette: { divider, primary }
    }
  }) => css`
    position: relative;
    & > div:nth-child(1) {
      position: relative;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: ${primary.main};
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      transform: scale(0.7);
      z-index: 1;
      & > div {
        width: 50%;
        height: 50%;
        background-color: ${primary.contrastText};
        border-radius: 50%;
      }
    }
    & > div:nth-child(2) {
      position: absolute;
      content: "";
      left: 50%;
      top: 50%;
      transform: translateY(-50%);
      height: 2px;
      background-color: ${divider};
      width: 100%;
      &::after {
        position: absolute;
        content: "";
        height: inherit;
        left: 0%;
      }
    }
  `}
`;

function Stepper({ initStep = 0, labels = [], onClick, styled }) {
  const [activeStep, setActiveStep] = useState(initStep);
  return (
    <Steps $activeStep={activeStep} $styled={styled}>
      {labels.map((label, i) => (
        <div
          key={i}
          onClick={() => {
            setActiveStep(i);
            onClick(i);
          }}
        >
          <div>{label.label || label}</div>
          <Step>
            <div>
              {activeStep === i ? (
                <div />
              ) : labels[i]?.showCheck ? (
                <CheckIcon />
              ) : (
                <div />
              )}
            </div>
            <div />
          </Step>
        </div>
      ))}
    </Steps>
  );
}

Stepper.propTypes = {};

export default Stepper;
