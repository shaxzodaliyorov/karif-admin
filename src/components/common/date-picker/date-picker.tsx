import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DateRange } from "react-day-picker";

export interface DatePickerProps {
  mode?: "single" | "range";
  value?: Date | DateRange | undefined | string;
  onChange?: (value: Date | DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
  calendarProps?: React.ComponentProps<typeof Calendar>;
  disabled?: boolean;
}

export function DatePicker({
  mode = "single",
  value,
  onChange,
  placeholder = "Select Date...",
  className,
  calendarProps,
  disabled = false,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (newValue: Date | DateRange | undefined) => {
    onChange?.(newValue);
    if (mode === "range" && newValue && "from" in newValue && newValue.to) {
      setOpen(false);
    }
    if (mode === "single") {
      setOpen(false);
    }
  };

  const displayText = React.useMemo(() => {
    if (!value) return placeholder;

    if (mode === "single" && value instanceof Date) {
      return format(value, "dd MMM yyyy");
    }

    if (mode === "single" && typeof value === "string") {
      return format(new Date(value), "dd MMM yyyy");
    }

    if (
      mode === "range" &&
      value &&
      typeof value === "object" &&
      "from" in value &&
      value.from
    ) {
      const from = format(value.from, "dd MMM yyyy");
      const to = value.to ? format(value.to, "dd MMM yyyy") : "...";

      return `${from} — ${to}`;
    }

    return placeholder;
  }, [value, mode, placeholder]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal min-w-[260px]",
            !value && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {displayText}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode={mode}
          selected={value as any}
          onSelect={handleSelect as any}
          captionLayout="dropdown-buttons"
          initialFocus
          numberOfMonths={mode === "range" ? 2 : 1}
          {...(calendarProps as any)}
        />
      </PopoverContent>
    </Popover>
  );
}
