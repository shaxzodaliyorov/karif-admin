/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { CalendarIcon, Loader2, SaveIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { useWorkerUserUpdateMutation } from "@/store/auth/auth.api";
import { useGetUser } from "@/hooks/use-get-user";
import { FileUpload } from "../file-upload";
import { Modal } from "../common/modal";

interface AddWorkplaceInfoProps {
  open: boolean;
  onClose: () => void;
}

type WorkExperienceFormValues = {
  companyName: string;
  startDate: string;
  workingPeriod: string;
  field: string;
  position: string;
  file: string | undefined;
};

export const AddWorkplaceInfoModal = ({
  open,
  onClose,
}: AddWorkplaceInfoProps) => {
  const form = useForm<WorkExperienceFormValues>({
    defaultValues: {
      companyName: "",
      startDate: "",
      workingPeriod: "",
      field: "",
      position: "",
      file: undefined,
    },
  });

  const user: any = useGetUser();
  const handleRequest = useHandleRequest();
  const [update, { isLoading: isUpdating }] = useWorkerUserUpdateMutation();

  const onSubmit = async (data: WorkExperienceFormValues) => {
    const workplaceInformation = [
      ...(user?.workplaceInformation ?? []),
      { ...data },
    ] as any[];

    await handleRequest({
      request: async () => {
        const response = await update({
          workplaceInformation: workplaceInformation as any,
        });
        return response;
      },
      onSuccess: () => {
        onClose();
        toast.success("Workplace information added successfully");
        form.reset();
      },
    });
  };

  return (
    <Modal title="Add Workplace Information" open={open} onClose={onClose}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 max-w-xl"
        >
          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Company Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Start Date */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-between h-10"
                      >
                        {field.value
                          ? new Date(field.value).toLocaleDateString()
                          : "Select graduation date"}
                        <CalendarIcon className="w-4 h-4 ml-2 text-gray-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          field.onChange(date);
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

          {/* Working Period */}
          <FormField
            control={form.control}
            name="workingPeriod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Working Period (months)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="24" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field */}
          <FormField
            control={form.control}
            name="field"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="IT / Software Development" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Position */}
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Frontend Developer" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Controller
            control={form.control}
            name="file"
            rules={{
              required: "File is required",
            }}
            render={({ field }) => (
              <FileUpload
                label="Upload File"
                name="file"
                value={field.value}
                onChange={field.onChange}
                errorMessage={form.formState.errors.file?.message}
              />
            )}
          />
          <Button type="submit" className="bg-blue-700 hover:bg-blue-600">
            {isUpdating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <SaveIcon className="mr-2 h-4 w-4" />
            )}
            Save Work Experience
          </Button>
        </form>
      </Form>
    </Modal>
  );
};
