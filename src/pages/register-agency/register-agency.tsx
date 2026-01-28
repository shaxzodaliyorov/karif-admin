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
import { useForm } from "react-hook-form";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { useSignUpAgencyMutation } from "@/store/auth/auth.api";
import type { SignUpAgencyRequest } from "@/store/auth/auth.d.ts";
import { toast } from "sonner";
import type { RegisterAgencyFormValues } from "./types";
import { FormSelect } from "@/components/common/select";
import { COUNTRIES } from "@/constants";
import { useGetAllKoreanAgenciesQuery } from "@/store/agency/agency.api";
import { useNavigate } from "react-router-dom";

export const RegisterAgencyPage = () => {
  const form = useForm<RegisterAgencyFormValues>({
    defaultValues: {
      email: "",
      password: "",
      agencyName: "",
      businessRegistrationNumber: "",
      representativeName: "",
      representativeMobilePhone: "",
      representativeBusinessPhone: "",
      representativeAddress: "",
      koreanAgencyId: undefined,
    },
    mode: "onChange",
  });

  const handleRequest = useHandleRequest();
  const [registerAgency, { isLoading }] = useSignUpAgencyMutation();

  const { data: { data: koreanAgencies } = {} } = useGetAllKoreanAgenciesQuery({
    per_page: 1000,
    page: 1,
  });
  const navigate = useNavigate();
  const onSubmit = async (data: RegisterAgencyFormValues) => {
    const payload: SignUpAgencyRequest = {
      email: data.email,
      password: data.password,
      agencyName: data.agencyName,
      businessRegistrationNumber: data.businessRegistrationNumber,
      representativeName: data.representativeName,
      representativeMobilePhone: data.representativeMobilePhone,
      representativeBusinessPhone: data.representativeBusinessPhone,
      representativeAddress: data.representativeAddress,
      country: data.country,
      koreanAgencyId: data.koreanAgencyId
        ? Number(data.koreanAgencyId)
        : undefined,
      businessRegistrationCertificate: data.businessRegistrationCertificate,
      license: data.license as string,
    };

    await handleRequest({
      request: async () => {
        const response = await registerAgency(payload);
        return response;
      },
      onSuccess: () => {
        toast.success("Agency successfully registered!");
        navigate("/login");
      },
      onError: (error) => {
        toast.error(error?.data?.message || "Registration failed");
      },
    });
  };

  return (
    <div className="min-h-[90vh] pt-32 pb-20 container mx-auto">
      <h1 className="text-3xl mt-2 md:text-4xl font-bold text-gray-900">
        Register Your Agency
      </h1>
      <p className="text-gray-600 mt-4 mb-8 max-w-2xl">
        Fill in the information below to register your agency. Please prepare
        business registration certificate and license documents in advance.
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
                  placeholder="Your Agency Name"
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
                  placeholder="1234567890123"
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
                  placeholder="+998901234567"
                  rules={{
                    required: "Mobile phone is required",
                    pattern: {
                      value: /^[+]?[0-9]{9,16}$/,
                      message: "Invalid phone format",
                    },
                  }}
                />

                <FormInput
                  form={form}
                  name="representativeBusinessPhone"
                  label="Business Phone"
                  placeholder="+998712345678"
                  rules={{
                    required: "Business phone is required",
                    pattern: {
                      value: /^[+]?[0-9]{9,16}$/,
                      message: "Invalid phone format",
                    },
                  }}
                />

                <FormInput
                  form={form}
                  name="representativeAddress"
                  label="Representative Address"
                  placeholder="Your address..."
                  rules={{ required: "Address is required" }}
                />

                <FormSelect
                  form={form}
                  name="country"
                  label="Country"
                  placeholder="Select a country"
                  rules={{ required: "Country is required" }}
                  options={COUNTRIES}
                />

                <FormSelect
                  form={form}
                  name="koreanAgencyId"
                  label="Korean Agency"
                  placeholder="Select a korean agency"
                  options={
                    koreanAgencies?.map((agency) => ({
                      value: agency._id.toString(),
                      label: agency.agencyName,
                    })) || []
                  }
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

                <FormField
                  control={form.control}
                  name="license"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          name="license"
                          label="Agency License *"
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
                  Register Agency
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
