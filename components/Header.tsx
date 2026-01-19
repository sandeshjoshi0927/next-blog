"use client";

import { navItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { showActive } from "@/lib/utils";

const Header = () => {
  const path = usePathname();

  return (
    <header className="hidden sm:flex items-center justify-between">
      <Image src="/assets/icons/logo.svg" width={64} height={24} alt="logo" />

      <nav className="">
        <ul className="flex flex-1 gap-4">
          {navItems.map(({ name, url }) => (
            <Link href={url} key={name}>
              <li className={`text-light-100 px-6 ${showActive(url, path)}`}>
                {name}
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Button type="submit" className="btn-primary">
        <Link href="/sign-in">Sign In</Link>
      </Button>
    </header>
  );
};

export default Header;
