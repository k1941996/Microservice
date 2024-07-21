import React from "react";

const FormInput = (props) => {
  const { label, placeholder, value, onChange, required, className } = props;
  return (
    <div>
      <label className="text-lg font-medium">{label}</label>
      <input
        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default FormInput;
