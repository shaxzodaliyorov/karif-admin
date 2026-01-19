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
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useWorkerUserUpdateMutation } from "@/store/auth/auth.api";
import { UploadVideoFile } from "../common/upload-video-file/upload-video-file";

type EditType = keyof VideoFormValues;

interface EditVideosProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editType: EditType;
  url: string;
}
type VideoFormValues = {
  interviewVideo: string;
  skillsVerificationVideo: string;
  experienceVideo: string;
};

export const EditVideos = ({
  open,
  onOpenChange,
  editType,
  url,
}: EditVideosProps) => {
  const form = useForm<VideoFormValues>({
    defaultValues: {
      interviewVideo: "",
      skillsVerificationVideo: "",
      experienceVideo: "",
    },
  });

  const handleRequest = useHandleRequest();
  const [update, { isLoading: isUpdating }] = useWorkerUserUpdateMutation();

  const onSubmit = async (data: VideoFormValues) => {
    await handleRequest({
      request: async () => {
        const response = await update({
          [editType]: data[editType],
        });
        return response;
      },
      onSuccess: () => {
        onOpenChange(false);
        toast.success("Video updated successfully");
      },
    });
  };

  const labels: Record<EditType, string> = {
    interviewVideo: "Interview Video",
    skillsVerificationVideo: "Skills Verification Video",
    experienceVideo: "Experience Video",
  } as any;

  console.log(form.getValues());

  useEffect(() => {
    form.setValue(editType, url);
  }, [url, editType, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-8">
        <DialogHeader>
          <DialogTitle>
            {url ? "Edit" : "Add"} {labels?.[editType]}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form?.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form?.control}
              name={editType || ""}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <UploadVideoFile
                      label={labels?.[editType]}
                      value={field.value}
                      onChange={(val) => {
                        console.log(val);
                        field.onChange(val);
                        form.setValue(editType, val as string, {
                          shouldDirty: true,
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isUpdating || !form.watch(editType)}
              type="submit"
              className="bg-blue-700 hover:bg-blue-600"
            >
              {isUpdating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                ""
              )}
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
