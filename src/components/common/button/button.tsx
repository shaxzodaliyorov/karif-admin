import React from "react";
import { Button as UiButton } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null;
  size?: "default" | "sm" | "lg" | "icon" | null;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  disabled = false,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <UiButton
      variant={variant}
      size={size}
      disabled={isDisabled}
      onClick={onClick}
      className={`relative cursor-pointer ${className}`}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </UiButton>
  );
};
