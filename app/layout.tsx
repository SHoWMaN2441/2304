"use client";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./header";
import useGamburgerStore from "@/store/gamburger";
import Side_bar from "./side-bar";
import { usePathname } from "next/navigation";

const poppins = localFont({
  weight: "400",
  src: "/local_font.ttf",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { open, setOpen } = useGamburgerStore();
  const pathname = usePathname();
  console.log(pathname);
  const blockedPages = ["/super-admin", "/super-admin/user-malumot"];

  return (
    <html lang="en">
      <body
        style={{ backgroundImage: "url('/banner1.svg')" }}
        className={`${poppins.className}   antialiased bg-cover`}
      >
        <div className="container max-w-full w-full  bg-[#1A1A1A]">
          {!blockedPages.includes(pathname) ? <Header /> : ""}
        </div>
        <div
          style={{ backgroundImage: "url('/body.svg')" }}
          className="flex container max-w-[1240px] w-full mx-auto min-h-screen"
        >
          <div
            onClick={() => setOpen(true)}
            className={`
        transition-all duration-200 ease-in-out
        min-h-screen p-2
        bg-[#1B1B1B]
        ${
          open
            ? "translate-x-0 opacity-100 w-[300px]"
            : "-translate-x-full opacity-0 w-[164px]"
        }
        overflow-hidden
      `}
          >
            <Side_bar />
          </div>
          <div className="max-w-[952px] container w-full  flex  justify-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
