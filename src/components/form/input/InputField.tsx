import type React from "react";
import type { FC } from "react";

const SIZE = {
  sm: 'h-8',
  md: 'h-11',
  lg: 'h-14',
}

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "success" | "error" | "hint" | "step" | "size"
> {
  success?: boolean;
  error?: boolean;
  hint?: string;
  step?: number;
  size?: 'sm' | 'md' | 'lg';
}

const Input: FC<InputProps> = ({
  type = "text",
  id,
  name,
  placeholder,
  defaultValue,
  value,
  onChange,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
  size = 'md',
  ...props
}) => {



  let inputClasses = ` ${SIZE[size]} w-full rounded-lg border appearance-none ps-4 pe-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray/40 focus:outline-hidden focus:ring-3  dark:bg-gray-dark dark:text-light-accent/90 dark:placeholder:text-light-accent/30 ${className}`;

  if (disabled) {
    inputClasses += ` text-gray border-gray-light opacity-60 bg-light cursor-not-allowed dark:bg-gray-dark dark:text-gray-light dark:border-gray-dark opacity-40`;
  } else if (error) {
    inputClasses += `  border-error focus:border-error-light focus:ring-error/20 dark:text-error-light dark:border-error-dark dark:focus:border-error-dark`;
  } else if (success) {
    inputClasses += `  border-success focus:border-success-light focus:ring-success/20 dark:text-success-light dark:border-success-dark dark:focus:border-success-dark`;
  } else {
    inputClasses += ` bg-transparent text-gray-dark border-gray-light focus:ring-brand/20 dark:border-gray dark:text-light-accent/90  dark:focus:border-brand-dark`;
  }

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />

      {hint && (
        <p
          className={`mt-1.5 text-xs ${error
            ? "text-error"
            : success
              ? "text-success"
              : "text-gray"
            }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;
