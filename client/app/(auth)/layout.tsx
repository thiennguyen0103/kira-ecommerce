import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
