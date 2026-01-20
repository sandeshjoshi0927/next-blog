import React from "react";
import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10  lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16">
          <Link href="/">
            <Image
              src="/assets/icons/logo.svg"
              alt="logo"
              width={224}
              height={82}
              className="h-auto w-25"
            />
          </Link>
        </div>
        {children}
      </section>
    </div>
  );
};

export default Layout;
