import Auth from "@/layouts/Auth";
import Main from "@/layouts/Main";
import React, { useEffect } from "react";
import { TextField, Button, Divider } from "@mui/material";
import { Google } from "@mui/icons-material";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import useGetAuthUser from "@/redux/thunk/useGetAuthUser";
import { useSession } from "next-auth/react";
import { RootReducerType } from "@/redux/reducers/RootReducers";

const signin = () => {
  const { push } = useRouter();
  const dispatch: any = useDispatch();
  const {
    authState: { authUser },
  } = useSelector((session: RootReducerType) => session);
  const { data } = useSession();

  const handleGoogleSignIn = async () => {
    dispatch({ type: "AUTH_LOADING" });
    const confirmation = await signIn("google", {
      redirect: false,
    });
    console.log(confirmation);

    if (confirmation?.status === 200) {
      console.log(confirmation);
    }
  };

  useEffect(() => {
    if (data?.user?.email && data?.user?.email !== authUser?.email) {
      dispatch(useGetAuthUser(data?.user?.email));
      push("/");
    }
  }, [data]);

  const Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {
        email: "",
        password: "",
      };

      if (!values?.email) errors.email = "Email is required";
      if (!values?.password) errors.password = "Password is required";

      if (errors?.email || errors?.password) {
        return errors;
      }
    },
    onSubmit: async (values) => {
      console.log(values);
      const confirmation = await signIn("credentials", {
        email: values?.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (confirmation?.ok) {
        dispatch(useGetAuthUser(values?.email));
        push(confirmation?.url as string);
      } else {
        if (confirmation?.error?.split("_")?.[0] === "401") {
          Formik.errors.email = confirmation?.error?.split("_")?.[1];
        }

        if (confirmation?.error?.split("_")?.[0] === "403") {
          Formik.errors.email = confirmation?.error?.split("_")?.[1];
          Formik.errors.password = confirmation?.error?.split("_")?.[1];
        }
      }
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
            id=""
            error={Formik.errors.email ? true : false}
            helperText={Formik.errors.email}
            label="Email"
            variant="filled"
            {...Formik.getFieldProps("email")}
            className="bg-white rounded-lg"
            size="small"
          />
          <div className="">
            <TextField
              fullWidth
              id=""
              error={Formik.errors.password ? true : false}
              helperText={Formik.errors.password}
              label="Password"
              {...Formik.getFieldProps("password")}
              variant="filled"
              className="bg-white rounded-lg"
              size="small"
            />
            <Button className="normal-case" size="small">
              Forgot Password ?
            </Button>
          </div>
          <Button
            type="submit"
            variant="contained"
            className="bg-[steelblue]"
            size="small"
          >
            Log In
          </Button>
        </form>
        <Divider />
        <Button
          onClick={handleGoogleSignIn}
          startIcon={<Google />}
          variant="outlined"
          className="bg-white text-[blue]"
        >
          Sign In with Google
        </Button>
        <Link href={"/signup"}>
          <Button className="normal-case" size="small">
            Doesn't have an account ?
          </Button>
        </Link>
      </div>
    </Auth>
  );
};

export default signin;
