import React from "react";

interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: React.ReactNode;
  onChange?: (value: string) => void;
}

const RadioSm: React.FC<RadioProps> = ({
  id,
  name,
  value,
  checked,
  label,
  onChange,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <label
      htmlFor={id}
      className={`flex select-none items-center text-sm font-medium ${
        disabled
          ? "cursor-not-allowed text-gray-light dark:text-gray-light"
          : "cursor-pointer text-gray-dark dark:text-gray-light"
      } ${className}`}
    >
      <span className="relative">
        {/* Hidden Input */}
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={(e) => !disabled && onChange && onChange(e.currentTarget.value)}
          className="sr-only"
          {...props}
        />
        {/* Styled Radio Circle */}
        <span
          className={`me-2 flex h-4 w-4 items-center justify-center rounded-full border ${
            checked
              ? "border-brand bg-brand"
              : "border-gray-light bg-transparent dark:border-gray-dark"
          } ${
            disabled
              ? "border-gray-light bg-light dark:border-gray-dark dark:bg-gray-dark"
              : ""
          }`}
        >
          {/* Inner Dot */}
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              checked ? "bg-light-accent" : "bg-light-accent dark:bg-[#1e2636]"
            }`}
          ></span>
        </span>
      </span>
      {label}
    </label>
  );
};

export default RadioSm;
