import React, { useState } from "react";
import {
  Stack,
  Title,
  Input,
  Button,
  Caption,
  Paper,
  StyledLink
} from "../components/styled";
import { useTheme } from "styled-components";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import { signInWithPopup } from "@firebase/auth";
import { auth, provider } from "../firebase";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { debounce } from "../utils";

export default function SignUp() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const onChange = e => {
    const key = e.target.name;
    const value = e.target.value;
    setValues({
      ...values,
      [key]: value
    });
    if (!value)
      return setErrors({
        ...errors,
        [key]: `Field is required`
      });
    if (key === "name")
      return axios
        .post(`/auth/channel-exist`, {
          name: value
        })
        .then(res => {
          console.log(res.data, "cha");
          if (res.data) {
            return setErrors({
              ...errors,
              [key]: "Channel exist"
            });
          }
          delete errors[key];
          setErrors({
            ...errors
          });
        })
        .catch(err => console.log(err.message));
    delete errors[key];
    setErrors({
      ...errors
    });
  };

  const handleSubmit = async e => {
    e.target && e.preventDefault();
    console.log(errors, values);
    if (Object.keys(errors).length) return console.log("error in input");
    dispatch(loginStart());
    try {
      let res;
      switch (e) {
        case "google":
          res = await signInWithPopup(auth, provider);
          res = await axios.post(`/auth/signin?provider=${e}`, {
            name: res.user.displayName,
            email: res.user.email
          });
          break;
        default:
          res = await axios.post(`/auth/signup`, values);
          break;
      }
      console.log("created acc success");
      dispatch(loginSuccess(res.data));
    } catch (err) {
      console.log(err.message);
      dispatch(loginFailure());
    }
  };

  return (
    <Stack
      style={{
        minHeight: "100vh",
        width: "100%"
      }}
    >
      <Paper
        style={{
          padding: "20px",
          maxWidth: "600px",
          width: "90%"
        }}
      >
        <Title style={{ textAlign: "center" }}>Mern Tube</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={values.email || ""}
            onChange={onChange}
          />
          {/* <Caption>Invalid Email</Caption> */}
          <Input
            type="text"
            placeholder="name"
            name="name"
            value={values.name || ""}
            onChange={onChange}
          />
          {/* <Caption>Invalid Email</Caption> */}
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password || ""}
            onChange={onChange}
          />
          {/* <Caption>Inavalid Password</Caption> */}

          <Caption style={{ marginTop: "10px", textAlign: "center" }}>
            Already have an account?{" "}
            <StyledLink to="/signin">signin</StyledLink>
            {/* <StyledLink
              style={{
                color: palette.text,
                "&:hover": {}
              }}
              to="/signin"
            >
              signin
            </StyledLink> */}
          </Caption>

          <Button
            variant="contained"
            type="submit"
            style={{ margin: "24px 0" }}
          >
            Signup
          </Button>
        </form>
        <Button
          variant="outlined"
          style={{
            width: "100%"
          }}
          onClick={() => handleSubmit("google")}
        >
          continue with google
        </Button>
      </Paper>
    </Stack>
  );
}
