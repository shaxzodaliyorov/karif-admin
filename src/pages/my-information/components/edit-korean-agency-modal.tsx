import { Button } from "@/components/common/button/button";
import { Modal } from "@/components/common/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetUser } from "@/hooks/use-get-user";
import { useHandleRequest } from "@/hooks/use-handle-request";
import {
  useAgencyUpdateUserMutation,
  useKoreanAgencyUpdateUserMutation,
} from "@/store/auth/auth.api";
import { Loader2, Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditKoreanAgencyModalProps {
  open: boolean;
  onClose: () => void;
}

type AgencyFormValues = {
  agencyName: string;
  businessRegistrationNumber: string;
  businessType: string;
  representativeName: string;
  representativeMobilePhone: string;
  representativeBusinessPhone: string;
  representativeAddress: string;
};

export const EditKoreanAgencyModal = ({
  open,
  onClose,
}: EditKoreanAgencyModalProps) => {
  const form = useForm<AgencyFormValues>({
    defaultValues: {
      agencyName: "",
      businessRegistrationNumber: "",
      businessType: "",
      representativeName: "",
      representativeMobilePhone: "",
      representativeBusinessPhone: "",
      representativeAddress: "",
    },
  });
  const [updateUser, { isLoading: isUpdatingUser }] =
    useKoreanAgencyUpdateUserMutation();
  const [updateAgency, { isLoading: isUpdatingAgency }] =
    useAgencyUpdateUserMutation();
  const user: any = useGetUser();
  const handleRequest = useHandleRequest();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;

  useEffect(() => {
    if (user) {
      setValue("agencyName", user.agencyName);
      setValue("businessRegistrationNumber", user.businessRegistrationNumber);
      setValue("businessType", user.businessType);
      setValue("representativeName", user.representativeName);
      setValue("representativeMobilePhone", user.representativeMobilePhone);
      setValue("representativeBusinessPhone", user.representativeBusinessPhone);
      setValue("representativeAddress", user.representativeAddress);
    }
  }, [user]);

  const onSubmit = async (data: AgencyFormValues) => {
    if (user.role === "agency") {
      await handleRequest({
        request: async () => {
          const response = await updateAgency({
            ...data,
          });
          return response;
        },
        onSuccess: () => {
          onClose();
          toast.success("Profile updated successfully");
        },
      });
      return;
    }
    await handleRequest({
      request: async () => {
        const response = await updateUser({
          ...data,
        });
        return response;
      },
      onSuccess: () => {
        onClose();
        toast.success("Profile updated successfully");
      },
    });
  };

  return (
    <Modal title="Edit Korean Agency" open={open} onClose={onClose}>
      <div className=" h-[calc(100vh-20rem)] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {(
              [
                ["agencyName", "Agency Name"],
                ["businessRegistrationNumber", "Business Registration Number"],
                // ["businessType", "Business Type"],
                ["representativeName", "Representative Name"],
                ["representativeMobilePhone", "Representative Mobile Phone"],
                [
                  "representativeBusinessPhone",
                  "Representative Business Phone",
                ],
                ["representativeAddress", "Representative Address"],
              ] as const
            ).map(([name, label]) => (
              <FormField
                key={name}
                control={control}
                name={name}
                rules={{ required: `${label} is required` }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={label} />
                    </FormControl>
                    <FormMessage>{errors[name]?.message}</FormMessage>
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" className="w-full mt-4">
              {isUpdatingUser || isUpdatingAgency ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save />
              )}
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
