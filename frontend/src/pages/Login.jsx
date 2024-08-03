import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Ecomm from "$api/Ecomm";
import FormInput from "$inputComponents/FormInput";
import { setAccountId, setToken } from "$utils/tokenUtil";
import NavBar from "$components/NavBar";
import {useFormik} from 'formik'

const Login = (props) => {
  const { type } = props;
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { userName, password } = loginState;

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  const loginUser = () => {
    const url = `/login`;
    Ecomm.post(url, loginState)
      .then((res) => {
        console.log(res);
        setToken(res.token);
        setAccountId(res.data._id);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid email or password");
      });
  };

  return (
    <div className="flex flex-col  min-h-screen bg-gradient-to-tr from-violet-100 to-pink-100">
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

            <form className="" onSubmit={handleSubmit}>
              <FormInput
                name="userName"
                className="py-6"
                value={userName}
                onChange={handleChange}
                label="Email/Username:"
              />
              <FormInput
                name="password"
                className=""
                value={password}
                onChange={handleChange}
                label="Password:"
                type="password"
              />
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              <div className="mt-6 py-8">
                <button
                  type="submit"
                  className="w-full drop-shadow-lg  active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-gradient-to-tr from-violet-400 to-pink-400 text-white text-lg font-bold"
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
};

export default Login;