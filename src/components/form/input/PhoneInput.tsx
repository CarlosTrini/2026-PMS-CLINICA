"use client";

import { isRtl } from "@/i18n/languages";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/utils";
import { useLocale } from "next-intl";
import { useState } from "react";

interface CountryCode {
  code: string;
  label: string;
}

interface PhoneInputProps {
  countries: CountryCode[];
  placeholder?: string;
  id?: string;
  onChange?: (phoneNumber: string) => void;
  selectPosition?: "start" | "end"; // New prop for dropdown position
}

const SIZE = {
  sm: 'h-8',
  md: 'h-11',
  lg: 'h-14',
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  countries,
  placeholder = "+1 (555) 000-0000",
  onChange,
  selectPosition = "start", // Default position is 'start'
}) => {
  const locale = useLocale();
  const isRtlLayout = isRtl(locale as Locale);

  const [selectedCountry, setSelectedCountry] = useState<string>("US");
  const [phoneNumber, setPhoneNumber] = useState<string>("+1");

  const countryCodes: Record<string, string> = countries.reduce(
    (acc, { code, label }) => ({ ...acc, [code]: label }),
    {},
  );

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setSelectedCountry(newCountry);
    setPhoneNumber(countryCodes[newCountry]);
    if (onChange) {
      onChange(countryCodes[newCountry]);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    if (onChange) {
      onChange(newPhoneNumber);
    }
  };

  return (
    <div className="relative flex">
      {/* Dropdown position: Start */}
      {selectPosition === "start" && (
        <div className="inset-s-0 absolute top-0 z-10 flex h-full items-center">
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="h-full appearance-none rounded-s-lg border-0 border-e border-gray-light bg-transparent bg-none py-3 ps-3.5 pe-8 leading-tight text-gray-dark focus:border-brand-light focus:ring-3 focus:ring-brand/10 focus:outline-hidden dark:border-gray-dark dark:text-gray-light"
          >
            {countries.map((country) => (
              <option
                key={country.code}
                value={country.code}
                className="text-gray-dark dark:bg-gray-dark dark:text-gray-light"
              >
                {country.code}
              </option>
            ))}
          </select>
          <div className="inset-e-3 pointer-events-none absolute inset-y-0 flex items-center text-gray-dark dark:text-gray-light">
            <svg
              className="stroke-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Input field */}
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder={placeholder}
        className={cn(
          "dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-light bg-transparent py-3 text-start text-sm text-gray-dark shadow-theme-xs placeholder:text-gray-light focus:border-brand-light focus:ring-3 focus:ring-brand/10 focus:outline-hidden dark:border-gray-dark dark:bg-gray-dark dark:text-light-accent/90 dark:placeholder:text-light-accent/30 dark:focus:border-brand-dark",
          // In RTL, "start" is visually on the right, so swap padding sides
          isRtlLayout
            ? selectPosition === "start"
              ? "ps-4 pe-21"
              : "ps-21 pe-4"
            : selectPosition === "start"
              ? "ps-21 pe-4"
              : "ps-4 pe-21",
        )}
      />

      {/* Dropdown position: End */}
      {selectPosition === "end" && (
        <div className="inset-e-0 absolute top-0 z-10 flex h-full items-center">
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="h-full appearance-none rounded-e-lg border-0 border-s border-gray-light bg-transparent bg-none py-3 ps-3.5 pe-8 leading-tight text-gray-dark focus:border-brand-light focus:ring-3 focus:ring-brand/10 focus:outline-hidden rtl:ps-8 rtl:pe-3.5 dark:border-gray-dark dark:text-gray-light"
          >
            {countries.map((country) => (
              <option
                key={country.code}
                value={country.code}
                className="text-gray-dark dark:bg-gray-dark dark:text-gray-light"
              >
                {country.code}
              </option>
            ))}
          </select>
          <div className="inset-e-3 rtl:inset-s-3 rtl:inset-e-auto pointer-events-none absolute inset-y-0 flex items-center text-gray-dark dark:text-gray-light">
            <svg
              className="stroke-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
