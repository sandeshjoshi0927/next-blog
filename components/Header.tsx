"use client";

import { navItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const Header = () => {
  const path = usePathname();

  const getActive = (url: string) => {
    const activeClass = url === path ? "text-red-400" : "";
    return activeClass;
  };

  return (
    <header className="flex items-center justify-between">
      <Image src="/assets/icons/logo.svg" width={64} height={24} alt="logo" />

      <nav className="bg-red-300">
        <ul className="flex flex-1 gap-4 bg-green-50">
          {navItems.map(({ name, url }) => (
            <Link href={url} key={name}>
              <li className={`text-light-100 px-6 ${getActive(url)}`}>
                {name}
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Button type="submit" className="btn-primary">
        Sign In
      </Button>
    </header>
  );
};

export default Header;
