import React, { useState } from "react";
import FormInput from "../InputComponents/FormInput";
import axios from "axios";

export default function Form() {
  const [isLogin, setIsLogin] = useState(true);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in with:", { username, email, password });
      axios
        .post("http://localhost:8000/login", {
          username,
          email,
          password,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else {
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }
      setPasswordError("");
      console.log("Signing up with:", { name, username, email, password });
      axios
        .post("http://localhost:8000/signup/admin", {
          name,
          username,
          email,
          password,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
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
        {isLogin ? (
          <FormInput
            label="Username"
            placeholder="Enter your username or email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        ) : (
          <>
            <FormInput
              label="Name"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <FormInput
              label="Username"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FormInput
              label="Email"
              placeholder="Enter your email"  
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </>
        )}
        <FormInput
          label="Password"
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isLogin && (
          <FormInput
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}
        {passwordError && (
          <p className="text-red-500 text-sm mt-1">{passwordError}</p>
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
          onClick={() => {
            setIsLogin(!isLogin);
            setPasswordError("");
          }}
          className="ml-2 font-medium text-base text-violet-500"
        >
          {isLogin ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
}
