import React, { forwardRef, useId, useState } from "react";
import { cn } from "../../lib/cn";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: string;
  name?: string;
  // Optional features
  clearable?: boolean;
  showPasswordToggle?: boolean;
  loading?: boolean;
  className?: string;
}

/**
 * InputField
 *
 * - forwardRef for integration with form libraries
 * - accessible (label association, aria-invalid, aria-describedby)
 * - variants: filled, outlined, ghost
 * - sizes: sm, md, lg
 * - states: disabled, invalid, loading
 * - optional clear button & password toggle
 */
const sizeStyles = {
  sm: "text-sm px-3 py-1.5 rounded-md",
  md: "text-base px-3.5 py-2 rounded-lg",
  lg: "text-lg px-4 py-3 rounded-xl",
} as const;

const variantBase = {
  filled:
    "bg-gray-100 dark:bg-gray-800 border border-transparent focus-within:ring-2 focus-within:ring-offset-0",
  outlined:
    "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus-within:ring-2 focus-within:ring-offset-0",
  ghost:
    "bg-transparent border border-transparent focus-within:ring-2 focus-within:ring-offset-0",
} as const;

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const {
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
      name,
      clearable = false,
      showPasswordToggle = false,
      loading = false,
      className,
      ...rest
    } = props;

    const id = useId();
    const describedByIds: string[] = [];
    if (helperText) describedByIds.push(`${id}-helper`);
    if (errorMessage) describedByIds.push(`${id}-error`);
    const describedBy = describedByIds.join(" ") || undefined;

    const [internalType, setInternalType] = useState(type);
    const showToggle = showPasswordToggle && type === "password";

    const onClear = () => {
      // Create a synthetic change event to send empty value
      const event = {
        target: { value: "" },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange?.(event);
    };

    const rootClasses = cn("flex flex-col w-full", className);

    const controlClasses = cn(
      "relative flex items-center",
      variantBase[variant],
      invalid ? "ring-2 ring-red-500" : "focus-within:ring-sky-500",
      disabled ? "opacity-60 pointer-events-none" : "",
      sizeStyles[size]
    );

    const inputBase = cn(
      "block w-full bg-transparent outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500",
      "disabled:cursor-not-allowed",
      "pr-10" // space for buttons (clear/toggle/loading)
    );

    return (
      <div className={rootClasses}>
        {label && (
          <label htmlFor={id} className="mb-1 text-sm font-medium select-none">
            {label}
          </label>
        )}

        <div className={controlClasses}>
          <input
            id={id}
            name={name}
            ref={ref}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            disabled={disabled}
            className={inputBase}
            type={internalType}
            {...(rest as any)}
          />

          {/* right-side controls */}
          <div className="absolute right-2 flex items-center gap-1">
            {loading && (
              <span
                role="status"
                aria-live="polite"
                className="w-5 h-5 animate-spin inline-flex items-center justify-center"
                title="loading"
              >
                {/* simple spinner (SVG) */}
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    opacity="0.15"
                  />
                  <path
                    d="M22 12a10 10 0 00-10-10"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            )}

            {clearable &&
              !disabled &&
              value &&
              value.length > 0 &&
              !loading && (
                <button
                  type="button"
                  aria-label="Clear input"
                  onClick={onClear}
                  className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </button>
              )}

            {showToggle && !loading && (
              <button
                type="button"
                aria-label={
                  internalType === "password"
                    ? "Show password"
                    : "Hide password"
                }
                onClick={() =>
                  setInternalType((t) =>
                    t === "password" ? "text" : "password"
                  )
                }
                className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                {internalType === "password" ? (
                  // eye icon
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                    <path
                      d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                ) : (
                  // eye-off icon
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                    <path
                      d="M17.94 17.94A10.94 10.94 0 0112 19c-6 0-10-7-10-7a18.6 18.6 0 014.36-5.48"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      d="M1 1l22 22"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>

        {/* helper / error text */}
        <div className="mt-1 min-h-[1.25rem]">
          {invalid && errorMessage ? (
            <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
              {errorMessage}
            </p>
          ) : helperText ? (
            <p
              id={`${id}-helper`}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {helperText}
            </p>
          ) : (
            // preserve layout height when neither exists
            <span className="block h-0"></span>
          )}
        </div>
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
