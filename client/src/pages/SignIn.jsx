import React, { useState } from "react";
import {
  Stack,
  Title,
  Input,
  Button,
  Caption,
  Paper,
  StyledLink,
  Logo,
  Ul
} from "../components/styled";
import { useTheme } from "styled-components";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import { signInWithPopup } from "@firebase/auth";
import { auth, provider } from "../firebase";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import LogoIcon from "../img/logo.png";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import HttpsIcon from "@mui/icons-material/Https";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

export default function SignIn() {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset
  } = useForm();
  const {
    shadows,
    palette: {
      primary: { main },
      background: { paper }
    }
  } = useTheme();
  const [message, setMessage] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async e => {
    dispatch(loginStart());
    return e.preventDefault();
    if (handleSubmit(e)) {
      try {
        let res;
        switch (e) {
          case "google":
            let select =
              "channel_select=email id name subscribersCount subscriptions imgUrl";
            res = await signInWithPopup(auth, provider);
            res = await axios.post(`/auth/signin`, {
              name: res.user.displayName,
              email: res.user.email,
              imgUrl: res.user.photoUrl,
              provider: e
            });
            break;
          default:
            res = await axios.post(`/auth/signin?`, formData, {
              withCredentials: true
            });
            break;
        }
        dispatch(loginSuccess(res));
        navigate("/");
      } catch (err) {
        console.log(err.code, err.message);
        switch (err.code) {
          case "auth/popup-closed-by-user":
            break;
          default:
            err.message =
              err.code.indexOf("auth/") > -1
                ? "Something went wrong. Check network and try again"
                : err.message;
            setMessage(err.message);
            break;
        }
        reset(true);
        dispatch(loginFailure());
      }
    } else reset(false);
  };
  return (
    <>
      <Stack
        style={{
          height: "100vh",
          justifyContent: "center",
          backgroundColor: main
        }}
      >
        <div
          style={{
            padding: "20px",
            maxWidth: "600px",
            width: "100%",
            boxShadow: shadows[1],
            borderRadius: "8px",
            backgroundColor: paper
          }}
        >
          <Logo>
            <img src={LogoIcon} />
            Mern Tube
          </Logo>
          <form onSubmit={handleLogin}>
            <Stack $variant="inputAddon" $error={!!errors.placeholder}>
              <AssignmentIndIcon />
              <Input
                type="text"
                placeholder="Name or Email"
                name="placeholder"
                value={formData.placeholder || ""}
                onChange={handleChange}
              />
            </Stack>
            <Stack $variant="inputAddon" $error={!!errors.password}>
              <HttpsIcon />
              <Input
                type={showPwd ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
              />
              <div onClick={() => setShowPwd(!showPwd)}>
                {showPwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </div>
            </Stack>
            {errors.password ? (
              <Ul $variant="info">
                <p>
                  Password requirements <span>*</span> :
                </p>
                <div>
                  <li>Minimum of 8</li>
                  <li>Alphanumeric character with an uppercase letter</li>
                  <li>Non alphanumeric character</li>
                </div>
              </Ul>
            ) : null}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Caption>
                Don't have an account?{" "}
                <StyledLink to="/signup">signup</StyledLink>
              </Caption>
              <Caption>
                <StyledLink to="/signup">Recover password</StyledLink>
              </Caption>
            </div>
            <Button
              $enableCommon
              disabled={isSubmitting}
              variant="contained"
              type="submit"
              style={{ margin: "24px 0", width: "100%" }}
            >
              Signin
            </Button>
            <Button
              $enableCommon
              variant="outlined"
              disabled={isSubmitting}
              style={{
                width: "100%"
              }}
              onClick={() => handleLogin("google")}
            >
              <GoogleIcon />
              continue with google
            </Button>
          </form>
        </div>
      </Stack>

      <Snackbar open={!!message}>
        <Alert
          severity="error"
          action={<CloseIcon onClick={() => setMessage("")} />}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
