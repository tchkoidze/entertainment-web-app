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
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { red } from "@mui/material/colors";

import { signupSchema } from "../../Schemas";
import axios from "axios";
import { useRef, useState } from "react";

const BASE_URL = import.meta.env.VITE_BACK_URL;

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });

  const [confirmed, setConfirmd] = useState<boolean | null>();

  const [submitClicked, setSubmitClicked] = useState<boolean>();

  const inputAvatar = useRef<HTMLInputElement | null>(null);
  console.log(submitClicked);

  const onSubmit: SubmitHandler<{
    email: string;
    password: string;
    //file: any;
  }> = async (data) => {
    setSubmitClicked(true);
    console.log(submitClicked);

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append(
      "backLink",
      "https://entertainment-web-app-livid.vercel.app/verify"
    );

    if (inputAvatar && inputAvatar.current && inputAvatar.current.files) {
      formData.append("avatar", inputAvatar.current.files[0]);
      console.log(inputAvatar.current.files);
      if (
        inputAvatar.current.files[0].type !== "image/png" &&
        inputAvatar.current.files[0].type !== "image/jpg" &&
        inputAvatar.current.files[0].type !== "image/jpeg"
      ) {
        return;
      }
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      console.log(data.email);
      if (response.status >= 200 && response.status < 300) {
        setConfirmd(true);
        console.log("Signup successful");

        // Perform any additional actions or navigate to the next page here
      } else {
        // Handle other status codes (optional)
        console.log("Signup failed with status:", response.status);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
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
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <InputField
                {...register("email")}
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
                error={!!errors.email}
                helperText={
                  errors.email?.message && String(errors.email?.message)
                }
              />
              <InputField
                {...register("password")}
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
                error={!!errors.password}
                helperText={
                  errors.password?.message && String(errors.password?.message)
                }
              />
              <InputField
                {...register("repeatPassword")}
                margin="normal"
                variant="standard"
                required
                fullWidth
                name="repeatPassword"
                placeholder="Repeat Password"
                type="password"
                id="repeatPassword"
                autoComplete="current-password"
                error={!!errors.repeatPassword}
                // helperText={String(errors.repeatPassword?.message)}
                helperText={
                  errors.repeatPassword?.message &&
                  String(errors.repeatPassword?.message)
                }
                sx={{ caretColor: red }}
              />
              <InputField
                inputRef={inputAvatar}
                margin="normal"
                variant="standard"
                required
                fullWidth
                id="file"
                placeholder="file"
                name="file"
                type="file"
                autoFocus
                error={
                  (submitClicked === true &&
                    inputAvatar &&
                    inputAvatar.current &&
                    inputAvatar.current.files &&
                    inputAvatar.current.files.length > 0 &&
                    !(
                      inputAvatar.current.files[0].type === "image/png" ||
                      inputAvatar.current.files[0].type === "image/jpg" ||
                      inputAvatar.current.files[0].type === "image/jpeg"
                    )) ||
                  (submitClicked === true &&
                    inputAvatar &&
                    inputAvatar.current &&
                    inputAvatar.current.files &&
                    inputAvatar.current.files.length === 0) ||
                  false // Set 'error' to false by default
                }
                helperText={
                  submitClicked === true &&
                  inputAvatar &&
                  inputAvatar.current &&
                  inputAvatar.current.files &&
                  inputAvatar.current.files.length > 0 &&
                  !(
                    inputAvatar.current.files[0].type === "image/png" ||
                    inputAvatar.current.files[0].type === "image/jpg" ||
                    inputAvatar.current.files[0].type === "image/jpeg"
                  )
                    ? "Only PNG, JPG, and JPEG files are allowed!"
                    : submitClicked === true &&
                      inputAvatar &&
                      inputAvatar.current &&
                      inputAvatar.current.files &&
                      inputAvatar.current.files.length === 0
                    ? "No File Chosen"
                    : ""
                }
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
        <Typography variant="body1" sx={{ color: "blue" }}>
          {confirmed ? "Please check your email for confirmation" : ""}
        </Typography>
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
