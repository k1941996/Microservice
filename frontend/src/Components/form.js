import React, { useState } from "react";
import FormInput from "../InputComponents/FormInput";
import axios from "axios";

export default function Form() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in with:", { email, password });
    } else {
      axios.post("http://localhost:8000/signup/admin", {
        name,
        email,
        password,
      }).then(res=>{console.log(res)}).catch(err=>console.log(err));
      console.log("Signing up with:", { name, email, password });
    }
  };

  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
      <h1 className="text-5xl font-semibold">
        {isLogin ? "Welcome Back" : "Create Account"}
      </h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        {isLogin
          ? "Please enter your details"
          : "Please enter your information"}
      </p>
      <form onSubmit={handleSubmit} className="mt-8">
        {!isLogin && (
          <div className="mt-5">
            <FormInput
              label={"Name"}
              placeholder={"Enter your Name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div className="mt-5">
          <label className="text-lg font-medium">Email</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter Your Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mt-5">
          <label className="text-lg font-medium">Password</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {isLogin && (
          <div className="mt-8 flex justify-between items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label className="ml-2 font-medium text-base" htmlFor="remember">
                Remember Me
              </label>
            </div>
            <button
              type="button"
              className="font-medium text-base text-violet-500"
            >
              Forgot Password
            </button>
          </div>
        )}
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            type="submit"
            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
          >
            {isLogin ? "Sign in" : "Sign up"}
          </button>
        </div>
      </form>
      <div className="mt-8 flex justify-center items-center">
        <p className="font-medium text-base">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </p>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="ml-2 font-medium text-base text-violet-500"
        >
          {isLogin ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
}
