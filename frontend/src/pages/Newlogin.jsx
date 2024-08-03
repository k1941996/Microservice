import React from "react";
import { useFormik } from "formik";
import { setAccountId, setToken } from "$utils/tokenUtil";
import NavBar from "$components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import Ecomm from "$api/Ecomm";
import FormInput from "$inputComponents/FormInput";

const initialValues = { userName: "", password: "" };

const onSubmit = (values) => {
  console.log("Form Data", values);
};

const validate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Password too short!";
  }

  return errors;
};

function NewLogin() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  const loginUser = (loginData) => {
    const url = `/login`;
    Ecomm.post(url, loginData)
      .then((res) => {
        console.log(res);
        setToken(res.token);
        setAccountId(res.data._id);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-violet-100 to-pink-100">
      <NavBar />
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-gray-50 px-8 py-6 drop-shadow-md rounded-3xl border-2 border-gray-200">
            <h1 className="text-3xl text-center mb-4">Login</h1>
            <p className="text-center text-sm mb-6">
              Don't have an account?{" "}
              <Link
                to="/signup/customer"
                className="text-violet-500 hover:underline"
              >
                Sign up Now!
              </Link>
            </p>

            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div className="form-control flex flex-col">
                {/* <label htmlFor="email" className="mb-1 font-medium">
                  Email
                </label>
                <input
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                  type="email"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null} */}
                <FormInput
                  name="userName"
                  className="py-6"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  label="Email/Username:"
                  error={
                    formik.touched.userName && formik.errors.userName
                      ? formik.errors.userName
                      : null
                  }
                  onBlur={formik.handleBlur}
                />
              </div>

              <div className="form-control flex flex-col">
                <label htmlFor="password" className="mb-1 font-medium">
                  Password
                </label>
                <input
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                  type="password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="">{formik.errors.password}</div>
                ) : null}
              </div>

              <div className="mt-6 py-8">
                <button
                  type="submit"
                  className="w-full drop-shadow-lg active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-gradient-to-tr from-violet-400 to-pink-400 text-white text-lg font-bold"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewLogin;
