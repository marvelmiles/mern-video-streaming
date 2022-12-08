import styled, { css, createGlobalStyle } from "styled-components";
import { NavLink } from "react-router-dom";
import MuiButton from "@mui/material/Button";
import MuiTab from "@mui/material/Tab";
import ImageIcon from "@mui/icons-material/Image";
export const GloabalCSS = createGlobalStyle`
${({
  theme: {
    palette: { text, background, primary, mode }
  }
}) => {
  mode = mode === "dark";
  return `
*,&::before,&::after {
  margin:0;
  padding:0;
  border:0        ; 
  box-sizing:border-box;
  transition: all linear 200ms;
   }

   a {
     color:inherit;
     text-decoration:none;
   }
   & p {
     margin-bottom: 16px;
   }

   .MuiDataGrid-columnHeader:focus-within {
        outline: solid ${mode ? text.primary : primary.main} 1px !important;
   }

   .MuiDataGrid-cell {
     white-space:normal !important;  
     word-break:break-word;
 &:focus-within{
        outline: solid ${mode ? text.primary : primary.main} 1px !important;

      }
 & > * {
   padding: 16px;
 }
   }

   .MuiDataGrid-row {
        cursor: pointer;
         &.Mui-selected {
                background-color:${background.paper} !important;
              }
   }

                        .MuiDataGrid-columnHeaders > * {
              color: ${text.primary};
            }
            .MuiDataGrid-virtualScroller >  *  {
              color: ${text.primary}
            };
            .MuiDataGrid-overlay {
              color:  ${text.primary}
            };
    .MuiDataGrid-footerContainer {
              padding: 8px;
              & *{
                color: ${text.primary};
              }
            }
   .MuiDataGrid-checkboxInput.Mui-checked {
        color:${mode ? text.primary : primary.main} !important;
      }

.MuiSvgIcon-root {
  cursor:pointer;
  width:.85em;
  height:.85em;
line-height:0;
  flex:none !important;
  color: ${text.primary};
 }
 

 .MuiChip-root{
   overflow:hidden; 
 }

 .react-multi-carousel-item:not(:first-child):not(last-child) {
   margin:0 8px;
 }
  
 input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      background-color: transparent;
      transition: background-color 5000s ease-in-out 0s;
      -webkit-text-fill-color: ${text.secondary};
      color:${text.secondary};
      caret-color:${text.secondary};
    }

`;
}}
  `;

export const StyledLink = styled(NavLink)`
  ${({
    theme: {
      palette: { background, text, mode }
    },
    $variant,
    $sx,
    $textEllipsis,
    $color,
    $disableHover,
    ...rest
  }) => {
    let styles = `
    color: inherit;
    text-decoration: none;
    color: ${mode === "dark" ? text.primary : background.mainBlue};
    display:inline-block;
    ${
      $disableHover
        ? ""
        : `
       &:hover {
      text-decoration: underline;
    }
      `
    }
    &:active {
      color: red !important;
      font-size:34px !important;
    }
  `;
    switch ($variant) {
      case "crumb":
        styles += `
      padding: 8px 16px;
      display: inline-flex;
      align-items:center;
      gap: 8px;
      justify-content:center;
      background-color: ${background.light};
      border-radius: 32px;
      &:hover {
        text-decoration: none;
      }
      `;
        break;
      case "caption":
        styles += `  
  font-size: 12px;
  margin-bottom: 0;
  line-height: 18px;
  & > span {
    font-weight: bold;
  }
      `;
        break;
      default:
        break;
    }
    return css`
      ${styles};
      ${$sx};
      ${$textEllipsis
        ? `
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  max-width:100%;
  `
        : ``}
    `;
  }}
`;

export const Title = styled.h2`
  ${({
    theme: {
      palette: { text, background }
    },
    $variant,
    $bgColor,
    $textEllipsis,
    $textColor
  }) => {
    let styles = `
    margin-bottom: 0px;
    color:${text[$textColor || "secondary"]}; 
    `;
    switch ($variant) {
      case "body1":
        styles += `
        font-size:14px; 
        font-weight:500;
        `;
        break;
      case "body2":
        styles += `
      font-size:12px; 
      font-weight:500; 
        `;
        break;
      case "subtitle":
        styles += `
         font-size: 14px;
        font-weight: 400;
        `;
        break;

      case "lead":
        styles += `
        text-transform: capitalize;
        font-size:1.4em;
        font-weight: 400;
