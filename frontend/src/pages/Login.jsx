import React from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import FormField from '$inputComponents/FormField';
import { loginUser } from '$apis/AuthApis.js';
import { setAccountId, setToken } from '$utils/tokenUtil';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '$redux/Slice/UserSlice.js';

const initialValues = { userName: '', password: '' };

const validationSchema = Yup.object({
  userName: Yup.string().required('Required!'),
  // password: Yup.string().min(8).required('Required!'),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (loginData) => {
    try {
      const res = await loginUser(loginData);
      setToken(res.token);
      setAccountId(res.data._id);
      dispatch(setUserDetails(res));
      // navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    await login(values);
    setSubmitting(false);
  };

  return (
    <div className="flex flex-1 items-center justify-center mx-4">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-lg ">
          <div className="rounded-3xl border-2 border-gray-200 overflow-hidden shadow-lg p-8">
            <div className="text-center pb-8">
              <h1 className="text-4xl font-bold">Sign in</h1>
            </div>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <FormField name="userName" label="Email/Username" type="text" placeholder="Enter your email" />
                  <FormField name="password" label="Password" type="password" placeholder="Enter your password" />

                  <p className="text-right text-sm">
                    <Link to="/forgotpassword" className="text-violet-500 hover:underline">
                      Forgot Password?
                    </Link>
                  </p>

                  <div className="">
                    <button type="submit" disabled={isSubmitting} className="btn w-full btn-outline">
                      {isSubmitting ? <span className="loading loading-dots loading-sm"></span> : `Sign in`}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <p className="text-center text-sm pt-4">
              Don't have an account?&nbsp;
              <Link to="/signup/customer" className="text-violet-500 hover:underline">
                Sign up Now!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
