import { FC } from "react";

interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
}

const SIZE = {
  sm: "h-8 text-xs file:py-1 file:text-xs",
  md: "h-11 text-sm file:py-1.5 file:text-sm",
  lg: "h-14 text-base file:py-3 file:text-base",
};

const FileInput: FC<FileInputProps> = ({
  size = "md",
  className = "",
  onChange,
  ...props
}) => {
  return (
    <input
      type="file"
      className={`focus:border-ring-brand-light ${SIZE[size]} w-full overflow-hidden rounded-lg border border-gray-light bg-transparent text-gray shadow-theme-xs transition-colors file:me-5 file:border-collapse file:cursor-pointer file:rounded-s-lg file:border-0 file:border-e file:border-solid file:border-gray-light file:bg-light file:ps-3.5 file:pe-3 file:text-gray-dark placeholder:text-gray-light hover:file:bg-light focus:outline-hidden focus:file:ring-brand-light dark:border-gray-dark dark:bg-gray-dark dark:text-gray-light dark:file:border-gray-dark dark:file:bg-light-accent/3 dark:file:text-gray-light dark:placeholder:text-gray-light ${className}`}
      onChange={onChange}
      {...props}
    />
  );
};

export default FileInput;
