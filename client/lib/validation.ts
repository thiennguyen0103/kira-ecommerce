import { PASSWORD_REGEX } from "@/constants/regex";
import { z } from "zod";

export const LoginFormValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .regex(
      PASSWORD_REGEX,
      "Password must contain more than 8 characters, 1 upper case letter, and 1 special character",
    ),
});

export const RegisterFormValidation = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .regex(
        PASSWORD_REGEX,
        "Password must contain more than 8 characters, 1 upper case letter, and 1 special character",
      ),
    confirmPassword: z
      .string()
      .regex(
        PASSWORD_REGEX,
        "Password must contain more than 8 characters, 1 upper case letter, and 1 special character",
      ),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password did not match",
        path: ["confirmPassword"],
      });
    }
  });
