import React from "react";

interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: React.ReactNode;
  onChange?: (value: string) => void;
}

const Radio: React.FC<RadioProps> = ({
  id,
  name,
  value,
  checked,
  label,
  onChange,
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <label
      htmlFor={id}
      className={`relative flex cursor-pointer  select-none items-center gap-3 text-sm font-medium ${disabled
        ? "text-gray-light dark:text-gray-light cursor-not-allowed"
        : "text-gray-dark dark:text-gray-light"
        } ${className}`}
    >
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={(e) => !disabled && onChange && onChange(e.currentTarget.value)} // Prevent onChange when disabled
        className="sr-only"
        disabled={disabled} // Disable input
        {...props}
      />
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.25px] ${checked
          ? "border-brand bg-brand"
          : "bg-transparent border-gray-light dark:border-gray-dark"
          } ${disabled
            ? "bg-light dark:bg-gray-dark border-gray-light dark:border-gray-dark"
            : ""
          }`}
      >
        <span
          className={`h-2 w-2 rounded-full bg-light-accent ${checked ? "block" : "hidden"
            }`}
        ></span>
      </span>
      {label}
    </label>
  );
};

export default Radio;
