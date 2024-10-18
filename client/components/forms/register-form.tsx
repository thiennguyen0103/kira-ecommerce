"use client";

import { RegisterPayload } from "@/@types/auth";
import { RegisterFormValues } from "@/constants/form-values";
import { useToast } from "@/hooks/use-toast";
import { RegisterFormValidation } from "@/lib/validation";
import { authService } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import ButtonSubmit from "../button-submit";
import CustomFormField, { FormFieldType } from "../custom-form-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form } from "../ui/form";
import { ToastAction } from "../ui/toast";
import { Icons } from "../icons";

const RegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterFormValidation>>({
    resolver: zodResolver(RegisterFormValidation),
    defaultValues: {
      ...RegisterFormValues,
    },
  });

  const { mutate: register, isPending: isLoading } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (values: RegisterPayload) => {
      await authService.register(values);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Register new account successfully",
      });
      router.push("/login");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterFormValidation>) => {
    register({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Card className="w-[400px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="lastName"
              label="Last Name"
              placeholder="Last name"
              isLoading={isLoading}
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email..."
              isLoading={isLoading}
            />
            <CustomFormField
              fieldType={FormFieldType.PASSWORD_INPUT}
              control={form.control}
              label="Password"
              name="password"
              placeholder="Enter your password..."
              isLoading={isLoading}
            />
            <CustomFormField
              fieldType={FormFieldType.PASSWORD_INPUT}
              control={form.control}
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Enter your password..."
              isLoading={isLoading}
            />
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <ButtonSubmit
              isLoading={isLoading}
              type="submit"
              className="w-full"
            >
              Register
            </ButtonSubmit>
            <div>
              <span>Already have an account?</span>{" "}
              <Link
                href="/login"
                className="font-medium hover:text-primary hover:underline"
              >
                Sign in
              </Link>
            </div>
            <div className="flex w-full items-center gap-4">
              <div className="h-[1px] w-[45%] bg-slate-700" />
              <div>Or</div>
              <div className="h-[1px] w-[45%] bg-slate-700" />
            </div>
            <div className="flex w-full items-center gap-4">
              <div className="flex w-full cursor-pointer items-center justify-center rounded-md bg-orange-700 p-2 shadow-lg hover:bg-orange-700/90">
                <Icons.google className="text-white" />
              </div>
              <div className="flex w-full cursor-pointer items-center justify-center rounded-md bg-blue-700 p-2 shadow-lg hover:bg-blue-700/90">
                <Icons.facebook className="text-white" />
              </div>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default RegisterForm;
