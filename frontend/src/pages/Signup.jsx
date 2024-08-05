import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setAccountId, setToken } from "$utils/tokenUtil";
import NavBar from "$components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import Ecomm from "$api/Ecomm";

const Signup = ({ type }) => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    userName: "",
    email: "",
    password: "",
    confirm_password: "",
    termsAndConditions: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    userName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("Required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    termsAndConditions: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("Required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true)
    const url = `/signup/${type}`;
    Ecomm.post(url, values)
      .then((res) => {
        console.log(res);
        setToken(res.token);
        setAccountId(res.data._id);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-violet-100 to-pink-100">
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md py-2">
          <div className="bg-white rounded-3xl border-2 border-gray-200 overflow-hidden shadow-lg">
            <div className="animated-bg text-white pt-6 pb-2 text-center">
              <h1 className="text-4xl font-bold">Sign up</h1>
              <h3 className="text-2xl text-center capitalize mt-4">
                Create {type} Account
              </h3>
              <p className="text-center text-sm mb-2 py-3">
                Already have an Account?&nbsp;
                <Link to="/Login" className="text-zinc-900 hover:underline">
                  Login Now!
                </Link>
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formikprops) => {
                const { isSubmitting, touched, errors }=formikprops;
                return (
                <Form className="mt-8 space-y-4 px-6">
                  {[
                    "name",
                    "userName",
                    "email",
                    "password",
                    "confirm_password",
                  ].map((fieldName) => (
                    <div key={fieldName} className="form-control flex flex-col">
                      <label
                        htmlFor={fieldName}
                        className="text-base font-semibold"
                      >
                        {fieldName.charAt(0).toUpperCase() +
                          fieldName.slice(1).replace("_", " ")}
                        :
                      </label>
                      <Field
                        name={fieldName}
                        type={
                          fieldName.includes("password") ? "password" : "text"
                        }
                        className={`w-full px-3 py-2 border rounded-md ${
                          touched[fieldName] && errors[fieldName]
                            ? "border-rose-500"
                            : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-violet-500`}
                      />
                      <ErrorMessage
                        name={fieldName}
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  ))}

                  <div className="flex items-center">
                    <Field
                      type="checkbox"
                      name="termsAndConditions"
                      className="mr-2 mt-2"
                    />
                    <label
                      htmlFor="termsAndConditions"
                      className="font-medium text-sm text-gray-900 mt-2"
                    >
                      Accept Terms and Conditions
                    </label>
                  </div>
                  <ErrorMessage
                    name="termsAndConditions"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />

                  <div className="py-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}c
                      className="w-full drop-shadow-lg active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-gradient-to-tr from-violet-400 to-pink-400 text-white text-lg font-bold"
                    >
                      Sign up
                    </button>
                  </div>
                </Form>
              )}}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
