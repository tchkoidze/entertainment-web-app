import * as yup from "yup";

const signupSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is requireddd")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-zA-Z0-9!,-_.]).*$/,
      "Password must start with a capital letter and can contain letters, digits, and characters like !, -, _, and ."
    ),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Repeat Password is required"),
  file: yup
    .mixed()
    .required("Please select an image to upload")
    .test("fileType", "Invalid file type. Only images are allowed", (value) => {
      return (
        value &&
        ["image/jpeg", "image/png", "image/svg+xml"].includes(
          (value as File).type
        )
      );
    }),
});

export default signupSchema;
