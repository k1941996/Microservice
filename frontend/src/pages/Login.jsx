import React from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import FormField from "$inputComponents/FormField";
import { loginUser } from "$apis/AuthApis.js";
import { setAccountId, setToken } from "$utils/tokenUtil";
import { useToast } from "$components/Toaster/Toaster";

const initialValues = { userName: "", password: "" };

const validationSchema = Yup.object({
  userName: Yup.string().required("Required!"),
  password: Yup.string().min(8).required("Required!"),
});

const Login = () => {
  const navigate = useNavigate();

  const toast = useToast();
  const login = async (loginData) => {
    try {
      const res = await loginUser(loginData);
      setToken(res.token);
      setAccountId(res.data._id);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    await login(values);
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col ">
      <div className="flex-grow flex items-center justify-center mt-40  px-4 py-8">
        <div className="w-full max-w-md ">
          <div className="bg-gray-50 rounded-3xl border-2 border-gray-200 overflow-hidden shadow-lg">
            <div className="animated-bg pt-6 pb-2 text-center">
              <h1 className="text-4xl font-bold">Sign in</h1>
              <p className="text-center text-md py-4">
                Don't have an account?&nbsp;
                <Link to="/signup/customer" className="text-zinc-900 hover:underline">
                  Sign up Now!
                </Link>
              </p>
            </div>

            <div className="bg-gray-50 px-8 mt-8">
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    <FormField name="userName" label="Email/Username" type="text" placeholder="Enter your email" />
                    <FormField name="password" label="Password" type="password" placeholder="Enter your password" />

                    <p className="text-center text-sm mb-6">
                      <Link to="/forgotpassword" className="text-violet-500 hover:underline">
                        Forgot Password?
                      </Link>
                    </p>

                    <div className="py-4">
                      <button type="submit" disabled={isSubmitting} className="btn w-full btn-outline">
                        {isSubmitting ? <span className="loading loading-dots loading-sm"></span> : `Sign in`}
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
};

export default Login;
