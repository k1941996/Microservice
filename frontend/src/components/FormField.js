import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';

const FormField = ({ name, label, type = 'text', placeholder = '' }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-control flex flex-col">
      <label htmlFor={name} className="text-base font-semibold mb-1">
        {label}
      </label>
      <div className="relative">
        <Field name={name}>
          {({ field, form: { touched, errors } }) => (
            <input
              {...field}
              type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
              placeholder={placeholder}
              className={`w-full px-3 py-2 border rounded-md ${
                touched[name] && errors[name]
                  ? "border-2 border-rose-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                type === 'password' ? 'pr-10' : ''
              }`}
            />
          )}
        </Field>
        
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default FormField;