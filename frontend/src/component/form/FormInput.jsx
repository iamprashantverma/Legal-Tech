import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  showPasswordToggle,
  onTogglePassword,
  isPasswordVisible,
}) => {
  return (
    <div className="form__group">
      <label htmlFor={name} className="form__label">
        {label}
      </label>
      <div className="form__input-wrapper">
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`form__input ${error ? "form__input--error" : ""}`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className="form__toggle-password"
            onClick={onTogglePassword}
          >
            {isPasswordVisible ? (
              <AiFillEyeInvisible size={20} />
            ) : (
              <AiFillEye size={20} />
            )}
          </button>
        )}
      </div>
      {error && <div className="form__error">{error}</div>}
    </div>
  );
};

export default FormInput;