`;
        break;
      case "lead2":
        styles += `
        font-size:16px;
        font-weight:500;
        `;
        break;
      case "title":
        styles += `
              font-size:16px;
        font-weight:600;
      `;
        break;
      default:
        styles += `
        margin:16px 0;
        text-transform: capitalize;
        font-size:1.2em;
        font-weight: 600;
        `;
        break;
    }
    return css`
      ${styles};
      ${$textEllipsis
        ? `
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap; 
  width:100%;
  `
        : ``}
    `;
  }}
`;

export const Input = styled.input`
  ${({
    theme: {
      palette: {
        divider,
        text: { secondary },
        error: { main }
      }
    },
    $sx = "",
    $error
  }) => css`
    border: 1px solid ${$error ? main : divider};
    border-radius: 5px;
    padding: 12px;
    background-color: transparent;
    width: 100%;
    color: ${secondary};
    outline: 0;
    box-shadow: none;
    margin: 24px 0 ${$error === undefined ? 16 : 8}px 0px;
    ${$sx};
  `}
`;

export const Button = styled(MuiButton).attrs(a => ({
  disableRipple: !!a.disableRipple
}))`
  ${({
    theme: {
      palette: {
        background: { light, dark },
        // text: { primary },
        action: { disabled },
        primary,
        common,
        mode,
        divider,
        ...rest
        // action: { hover }
      }
    },
    variant,
    $enableCommon
  }) => {
    mode = mode === "dark";
    let styles = `  
    text-transform: none;
 
    &:disabled {
       & svg {
      color: ${disabled};
    }
    }
  `;
    switch (variant) {
      case "crumb":
        styles += `
      border-radius:32px;
      `;
        break;
      case "text":
        styles += `
        background:transparent;
        &:hover {
          background: transparent;
        }
        `;
        break;
      case "contained":
        if ($enableCommon)
          styles += `
       background-color: ${common.black};
       color:${common.white};
       &:hover {
         background-color:${common.darkBlack};
       }
       `;
        else {
          styles += `
          background-color:${primary.light};
          &:hover {
            background-color:${primary.hover};
          }
          `;
        }
        break;
      case "outlined":
        if ($enableCommon)
          styles += `
                border:1px solid ${mode ? divider : common.black};
        color:${mode ? common.white : common.black};
       &:hover { 
         border-color:${common.darkBlack}; 
       }
        `;
        styles += `
        & svg {
         color:inherit;
       }
      `;
        break;
      default:
        break;
    }
    return styles;
  }}
`;

export const More = styled.div`
  display: flex;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
`;

export const Stack = styled.div`
  ${({
    theme: {
      palette: {
        divider,
        error: { main: error }
      }
    },
    $direction,
    $justify,
    $sx,
    $borderLine,
    $variant,
    $error
  }) => `
     display: flex;
    flex-direction: ${$direction || "row"};
    align-items: center;
    justify-content: ${$justify || "space-between"};
    border:${$borderLine ? divider : "1px solid  transparent"};
    // width:100%;
${{
  inputAddon: `
    border:1px solid ${$error ? error : divider};
    margin-top:16px;
    margin-bottom:5px;
    padding:0px 8px;
    border-radius:5px;
    & > input {
      margin:0;
      border:0;
    }
    &  svg {
      width:1em;
      height:1em;
      margin:0;  
    }
    `
}[$variant] ||
  `
  gap:8px;
  `};
    ${$sx};
  `}
`;

export const Paper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.palette.bgSoft};
    position: relative;
    box-shadow: ${theme.shadows[0]};
    border-radius: 8px;
  `}
`;

export const Wrapper = styled.div`
  ${({ $in, theme }) => css`
    position: absolute;
    text-align: center;
    background-color: ${theme.bgLighter};
    border: 1px solid ${theme.soft};
    padding: 20px 50px;
    gap: 10px;
    transform: ${`translateX(${$in ? "-150" : "0"}%)`};
    transition: all ease-in-out 1s;
  `}}
`;

export const Caption = styled.p`
  ${({
    theme: {
      palette: { text }
    },
    $textColor,
    $textEllipsis
  }) => `
    color: ${text[$textColor] || text.caption};
  display: inline-block;
  font-size: 12px;
  margin-bottom: 0;
  line-height: 18px;
  & > span {
    font-weight: bold;
  }
  ${
    $textEllipsis
      ? `
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  max-width:100%;
  `
      : ``
  }
    `}
`;

