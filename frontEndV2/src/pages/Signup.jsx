import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { setAccountId, setToken } from '@utils/tokenUtil';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormField from '@inputComponents/FormField';
import { signUp } from '@api/AuthApis';
import { useToast } from '@components/Toaster/Toaster';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  userName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  termsAndConditions: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});

const Signup = ({ type }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const initialValues = {
    name: '',
    userName: '',
    email: '',
    password: '',
    confirm_password: '',
    termsAndConditions: false,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      const res = await signUp(type, values);
      console.log(res);
      setToken(res.token);
      setAccountId(res.data._id);
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    { name: 'name', label: 'Name' },
    { name: 'userName', label: 'Username' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'confirm_password', label: 'Confirm Password', type: 'password' },
  ];

  return (
    <div className="m-4 flex flex-grow items-center justify-center">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-lg">
          <div className="animated-bg pt-4 pb-2 text-center">
            <h1 className="text-3xl font-bold">Sign up</h1>{' '}
            <h3 className="mt-2 text-center text-xl capitalize">Create {type} Account</h3>
          </div>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched }) => (
              <Form className="mt-2 space-y-3 px-4">
                {fields.map((field) => (
                  <FormField
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    placeholder={`${field.label}`}
                  />
                ))}
                <div className="form-control flex flex-col">
                  <div className="flex items-center">
                    <Field type="checkbox" id="termsAndConditions" name="termsAndConditions" className="mr-2 ml-1" />
                    <label
                      htmlFor="termsAndConditions"
                      className={`cursor-pointer text-sm font-medium ${
                        errors.termsAndConditions && touched.termsAndConditions ? 'text-red-500' : 'text-gray-900'
                      }`}
                    >
                      Accept Terms and Conditions
                    </label>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={false}
                    className="animated-bg mb-4 w-full rounded-lg bg-gradient-to-tr from-violet-400 to-pink-400 py-2 text-base font-bold text-white drop-shadow-lg transition-all ease-in-out hover:scale-[1.01] active:scale-[.98] active:duration-75"
                  >
                    Sign up
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div>
          <p className="mt-2 py-2 text-center text-xs">
            Already have an Account?&nbsp;
            <Link to="/login" className="text-violet-500 hover:underline">
              Login Now!
            </Link>
          </p>
        </div>
        <div>
          <p className="mb-2 py-2 text-center text-xs">
            Create a {location.pathname === '/signup/admin' ? `Customer` : `Admin`} account?&nbsp;
            <Link
              to={location.pathname === '/signup/admin' ? '/signup/customer' : '/signup/admin'}
              className="text-violet-500 hover:underline"
            >
              Click here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
