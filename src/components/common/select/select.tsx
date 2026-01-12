import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import type { Path, RegisterOptions } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps<TFormValues extends Record<string, unknown>> {
  form: any;
  name: Path<TFormValues>;
  label: string;
  options: Option[];
  placeholder?: string;
  mode?: "single" | "multiple";
  disabled?: boolean;
  className?: string;
  rules?: RegisterOptions<TFormValues, Path<TFormValues>>;
}

export const FormSelect = <TFormValues extends Record<string, unknown>>({
  form,
  name,
  label,
  options,
  placeholder = "Select...",
  mode = "single",
  disabled = false,
  className = "",
  rules,
}: FormSelectProps<TFormValues>) => {
  if (mode === "multiple") {
    const fieldValue = (form.watch(name) as string[]) || [];

    return (
      <FormField
        control={form.control}
        name={name}
        rules={rules}
        render={({}) => (
          <FormItem className="w-full">
            <FormLabel>{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl className="w-full">
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between h-auto min-h-10 py-2",
                      !fieldValue.length && "text-muted-foreground",
                      className
                    )}
                    disabled={disabled}
                  >
                    <div className="flex flex-wrap gap-1">
                      {fieldValue.length === 0 && <span>{placeholder}</span>}
                      {fieldValue.map((value) => {
                        const option = options.find(
                          (opt) => opt.value === value
                        );
                        return (
                          <Badge
                            key={value}
                            variant="secondary"
                            className="mr-1"
                          >
                            {option?.label ?? value}
                            {!disabled && (
                              <X
                                className="ml-1 h-3 w-3 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  form.setValue(
                                    name,
                                    fieldValue.filter((v) => v !== value) as any
                                  );
                                }}
                              />
                            )}
                          </Badge>
                        );
                      })}
                    </div>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Qidirish..." />
                  <CommandList>
                    <CommandEmpty>Hech narsa topilmadi.</CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={(currentValue) => {
                            const newValue = fieldValue.includes(currentValue)
                              ? fieldValue.filter((v) => v !== currentValue)
                              : [...fieldValue, currentValue];

                            form.setValue(name, newValue as any);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              fieldValue.includes(option.value)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  // ==================== SINGLE MODE (oldincha) ====================
  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value as string}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className={cn("w-full", className)}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