export const Loading = styled.div``;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-weight: bold;
  height: 56px;
  padding: 0 8px;
  color: ${({
    theme: {
      palette: {
        text: { primary }
      }
    }
  }) => primary};
  & img {
    height: 25px;
  }
`;

export const IconButton = styled.button`
  ${({
    theme: {
      palette: { text, background }
    }
  }) => css`
    min-width: 35px;
    width: 35px;
    min-height: 35px;
    height: 35px;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: ${background.light};
    color: ${text.primary};
    cursor: pointer;
    border: 0;
    &:hover {
    }
  `}
`;

export const Divider = styled.hr`
  margin: 16px 0;
  border: 0.5px solid ${({ theme: { palette } }) => palette.soft};
`;

export const Avatar = styled.img`
  ${({
    theme: {
      palette: {
        primary: { light }
      }
    },
    $size = "sm"
  }) => {
    $size = {
      lg: 75,
      sm: 35,
      xs: 16
    }[$size];
    return css`
      min-width: ${$size}px;
      width: ${$size}px;
      min-height: ${$size}px;
      height: ${$size}px;
      border-radius: 50%;
      background-color: ${light};
      border: 0;
      outlined: 0;
    `;
  }}
`;

export const ButtonGroup = styled.div`
  ${({
    variant,
    theme: {
      palette: { text, background, divider }
    },
    $showDivider,
    $styled
  }) => css`
    display: flex;
    background-color: ${background.light};
    border-radius: ${variant === "crumb" ? 24 : 0}px;
    padding: 0 !important;
    align-items: center; 
    & > * {
      // background-color: transparent;
      // color: ${text.primary};
      flex: 1;
      padding:8px;
      min-width:0;
      gap:8px;
      & > span {
        display:none;
      }
    }
    & > button:first-child {
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    & > button:last-child {
      border-top-right-radius: inherit;
      border-bottom-right-radius: inherit;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: 1px solid ${$showDivider ? divider : "transparent"};
    }
    ${$styled};
  `}
`;

export const iconSX = {
  background: "",
  fontSize: "3em",
  cursor: "pointer",
  borderRadius: "50%",
  p: "8px",
  color: "inherit",
  "&:hover": {
    backgroundColor: "blue",
    curosr: "pointer"
  }
};

export const Ul = styled.ul`
  ${({
    theme: {
      palette: {
        background: { paper },
        text: { secondary },
        error: { main },
        primary: { hover }
      },
      shadows
    },
    $variant
  }) => {
    let styles = `
    color: ${secondary};
    `;
    switch ($variant) {
      case "info":
        styles += `
        padding:16px;
        box-shadow:${shadows[1]};
        border-radius:5px;
        background-color:${paper};
        margin-top:16px;
        margin-bottom:8px;
        
        & > p{
          font-weight:bold;
          & > span {
            font-size:20px;
             color:${main};
          }
        }
        & > div {
          margin-left:40px;
          margin-top:16px;
       & li {
            margin:8px 0px;
       }
        }
        `;
        break;
      default:
        styles += `
          a {
    display: block;
  }
        & li {
    display: flex;
    padding: 8px;
    cursor: pointer;
    align-items:center;
    gap: 8px;
    list-style: none;
    & > svg {
      width:1em;
      height:1em; 
    }
              &:hover {
      background-color: ${hover};
    }
  }
     `;
        break;
    }
    return styles;
  }}
`;

export const CheckContainer = styled.div`
  ${({
    $variant,
    $checked,
    theme: {
      palette: {
        text: { primary },
        divider
      }
    }
  }) => css`
    display: flex;
    gap: 8px;
    margin: 8px 0;
    padding: 0;
    border: 0;
    margin-left: -10px;
    align-items: center;
    ${{
      outline: `
      align-items:flex-start;
       padding: 16px;
       border: 1px solid ${$checked ? primary : divider};
       margin-left:initial;
       border-radius: 8px;
  `
    }[$variant]}
    & > div {
      & > label {
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        display: block;
      }
      & > div > div {
        & > label {
          font-weight: 500;
        }
      }
    }
  `}
