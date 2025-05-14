"use client";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./header";
import useGamburgerStore from "@/store/gamburger";
import Side_bar from "./side-bar";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

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
  const blockedPages = ["/super-admin", "/super-admin/user-malumot"];

  return (
    <html lang="en">
      <body
        style={{ backgroundImage: "url('/banner1.svg')" }}
        className={`${poppins.className} mx-auto container antialiased bg-cover`}
      >
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="max-w-full w-full mx-auto bg-[#1A1A1A] z-50 relative">
          {!blockedPages.includes(pathname) && <Header />}
        </div>

        {/* Body container */}
        <div
          style={{ backgroundImage: "url('/body.svg')" }}
          className={`flex flex-col md:flex-row max-w-full w-full mx-auto min-h-screen ${
            open ? "overflow-hidden" : "overflow-auto"
          }`}
        >
          <div
            onClick={() => setOpen(true)}
            className={`
    md:relative top-0 left-0
    h-full md:min-h-screen p-2
    bg-[#1B1B1B]
    transform transition-transform duration-300 ease-in-out
    ${
      open
        ? "translate-x-0 w-full md:w-[450px]"
        : "translate-x-[-100%] md:translate-x-0 md:w-[164px]"
    }
    ${open ? "opacity-100" : "opacity-0"}
    z-40
    ${!open ? "absolute" : ""}
  `}
          >
            <Side_bar />
          </div>

          {/* Main content */}
          <div
            className={`transition-all duration-300 flex justify-center w-full ${
              open && window.innerWidth <= 768 ? "hidden" : "block"
            }`}
          >
            <div className="max-w-[952px] w-full">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
