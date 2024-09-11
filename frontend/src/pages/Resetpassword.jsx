import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Eye icons for visibility toggle

import { resetPassword } from "$apis/AuthApis.js";
import FormField from "$inputComponents/FormField.js";

const initialValues = {
  newPassword: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  newPassword: Yup.string().min(8, "Password must be at least 8 characters").required("Required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Required!"),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const { accountId, token } = useParams();

  const [showPopup, setShowPopup] = useState(false);

  const resetPasswordSubmit = async (values, { setSubmitting }) => {
    try {
      const newPassword = {
        password: values.newPassword,
        confirm_password: values.confirmPassword,
      };
      const res = await resetPassword({ accountId, token, ...newPassword });
      console.log(res);
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={resetPasswordSubmit}>
      {({ isSubmitting }) => (
        <div className="flex-grow flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            <div className="bg-gray-50 rounded-3xl border-2 border-gray-200 overflow-hidden shadow-lg">
              <div className="animated-bg pt-6 pb-2 text-center">
                <h1 className="text-4xl font-bold">Reset Password</h1>
                <p className="text-center text-md py-4">Enter your new password below</p>
              </div>

              <Form className="space-y-4 px-6 py-4">
                <FormField type="password" name="newPassword" label="New Password" />
                <FormField type="password" name="confirmPassword" label="Confirm password" />

                <div className="mt-6 py-4">
                  <button type="submit" disabled={isSubmitting} className="btn w-full btn-outline">
                    Update Password
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
                <p className="text-lg text-center">Password has been successfully updated!.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
};

export default ResetPassword;
