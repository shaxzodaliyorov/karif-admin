import { Button } from "@/components/common/button/button";
import { FormInput } from "@/components/common/form-input";
import { FormSelect } from "@/components/common/select";
import { FileUpload } from "@/components/file-upload";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { REGIONS } from "@/constants/regions";
import { useForm } from "react-hook-form";
import type { RegisterCompanyFormValues } from "./types";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { useSignUpCompanyMutation } from "@/store/auth/auth.api";
import type { SignUpCompanyRequest } from "@/store/auth/auth.d.ts";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const RegisterCompany = () => {
  const form = useForm<RegisterCompanyFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleRequest = useHandleRequest();
  const [registerCompany, { isLoading }] = useSignUpCompanyMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterCompanyFormValues) => {
    const payload: SignUpCompanyRequest = {
      email: data.email,
      password: data.password,
      companyName: data.companyName,
      businessRegistrationNumber: data.businessRegistrationNumber,
      mainProductOrService: data.mainProduct,
      managementBusinessNumber: data.managementBusinessNumber,
      representativeName: data.representativeName,
      representativeMobilePhone: data.representativeMobile,
      businessPhoneNumber: data.businessPhoneNumber,
      fax: data.fax,
      address: data.address,
      photoRegistration: data.photoRegistration,
      businessRegistrationCertificate:
        data.managementBusinessRegistrationCertificate,
      managementBusinessRegistrationCertificate:
        data.managementBusinessRegistrationCertificate,
      smallAndMediumSizedBusinessConfirmationCertificate:
        data.smallAndMediumSizedBusinessConfirmationCertificate,
      localTaxPaymentCertificate: data.localTaxPaymentCertificate,
      nationalTaxPaymentCertificate: data.nationalTaxPaymentCertificate,
      region: data.region,
      mainProduct: data.mainProduct,
      mainService: data.mainService,
      employeesCount: Number(data.employeesCount),
    };
    await handleRequest({
      request: async () => {
        const response = await registerCompany(payload);
        return response;
      },
      onSuccess: async () => {
        toast.success("Company registered successfully");
        navigate("/login");
      },
    });
  };
  return (
    <div className="h-[90vh] pt-40 container">
      <h1 className="text-3xl mt-5 font-bold text-gray-900">
        Register Your Company
      </h1>
      <p className="text-gray-600 mt-2">
        Complete the form below to register your company with all required
        documentation.
      </p>
      <Card className="mt-5">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Company Information</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit as any)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  form={form}
                  name="companyName"
                  label="Company Name"
                  type="text"
                  placeholder="Company Name"
                  rules={{
                    required: "Company Name required",
                  }}
                />
                <FormInput
                  form={form}
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="example@gmail.com"
                  rules={{
                    required: "Email required",
                    pattern: {
                      value: /^\S+@\S+$/,
                      message: "",
                    },
                  }}
                />
                <FormInput
                  form={form}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="******"
                  rules={{
                    required: "Password required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    maxLength: {
                      value: 16,
                      message:
                        "Password must be no more than 16 characters long",
                    },
                  }}
                />
                <FormInput
                  form={form}
                  name="businessRegistrationNumber"
                  label="Business Registration Number"
                  type="number"
                  placeholder="Business Registration Number"
                  rules={{
                    required: "Business Registration Number required",
                  }}
                />
                <FormInput
                  form={form}
                  name="mainProduct"
                  label="Main Product"
                  type="text"
                  placeholder="Main Product"
                  rules={{
                    required: "Main Product required",
                  }}
                />
                <FormInput
                  form={form}
                  name="mainService"
                  label="Main Service"
                  type="text"
                  placeholder="Main Service"
                  rules={{
                    required: "Main Service required",
                  }}
                />
                <FormInput
                  form={form}
                  name="managementBusinessNumber"
                  label="Management Business Number"
                  type="number"
                  placeholder="Management Business Number"
                  rules={{
                    required: "Management Business Number required",
                  }}
                />
                <FormInput
                  form={form}
                  name="employeesCount"
                  label="Employees Count"
                  type="number"
                  placeholder="Employees Count"
                  rules={{
                    required: "Employees Count required",
                  }}
                />
                <FormInput
                  form={form}
                  name="representativeName"
                  label="Representative Name"
                  type="text"
                  placeholder="Representative Name"
                  rules={{
                    required: "Representative Name required",
                  }}
                />
                <FormSelect
                  form={form}
                  name="region"
                  label="Region"
                  placeholder="Region"
                  rules={{
                    required: "Region required",
                  }}
                  options={REGIONS}
                />
                <FormInput
                  form={form}
                  name="representativeMobile"
                  label="Representative Mobile"
                  type="text"
                  placeholder="Representative Mobile"
                  rules={{
                    required: "Representative mobile phone is required",
                    pattern: {
                      value: /^[+]?[0-9]{10,16}$/,
                      message: "Representative mobile phone must be a string",
                    },
                  }}
                />
                <FormInput
                  form={form}
                  name="businessPhoneNumber"
                  label="Business Phone"
                  type="text"
                  placeholder="Business Phone"
                  rules={{
                    required: "Business phone number is required",
                    pattern: {
                      value: /^[+]?[0-9]{10,16}$/,
                      message: "Business phone number must be a string",
                    },
                  }}
                />
                <FormInput
                  form={form}
                  name="fax"
                  label="Fax"
                  type="text"
                  placeholder="Fax"
                  rules={{
                    required: "Fax required",
                  }}
                />
                <FormInput
                  form={form}
                  name="address"
                  label="Address"
                  type="text"
                  placeholder="Address"
                  rules={{
                    required: "Address required",
                  }}
                />
                <FormField
                  control={form.control}
                  name="photoRegistration"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          name="photoRegistration"
                          label="Photo Registration"
                          onChange={field.onChange}
                          value={field.value?.toString() || ""}
                          accept={["image/jpeg", "image/png"]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessRegistrationCertificate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          name="businessRegistrationCertificate"
                          label="Business Registration Certificate"
                          onChange={field.onChange}
                          value={field.value?.toString() || ""}
                          accept={["application/pdf"]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="managementBusinessRegistrationCertificate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          name="managementBusinessRegistrationCertificate"
                          label="Management Business Registration Certificate"
                          onChange={field.onChange}
                          value={field.value?.toString() || ""}
                          accept={["application/pdf"]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="smallAndMediumSizedBusinessConfirmationCertificate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          name="smallAndMediumSizedBusinessConfirmationCertificate"
                          label={
                            "Small and medium sized business confirmation certificate"
                          }
                          onChange={field.onChange}
                          value={field.value?.toString() || ""}
                          required={false}
                          accept={["application/pdf"]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="localTaxPaymentCertificate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          name="localTaxPaymentCertificate"
                          label={"Local tax payment certificate"}
                          onChange={field.onChange}
                          value={field.value?.toString() || ""}
                          accept={["application/pdf"]}
                          required={false}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nationalTaxPaymentCertificate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          name="nationalTaxPaymentCertificate"
                          label={"National tax payment certificate"}
                          onChange={field.onChange}
                          value={field.value?.toString() || ""}
                          accept={["application/pdf"]}
                          required={false}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end pt-10">
                <Button loading={isLoading} type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
