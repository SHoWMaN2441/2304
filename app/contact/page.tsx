"use client";
import Image from "next/image";
import { Users } from "@/helpers/types";
import { createClient } from "@/utils/client";
import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import Link from "next/link";

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

  function handleClick() {
    toast.success("Ma`lumotlar muvaffaqiyatli yuborildi!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  }

  return (
    <div className="mt-12 px-4 md:px-8">
      {/* Contact Cards */}
      <div className="max-w-[912px] w-full flex flex-col gap-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <Link
            href={`mailto:${user.email}`}
            className="flex-1 min-w-[280px] flex items-center justify-center bg-[#1B1B1B] rounded-[12px] border border-[#FFFFFF40]"
          >
            <ContactCard
              icon="/gmail.svg"
              label="E-pochta"
              value={user.email}
            />
          </Link>
          <Link
            href={`https://t.me/${user.telegram}`}
            target="_blank"
            className="flex-1 min-w-[280px]"
          >
            <ContactCard
              icon="/telegram.svg"
              label="Telegram"
              value={user.telegram}
            />
          </Link>
          <div className="flex-1 min-w-[280px]">
            <ContactCard
              icon="/contact.svg"
              label="Telefon raqam"
              value={user.telephone}
            />
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-[912px] w-full flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-white font-bold text-2xl">So`rov yuborish</h1>
          <Image src={"/border.svg"} alt="border" width={112} height={8} />
        </div>

        <div className="w-full bg-[#1B1B1B] rounded-[12px] p-5">
          {/* Input Fields */}
          <div className="flex flex-wrap gap-6">
            <InputField
              label="Ismingiz*"
              placeholder="Azimov Adham"
              type="text"
            />
            <InputField
              label="Manzilingiz*"
              placeholder="azimov@gmail.com"
              type="email"
            />
            <InputField
              label="Mas`uliyatingiz*"
              placeholder="Frontend Developer"
              type="text"
            />
          </div>

          {/* Textarea */}
          <div className="flex flex-col gap-2 mt-5">
            <label className="text-white font-normal text-[16px]">
              Izohingiz*
            </label>
            <textarea
              placeholder="O`z izohingizni kiriting"
              className="w-full h-48 p-3 rounded-[8px] border border-[#FFFFFF40] text-gray-300 font-normal text-[16px] resize-none"
            />
          </div>
          <button
            onClick={handleClick}
            className="w-[100px] mt-5 py-3 cursor-pointer text-white bg-green-600 rounded-[8px] hover:bg-green-700 transition"
          >
            Yuborish
          </button>
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
    <div className="w-full h-[190px] flex items-center justify-center bg-[#1B1B1B] rounded-[12px] border border-[#FFFFFF40]">
      <div className="flex flex-col items-center gap-2 text-center">
        <Image src={icon} alt="icon" width={64} height={64} />
        <h1 className="text-[20px] font-semibold text-white">{label}</h1>
        <p className="text-[16px] font-normal text-gray-500">
          {value || "Nomaʼlum"}
        </p>
      </div>
    </div>
  );
}

function InputField({
  label,
  placeholder,
  type,
}: {
  label: string;
  placeholder: string;
  type: string;
}) {
  return (
    <div className="flex flex-col w-full md:w-[calc(50%-12px)] gap-2">
      <label className="text-white font-normal text-[16px]">{label}</label>
      <input
        className="border border-[#FFFFFF40] pl-5 text-gray-300 h-[44px] rounded-[8px] bg-transparent"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
