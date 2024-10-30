import { PropsWithChildren } from "react";
import Footer from "./_components/footer";
import Header from "./_components/header";

const ClientLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default ClientLayout;
