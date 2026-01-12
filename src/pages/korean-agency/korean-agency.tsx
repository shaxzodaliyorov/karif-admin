import { Button } from "@/components/common/button/button";
import { FormInput } from "@/components/common/form-input";
import { FileUpload } from "@/components/file-upload";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FormSelect } from "@/components/common/select";
import { useForm } from "react-hook-form";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { useSignUpKoreanAgencyMutation } from "@/store/auth/auth.api";
import { toast } from "sonner";
import { COUNTRIES } from "@/constants";
import { useNavigate } from "react-router-dom";
import type { RegisterKoreanAgencyFormValues } from "./types";

export const RegisterKoreanAgencyPage = () => {
  const form = useForm<RegisterKoreanAgencyFormValues>({
    defaultValues: {
      email: "",
      password: "",
      agencyName: "",
      businessRegistrationNumber: "",
      representativeName: "",
      representativeMobilePhone: "",
      representativeBusinessPhone: "",
      representativeAddress: "",
    },
    mode: "onChange",
  });

  const handleRequest = useHandleRequest();
  const [registerKoreanAgency, { isLoading }] = useSignUpKoreanAgencyMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterKoreanAgencyFormValues) => {
    const payload: any = {
      email: data.email,
      password: data.password,
      agencyName: data.agencyName,
      businessRegistrationNumber: data.businessRegistrationNumber,
      representativeName: data.representativeName,
      representativeMobilePhone: data.representativeMobilePhone,
      representativeBusinessPhone: data.representativeBusinessPhone,
      representativeAddress: data.representativeAddress,
      businessRegistrationCertificate: data.businessRegistrationCertificate,
    };

    await handleRequest({
      request: async () => registerKoreanAgency(payload),
      onSuccess: () => {
        toast.success("Korean agency successfully registered!");
        navigate("/login");
      },
      onError: (error) => {
        toast.error(error?.data?.message || "Registration failed");
      },
    });
  };

  return (
    <div className="min-h-[90vh] pt-32 pb-20 container mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        Register Korean Agency
      </h1>
      <p className="text-gray-600 mt-4 mb-8 max-w-2xl">
        Please fill in the information below to register your Korean agency.
      </p>

      <Card className="shadow-lg my-4">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-6">Agency Information</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormInput
                  form={form}
                  name="agencyName"
                  label="Agency Name"
                  placeholder="Agency name"
                  rules={{ required: "Agency name is required" }}
                />

                <FormInput
                  form={form}
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="agency@example.com"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/,
                      message: "Invalid email format",
                    },
                  }}
                />

                <FormInput
                  form={form}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 characters",
                    },
                  }}
                />

                <FormInput
                  form={form}
                  name="businessRegistrationNumber"
                  label="Business Registration Number"
                  placeholder="Business registration number"
                  rules={{
                    required: "Business registration number is required",
                  }}
                />

                <FormInput
                  form={form}
                  name="representativeName"
                  label="Representative Name"
                  placeholder="Full name"
                  rules={{ required: "Representative name is required" }}
                />

                <FormInput
                  form={form}
                  name="representativeMobilePhone"
                  label="Mobile Phone"
                  placeholder="+821012345678"
                  rules={{
                    required: "Mobile phone is required",
                    pattern: {
                      value: /^[+]?[0-9]{9,15}$/,
                      message: "Invalid phone format",
                    },
                  }}
                />

                <FormInput
                  form={form}
                  name="representativeBusinessPhone"
                  label="Business Phone"
                  placeholder="+82212345678"
                  rules={{
                    required: "Business phone is required",
                    pattern: {
                      value: /^[+]?[0-9]{9,15}$/,
                      message: "Invalid phone format",
                    },
                  }}
                />

                <FormInput
                  form={form}
                  name="representativeAddress"
                  label="Representative Address"
                  placeholder="Seoul, Gangnam-gu..."
                  rules={{ required: "Address is required" }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                <FormField
                  control={form.control}
                  name="businessRegistrationCertificate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          name="businessRegistrationCertificate"
                          label="Business Registration Certificate *"
                          onChange={field.onChange}
                          value={field.value || ""}
                          accept={[
                            "application/pdf",
                            "image/jpeg",
                            "image/png",
                          ]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-8">
                <Button type="submit" loading={isLoading} size="lg">
                  Register Korean Agency
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
