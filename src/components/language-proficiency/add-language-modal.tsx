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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { toast } from "sonner";
import { Button } from "../common/button/button";
import { useGetUser } from "@/hooks/use-get-user";
import { useWorkerUserUpdateMutation } from "@/store/auth/auth.api";
import { FileUpload } from "../file-upload";

interface AddLanguageProficiencyProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface LanguageFormValues {
  language: string;
  proficiencyLevel: string;
  speakingLevel: string;
  writingAndReadingLevel: string;
  file: string | undefined;
}

export const AddLanguageModal = ({
  open,
  onOpenChange,
}: AddLanguageProficiencyProps) => {
  const form = useForm<LanguageFormValues>({
    defaultValues: {
      language: "",
      proficiencyLevel: "",
      speakingLevel: "",
      writingAndReadingLevel: "",
      file: undefined,
    },
  });

  const user: any = useGetUser();
  const handleRequest = useHandleRequest();
  const [update, { isLoading: isUpdating }] = useWorkerUserUpdateMutation();
  // const { handleFileUpload, isLoading: isFileUploading } = useFileUpload();

  const onSubmit = async (data: LanguageFormValues) => {
    const languageProficiencies = [
      ...(user?.languageProficiencies ?? []),
      { ...data },
    ];

    await handleRequest({
      request: async () => {
        const response = await update({
          languageProficiencies: languageProficiencies as any,
        });
        return response;
      },
      onSuccess: () => {
        onOpenChange(false);
        toast.success("Language proficiency added successfully");
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-8">
        <DialogHeader>
          <DialogTitle>Add Language Proficiency</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 max-w-xl"
          >
            {/* Language */}
            <FormField
              control={form.control}
              name="language"
              rules={{ required: "Language is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="English" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Proficiency Level */}
            <FormField
              control={form.control}
              name="proficiencyLevel"
              rules={{ required: "Proficiency level is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proficiency Level</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="beginner">
                            Beginner (A1)
                          </SelectItem>
                          <SelectItem value="elementary">
                            Elementary (A2)
                          </SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate (B1)
                          </SelectItem>
                          <SelectItem value="upper-intermediate">
                            Upper-Intermediate (B2)
                          </SelectItem>
                          <SelectItem value="advanced">
                            Advanced (C1)
                          </SelectItem>
                          <SelectItem value="proficient">
                            Proficient (C2)
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="speakingLevel"
              rules={{ required: "Speaking level is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Speaking Level</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select speaking level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="beginner">
                            Beginner (A1)
                          </SelectItem>
                          <SelectItem value="elementary">
                            Elementary (A2)
                          </SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate (B1)
                          </SelectItem>
                          <SelectItem value="upper-intermediate">
                            Upper-Intermediate (B2)
                          </SelectItem>
                          <SelectItem value="advanced">
                            Advanced (C1)
                          </SelectItem>
                          <SelectItem value="proficient">
                            Proficient (C2)
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="writingAndReadingLevel"
              rules={{ required: "Writing & reading level is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Writing & Reading Level</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select writing & reading level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="beginner">
                            Beginner (A1)
                          </SelectItem>
                          <SelectItem value="elementary">
                            Elementary (A2)
                          </SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate (B1)
                          </SelectItem>
                          <SelectItem value="upper-intermediate">
                            Upper-Intermediate (B2)
                          </SelectItem>
                          <SelectItem value="advanced">
                            Advanced (C1)
                          </SelectItem>
                          <SelectItem value="proficient">
                            Proficient (C2)
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              rules={{ required: "File is required" }}
              name="file"
              render={({ field }) => (
                <FileUpload
                  label="Upload File"
                  name="file"
                  value={field.value as string}
                  onChange={field.onChange}
                  errorMessage={form.formState.errors.file?.message}
                />
              )}
            />
            <Button loading={isUpdating}>Save Language</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
