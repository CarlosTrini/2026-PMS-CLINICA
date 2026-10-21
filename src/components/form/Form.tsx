import type React from "react";
import type { FC, ReactNode } from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

const Form: FC<FormProps> = ({ onSubmit, children, className = "", ...props }) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault(); // Evita la recarga por defecto de la página
        onSubmit?.(event);
      }}
      className={className}
      {...props}
    >
      {children}
    </form>
  );
};

export default Form;
