import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { setAccountId, setToken } from "$utils/tokenUtil";
import { Link, useNavigate } from "react-router-dom";
import Ecomm from "$api/Ecomm";
import * as Yup from "yup";

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
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-violet-100 to-pink-100">
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl border-2 border-gray-200 overflow-hidden shadow-lg">
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

            <div className="bg-gray-50 px-8 mt-8">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, touched, errors }) => (
                  <Form className="space-y-4">
                    {["userName", "password"].map((fieldName) => (
                      <div key={fieldName} className="form-control flex flex-col">
                        <label htmlFor={fieldName} className="text-base font-semibold">
                          {fieldName === "userName" ? "Email" : "Password"}:
                        </label>
                        <Field
                          name={fieldName}
                          type={fieldName === "password" ? "password" : "text"}
                          className={`w-full px-3 py-2 border rounded-md ${
                            touched[fieldName] && errors[fieldName]
                              ? "border-rose-500"
                              : "border-gray-300"
                          } focus:outline-none focus:ring-2 focus:ring-violet-500`}
                        />
                        <ErrorMessage name={fieldName} component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    ))}

                    <p className="text-center text-sm mb-6">
                      <Link
                        to="/forgotpassword"
                        className="text-violet-500 hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </p>

                    <div className="py-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full drop-shadow-lg mb-8 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-gradient-to-tr from-violet-400 to-pink-400 text-white text-lg font-bold"
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