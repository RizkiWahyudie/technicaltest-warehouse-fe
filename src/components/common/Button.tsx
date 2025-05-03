import { ButtonHTMLAttributes } from "react";
import { ClipLoader } from "react-spinners";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-600 hover:bg-gray-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  outline:
    "bg-transparent border border-gray-300 hover:bg-gray-50 text-gray-700",
};

const Button = ({
  variant = "primary",
  isLoading = false,
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors cursor-pointer ${
        variantClasses[variant]
      } ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <ClipLoader size={20} color="#ffffff" className="mr-2" />
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
