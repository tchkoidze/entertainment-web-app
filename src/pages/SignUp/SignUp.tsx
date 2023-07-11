import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import { SvgIcon } from "@mui/material";
import { red } from "@mui/material/colors";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Logo>
          <LogoSvg>
            <svg width="33" height="27" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z"
                fill="#FC4747"
              />
            </svg>
          </LogoSvg>
        </Logo>

        <FormContainerSign component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "24px 0 32px 0",
            }}
          >
            <Login component="h1" variant="h5">
              SignUp
            </Login>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <InputField
                margin="normal"
                variant="standard"
                required
                fullWidth
                id="email"
                //label="Email Address"
                placeholder="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <InputField
                margin="normal"
                variant="standard"
                required
                fullWidth
                name="password"
                //label="Password"
                placeholder="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <InputField
                margin="normal"
                variant="standard"
                required
                fullWidth
                name="password"
                placeholder="Repeat Password"
                type="password"
                id="repeatPassword"
                autoComplete="current-password"
                sx={{ caretColor: red }}
              />
              <LoginBtn
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create an account
              </LoginBtn>
              <Grid container justifyContent={"center"}>
                <Grid item>
                  <SignupLInk to={"/"}>
                    Alread have an account?
                    <SignUpText> Login</SignUpText>
                  </SignupLInk>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </FormContainerSign>
      </Box>
    </ThemeProvider>
  );
}

const Logo = styled.div`
  text-align: center;
`;

const LogoSvg = styled(SvgIcon)`
  display: inline-block;
`;

const FormContainerSign = styled(({ component, ...rest }) => (
  <Container {...rest} component={component} />
))`
  background-color: var(--darkBlue);
  max-width: 327px;
  margin-top: 58px;
`;

const Login = styled(({ component, ...rest }) => (
  <Typography {...rest} component={component} />
))`
  color: #fff;
`;

const InputField = styled(TextField)`
  label {
    color: rgba(255, 255, 255, 0.5);
  }
  .MuiInputBase-input {
    color: white;
    cursor: pointer;
    border-color: var(--red);
  }
  input {
    caret-color: var(--red);
  }
`;

const LoginBtn = styled(Button)`
  &.MuiButton-contained {
    background-color: var(--red);
    &:hover {
      background-color: white;
      color: var(--darkBlue);
    }
  }
`;

const SignupLInk = styled(Link)`
  color: white;
  text-decoration: none;
`;

const SignUpText = styled.span`
  color: var(--red);
`;