`;

export const flexCenter = {
  display: "flex",
  alignItems: "center"
};

export const Toolbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0px 32px;
  flex: 1;
  & > div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

export const Image = styled.img`
  ${({
    $variant,
    theme: {
      palette: {
        primary: { light }
      },
      breakpoints: {
        values: { md }
      }
    },
    $bgFixed
  }) => {
    let styles = `
    display:block;
    background-color: ${light};
    border: 0; 
    min-width:0;
    min-height:0;
     width: 100%;
    object-fit:cover;
    background-repeat:no-repeat;
    background-position:center;
    border-radius: 12px; 
    border:none;
    outline-color:red;
    ${
      $bgFixed
        ? `
      border-radius:0;
      background-attachment:fixed;
      background-size:cover;
      height: 100%;
      max-height: inherit;
      `
        : ""
    };
  `;
    switch ($variant) {
      case "list":
        styles += `
        width: 200px;
        height:110px;
        `;
        break;
      case "compact":
        styles += `
        width:100%;
        height:110px;
        border:1px solid red;
        `;
        break;
      case "inherit":
        styles += `
          height:inherit;
    border-radius:inherit;
      `;
        break;
      default:
        styles += `
          height: 160px;
          @media screen and (min-width:${md}){
            height:180px;
          }
      `;
        break;
    }
    return css`
      ${styles}
    `;
  }}
`;

export const Navbar = styled.nav`
  ${({
    theme: {
      palette: { primary, text, background },
      breakpoints: { values }
    },
    $fullWidth,
    $drawerMode,
    $font = "light"
  }) => {
    console.log(`${$fullWidth} ${$drawerMode}`);
    return css`
      width: 100%;
      // border: 1px solid purple;
      position: fixed;
      height: 100%;
      top: 64px;
      left: 0;
      overflow: auto;
      padding: 8px;
      padding-top: 0;
      display: none;
      background-color: ${primary.main};

      & a:hover {
        text-decoration: none;
      }
      .sub-links {
        display: ${$drawerMode ? "block" : "none"};
      }

      & > div {
        margin-bottom: 8px;

        & > div#bio {
          display: none;
          margin-top: 24px;
          text-align: center;
          @media screen and (min-width: ${values.md}) {
            display: block;
          }
        }
      }

      & > div > img:nth-child(1) {
        margin-left: 24px;
      }

      & a {
        width: 100%;
        display: block;
        &.active li {
          font-weight: 600;
        }
      }

      & li {
        list-style: none;
        width: inherit;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        padding: 8px;
        width: 100%;
        margin: 10px auto;
        border-radius: 8px;
        font-weight: 400;
        font-size: 12px;
        justify-content: center;
        color: ${text.secondary};
        & svg {
          font-size: 2em;
          color: ${text.primary};
          // font-weight: 200;
        }

        &:hover {
          background-color: ${primary.light};
        }
      }
      @media screen and (min-width: ${values.sm}) {
        display: block;
        width: 95px;
      }
      @media screen and (min-width: ${values.md}) {
        ${$fullWidth
          ? `
          width:220px;
       & li {
        font-size: 16px;
        justify-content:normal;
        & svg {
          font-size: 1.8em;
        }
       }
       `
          : `
          width: 95px;
          `}
      }

      @media screen and (min-width: ${values.lg}) {
        ${!$fullWidth
          ? `
          width:220px;
       & li {
         font-size: 16px;
        justify-content: normal;
        & svg {
          font-size: 1.8em;
        }
       }
       `
          : `
          width: 95px;
          `}
      }
    `;
  }}
`;

export const CardLayout = styled.div`
  ${({
    theme: {
      breakpoints: { values }
    },
    $gridCol = {
      xs: 1,
      sm: 2,
      lg: 3,
      xl: 4,
      "1700px": 5,
      "2000px": 6
    }
  }) => {
    let styles = `
   display: flex;
  flex-wrap: wrap;
  & > div { 
    padding: 8px; 
  }
  `;
    for (let key in $gridCol) {
      styles += `
    & > div {
        @media screen and (min-width: ${values[key] || key}) {
      width: ${100 / $gridCol[key]}%;
    }
    } 
    `;
    }
    return styles;
  }}
`;

export const Tab = styled(MuiTab)`
  ${({
    theme: {
      palette: {
        primary,
        secondary,
        mode,
        text: { secondary: blend }
      }
    },
    variant
  }) => {
    mode = mode === "dark";
    return (
      {
        chip: ` 
  border-radius: 8px;
  min-width: 0;
  min-height: 0;
  margin: 0 8px;
  padding: 8px;
color: ${primary.contrastText};
background-color:${primary.light};
&:hover {
background-color:${primary.hover};
};
  &.Mui-selected {
    background-color:${secondary[mode ? "light" : "main"]};
    color:${primary.dark};
    &:hover {
      background-color:${secondary.main};
    }
  }

    `
      }[variant] || ``
    );
  }}
`;
