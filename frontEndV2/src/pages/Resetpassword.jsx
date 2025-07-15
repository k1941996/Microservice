import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Eye icons for visibility toggle

import { resetPassword } from '@api/AuthApis';
import FormField from '@inputComponents/FormField';

const initialValues = {
  newPassword: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  newPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('Required!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Required!'),
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
        navigate('/');
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
        <div className="flex flex-grow items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            <div className="overflow-hidden rounded-3xl border-2 border-gray-200 bg-gray-50 shadow-lg">
              <div className="animated-bg pt-6 pb-2 text-center">
                <h1 className="text-4xl font-bold">Reset Password</h1>
                <p className="text-md py-4 text-center">Enter your new password below</p>
              </div>

              <Form className="space-y-4 px-6 py-4">
                <FormField type="password" name="newPassword" label="New Password" />
                <FormField type="password" name="confirmPassword" label="Confirm password" />

                <div className="mt-6 py-4">
                  <button type="submit" disabled={isSubmitting} className="btn btn-outline w-full">
                    Update Password
                  </button>
                </div>
              </Form>
            </div>
          </div>

          {showPopup && (
            <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black">
              <div className="flex flex-col items-center rounded-lg bg-white p-8">
                <svg
                  className="mb-4 h-16 w-16 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <p className="text-center text-lg">Password has been successfully updated!.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
};

export default ResetPassword;
