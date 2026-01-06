import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface DropdownOption {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface DropdownProps {
  children: React.ReactNode;
  options: DropdownOption[];
  align?: "start" | "center" | "end";
  triggerClassName?: string;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

export function Dropdown({
  children,
  options,
  align = "end",
  triggerClassName,
  onOpenChange,
  disabled = false,
}: DropdownProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        onOpenChange?.(o);
      }}
    >
      <DropdownMenuTrigger
        className={cn("focus:outline-none", triggerClassName)}
        disabled={disabled}
        asChild
      >
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align} className="w-48">
        {options.map((option, index) => (
          <DropdownMenuItem
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              option.onClick?.();
              setOpen(false);
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            {option.icon && (
              <span className="text-muted-foreground">{option.icon}</span>
            )}
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
