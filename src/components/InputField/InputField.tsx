import React, { useId, useState } from "react";

export type Variant = "filled" | "outlined" | "ghost";
export type Size = "sm" | "md" | "lg";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: Variant;
  size?: Size;
  type?: string;
  showClear?: boolean;
  passwordToggle?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

const sizeMap = {
  sm: "text-sm px-2 py-1 rounded-md",
  md: "text-base px-3 py-2 rounded-lg",
  lg: "text-lg px-4 py-3 rounded-xl",
};

const variantMap: Record<Variant, string> = {
  filled: "bg-gray-100 dark:bg-gray-800 border border-transparent",
  outlined: "bg-transparent border",
  ghost: "bg-transparent border-0",
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
  type = "text",
  showClear = false,
  passwordToggle = false,
  id,
  name,
  className = "",
}) => {
  const autoId = useId();
  const inputId = id ?? `input-${autoId}`;
  const [showPassword, setShowPassword] = useState(false);

  const visualInvalid = invalid || Boolean(errorMessage);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}

      <div
        className={`flex items-center gap-2 ${variantMap[variant]} ${
          visualInvalid
            ? "border-red-500 focus-within:ring-red-200"
            : "border-gray-300 focus-within:ring-blue-200"
        } ${sizeMap[size]} transition-shadow duration-150`}
      >
        <input
          id={inputId}
          name={name}
          className="flex-1 bg-transparent outline-none disabled:opacity-60"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          disabled={disabled}
          aria-invalid={visualInvalid}
          aria-describedby={helperText || errorMessage ? `${inputId}-hint` : undefined}
          type={passwordToggle ? (showPassword ? "text" : "password") : type}
        />

        {/* clear button */}
        {showClear && !disabled && value && (
          <button
            aria-label="Clear input"
            type="button"
            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => {
              const native = { target: { value: "" } } as unknown as React.ChangeEvent<HTMLInputElement>;
              onChange?.(native);
            }}
          >
            ✕
          </button>
        )}

        {/* password toggle */}
        {passwordToggle && (
          <button
            aria-label={showPassword ? "Hide password" : "Show password"}
            type="button"
            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setShowPassword((s) => !s)}
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        )}
      </div>

      {/* helper / error */}
      <p
        id={`${inputId}-hint`}
        className={`mt-1 text-xs ${visualInvalid ? "text-red-600" : "text-gray-500"}`}
        role={visualInvalid ? "alert" : undefined}
      >
        {visualInvalid ? errorMessage : helperText}
      </p>
    </div>
  );
};

export default InputField;
