import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormField = ({ name, label, type = "text", placeholder = "" }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-control flex flex-col">
      <div>
        <Field name={name}>
          {({ field, form: { touched, errors } }) => (
            <>
              <label
                htmlFor={name}
                className={`text-base font-semibold mb-1 ${touched[name] && errors[name] ? `text-red-500` : ``}`}
              >
                {label}
              </label>
              <div
                className={`input input-bordered flex items-center  px-2items-center gap-2 h-11 w-full focus-within:outline-none focus:outline-none focus:outline-0 ${
                  touched[name] && errors[name]
                    ? "border-2 focus-within:border-rose-500 border-rose-500 focus:border-rose-500"
                    : "border-gray-300"
                }`}
              >
                <input
                  {...field}
                  type={type === "password" ? (showPassword ? "text" : "password") : type}
                  placeholder={placeholder}
                  className={`w-full  rounded-md border-transparent focus:border-transparent focus:ring-0`}
                />
                {type === "password" ? (
                  <div onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <FaEyeSlash fontSize={20} style={{ cursor: "pointer" }} />
                    ) : (
                      <FaEye fontSize={20} style={{ cursor: "pointer" }} />
                    )}
                  </div>
                ) : null}
              </div>
            </>
          )}
        </Field>
      </div>
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
  );
};

export default FormField;
