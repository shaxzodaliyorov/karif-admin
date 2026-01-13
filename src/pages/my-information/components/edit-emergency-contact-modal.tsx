import type { Worker } from "@/@types/worker";
import { Modal } from "@/components/common/modal";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetUser } from "@/hooks/use-get-user";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { useWorkerUserUpdateMutation } from "@/store/auth/auth.api";
import dayjs from "dayjs";
import { CalendarIcon, Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export interface EditEmergencyContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type EmergencyContactFormValues = {
  relationship: string;
  phone: string;
  fullName: string;
  dateOfBirth: string;
};

export const EditEmergencyContactModal = ({
  open,
  onOpenChange,
}: EditEmergencyContactModalProps) => {
  const form = useForm<EmergencyContactFormValues>({
    defaultValues: {
      relationship: "",
      phone: "",
      fullName: "",
      dateOfBirth: "",
    },
  });

  const [calendarOpen, setCalendarOpen] = useState(false);

  const { control, handleSubmit, setValue } = form;
  const user: Worker | null = useGetUser() as Worker | null;

  const handleRequest = useHandleRequest();
  const [updateUser, { isLoading }] = useWorkerUserUpdateMutation();

  useEffect(() => {
    setValue("phone", user?.relPhoneNumber ?? "");
    setValue("fullName", user?.relFullName ?? "");
    setValue("dateOfBirth", user?.relDateOfBirth as string);
    setValue("relationship", user?.relationship as string);
  }, [user, setValue]);

  const onSubmit = async (data: EmergencyContactFormValues) => {
    await handleRequest({
      request: async () => {
        const res = await updateUser({
          relDateOfBirth: data.dateOfBirth ?? null,
          relPhoneNumber: data.phone,
          relFullName: data.fullName,
          relationship: data.relationship,
        });
        return res;
      },
      onSuccess: () => {
        onOpenChange(false);
        toast.success("Emergency contact updated successfully");
      },
    });
  };

  return (
    <Modal
      open={open}
      onClose={() => onOpenChange(false)}
      title="Edit Emergency Contact"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* Relationship */}
          <FormField
            control={control}
            name="relationship"
            rules={{ required: "Relationship is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relationship</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Mother">Mother</SelectItem>
                        <SelectItem value="Father">Father</SelectItem>
                        <SelectItem value="Sister">Sister</SelectItem>
                        <SelectItem value="Brother">Brother</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={control}
            name="phone"
            rules={{ required: "Phone is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="+998 90 123 45 67"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Full Name */}
          <FormField
            control={control}
            name="fullName"
            rules={{ required: "Full name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Sarah Johnson"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date of Birth */}
          <FormField
            control={control}
            name="dateOfBirth"
            rules={{ required: "Date of birth is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of birth</FormLabel>
                <FormControl>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-between font-normal"
                      >
                        {field.value
                          ? dayjs(field.value).format("DD MMM YYYY")
                          : "Select date"}
                        <CalendarIcon className="w-4 h-4 ml-2 text-gray-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? dayjs(field.value).toDate() : undefined
                        }
                        onSelect={(date) => {
                          field.onChange(date);
                          setCalendarOpen(false);
                        }}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-700 hover:bg-blue-600">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
