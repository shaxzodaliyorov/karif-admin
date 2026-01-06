import { Button } from "./components/common/button/button";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"; // Agar yup/yup o'rniga zod ishlatmoqchi bo'lsangiz, lekin shart emas. Biz rules bilan ishlaymiz.
import { Form } from "@/components/ui/form";
import { FormInput } from "./components/common/form-input/form-input";

// Form values tipi
type LoginFormValues = {
  email: string;
  password: string;
};

// Zod resolver (ixtiyoriy, agar validation kuchli bo'lishi kerak bo'lsa)
// const loginSchema = z.object({
//   email: z.string().email('Noto'g'ri email'),
//   password: z.string().min(6, 'Parol kamida 6 belgi bo'lishi kerak'),
// });

const LoginForm = () => {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // Validation on change
    // resolver: zodResolver(loginSchema), // Agar zod ishlatmoqchi bo'lsangiz
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          form={form}
          name="email"
          label="Email"
          type="email"
          placeholder="email@misol.com"
          rules={{
            required: "Email majburiy",
            pattern: {
              value: /^\S+@\S+$/,
              message: "Noto'g'ri email formati",
            },
          }}
        />

        <FormInput
          form={form}
          name="password"
          label="Parol"
          type="password"
          placeholder="Parolni kiriting"
          rules={{
            required: "Parol majburiy",
            minLength: {
              value: 6,
              message: "Parol kamida 6 belgi bo'lishi kerak",
            },
          }}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          Kirish
        </Button>
      </form>
    </Form>
  );
};

function App() {
  return (
    <>
      <Button variant={"outline"}>click</Button>
      <Button loading>click</Button>
      <LoginForm />
    </>
  );
}

export default App;
