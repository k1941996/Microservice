import React from "react";
import PropTypes from "prop-types";
const FormInput = (props) => {
  const {
    label,
    labelClassName,
    error,
    required,
    className,
    value,
    onChange,
    type,
    disabled,
    placeholder,
    onBlur,
    name,
    inputClassName,
    readOnly,
  } = props;
  return (
    <div className={className ? className : ""}>
      {label ? (
        <label
          className={`text-lg font-medium ${
            labelClassName ? labelClassName : ""
          }`}
        >
          {label}
        </label>
      ) : null}
      <input
        className={`w-full border ${
          error ? `border-2 border-rose-500` : `border-gray-300`
        } rounded-lg p-3 mt-1 bg-transparent ${
          inputClassName ? inputClassName : ""
        }`}
        placeholder={placeholder}
        value={value}
        type={type || "text"}
        onChange={onChange}
        required={required}
        onBlur={onBlur}
        disabled={disabled}
        readOnly={readOnly}
        name={name}
      />
      {error ? <p className="text-red-500 text-sm">{error}</p> : null}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.any,
  labelClassName: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  required: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  name: PropTypes.any,
  inputClassName: PropTypes.any,
  readOnly: PropTypes.bool,
};

export default FormInput;
