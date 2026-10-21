"use client";

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import React, { useEffect, useRef } from "react";
import { CalenderIcon } from "../../../icons";
import Label from "../Label";
import Hook = flatpickr.Options.Hook;
import DateOption = flatpickr.Options.DateOption;

interface PropsType
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: Hook | Hook[];
  defaultDate?: DateOption;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE = {
  sm: "h-8 text-xs ps-3 pe-8 py-1",
  md: "h-11 text-sm ps-4 pe-10 py-2.5",
  lg: "h-14 text-base ps-5 pe-12 py-3.5",
};

const ICON_SIZE = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

export default function DatePicker({
  id,
  mode = "single",
  onChange,
  label,
  defaultDate,
  placeholder = "Seleccionar fecha...",
  size = "md",
  className = "",
  disabled = false,
  ...props
}: PropsType) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const flatPickr = flatpickr(inputRef.current, {
      mode,
      static: true,
      monthSelectorType: "static",
      dateFormat: "Y-m-d",
      defaultDate,
      onChange,
    });

    return () => {
      if (!Array.isArray(flatPickr)) {
        flatPickr.destroy();
      }
    };
  }, [mode, onChange, defaultDate]);

  let inputClasses = `${SIZE[size]} w-full appearance-none rounded-lg border border-gray-light bg-transparent text-gray-dark shadow-theme-xs placeholder:text-gray-light focus:border-brand-light focus:ring-3 focus:ring-brand/20 focus:outline-hidden dark:border-gray-dark dark:bg-gray-dark dark:text-light-accent/90 dark:placeholder:text-light-accent/30 dark:focus:border-brand-dark ${className}`;

  if (disabled) {
    inputClasses += " bg-light opacity-50 cursor-not-allowed dark:bg-gray-dark/50";
  }

  return (
    <div className="w-full">
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />

        <span className="inset-e-3 pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray dark:text-gray-light">
          <CalenderIcon className={ICON_SIZE[size]} />
        </span>
      </div>
    </div>
  );
}
