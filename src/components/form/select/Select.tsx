import Tooltip from "@/components/ui/tooltip/Tooltip";
import { ChevronDownIcon } from "@/icons";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value" | "size"> {
  options: Option[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  // onChange?: (value: string) => void;
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
  defaultValue,
  onChange,
  size = "md",
  className = "",
  disabled = false,
  canClear = false,
  reset,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState<string>(defaultValue || '');
  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!isControlled) {
      setInternalValue(value);
    }
    onChange?.(e);
  };

  const resetSelect = () => {
    if (defaultValue) {
      setInternalValue(defaultValue);
      onChange?.({ target: { value: defaultValue } } as React.ChangeEvent<HTMLSelectElement>);
    } else {
      setInternalValue("");
      onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLSelectElement>);
    }
    return;
  }

  useEffect(() => {
    console.log(reset)
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
    <div className="relative w-full">
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

      {/* Acciones al extremo derecho */}
      <div className="absolute inset-e-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
        {canClear && internalValue !== defaultValue && (
          <Tooltip trigger="hover" position="top" content="Limpiar">
            <button
              type="button"
              onClick={resetSelect}
              className="flex size-5.5 items-center justify-center rounded-full text-gray-400 bg-gray/10 dark:bg-gray/15 hover:bg-gray/20 dark:hover:text-error-light dark:hover:bg-gray-light/10 transition-colors cursor-pointer z-10"
              aria-label="Limpiar selección"
            >
              <X className="size-3.5 stroke-[2.5] text-error" />
            </button>
          </Tooltip>
        )}

        <span className="pointer-events-none text-gray dark:text-gray-light">
          <ChevronDownIcon className={ICON_SIZE[size]} />
        </span>
      </div>
    </div>
  );
};

export default Select;
