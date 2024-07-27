import React from "react";

const FormInput = (props) => {
  const { label, placeholder, value, onChange, required, error, type, labelClassName, inputClassName } = props;
  return (
    <div>
      <label className={`text-lg font-medium ${labelClassName ? labelClassName : ""}`}>{label}</label>
      <input
        className={`w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent ${
          inputClassName ? inputClassName : ""
        }`}
        placeholder={placeholder}
        value={value}
        type={type || "text"}
        onChange={onChange}
        required={required}
      />
      {error ? <p className="text-red-500 text-sm mt-1">{error}</p> : null}
    </div>
  );
};

export default FormInput;
