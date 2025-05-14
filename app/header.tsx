"use client";
import useGamburgerStore from "@/store/gamburger";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const { open, setOpen } = useGamburgerStore();

  return (
    <div className="w-full h-[48px] flex justify-between items-center border-b border-[#FFFFFF40] rounded-t-[13px] bg-[#1A1A1A] px-4 md:px-8">
      {/* Logo va Hamburger */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <Image src="/hamburger.svg" alt="hamburger" width={28} height={28} />
        </button>

        <Link href={"/"}>
          <p className="text-white text-[20px] font-semibold">
            HUSANOV <span className="text-green-600">.UZ</span>
          </p>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <NavLink href="/" label="Bosh sahifa" active={pathname === "/"} />
        <NavLink href="/about" label="Haqida" active={pathname === "/about"} />
        <NavLink
          href="/loyiha"
          label="Loyihalar"
          active={pathname === "/loyiha"}
        />
        <NavLink
          href="/contact"
          label="Bog‘lanish"
          active={pathname === "/contact"}
        />
      </div>

      <div>
        <Link href="https://github.com/SHoWMaN2441" target="_blank">
          <Image src="/github.svg" alt="github" width={28} height={28} />
        </Link>
      </div>
    </div>
  );
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link href={href}>
      <p
        className={`text-white text-[16px] font-normal ${
          active
            ? "underline decoration-green-700 underline-offset-8 decoration-[3px]"
            : "no-underline"
        }`}
      >
        {label}
      </p>
    </Link>
  );
}
