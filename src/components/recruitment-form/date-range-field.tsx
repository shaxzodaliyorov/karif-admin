/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/recruitment/DateRangeField.tsx
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Calendar } from "../../components/ui/calendar";
import { HiMiniArrowsRightLeft } from "react-icons/hi2";

interface DateRangeFieldProps {
  control: any;
  label: string;
  startName: string;
  endName: string;
}

export const DateRangeField = ({
  control,
  label,
  startName,
  endName,
}: DateRangeFieldProps) => {
  return (
    <div className="flex items-center gap-4">
      <label className="w-48 text-sm font-medium">{label}</label>
      <Controller
        name={startName}
        control={control}
        render={({ field }) => (
          <div className="w-[50%]">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-11 flex justify-start"
                >
                  <CalendarIcon />
                  {field.value ? (
                    dayjs(field.value).format("YYYY-MM-DD")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dayjs(field.value).toDate()}
                  onSelect={field.onChange}
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      />
      <HiMiniArrowsRightLeft />
      <Controller
        name={endName}
        control={control}
        render={({ field }) => (
          <div className="w-[50%]">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-11 flex justify-start"
                >
                  <CalendarIcon />
                  {field.value ? (
                    dayjs(field.value).format("YYYY-MM-DD")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dayjs(field.value).toDate()}
                  onSelect={field.onChange}
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      />
    </div>
  );
};
