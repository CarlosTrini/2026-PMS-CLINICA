type BadgeVariant = "light" | "solid";
type BadgeSize = "sm" | "md";
type BadgeColor =
  "primary" | "success" | "error" | "warning" | "info" | "light" | "dark";

interface BadgeProps {
  variant?: BadgeVariant; // Light or solid variant
  size?: BadgeSize; // Badge size
  color?: BadgeColor; // Badge color
  variantColor?: string; // Custom variant, you only add bg- and the color
  startIcon?: React.ReactNode; // Icon at the start
  endIcon?: React.ReactNode; // Icon at the end
  children: React.ReactNode; // Badge content
}

const Badge: React.FC<BadgeProps> = ({
  variant = "light",
  variantColor,
  color = "primary",
  size = "md",
  startIcon,
  endIcon,
  children,
}) => {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium";

  // Define size styles
  const sizeStyles = {
    sm: "text-theme-xs", // Smaller padding and font size
    md: "text-sm", // Default padding and font size
  };

  // Define color styles for variants
  const variants = {
    light: {
      primary:
        "bg-light text-brand dark:bg-brand-dark/15 dark:text-brand-light",
      success:
        "bg-light text-success-dark dark:bg-success-dark/15 dark:text-success-light",
      error:
        "bg-light text-error-dark dark:bg-error-dark/15 dark:text-error-light",
      warning:
        "bg-light text-warning-dark dark:bg-warning-dark/15 dark:text-orange-light",
      info: "bg-light text-blue-light dark:bg-blue-light-dark/15 dark:text-blue-light-light",
      light: "bg-light text-gray-dark dark:bg-light-accent/5 dark:text-light-accent/80",
      dark: "bg-gray text-light-accent dark:bg-light-accent/5 dark:text-light-accent",
    },
    solid: {
      primary: "bg-brand text-light-accent dark:text-light-accent",
      success: "bg-success text-light-accent dark:text-light-accent",
      error: "bg-error text-light-accent dark:text-light-accent",
      warning: "bg-warning text-light-accent dark:text-light-accent",
      info: "bg-blue-light text-light-accent dark:text-light-accent",
      light: "bg-gray dark:bg-light-accent/5 text-light-accent dark:text-light-accent/80",
      dark: "bg-gray-dark text-light-accent dark:text-light-accent",
    },
  };

  // Get styles based on size and color variant
  const sizeClass = sizeStyles[size];
  // const colorStyles =  variants[variant][color];
  const colorStyles = variantColor ? variantColor : variants[variant][color];


  return (
    <span className={`${baseStyles} ${sizeClass} ${colorStyles}`}>
      {startIcon && <span className="me-1">{startIcon}</span>}
      {children}
      {endIcon && <span className="ms-1">{endIcon}</span>}
    </span>
  );
};

export default Badge;
