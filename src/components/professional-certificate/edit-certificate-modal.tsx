/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2, Save } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { toast } from "sonner";
import { useEffect } from "react";
import { useWorkerUserUpdateMutation } from "@/store/auth/auth.api";
import { useGetUser } from "@/hooks/use-get-user";
import { FileUpload } from "../file-upload";

interface EditProfessionalCertificateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  index: number;
}

type CertificateFormValues = {
  certificateType: string;
  issuingInstitution: string;
  issueDate: string;
  file: undefined | string;
};

export const EditCertificateModal = ({
  open,
  onOpenChange,
  index,
}: EditProfessionalCertificateProps) => {
  const form = useForm<CertificateFormValues>({
    defaultValues: {
      certificateType: "",
      issuingInstitution: "",
      issueDate: "",
      file: undefined,
    },
  });

  const user: any = useGetUser();
  const handleRequest = useHandleRequest();
  const [update, { isLoading: isUpdating }] = useWorkerUserUpdateMutation();

  const onSubmit = async (data: CertificateFormValues) => {
    const professionalCertificates = [
      ...(user?.professionalCertificates ?? []),
    ];

    professionalCertificates[index] = { ...data } as any;

    await handleRequest({
      request: async () => {
        const response = await update({
          professionalCertificates: professionalCertificates as any,
        });
        return response;
      },
      onSuccess: () => {
        onOpenChange(false);
        toast.success("Professional certificate edited successfully");
        form.reset();
      },
    });
  };

  useEffect(() => {
    form.setValue(
      "certificateType",
      user?.professionalCertificates?.[index]?.certificateType ?? ""
    );
    form.setValue(
      "issuingInstitution",
      user?.professionalCertificates?.[index]?.issuingInstitution ?? ""
    );
    form.setValue(
      "issueDate",
      user?.professionalCertificates?.[index]?.issueDate ?? ""
    );
    form.setValue(
      "file",
      user?.professionalCertificates?.[index]?.file as string
    );
  }, [index, user?.professionalCertificates, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-8">
        <DialogHeader>
          <DialogTitle>Edit Professional Certificate</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 max-w-xl"
          >
            {/* Certificate Type */}
            <FormField
              control={form.control}
              name="certificateType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certificate Type</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Frontend Development (React & Next.js)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Issuing Institution */}
            <FormField
              control={form.control}
              name="issuingInstitution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issuing Institution</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Udemy" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Issue Date */}
            <FormField
              control={form.control}
              name="issueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Graduation Date</FormLabel>
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
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Certificate
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
