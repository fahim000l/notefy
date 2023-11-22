import Auth from "@/layouts/Auth";
import React from "react";
import Link from "next/link";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import useSignup from "@/redux/thunk/useSignup";
import { LoadingButton } from "@mui/lab";
import { RootReducerType } from "@/redux/reducers/RootReducers";

export interface CTUser {
  _id?: string;
  email: string;
  userName: string;
  password?: string;
  profilePic?: string;
}

const signup = () => {
  const dispatch: any = useDispatch();
  const {
    authState: { authLoader },
  } = useSelector((state: RootReducerType) => state);

  const Formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      profilePic: "",
      password: "",
      cPassword: "",
    },
    validate: (values) => {
      let error = {
        userName: "",
        email: "",
        profilePic: "",
        password: "",
      };

      if (!values?.userName) {
        error.userName = "User Name is required";
      }

      if (!values?.email) {
        error.email = "Email is required";
      }

      if (!values.password) {
        error.password = "Password is required";
      }

      if (values?.password !== values?.cPassword) {
        error.password = "Password didn't matched";
      }

      if (
        error?.userName ||
        error?.email ||
        error?.password ||
        error?.profilePic
      ) {
        return error;
      }
    },
    onSubmit: async (values) => {
      console.log(values);

      const userInfo = {
        userName: values?.userName,
        email: values?.email,
        password: values?.password,
        profilePic: values?.profilePic,
      };

      dispatch(useSignup(userInfo));
    },
  });

  return (
    <Auth>
      <div className="flex flex-col space-y-3 w-[60%]">
        <form
          onSubmit={Formik.handleSubmit}
          className="flex flex-col space-y-3"
        >
          <TextField
            fullWidth
            error={Formik.errors.userName ? true : false}
            helperText={Formik.errors.userName}
            id=""
            {...Formik.getFieldProps("userName")}
            label="User Name"
            variant="filled"
            className="bg-white rounded-lg"
            size="small"
          />
          <TextField
            fullWidth
            id=""
            error={Formik.errors.email ? true : false}
            helperText={Formik.errors.email}
            {...Formik.getFieldProps("email")}
            label="Email"
            variant="filled"
            className="bg-white rounded-lg"
            size="small"
          />
          <TextField
            fullWidth
            id=""
            label="Password"
            error={Formik.errors.password ? true : false}
            helperText={Formik.errors.password}
            variant="filled"
            {...Formik.getFieldProps("password")}
            className="bg-white rounded-lg"
            size="small"
          />
          <TextField
            fullWidth
            id=""
            error={Formik.errors.password ? true : false}
            helperText={Formik.errors.password}
            label="Confirm Password"
            {...Formik.getFieldProps("cPassword")}
            variant="filled"
            className="bg-white rounded-lg"
            size="small"
          />
          <LoadingButton
            loading={authLoader}
            type="submit"
            variant="contained"
            className="bg-[steelblue]"
            size="small"
          >
            Sign Up
          </LoadingButton>
        </form>
        <Link href={"/signin"}>
          <Button className="normal-case" size="small">
            Already have an account ?
          </Button>
        </Link>
      </div>
    </Auth>
  );
};

export default signup;
