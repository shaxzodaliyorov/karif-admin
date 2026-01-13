import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2, SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { toast } from "sonner";
import { useWorkerUserUpdateMutation } from "@/store/auth/auth.api";
import { useGetUser } from "@/hooks/use-get-user";

type EducationFormValues = {
  highestDegree: string;
  universityName: string;
  major: string;
  startDate: string;
  graduationDate: string;
};

interface EducationFormModalProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  index: number;
}

export function EditCollegeModal({
  isDialogOpen,
  setIsDialogOpen,
  index,
}: EducationFormModalProps) {
  const [openStart, setOpenStart] = useState(false);
  const [openGraduation, setOpenGraduation] = useState(false);
  const user: any = useGetUser();
  const form = useForm<EducationFormValues>({
    defaultValues: {
      highestDegree: "",
      universityName: "",
      major: "",
      startDate: undefined,
      graduationDate: undefined,
    },
  });
  const [updateUser, { isLoading }] = useWorkerUserUpdateMutation();

  const handleRequest = useHandleRequest();

  const onSubmit = async (data: EducationFormValues) => {
    await handleRequest({
      request: async () => {
        const universities = [...(user?.universities ?? [])];
        universities[index] = { ...data };
        const response = await updateUser({
          universities: universities as any,
        });
        return response;
      },
      onSuccess: () => {
        setIsDialogOpen(false);
        toast.success("University added successfully");
      },
    });
  };

  useEffect(() => {
    form.setValue(
      "highestDegree",
      user?.universities?.[index]?.highestDegree ?? ""
    );
    form.setValue(
      "universityName",
      user?.universities?.[index]?.universityName ?? ""
    );
    form.setValue("major", user?.universities?.[index]?.major ?? "");
    form.setValue(
      "startDate",
      user?.universities?.[index]?.startDate as string
    );
    form.setValue(
      "graduationDate",
      user?.universities?.[index]?.graduationDate as string
    );
  }, [index, user?.universities, form]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[550px] p-8">
        <DialogHeader>
          <DialogTitle>Edit University</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 max-w-xl"
          >
            {/* Highest Degree */}
            <FormField
              control={form.control}
              name="highestDegree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Highest Degree</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Bachelor Degree">
                            Bachelor Degree
                          </SelectItem>
                          <SelectItem value="Master Degree">
                            Master Degree
                          </SelectItem>
                          <SelectItem value="PhD">PhD</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* University Name */}
            <FormField
              control={form.control}
              name="universityName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Inha University in Tashkent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Major */}
            <FormField
              control={form.control}
              name="major"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Major</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Software Engineering" />
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
                    <Popover open={openStart} onOpenChange={setOpenStart}>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {field.value
                            ? new Date(field.value)?.toLocaleDateString()
                            : "Select start date"}
                          <CalendarIcon className="w-4 h-4 ml-2 text-gray-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={(date) => {
                            field.onChange(date);
                            setOpenStart(false);
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

            {/* Graduation Date */}
            <FormField
              control={form.control}
              name="graduationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Graduation Date</FormLabel>
                  <FormControl>
                    <Popover
                      open={openGraduation}
                      onOpenChange={setOpenGraduation}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {field.value
                            ? new Date(field.value)?.toLocaleDateString()
                            : "Select graduation date"}
                          <CalendarIcon className="w-4 h-4 ml-2 text-gray-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={(date) => {
                            field.onChange(date);
                            setOpenGraduation(false);
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

            {/* Submit */}
            <Button type="submit" className="bg-blue-700 hover:bg-blue-600">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <SaveIcon className="mr-2 h-4 w-4" />
              )}
              Edit University
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
