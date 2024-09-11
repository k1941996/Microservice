import React, { useState } from "react";
import { Formik, Form } from "formik";

import * as Yup from "yup";
import FormField from "$inputComponents/FormField";
import { forgotPassword } from "$apis/AuthApis.js";

const initialValues = { userName: "" };

function ForgotPassword() {
  const [showPopup, setShowPopup] = useState(false);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await forgotPassword(values.userName);
      console.log(res.link);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    userName: Yup.string().email("Invalid Email Format").required("Required!"),
  });

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <div className="flex-grow flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-3xl border-2 border-gray-200 overflow-hidden shadow-lg">
              <div className="animated-bg  pt-6 pb-2 text-center">
                <h1 className="text-4xl font-bold">Forgot Password ?</h1>
                <p className="text-center text-md py-4">Enter registered mail for reset link</p>
              </div>
              <Form className="space-y-4 px-6 py-4">
                <FormField name="userName" label="Email" type="email" placeholder="Enter your email" />
                <div className="mt-6 py-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="animated-bg w-full drop-shadow-lg active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-gradient-to-tr from-violet-400 to-pink-400 text-white text-lg font-bold"
                  >
                    {isSubmitting ? "Sending..." : "Send Link"}
                  </button>
                </div>
              </Form>
            </div>
          </div>

          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-8 flex flex-col items-center">
                <svg
                  className="w-16 h-16 text-green-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <p className="text-lg text-center">Check Mail for Password Reset.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
}

export default ForgotPassword;
