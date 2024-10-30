import { NewsletterFormValues } from "@/constants/form-values";
import { NewsletterFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField, { FormFieldType } from "../custom-form-field";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

const NewsletterForm = () => {
  const form = useForm<z.infer<typeof NewsletterFormValidation>>({
    resolver: zodResolver(NewsletterFormValidation),
    defaultValues: { ...NewsletterFormValues },
  });

  const onSubmit = (values: z.infer<typeof NewsletterFormValidation>) => {
    // TODO: handle submit email
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          placeholder="Vui lòng nhập email của bạn..."
          className="rounded-full border-none"
          iconSrc={<Icons.email />}
        />
        <Button variant="outline" className="w-full rounded-full">
          Đăng ký nhận bản tin
        </Button>
      </form>
    </Form>
  );
};

export default NewsletterForm;
