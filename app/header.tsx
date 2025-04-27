"use client";
import useGamburgerStore from "@/store/gamburger";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const { open, setOpen } = useGamburgerStore(); // open holatini ham chaqiramiz

  return (
    <div className="max-w-[full] mx-auto w-full h-[48px] flex justify-between items-center border-b-1 border-[#FFFFFF40] rounded-t-[13px] bg-[#1A1A1A] border-2 px-1">
      <div
        // toggle qilish uchun
        className="w-[182px] h-[32px] flex items-center justify-between"
      >
        <button className="cursor-pointer mr-2">
          <Image
            onClick={() => setOpen(!open)}
            src={"/hamburger.svg"}
            alt="hamburger"
            width={32}
            height={32}
          />
        </button>
        <Link href={"/"}>
          <p className="text-white text-[20px]">
            HUSANOV <span className="text-green-600">.UZ</span>
          </p>
        </Link>
      </div>
      <div className="max-w-[419px] h-[32px] w-full flex items-center justify-between">
        <div className="max-w-[373px] w-full h-[24px] flex items-center justify-between">
          <Link href={"/"}>
            <p
              className={`font-normal text-white ${
                pathname === "/"
                  ? "underline decoration-green-700 underline-offset-8 decoration-[3px]"
                  : "no-underline"
              } text-[16px] leading-[100%]`}
            >
              Bosh sahifa
            </p>
          </Link>
          <Link href={"/about"}>
            <p
              className={`font-normal text-white ${
                pathname === "/about"
                  ? "underline decoration-green-700 underline-offset-8 decoration-[3px]"
                  : "no-underline"
              } text-[16px] leading-[100%]`}
            >
              Haqida
            </p>
          </Link>
          <Link href={"/loyiha"}>
            <p
              className={`font-normal text-white ${
                pathname === "/loyiha"
                  ? "underline decoration-green-700 underline-offset-8 decoration-[3px]"
                  : "no-underline"
              } text-[16px] leading-[100%]`}
            >
              Loyihalar
            </p>
          </Link>
          <Link href={"/contact"}>
            <p
              className={`font-normal text-white ${
                pathname === "/contact"
                  ? "underline decoration-green-700 underline-offset-8 decoration-[3px]"
                  : "no-underline"
              } text-[16px] leading-[100%]`}
            >
              Bog`lanish
            </p>
          </Link>
        </div>
        <div>
          <Link href={"https://github.com/SHoWMaN2441"} target="_blank">
            <Image
              src={"/github.svg"}
              alt="github-img"
              width={32}
              height={32}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
