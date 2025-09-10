import * as yup from "yup";

export const loginFormValidation = yup.object().shape({
  email: yup
    .string()
    .required("Email address is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .test("email-or-phone", "Please enter a valid email address", (value) => {
      if (!value) return false;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(value);
    }),
  password: yup.string().required("Password is required"),
});

export const signUpFormValidation = yup.object().shape({
  displayName: yup.string().required("Full name is required"),
  email: yup.string().required("Email address is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup.string().required("Confirm password is required"),
});
