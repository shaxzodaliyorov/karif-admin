import type { Worker } from "@/@types/worker";
import { Button } from "@/components/common/button/button";
import { Modal } from "@/components/common/modal";
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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export interface EditPersonalModalProps {
  open: boolean;
  onOpenChange: () => void;
}

type UpdatePersonalFormValues = {
  gender: string;
  phone: string;
  fullName: string;
  dateOfBirth: string;
  address: string;
  country: string;
  height: number;
  weight: number;
  shoeSize: number;
};

export const EditPersonalModal = ({
  open,
  onOpenChange,
}: EditPersonalModalProps) => {
  const form = useForm<UpdatePersonalFormValues>({
    defaultValues: {
      gender: "",
      phone: "",
      fullName: "",
      dateOfBirth: "",
      address: "",
      country: "",
      height: 0,
      weight: 0,
      shoeSize: 0,
    },
  });

  const { control, handleSubmit, setValue } = form;
  const user: Worker | null = useGetUser() as Worker | null;

  const handleRequest = useHandleRequest();
  const [updateUser, { isLoading }] = useWorkerUserUpdateMutation();

  console.log("user?.gender", user?.gender);

  useEffect(() => {
    setValue("phone", user?.phoneNumber ?? "");
    setValue("fullName", user?.name ?? "");
    setValue("gender", user?.gender ?? "");
    setValue("dateOfBirth", user?.dateOfBirth ?? "");
    setValue("address", user?.address ?? "");
    setValue("country", user?.country ?? "");
    setValue("height", user?.height ?? 0);
    setValue("weight", user?.weight ?? 0);
    setValue("shoeSize", user?.shoeSize ?? 0);
  }, [user, setValue]);

  const onSubmit = async (data: UpdatePersonalFormValues) => {
    await handleRequest({
      request: async () => {
        const res = await updateUser({
          phoneNumber: data.phone,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
          address: data.address,
          country: data.country,
          height: data.height,
          weight: data.weight,
          shoeSize: data.shoeSize,
        });
        return res;
      },
      onSuccess: () => {
        onOpenChange();
        toast.success("Personal contact updated successfully");
      },
    });
  };

  return (
    <Modal open={open} onClose={onOpenChange} title="Edit Personal Information">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* Gender */}
          <FormField
            control={control}
            name="gender"
            rules={{ required: "Gender is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
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
                <FormLabel>Phone Number</FormLabel>
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
                <FormLabel>Full Name</FormLabel>
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
          <FormField
            control={control}
            name="dateOfBirth"
            rules={{ required: "Date of birth is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Popover modal>
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

          <FormField
            control={control}
            name="shoeSize"
            rules={{ required: "Shoe size is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shoe Size</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Shoe size"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="height"
            rules={{ required: "Height is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Height" className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="weight"
            rules={{ required: "Weight is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Weight" className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* 
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-blue-700 hover:bg-blue-600">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save changes
            </Button>
          </DialogFooter> */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onOpenChange}>
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
