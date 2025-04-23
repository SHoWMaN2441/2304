"use client";
import Image from "next/image";
import { Users } from "@/helpers/types";
import { createClient } from "@/utils/client";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data: userdata, error } = await supabase
        .from("userdata")
        .select("*");

      if (error) {
        console.error("Supabase error:", error.message);
        return;
      }

      if (userdata && userdata.length > 0) {
        setUsers(userdata as Users[]);
      }
    }

    getUser();
  }, []);

  const user = users[0] || {};

  return (
    <div className="mt-[32px] mb-[32px]">
      <div className="max-w-[912px] w-full h-[278px] flex flex-col gap-[24px]">
        <div className="w-[912px] h-[190px] flex justify-between">
          <ContactCard icon="/gmail.svg" label="E-pochta" value={user.email} />
          <ContactCard
            icon="/telegram.svg"
            label="Telegram"
            value={user.telegram}
          />
          <ContactCard
            icon="/contact.svg"
            label="Telefon raqam"
            value={user.telephone}
          />
        </div>
      </div>

      <div className="w-[912px] h-[502px] flex flex-col mt-[64px] gap-[24px]">
        <div className="w-[226px] h-[65px] flex flex-col gap-[8px]">
          <h1 className="text-white font-bold text-[28px]">So`rov yuborish</h1>
          <Image src={"/border.svg"} alt="photo" width={112} height={8} />
        </div>
        <div className="w-[912px] h-[420px] bg-[#1B1B1B] rounded-[12px] p-[20px]">
          <div className="w-[872px] h-[76px] flex items-center justify-between">
            <div className="w-[420px] h-[76px] flex flex-col justify-between">
              <p className="text-white font-normal text-[16px]">Ismingiz*</p>
              <input
                className="border border-[#FFFFFF40] pl-[20px] w-full text-gray-300 h-[44px] rounded-[8px]"
                type="text"
                placeholder="Azimov Adham"
              />
            </div>
            <div className="w-[420px] h-[76px] flex flex-col justify-between">
              <p className="text-white font-normal text-[16px]">Manzilingiz*</p>
              <input
                className="border border-[#FFFFFF40] pl-[20px] w-full text-gray-300 h-[44px] rounded-[8px]"
                type="email"
                placeholder="azimov@gmail.com"
              />
            </div>
          </div>
          <div className="w-[872px] h-[224px] flex flex-col gap-[8px] mt-[20px]">
            <p className="text-white font-normal text-[16px]">Izohingiz*</p>
            <textarea
              defaultValue={"O`z izohingizni kiriting"}
              className="w-full h-[192px] p-[10px] rounded-[8px] border border-[#FFFFFF40] text-gray-300 font-normal text-[16px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}



function ContactCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value?: string;
}) {
  return (
    <div className="w-[290px] h-[190px] flex items-center justify-center bg-[#1B1B1B] rounded-[12px] border border-[#FFFFFF40]">
      <div className="w-full h-[134px] flex flex-col items-center gap-[8px]">
        <Image src={icon} alt="photo" width={64} height={64} />
        <h1 className="text-[20px] font-semibold text-white">{label}</h1>
        <p className="text-[16px] font-normal text-gray-500">
          {value || "Nomaʼlum"}
        </p>
      </div>
    </div>
  );
}
