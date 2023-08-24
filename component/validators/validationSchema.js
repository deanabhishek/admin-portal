import * as Yup from "Yup";

export const RegisterValidationSchema = Yup.object({
  firstName: Yup.string().required("First Name cannot be emptY."),
  lastName: Yup.string().required("Last Name cannot be emptY."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match.")
    .required("Confirm Password is required."),
});

export const LoginValidationSchema = Yup.object({
  username: Yup.string().required("Username cannot be emptY."),
  password: Yup.string().required("Password cannot be emptY."),
});

export const NewUserValidationSchema = Yup.object({
  firstName: Yup.string().required("First Name cannot be emptY."),
  lastName: Yup.string().required("Last Name cannot be emptY."),
  email: Yup.string().email().required("Email is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match.")
    .required("Confirm Password is required."),
});
