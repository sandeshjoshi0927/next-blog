import { navItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="">
      <Image src="/assets/icons/logo.svg" width={64} height={24} alt="logo" />

      <ul>
        {navItems.map(({ name, url }) => (
          <Link href={url} key={name}>
            <li>{name}</li>
          </Link>
        ))}
      </ul>

      <Button type="submit" className="btn-primary">
        Sign In
      </Button>
    </header>
  );
};

export default Header;
