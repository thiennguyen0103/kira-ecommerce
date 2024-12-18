import { TooltipProvider } from "@/components/ui/tooltip";
import { PropsWithChildren } from "react";
import Footer from "./_components/footer";
import Header from "./_components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "K-Shop",
  description: "Generated by Kira",
};

const ClientLayout = ({ children }: PropsWithChildren) => {
  return (
    <TooltipProvider>
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </TooltipProvider>
  );
};

export default ClientLayout;
