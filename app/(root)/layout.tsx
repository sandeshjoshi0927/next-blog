import Header from "@/components/Header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="container mx-auto">
      <Header />
      <div>{children}</div>
    </main>
  );
};

export default Layout;
