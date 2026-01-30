/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

import { Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { useFileUpload } from "@/hooks/use-upload-file";
import { useGetUser } from "@/hooks/use-get-user";
import { useUpdateCompanyMutation } from "@/store/company/company.api";
import { REGIONS } from "@/constants/regions";
import { FileUpload } from "@/components/file-upload";
interface EditModalProps {
  open: boolean;
  onClose: () => void;
}

type BusinessFormValues = {
  companyName: string;
  businessRegistrationNumber: string;
  managementBusinessNumber: string;
  representativeName: string;
  representativeMobilePhone: string;
  businessPhoneNumber: string;
  fax: string;
  address: string;
  photoRegistration: string;
  businessRegistrationCertificate: string;
  managementBusinessRegistrationCertificate: string;
  smallAndMediumSizedBusinessConfirmationCertificate: string;
  localTaxPaymentCertificate: string;
  nationalTaxPaymentCertificate: string;
  region: string;
  mainService: string;
  mainProduct: string;
};

// export const REGIONS = [
//   { label: '서울', value: '서울' },
//   { label: '광주', value: '광주' },
//   { label: '울산', value: '울산' },
//   { label: '경기', value: '경기' },
//   { label: '충북', value: '충북' },
//   { label: '전북', value: '전북' },
//   { label: '부산', value: '부산' },
//   { label: '대구', value: '대구' },
//   { label: '인천', value: '인천' },
//   { label: '대전', value: '대전' },
//   { label: '강원', value: '강원' },
//   { label: '충남(세종)', value: '충남(세종)' },
//   { label: '전남', value: '전남' },
//   { label: '경북', value: '경북' },
//   { label: '경남', value: '경남' },
//   { label: '제주', value: '제주' },
// ];
export const CompanyEditModal = ({ open, onClose }: EditModalProps) => {
  const form = useForm<BusinessFormValues>({
    defaultValues: {
      companyName: "",
      businessRegistrationNumber: "",
      managementBusinessNumber: "",
      representativeName: "",
      representativeMobilePhone: "",
      businessPhoneNumber: "",
      fax: "",
      address: "",
      photoRegistration: "",
      businessRegistrationCertificate: "",
      managementBusinessRegistrationCertificate: "",
      smallAndMediumSizedBusinessConfirmationCertificate: "",
      localTaxPaymentCertificate: "",
      nationalTaxPaymentCertificate: "",
      region: "",
    },
  });
  const [updateUser, { isLoading: isUpdatingUser }] =
    useUpdateCompanyMutation();
  const user: any = useGetUser();
  const handleRequest = useHandleRequest();
  const { handleFileUpload, isLoading: isFileUploading } = useFileUpload();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;

  const onSubmit = async (data: BusinessFormValues) => {
    const photoRegistration =
      typeof data.photoRegistration === "string"
        ? data.photoRegistration
        : ((await handleFileUpload(data.photoRegistration)) as string);
    await handleRequest({
      request: async () => {
        const response = await updateUser({
          ...data,
          photoRegistration,
        });
        return response;
      },
      onSuccess: () => {
        onClose();
        toast.success("Profile updated successfully");
      },
    });
  };

  useEffect(() => {
    if (!user) return;
    setValue("companyName", user?.companyName);
    setValue("businessRegistrationNumber", user?.businessRegistrationNumber);
    setValue("managementBusinessNumber", user?.managementBusinessNumber);
    setValue("representativeName", user?.representativeName);
    setValue("representativeMobilePhone", user?.representativeMobilePhone);
    setValue("businessPhoneNumber", user?.businessPhoneNumber);
    setValue("fax", user?.fax);
    setValue("address", user?.address);
    setValue("photoRegistration", user?.photoRegistration);
    setValue(
      "businessRegistrationCertificate",
      user?.businessRegistrationCertificate,
    );
    setValue("mainService", user?.mainService);
    setValue("mainProduct", user?.mainProduct);
    setValue(
      "managementBusinessRegistrationCertificate",
      user?.managementBusinessRegistrationCertificate,
    );
    setValue(
      "smallAndMediumSizedBusinessConfirmationCertificate",
      user?.smallAndMediumSizedBusinessConfirmationCertificate,
    );
    setValue("localTaxPaymentCertificate", user?.localTaxPaymentCertificate);
    setValue(
      "nationalTaxPaymentCertificate",
      user?.nationalTaxPaymentCertificate,
    );
    setValue("region", user?.region);
  }, [user]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className=" h-[calc(100vh-20rem)] overflow-y-auto">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Text Fields */}
              {(
                [
                  ["companyName", "Company Name"],
                  [
                    "businessRegistrationNumber",
                    "Business Registration Number",
                  ],
                  ["mainService", "Main Service"],
                  ["mainProduct", "Main Product"],
                  ["managementBusinessNumber", "Management Business Number"],
                  ["representativeName", "Representative Name"],
                  ["representativeMobilePhone", "Representative Mobile Phone"],
                  ["businessPhoneNumber", "Business Phone Number"],
                  ["fax", "Fax"],
                  ["address", "Address"],
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

              <FormField
                control={control}
                name={"region"}
                rules={{ required: "Region is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {REGIONS.map((r) => (
                            <SelectItem key={r.label} value={r.label}>
                              {r.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Photo */}
              <FormField
                control={control}
                name="photoRegistration"
                rules={{ required: "Photo registration is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        name="photoRegistration"
                        label={"Photo Registration"}
                        value={field.value}
                        onChange={field.onChange}
                        errorMessage={errors.photoRegistration?.message}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-4">
                {isFileUploading || isUpdatingUser ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save />
                )}
                Save Changes
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
