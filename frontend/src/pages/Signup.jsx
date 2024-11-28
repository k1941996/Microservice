import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { setAccountId, setToken } from '$utils/tokenUtil';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormField from '$inputComponents/FormField';
import { signUp } from '$apis/AuthApis.js';
import { useToast } from '$components/Toaster/Toaster.jsx';

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
    <div className="flex-grow flex justify-center items-center m-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-lg">
          <div className="animated-bg pt-4 pb-2 text-center">
            <h1 className="text-3xl font-bold">Sign up</h1>{' '}
            <h3 className="text-xl text-center capitalize mt-2">Create {type} Account</h3>
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
                      className={`font-medium text-sm cursor-pointer ${
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
                    className="animated-bg mb-4 w-full drop-shadow-lg active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-lg bg-gradient-to-tr from-violet-400 to-pink-400 text-white text-base font-bold"
                  >
                    Sign up
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div>
          <p className="text-center text-xs mt-2 py-2">
            Already have an Account?&nbsp;
            <Link to="/login" className="text-violet-500 hover:underline">
              Login Now!
            </Link>
          </p>
        </div>
        <div>
          <p className="text-center text-xs mb-2 py-2">
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
