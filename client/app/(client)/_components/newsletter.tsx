"use client";

import NewsletterForm from "@/components/forms/newsletter-form";

const Newsletter = () => {
  return (
    <div className="container w-full">
      <div className="rounded-[20px] bg-black px-8 py-9 md:px-16">
        <div className="flex flex-col gap-4 md:flex-row">
          <h1 className="text-[32px] font-extrabold uppercase leading-tight text-white md:text-[40px]">
            Cập nhật tin tức mới nhất của chúng tôi
          </h1>
          <div className="w-full md:max-w-[350px]">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
