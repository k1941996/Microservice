import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Input } from '@shadcn/components/ui/input';
import { Label } from '@shadcn/components/ui/label';



const FormField = (props) => {
  const { name, label, type = 'text', placeholder = '' } = props;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-1">
      <Field name={name} type={type || 'text'}>
        
        {({ field, form: { touched, errors } }) => (
          <>
            {label && (
              <Label
                htmlFor={name}
                className={`text-sm font-medium ${touched[name] && errors[name] ? 'text-red-500' : ''}`}
              >
                {label}
              </Label>
            )}
            <div className="relative">
              <Input
                {...field}
                id={name}
                type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                placeholder={placeholder}
                className={`pr-10 ${touched[name] && errors[name] ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
              {type === 'password' && (
                <span
                  onClick={togglePasswordVisibility}
                  className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}
            </div>
          </>
        )}
      </Field>
      <ErrorMessage name={name} component="div" className="text-xs text-red-500" />
    </div>
  );
};

FormField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

export default FormField;
