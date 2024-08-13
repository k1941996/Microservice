import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import Ecomm from "$api/Ecomm";
import * as Yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Eye icons for visibility toggle
import NavBar from "$components/NavBar";

const initialValues = {
  newPassword: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Required!"),
});

function ResetPassword() {
  const [showPopup, setShowPopup] = useState(false);

  const { accountId, token } = useParams();
  const navigate = useNavigate();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = (values) => {
    const url = `/resetPassword/${accountId}/${token}`;
    Ecomm.post(url, {
      password: values.newPassword,
      confirm_password: values.confirmPassword,
    })
      .then((res) => {
        console.log(res);
        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
          navigate("/");
        }, 3000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ touched, errors }) => (
          <div className="flex-grow flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
              <div className="bg-gray-50 rounded-3xl border-2 border-gray-200 overflow-hidden shadow-lg">
                <div className="animated-bg text-white pt-6 pb-2 text-center">
                  <h1 className="text-4xl font-bold">Reset Password</h1>
                  <p className="text-center text-md py-4">
                    Enter your new password below
                  </p>
                </div>

                <Form className="space-y-4 px-6 py-4">
                  {["newPassword", "confirmPassword"].map((fieldName) => (
                    <div
                      key={fieldName}
                      className="form-control flex flex-col relative"
                    >
                      <label
                        htmlFor={fieldName}
                        className="text-base font-semibold"
                      >
                        {fieldName === "newPassword"
                          ? "New Password"
                          : "Confirm Password"}
                        :
                      </label>
                      <Field
                        name={fieldName}
                        type={
                          fieldName === "newPassword"
                            ? showNewPassword
                              ? "text"
                              : "password"
                            : showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        className={`w-full px-3 py-2 border rounded-md ${
                          touched[fieldName] && errors[fieldName]
                            ? "border-2 border-rose-500"
                            : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      <ErrorMessage
                        name={fieldName}
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />

                      <div
                        className="absolute right-3 top-10 cursor-pointer"
                        onMouseDown={
                          fieldName === "newPassword"
                            ? toggleNewPasswordVisibility
                            : toggleConfirmPasswordVisibility
                        }
                      >
                        {fieldName === "newPassword" ? (
                          showNewPassword ? (
                            <FiEyeOff />
                          ) : (
                            <FiEye />
                          )
                        ) : showConfirmPassword ? (
                          <FiEyeOff />
                        ) : (
                          <FiEye />
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="mt-6 py-4">
                    <button
                      type="submit"
                      className="animated-bg w-full drop-shadow-lg active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-gradient-to-tr from-violet-400 to-pink-400 text-white text-lg font-bold"
                    >
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <p className="text-lg text-center">
                  Password has been successfully updated!.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
}

export default ResetPassword;
