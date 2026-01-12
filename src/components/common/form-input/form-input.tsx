import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Path, RegisterOptions } from "react-hook-form";

interface FormInputProps<TFormValues extends Record<string, unknown>> {
  form: any;
  name: Path<TFormValues>;
  label: string;
  type?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  placeholder?: string;
  className?: string;
  rules?: RegisterOptions<TFormValues, Path<TFormValues>>;
  disabled?: boolean;
}

export const FormInput = <TFormValues extends Record<string, unknown>>({
  form,
  name,
  label,
  type = "text",
  leftElement,
  rightElement,
  placeholder,
  className = "",
  rules,
  disabled = false,
}: FormInputProps<TFormValues>) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const passwordToggle =
    type === "password" ? (
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    ) : null;

  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              {leftElement && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {leftElement}
                </div>
              )}

              <Input
                {...(field as any)}
                type={inputType}
                placeholder={placeholder}
                className={`${className} ${leftElement ? "pl-10" : ""} ${
                  rightElement || passwordToggle ? "pr-10" : ""
                }`}
                disabled={disabled}
              />
              {rightElement && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {rightElement}
                </div>
              )}
              {passwordToggle}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
