import { PropsWithChildren } from "react";

const StoreLayout = ({ children }: PropsWithChildren) => {
  return <div className="container py-6">{children}</div>;
};

export default StoreLayout;
