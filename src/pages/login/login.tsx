/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm, type UseFormReturn } from "react-hook-form";
import type { LoginFormValues } from "./type";
import { FormInput } from "@/components/common/form-input";
import { Button } from "@/components/common/button/button";
import { Link, useNavigate } from "react-router-dom";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { useLoginMutation } from "@/store/auth/auth.api";
import { toast } from "sonner";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/utils/tokenStorage";

export const LoginPage = () => {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  }) as unknown as UseFormReturn<Record<string, unknown>>;

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleRequest = useHandleRequest();

  const onSubmit = async (data: LoginFormValues) => {
    await handleRequest({
      request: async () => {
        const response = await login({
          email: data.email,
          password: data.password,
        });
        return response;
      },
      onSuccess: (result) => {
        toast.success("Login successfully");
        localStorage.setItem(ACCESS_TOKEN_KEY, result?.data?.access_token);
        localStorage.setItem(REFRESH_TOKEN_KEY, result?.data?.refresh_token);
        if (
          result?.data?.role === "admin" ||
          result?.data?.role === "korean_agency"
        ) {
          navigate("/dashboard", { replace: true });
        } else if (result?.data?.role === "worker") {
          navigate("/employment", { replace: true });
        } else if (result?.data?.role === "company") {
          navigate("/employment", { replace: true });
        } else if (result?.data?.role === "agency") {
          navigate("/workers", { replace: true });
        }
      },
    });
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <Card className="w-[450px] mx-auto">
        <CardContent>
          <div className="flex items-center justify-center text-center">
            <h1 className="text-2xl font-semibold">Login</h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit as any)}
              className="space-y-4"
            >
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
                placeholder="****"
                rules={{
                  required: "Password required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                }}
              />
              <Button loading={isLoading} className="w-full" type="submit">
                Login
              </Button>
            </form>
          </Form>

          <CardFooter className="flex justify-center pt-5">
            <span className="text-sm flex items-center justify-center text-gray-500">
              Don't have an account?{" "}
              <Link to="/role" className="text-primary">
                Register
              </Link>
            </span>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};
