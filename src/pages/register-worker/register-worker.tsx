import { Button } from "@/components/common/button/button";
import { FormInput } from "@/components/common/form-input";
import { FileUpload } from "@/components/file-upload";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormSelect } from "@/components/common/select";
import { Controller, useForm } from "react-hook-form";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { useSignUpWorkerMutation } from "@/store/auth/auth.api";
import type { SignUpWorkerRequest } from "@/store/auth/auth.d.ts";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useGetAllPublicAgenciesQuery } from "@/store/agency/agency.api";
import type { RegisterWorkerFormValues } from "./types";
import { COUNTRIES } from "@/constants";
import { GENDERS } from "@/constants/gener";
import { DatePicker } from "@/components/common/date-picker";

export const RegisterWorkerPage = () => {
  const form = useForm<RegisterWorkerFormValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
      alternativePhoneNumber: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      country: "",
      agencyId: undefined,
    },
    mode: "onChange",
  });

  const handleRequest = useHandleRequest();
  const [registerWorker, { isLoading }] = useSignUpWorkerMutation();

  const { data: { data: agencies } = {} } = useGetAllPublicAgenciesQuery(
    {
      per_page: 1000,
      page: 1,
      country: form.watch("country"),
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !form.watch("country"),
    }
  );

  const navigate = useNavigate();
  const onSubmit = async (data: RegisterWorkerFormValues) => {
    const payload: SignUpWorkerRequest = {
      email: data.email,
      password: data.password,
      name: data.name,
      phoneNumber: data.phoneNumber,
      alternativePhoneNumber: data.alternativePhoneNumber,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      address: data.address,
      country: data.country,
      photoRegistration: data.photoRegistration,
      graduationCertificate: data.graduationCertificate,
      qualification: data.qualification,
      agencyId: data.agencyId ? Number(data.agencyId) : undefined,
    };

    await handleRequest({
      request: async () => {
        const response = await registerWorker(payload);
        return response;
      },
      onSuccess: () => {
        toast.success("Worker successfully registered!");
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
        Register as Worker
      </h1>
      <p className="text-gray-600 mt-4 mb-8 max-w-2xl">
        Fill in the information below to register as a worker. Please prepare
        required documents in advance.
      </p>

      <Card className="shadow-lg my-4">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-6">Worker Information</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormInput
                  form={form}
                  name="name"
                  label="Full Name"
                  placeholder="Your full name"
                  rules={{ required: "Name is required" }}
                />

                <FormInput
                  form={form}
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="user@example.com"
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
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="+998901234567"
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^[+]?[0-9]{9,16}$/,
                      message: "Invalid phone format",
                    },
                  }}
                />

                <FormInput
                  form={form}
                  name="alternativePhoneNumber"
                  label="Alternative Phone Number"
                  placeholder="+998901234567"
                  rules={{
                    pattern: {
                      value: /^[+]?[0-9]{9,16}$/,
                      message: "Invalid phone format",
                    },
                  }}
                />

                {/* <DatePicker
                  form={form}
                  name="dateOfBirth"
                  label="Date of Birth"
                  type="date"
                  placeholder="YYYY-MM-DD"
                  rules={{ required: "Date of birth is required" }}
                /> */}

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <DatePicker
                          mode="single"
                          onChange={field?.onChange}
                          value={field.value?.toString()}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormSelect
                  form={form}
                  name="gender"
                  label="Gender"
                  placeholder="Select gender"
                  rules={{ required: "Gender is required" }}
                  options={GENDERS}
                />

                <FormInput
                  form={form}
                  name="address"
                  label="Address"
                  placeholder="Your address"
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
                  name="agencyId"
                  label="Agency"
                  placeholder="Select an agency"
                  rules={{ required: "Agency is required" }}
                  disabled={!agencies || agencies.length === 0}
                  options={
                    agencies?.map((agency) => ({
                      value: agency.id.toString(),
                      label: agency.agencyName,
                    })) || []
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
                <FormField
                  control={form.control}
                  name="photoRegistration"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          name="photoRegistration"
                          label="Photo Registration *"
                          onChange={field.onChange}
                          value={field.value || ""}
                          accept={["image/jpeg", "image/png"]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="graduationCertificate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          name="graduationCertificate"
                          label="Graduation Certificate *"
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
                  name="qualification"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          name="qualification"
                          label="Qualification *"
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
                  Register Worker
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
