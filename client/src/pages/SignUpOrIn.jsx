import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../config";
import { Link as RouteLink } from "react-router-dom";

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
  margin: 16px 0;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 100px);
  color: ${({ theme }) => theme.text};
  position: relative;
`;
const Wrapper = styled.div`
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

const SignUpOrIn = ({ hideLogin = false }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_hideLogin, _setHideLogin] = useState(hideLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.target && e.preventDefault();
    dispatch(loginStart());
    try {
      let res;
      switch (e) {
        case "google":
          let res = await signInWithPopup(auth, provider);
          return console.log(res);
          res = await axios.post(
            `${API_ENDPOINT}/auth/signin?provider=google`,
            {
              username: res.user.displayName,
              email: res.user.email,
              avatar: res.user.photoURL
            }
          );
          break;
        default:
          res = await axios.post("/auth/signin", { name, password });
          break;
      }
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  //TODO: REGISTER FUNCTIONALITY

  return (
    <Container>
      <div
        style={{
          position: "relative",
          minHeight: "350px",
          width: "100%",
          padding: "8px",
          // border: "1px solid red",
          overflow: "hidden",
          maxWidth: "600px"
        }}
      >
        <Wrapper $in={_hideLogin}>
          <Title>Sign in</Title>
          <SubTitle> continue</SubTitle>
          <Button onClick={() => handleLogin("google")}>
            Signin with Google
          </Button>
          <Input
            placeholder="username"
            onChange={e => setName(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
          />
          <SubTitle>
            You do'n have an ccount signup{" "}
            <RouteLink to="/signup">Sign up</RouteLink>
          </SubTitle>
          <Button onClick={handleLogin}>Sign in</Button>
        </Wrapper>
        <Wrapper $in={!_hideLogin}>
          <Title>Setup Account</Title>
          <Input
            placeholder="username"
            onChange={e => setName(e.target.value)}
          />
          <Input placeholder="email" onChange={e => setEmail(e.target.value)} />
          <Input
            type="password"
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
          />
          <SubTitle>
            Already have an account <RouteLink to="/signin">login</RouteLink>
          </SubTitle>
          <Button>Sign up</Button>
        </Wrapper>
        <More>
          English(USA)
          <Links>
            <Link>Help</Link>
            <Link>Privacy</Link>
            <Link>Terms</Link>
          </Links>
        </More>
      </div>
    </Container>
  );
};

export default SignUpOrIn;
