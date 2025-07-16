import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import FormField from '@inputComponents/FormField';
import { useLoginMutation } from '@redux/Misc';
import { useSelector } from 'react-redux';
import { Button } from '@shadcn/components/ui/button';
import { toast } from 'sonner';

const initialValues = { userName: 'admin', password: 'test1234' };

const validationSchema = Yup.object({
  userName: Yup.string().required('Required!'),
  password: Yup.string().min(4).required('Required!'),
});

const Login = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.userDetails.isLoggedIn);

  const [login] = useLoginMutation();

  const handleSubmit = async (values, { setSubmitting }) => {
    const res = await login(values);
    if (res?.error) {
      toast.error(res.error?.message || res.error);
    }
    setSubmitting(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <div className="mx-4 flex flex-1 items-center justify-center">
      <div className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-lg">
          <div className="overflow-hidden rounded-3xl border-2 border-gray-200 p-8 shadow-lg">
            <div className="pb-8 text-center">
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
                    <Button type="submit" disabled={isSubmitting} className="btn btn-outline w-full">
                      {isSubmitting ? <span className="loading loading-dots loading-sm"></span> : `Sign in`}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
            <p className="pt-4 text-center text-sm">
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
