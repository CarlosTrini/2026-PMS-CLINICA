import type React from "react";
import type { FC } from "react";

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "error"> {
  error?: boolean;
  success?: boolean;
  hint?: string;
}

const TextArea: FC<TextareaProps> = ({
  placeholder = "Escribe tu mensaje...",
  rows = 3,
  value,
  defaultValue,
  onChange,
  className = "",
  disabled = false,
  error = false,
  success = false,
  hint = "",
  id,
  name,
  ...props
}) => {
  let textareaClasses = `w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 placeholder:text-gray-light dark:placeholder:text-light-accent/30 ${className}`;

  if (disabled) {
    textareaClasses += ` bg-light opacity-50 text-gray border-gray-light cursor-not-allowed dark:bg-gray-dark dark:text-gray-light dark:border-gray-dark`;
  } else if (error) {
    textareaClasses += ` bg-transparent text-gray-dark border-error focus:border-error-light focus:ring-error/20 dark:text-light-accent/90 dark:border-error-dark dark:focus:border-error-dark`;
  } else if (success) {
    textareaClasses += ` bg-transparent text-gray-dark border-success focus:border-success-light focus:ring-success/20 dark:text-light-accent/90 dark:border-success-dark dark:focus:border-success-dark`;
  } else {
    textareaClasses += ` bg-transparent text-gray-dark border-gray-light focus:border-brand-light focus:ring-brand/20 dark:border-gray-dark dark:bg-gray-dark dark:text-light-accent/90 dark:focus:border-brand-dark`;
  }

  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        rows={rows}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        className={textareaClasses}
        {...props}
      />
      {hint && (
        <p
          className={`mt-1.5 text-xs ${error
              ? "text-error"
              : success
                ? "text-success"
                : "text-gray dark:text-gray-light"
            }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default TextArea;
