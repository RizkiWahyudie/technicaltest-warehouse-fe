import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError | string;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, className = "", containerClassName = "", ...props },
    ref
  ) => {
    return (
      <div className={`mb-4 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-3 py-2 text-black border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">
            {typeof error === "string" ? error : error.message}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
