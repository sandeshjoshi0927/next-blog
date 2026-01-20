"use client";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { navItems } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-separator";
import { showActive } from "@/lib/utils";
import { isAuthenticated } from "@/lib/auth";

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <header className="sm:hidden  flex justify-between">
      <Image src="/assets/icons/logo.svg" width={64} height={24} alt="logo" />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="search"
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <Separator className="my-5 bg-light-200/20" />

          <nav className="">
            <ul className="flex flex-col gap-2">
              {navItems.map(({ url, name }) => (
                <Link key={name} href={url} className="lg:w-full  flex-1">
                  <li
                    className={`px-4 py-2 rounded-full ${showActive(url, path)}`}
                  >
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>

          <Button type="submit" className="btn-primary">
            {isAuthenticated() ? (
              <Link href="/dashboard">Dashboard</Link>
            ) : (
              <Link href="/sign-in">Sign In</Link>
            )}
          </Button>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
