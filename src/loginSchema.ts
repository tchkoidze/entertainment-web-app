import * as yup from "yup";

const loginSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is requireddd")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-zA-Z0-9!,-_.]).*$/,
      "Password must start with a capital letter and can contain letters, digits, and characters like !, -, _, and ."
    ),
});

export default loginSchema;
