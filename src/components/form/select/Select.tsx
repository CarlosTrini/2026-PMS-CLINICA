import { ChevronDownIcon } from "@/icons";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange" | "size"> {
  options: Option[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
  canClear?: boolean;
  reset?: boolean;
}

const SIZE = {
  sm: "h-8 text-xs py-1 ps-3 pe-8",
  md: "h-11 text-sm py-2.5 ps-4 pe-11",
  lg: "h-14 text-base py-3.5 ps-5 pe-12",
};

const ICON_SIZE = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Selecciona una opción",
  value: controlledValue,
  defaultValue = "",
  onChange,
  size = "md",
  className = "",
  disabled = false,
  canClear = false,
  reset = false,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState<string>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!isControlled) {
      setInternalValue(value);
    }
    onChange?.(value);
  };

  const resetSelect = () => {
    setInternalValue("");
    onChange?.("");
    return;
  }

  useEffect(() => {
    if (!reset) return;
    resetSelect();
  }, [reset]);

  let selectClasses = `${SIZE[size]} w-full appearance-none rounded-lg border border-gray-light bg-transparent text-sm shadow-theme-xs placeholder:text-gray/40 focus:border-brand-light focus:ring-3 focus:ring-brand/10 focus:outline-hidden dark:border-gray/40 dark:bg-gray-dark dark:placeholder:text-light-accent/30 dark:focus:border-brand-dark ${selectedValue
    ? "text-gray-dark dark:text-light-accent/90"
    : "text-gray/40 dark:text-light-accent/30"
    } ${className}`;

  if (disabled) {
    selectClasses += " bg-light opacity-50 cursor-not-allowed dark:bg-gray-dark/50";
  }

  return (
    <div className="flex relative">
      {
        canClear && selectedValue && selectedValue !== '' && (

          <button onClick={resetSelect} className="absolute left-0 h-full inset-e-3 z-10 bg-warning-dark dark:bg-error-dark w-fit px-1 cursor-pointer rounded-l-lg ">
            <X className={`${ICON_SIZE['sm']} text-white stroke-3 `} />
          </button>
        )
      }

      <div className="relative w-full pl-2.5 ">
        <select
          className={`${selectClasses}`}
          value={selectedValue}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        >
          {/* Placeholder option */}
          <option
            value=""
            disabled
            className="text-gray/80 italic font-medium dark:bg-gray-dark dark:text-gray-light"
          >
            {placeholder}
          </option>

          {/* Map over options */}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-gray-dark dark:bg-gray-dark dark:text-gray-light"
            >
              {option.label}
            </option>
          ))}
        </select>
        <span className="inset-e-3 pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray dark:text-gray-light">
          <ChevronDownIcon className={ICON_SIZE[size]} />
        </span>
      </div>

    </div>
  );
};

export default Select;
