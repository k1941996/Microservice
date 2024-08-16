import React from "react";
import { Formik, Form } from "formik";
import { setAccountId, setToken } from "$utils/tokenUtil";
import { Link, useNavigate } from "react-router-dom";
import Ecomm from "$api/Ecomm";
import * as Yup from "yup";
import FormField from "$components/FormField";
import NavBar from "$components/NavBar";

const initialValues = { userName: "", password: "" };

const validationSchema = Yup.object({
  userName: Yup.string().email("Invalid Email Format").required("Required!"),
  password: Yup.string().min(8).required("Required!"),
});

function NewLogin() {
  const navigate = useNavigate();

  const loginUser = (loginData) => {
    const url = `/login`;
    Ecomm.post(url, loginData)
      .then((res) => {
        console.log(res);
        setToken(res.token);
        setAccountId(res.data._id);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form Data", values);
    loginUser(values);
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col ">
      <div className="flex-grow flex items-center justify-center mt-40  px-4 py-8">
        <div className="w-full max-w-md ">
          <div className="bg-gray-50 rounded-3xl border-2 border-gray-200 overflow-hidden shadow-lg dark:bg-neutral-700	dark:border-1 dark:border-zinc-600">
            <div className="animated-bg text-white pt-6 pb-2 text-center">
              <h1 className="text-4xl font-bold">Sign in</h1>
              <p className="text-center text-md py-4">
                Don't have an account?&nbsp;
                <Link
                  to="/signup/customer"
                  className="text-zinc-900 hover:underline"
                >
                  Sign up Now!
                </Link>
              </p>
            </div>

            <div className="bg-gray-50 px-8 mt-8  dark:bg-neutral-700	">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    <FormField
                      name="userName"
                      label="Email"
                      type="text"
                      placeholder="Enter your email"
                    />
                    <FormField
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                    />

                    <p className="text-center text-sm mb-6">
                      <Link
                        to="/forgotpassword"
                        className="text-violet-500 hover:underline dark:text-zinc-100"
                      >
                        Forgot Password?
                      </Link>
                    </p>

                    <div className="py-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="animated-bg w-full drop-shadow-lg mb-8 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-gradient-to-tr from-violet-400 to-pink-400 text-white text-lg font-bold"
                      >
                        Sign in
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewLogin;
