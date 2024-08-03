import React, { useState, useEffect } from "react";
// import FormAction from "./FormAction";
// import SignupExtra from "./SignupExtra";
// import Input from "./Input";
import Ecomm from "$api/Ecomm";
import FormInput from "$inputComponents/FormInput";
import { setAccountId, setToken } from "$utils/tokenUtil";
import NavBar from "src/components/NavBar";
import { Link, useNavigate } from "react-router-dom";


const Signup = (props) => {
  const { type } = props;
  const [signupState, setSignupState] = useState({
    userName: "",
    email: "",
    password: "",
    confirm_password: "",
    termsAndConditions: false,
    name: "",
  });
  const [error, setError] = useState(null);
  const {
    userName,
    email,
    password,
    confirm_password,
    termsAndConditions,
    name,
  } = signupState;

  const handleChange = (e) => {
    setSignupState({ ...signupState, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signupState.password !== signupState["confirm_password"]) {
      setError("Passwords do not match");
      return;
    }
    createAccount();
  };

  //handle Signup API Integration here
  const createAccount = () => {
    console.log(type, signupState);
    const url = `/signup/${type}`;
    Ecomm.post(url, signupState)
      .then((res) => {
        console.log(res);
        setToken(res.token);
        setAccountId(res.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
    // Your account creation logic here
  };

  return (
    <div className=" ">
      <NavBar />
      <div class="bg-gradient-to-tr from-violet-100 to-pink-100">

      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md py-2" >
          <div className="px-10 py-8 bg-gray-50 rounded-3xl border-2 border-gray-200">
            
            <h1 className="text-3xl text-center capitalize">
              Create {type} Account
            </h1>
            <p className="text-center text-sm mb-6 py-3">
              Already have an Account?{" "}
              <Link
                to="/Login"
                className="text-violet-500 hover:underline"
              >
                Login Now!
              </Link>
            </p>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div className="">
                <FormInput
                  name={"name"}
                  value={name}
                  onChange={handleChange}
                  label={"Name"}
                />
              </div>
              <div className="">
                <FormInput
                  name={"userName"}
                  value={userName}
                  onChange={handleChange}
                  label={"Username"}
                />
              </div>
              <div className="">
                <FormInput
                  name={"email"}
                  value={email}
                  onChange={handleChange}
                  label={"Email"}
                />
              </div>

              <div className="">
                <FormInput
                  name={"password"}
                  value={password}
                  onChange={handleChange}
                  label={"Password"}
                  type={`password`}
                />
              </div>
              <div className="">
                <FormInput
                  name={"confirm_password"}
                  value={confirm_password}
                  onChange={handleChange}
                  label={"Confirm Password"}
                  error={error}
                  type={`password`}
                />
              </div>
              <div className="mt-16 flex gap-y-4 items-center	">
                <FormInput
                  type="checkbox"
                  required
                  checked={termsAndConditions}
                  name={`termsAndConditions`}
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: `termsAndConditions`,
                        value: e.target.checked,
                      },
                    });
                  }}
                />
                <label className="font-medium ml-2 block text-sm text-gray-900">
                  Accept Terms and Condition
                </label>
              </div>

              <div className="mt-16 flex flex-col gap-y-4">
                <button
                  type="submit"
                  className="w-full drop-shadow-lg  active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all  py-3 rounded-xl bg-gradient-to-tr from-violet-400 to-pink-400 text-white text-lg font-bold"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
