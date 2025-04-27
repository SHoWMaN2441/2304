"use client";
import { Users } from "@/helpers/types";
import { createClient } from "@/utils/client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Side_bar() {
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
        console.log(userdata[0].imageUrl);
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
    <div className="bg-[#1B1B1B]">
      <div className="max-w-[350px] border-b-1 border-[#FFFFFF40] mb-[14px] h-[40px] w-[100%] flex items-center gap-[14px] pl-[14px] ">
        <Image src={"/chapImg.svg"} alt="Image" width={24} height={24} />
        <Image src={"/ongImg.svg"} alt="Image" width={24} height={24} />
        <Image src={"/refresh.svg"} alt="Image" width={24} height={24} />
      </div>

      {user ? (
        <>
          <div className="max-w-[287px] w-[100%] h-[376px] border-b-1 pl-[14px] border-[#FFFFFF40]">
            <Image
              className="rounded-[10px]"
              src={user.imageUrl || "/default-user.png"}
              alt="person"
              width={259}
              height={260}
            />
            <div>
              <p className="font-medium text-[18px] leading-1 text-white mt-[14px]">
                {user.name}
              </p>
            </div>
            <div className="max-w-[259px] w-[100%] mt-[20px] h-[62px] flex flex-wrap  gap-[10px]">
              {user.fields?.map((item, index) => (
                <div
                  key={index}
                  className="px-2 h-[26px] rounded-[8px] bg-[#d0cccc40] text-white font-medium text-[12px] leading-[14px] flex items-center justify-center"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-[288px] h-[244px] mt-[14px] flex flex-col items-center gap-[14px]">
            <ContactBlock
              icon="/gmail.svg"
              label="E-pochta"
              value={user.email}
            />
            <ContactBlock icon="/git.svg" label="Github" value={user.github} />
            <ContactBlock
              icon="/telegram.svg"
              label="Telegram"
              value={user.telegram}
            />
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
    <div className="w-[260px] h-[47px] flex gap-[10px]">
      <Image src={icon} alt={label} width={44} height={44} />
      <div className="min-w-[171px] h-[47px] flex flex-col gap-[15px]">
        <h5 className="font-medium text-white text-[16px] mt-[10px] leading-1">
          {label}
        </h5>
        <p className="font-normal text-[14px] leading-1 text-gray-400">
          {value || "Nomaʼlum"}
        </p>
      </div>
    </div>
  );
}
