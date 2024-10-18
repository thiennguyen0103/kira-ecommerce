"use client";

import { LoginPayload } from "@/@types/auth";
import { LoginFormValues } from "@/constants/form-values";
import { LoginFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
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
import { useToast } from "@/hooks/use-toast";
import { Icons } from "../icons";
const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      ...LoginFormValues,
    },
  });

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (values: LoginPayload) => {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Login successfully",
      });
      router.push("/");
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

  const onSubmit = (values: z.infer<typeof LoginFormValidation>) => {
    login(values);
  };

  return (
    <Card className="w-[400px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Please enter your username and password to login.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <ButtonSubmit
              isLoading={isLoading}
              type="submit"
              className="w-full"
            >
              Login
            </ButtonSubmit>
            <div>
              <span>Don&apos;t have an account?</span>{" "}
              <Link
                href="/register"
                className="font-medium hover:text-primary hover:underline"
              >
                Sign up
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

export default LoginForm;
