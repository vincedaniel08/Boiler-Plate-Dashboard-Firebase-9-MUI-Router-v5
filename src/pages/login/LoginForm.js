import React from "react";
import * as Yup from "yup";
import { useState } from "react";
// import { Link as RouterLink } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
// ----------------------------------------------------------------------

//backend
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";


export default function LoginForm() {

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      console.log(formik.values.email);
      signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
          const emailVerified = user.emailVerified;

          if (emailVerified === true) {
           

            //  if (userData.currentUserData[0].UserType === "Buyer" ){
            //    auth.signOut();
            //    alert("Your Account is not Admin");
            //  } else {
            //   history.push('/');
            //  }

            // history.push('/');

            // const collectionRefMyData = collection(db, "Users");
            // const MyData = query(
            //   collectionRefMyData,
            //   where("UserUid", "==", user.uid)
            // );
            // onSnapshot(MyData, (snapshot) => {
            //   if (
            //     snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
            //       .UserType === "Admin"
            //   ) {
            //     history.push("/dashboard");
            //   } else {
            //     auth.signOut();
            //     alert("Your Account is not Admin");
            //   }
            // });

     
          } else {
            auth.signOut();
            alert("Your Email is not verified");
          }

          // Signed in

          // ...
        })
        .catch((error) => {
          // error code
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorCode, errorMessage);
          
        });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? (
                      <VisibilityRoundedIcon />
                    ) : (
                      <VisibilityOffRoundedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps("remember")}
                checked={values.remember}
              />
            }
            label="Remember me"
          />

          <Link
         
            variant="subtitle2"
            href="https://dcmonorack.netlify.app/forgotpassword"
            underline="hover"
          >
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
