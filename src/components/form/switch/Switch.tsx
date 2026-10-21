"use client";

import { useState } from "react";

interface SwitchProps {
  label?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  color?: "blue" | "gray"; // Added prop to toggle color theme
}

const Switch: React.FC<SwitchProps> = ({
  label,
  defaultChecked = false,
  disabled = false,
  onChange,
  color = "blue", // Default to blue color
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = () => {
    if (disabled) return;
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  const switchColors =
    color === "blue"
      ? {
        background: isChecked
          ? "bg-brand "
          : "bg-gray-light dark:bg-light-accent/10", // Blue version
        knob: isChecked
          ? "translate-x-full rtl:-translate-x-full bg-light-accent"
          : "translate-x-0 bg-light-accent",
      }
      : {
        background: isChecked
          ? "bg-gray-dark dark:bg-light-accent/10"
          : "bg-gray-light dark:bg-light-accent/10", // Gray version
        knob: isChecked
          ? "translate-x-full rtl:-translate-x-full bg-light-accent"
          : "translate-x-0 bg-light-accent",
      };

  return (
    <label
      className={`flex cursor-pointer items-center gap-3 text-sm font-medium select-none ${disabled ? "text-gray-light" : "text-gray-dark dark:text-gray-light"
        }`}
      onClick={handleToggle} // Toggle when the label itself is clicked
    >
      <div className="relative">
        <div
          className={`block h-6 w-11 rounded-full transition duration-150 ease-linear ${disabled
              ? "pointer-events-none bg-light dark:bg-gray-dark"
              : switchColors.background
            }`}
        ></div>
        <div
          className={`inset-s-0.5 absolute top-0.5 h-5 w-5 transform rounded-full shadow-theme-sm duration-150 ease-linear ${switchColors.knob}`}
        ></div>
      </div>
      {label}
    </label>
  );
};

export default Switch;
