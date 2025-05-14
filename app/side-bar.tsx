"use client";
import { Users } from "@/helpers/types";
import { createClient } from "@/utils/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Side_bar() {
  const pathname = usePathname();
  const supabase = createClient();
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const { data: userdata, error } = await supabase
        .from("userdata")
        .select("*");

      if (error) {
        console.error("Supabase error:", error.message);
        return;
      }

      if (userdata && userdata.length > 0) {
        setUsers(userdata as Users[]);
      } else {
        console.warn("No user data found.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  const user = users[0];

  return (
    <div className="bg-[#1B1B1B] w-full md:max-w-[450px] h-full">
      {/* Top bar */}
      <div className="border-b border-[#FFFFFF40] mb-[14px] h-[40px] w-full flex items-center gap-[14px] pl-[14px]">
        <Image src={"/chapImg.svg"} alt="Image" width={24} height={24} />
        <Image src={"/ongImg.svg"} alt="Image" width={24} height={24} />
        <Image src={"/refresh.svg"} alt="Image" width={24} height={24} />
      </div>

      <div className="mt-6 md:hidden px-[14px]">
        <div className="flex flex-col gap-2 mb-4">
          <NavItem href="/" label="Bosh sahifa" currentPath={pathname} />
          <NavItem href="/about" label="Haqida" currentPath={pathname} />
          <NavItem href="/loyiha" label="Loyihalar" currentPath={pathname} />
          <NavItem href="/contact" label="Bog'lanish" currentPath={pathname} />
        </div>
      </div>

      {/* User profile */}
      {user ? (
        <>
          <div className="pl-[14px] border-b border-[#FFFFFF40] pb-[14px]">
            <Image
              className="rounded-[10px]"
              src={user.imageUrl || "/default-user.png"}
              alt="person"
              width={259}
              height={260}
            />
            <p className="font-medium text-[18px] text-white mt-[14px]">
              {user.name}
            </p>
            <div className="flex flex-wrap gap-[10px] mt-[20px]">
              {user.fields?.map((item, index) => (
                <div
                  key={index}
                  className="px-2 h-[26px] rounded-[8px] bg-[#d0cccc40] text-white font-medium text-[12px] flex items-center justify-center"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Contact blocks */}
          <div className="px-[14px] mt-[14px] flex flex-col gap-[14px]">
            <Link href={`mailto:${user.email}`} target="_blank">
              <ContactBlock
                icon="/gmail.svg"
                label="E-pochta"
                value={user.email}
              />
            </Link>
            <Link href={`https://github.com/${user.github}`} target="_blank">
              <ContactBlock
                icon="/git.svg"
                label="Github"
                value={user.github}
              />
            </Link>
            <Link href={`https://t.me/${user.telegram}`} target="_blank">
              <ContactBlock
                icon="/telegram.svg"
                label="Telegram"
                value={user.telegram}
              />
            </Link>
            <ContactBlock
              icon="/contact.svg"
              label="Telefon raqam"
              value={user.telephone}
            />
          </div>
        </>
      ) : (
        <p className="text-white pl-[14px] pt-4">Foydalanuvchi topilmadi</p>
      )}
    </div>
  );
}

function ContactBlock({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex gap-[10px]">
      <Image src={icon} alt={label} width={44} height={44} />
      <div className="flex flex-col justify-center">
        <h5 className="font-medium text-white text-[16px]">{label}</h5>
        <p className="text-gray-400 text-[14px]">{value || "Nomaʼlum"}</p>
      </div>
    </div>
  );
}

function NavItem({
  href,
  label,
  currentPath,
}: {
  href: string;
  label: string;
  currentPath: string;
}) {
  const active = currentPath === href;
  return (
    <Link href={href}>
      <p
        className={`text-white text-[15px] font-medium ${
          active ? "underline decoration-green-700 decoration-[2px]" : ""
        }`}
      >
        {label}
      </p>
    </Link>
  );
}
