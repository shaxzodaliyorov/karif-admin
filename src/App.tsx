import { Button } from "./components/common/button/button";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"; // Agar yup/yup o'rniga zod ishlatmoqchi bo'lsangiz, lekin shart emas. Biz rules bilan ishlaymiz.
import { Form } from "@/components/ui/form";
import { FormInput } from "./components/common/form-input/form-input";
import { Modal } from "./components/common/modal";
import { FormSelect } from "./components/common/select";

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

type FormValues = {
  category: string;
  tags: string[];
};

const ExampleForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      category: "",
      tags: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const categoryOptions = [
    { label: "Texnologiya", value: "tech" },
    { label: "Sport", value: "sport" },
    { label: "San'at", value: "art" },
    { label: "Ta'lim", value: "education" },
  ];

  const tagOptions = [
    { label: "React", value: "react" },
    { label: "TypeScript", value: "typescript" },
    { label: "Tailwind", value: "tailwind" },
    { label: "Next.js", value: "nextjs" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormSelect
          form={form}
          name="category"
          label="Kategoriya"
          options={categoryOptions}
          placeholder="Kategoriyani tanlang"
        />

        {/* Multiple select */}
        <FormSelect
          form={form}
          name="tags"
          label="Teglar (bir nechta tanlash mumkin)"
          options={tagOptions}
          mode="multiple"
        />

        <Button type="submit">Yuborish</Button>
      </form>
    </Form>
  );
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button variant={"outline"}>click</Button>
      <Button loading>click</Button>
      <LoginForm />
      <Button onClick={() => setIsOpen(true)}>Modal ochish</Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Foydalanuvchi ma'lumotlari"
      >
        <div className="space-y-4">
          <p>Bu yerda istalgan kontent bo'lishi mumkin.</p>
          <img src="/example.jpg" alt="misol" className="w-full rounded-lg" />
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Bekor qilish
            </Button>
            <Button onClick={() => setIsOpen(false)}>Saqlash</Button>
          </div>
        </div>
      </Modal>
      <ExampleForm />
    </>
  );
}

export default App;
