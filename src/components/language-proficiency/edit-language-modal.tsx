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
import { useEffect } from "react";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { useFileUpload } from "@/hooks/use-upload-file";
import { toast } from "sonner";
import { Button } from "../common/button/button";
import { FileUpload } from "../file-upload";
import { useGetUser } from "@/hooks/use-get-user";
import { useWorkerUserUpdateMutation } from "@/store/auth/auth.api";

interface EditLanguageProficiencyProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  index: number;
}

interface LanguageFormValues {
  language: string;
  proficiencyLevel: string;
  speakingLevel: string;
  writingAndReadingLevel: string;
  file: undefined | string;
}

export const EditLanguageModal = ({
  open,
  onOpenChange,
  index,
}: EditLanguageProficiencyProps) => {
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
  const { handleFileUpload, isLoading: isFileUploading } = useFileUpload();

  const onSubmit = async (data: LanguageFormValues) => {
    const filePath =
      typeof data?.file === "string"
        ? data?.file
        : await handleFileUpload(data?.file as any);
    const languageProficiencies = [...(user?.languageProficiencies ?? [])];

    languageProficiencies[index] = { ...data, file: filePath as string };

    await handleRequest({
      request: async () => {
        const response = await update({
          languageProficiencies: languageProficiencies as any,
        });
        return response;
      },
      onSuccess: () => {
        onOpenChange(false);
        toast.success("Language proficiency updated successfully");
      },
    });
  };

  useEffect(() => {
    if (index !== -1) {
      form.setValue(
        "language",
        user?.languageProficiencies?.[index]?.language as string
      );
      form.setValue(
        "proficiencyLevel",
        user?.languageProficiencies?.[index]?.proficiencyLevel as string
      );
      form.setValue(
        "speakingLevel",
        user?.languageProficiencies?.[index]?.speakingLevel as string
      );
      form.setValue(
        "writingAndReadingLevel",
        user?.languageProficiencies?.[index]?.writingAndReadingLevel as string
      );
      form.setValue(
        "file",
        user?.languageProficiencies?.[index]?.file as string
      );
    }
  }, [index, user?.languageProficiencies, form]);

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

            {/* Speaking Level */}
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

            {/* Writing & Reading Level */}
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
              name="file"
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

            <Button type="submit" loading={isUpdating || isFileUploading}>
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
