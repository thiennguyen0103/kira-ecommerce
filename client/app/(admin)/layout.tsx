import { AppSidebar } from "@/app/(admin)/admin/_components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";
import { PropsWithChildren } from "react";
import Header from "./admin/_components/header";

export const metadata: Metadata = {
  title: "K-Shop Admin",
  description: "Generated by Kira",
};

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full">
        <Header />
        <main className="w-full flex-1 p-4">
          <div>{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
