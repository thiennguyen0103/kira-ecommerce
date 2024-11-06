import { PropsWithChildren } from "react";

type SectionProps = {
  title: string;
} & PropsWithChildren;

const Section = ({ title, children }: SectionProps) => {
  return (
    <div className="py-8 md:py-16">
      <h1 className="mb-7 text-center text-[32px] font-extrabold uppercase md:mb-8 md:text-5xl">
        {title}
      </h1>
      {children}
    </div>
  );
};

export default Section;
