import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="container mx-auto">
        <Header />
        <MobileNavigation />
        <div className="h-screen">{children}</div>
      </main>
    </>
  );
};

export default Layout;
