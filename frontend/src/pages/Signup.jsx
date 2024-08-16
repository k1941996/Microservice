import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { setAccountId, setToken } from "$utils/tokenUtil";
import { Link, useNavigate } from "react-router-dom";
import Ecomm from "$api/Ecomm";
import FormField from "$components/FormField";
import NavBar from "$components/NavBar";

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
      .required("You must accept the terms and conditions"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
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

  const fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "userName", label: "Username", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirm_password", label: "Confirm Password", type: "password" },
  ];

  return (
      <div className="flex-grow flex justify-center mt-20">
        <div className="w-full max-w-md">
          <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-lg dark:bg-neutral-700	dark:border-1 dark:border-zinc-600">
            <div className="animated-bg text-white pt-4 pb-2 text-center">
              <h1 className="text-3xl font-bold">Sign up</h1>{" "}
              <h3 className="text-xl text-center capitalize mt-2">
                Create {type} Account
              </h3>
              <p className="text-center text-xs mb-2 py-2">
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
              {({ isSubmitting, errors, touched }) => (
                <Form className="mt-6 space-y-3 px-4">
                  {fields.map((field) => (
                    <FormField
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                    />
                  ))}
                  <div className="form-control flex flex-col">
                    <div className="flex items-center">
                      <Field
                        type="checkbox"
                        name="termsAndConditions"
                        className="mr-2 ml-1 mt-4"
                      />
                      <label
                        htmlFor="termsAndConditions"
                        className={`font-medium text-sm mt-4 ${
                          errors.termsAndConditions && touched.termsAndConditions
                            ? "text-red-500"
                            : "text-gray-900 dark:text-slate-300"
                        }`}
                      >
                        Accept Terms and Conditions
                      </label>
                    </div>
                    
                  </div>
                  <div className="py-2 ">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="animated-bg mt-4 mb-4 w-full drop-shadow-lg active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-lg bg-gradient-to-tr from-violet-400 to-pink-400 text-white text-base font-bold"
                    >
                      Sign up
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
  );
};

export default Signup;