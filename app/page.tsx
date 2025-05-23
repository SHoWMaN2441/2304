"use client";
import { Users } from "@/helpers/types";
import { createClient } from "@/utils/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
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
    <div className="max-w-full sm:max-w-[633px] h-auto sm:h-[265px] w-full sm:w-[100%] mt-20 sm:mt-[227px] flex items-center flex-col px-4">
      {user ? (
        <>
          <h1 className="font-bold text-3xl sm:text-[36px] text-center text-white">
            Assalomu alaykum, Men{" "}
            <span className="text-green-700">{user.name}</span> man
          </h1>
          <p className="text-base sm:text-[18px] text-center text-gray-500 font-medium mt-4">
            Veb dasturchi va dizayner sifatida natijaga yo`naltirilgan ishchi.
            Veb-saytlar va veb-ilovalarni yaratish va boshqarish orqali umumiy
            mahsulot muvaffaqiyatiga erishish maqsadimdir.
          </p>
          <Link href="/loyiha">
            <button className="w-full sm:w-[189px] cursor-pointer mt-4 sm:mt-[16px] h-[43px] bg-[#39965F] rounded-[8px] text-white font-medium text-[18px] leading-1">
              Loyihalar
            </button>
          </Link>
        </>
      ) : (
        <p className="text-white">Yuklanmoqda...</p>
      )}
    </div>
  );
}
