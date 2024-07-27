import React, { useState } from "react";
import FormInput from "$inputComponents/FormInput";

const Login = (props) => {
  const { flip } = props;
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const { username, password } = userDetails;
  const signIn = () => {
    console.log(userDetails);
  };
  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
      <h1 className="text-5xl font-semibold">Welcome back</h1>
      <div className="mt-8">
        <FormInput
          label="Username"
          name={"username"}
          placeholder="Enter your username or email"
          value={username}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Password"
          name={"password"}
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={handleInputChange}
          required
        />
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            onClick={signIn}
            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
          >
            Sign In
          </button>
        </div>
      </div>
      {flip()}
    </div>
  );
};

export default Login;
