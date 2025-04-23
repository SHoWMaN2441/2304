"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/client";
import Image from "next/image";
import Link from "next/link";

interface Loyiha {
  id: number;
  image: string;
  name: string;
  talab: string;
  tags: string[] | string;
}

export default function LoyihaPage() {
  const supabase = createClient();
  const [loyihalar, setLoyihalar] = useState<Loyiha[]>([]);

  useEffect(() => {
    const fetchLoyihalar = async () => {
      const { data, error } = await supabase.from("loyihalar").select("*");

      if (!error && data) {
        const parsedData = data.map((item) => ({
          ...item,
          tags:
            typeof item.tags === "string"
              ? item.tags.split(",").map((tag: string) => tag.trim())
              : item.tags,
        }));
        setLoyihalar(parsedData);
      } else {
        console.error("Supabase error:", error?.message);
      }
    };

    fetchLoyihalar();
  }, []);

  const getPriorityIcon = (talab: string) => {
    if (talab === "Yuqori") return "/aylana.svg";
    if (talab === "Past") return "/green_card.svg";
    return "/chevron.svg";
  };

  return (
    <div className="mt-[32px] max-w-[912px] w-full">
      <h1 className="text-white font-bold text-[32px] mb-4">Loyihalar</h1>
      <div className="flex flex-wrap gap-[20px]">
        {loyihalar.map((loyiha) => (
          <div
            key={loyiha.id}
            className="w-[444px] h-[346px] border border-[#444] rounded-lg p-0"
          >
            <div>
              <Image
                src={loyiha.image}
                alt={`Image of ${loyiha.name}`}
                width={444}
                height={240}
                className="rounded-t-lg object-cover"
              />
            </div>

            <div className="mt-[12px] w-[444px] h-[30px] flex justify-between px-1">
              <h1 className="text-white text-[20px] font-medium">
                {loyiha.name}
              </h1>
              <div className="flex items-center gap-[8px] h-[24px]">
                <p className="text-white text-[16px] font-medium">
                  {loyiha.talab}
                </p>
                <Image
                  src={getPriorityIcon(loyiha.talab)}
                  alt="talab"
                  width={8}
                  height={8}
                />
              </div>
            </div>
            <div className="w-[444px] mt-[12px] flex flex-wrap gap-[12px] px-1">
              {(loyiha.tags as string[]).map((tag, index) => (
                <p
                  key={index}
                  className="text-[#39965F] text-[16px] font-medium"
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="w-[912px] h-[208px] flex items-center mb-[26px] mt-[64px] pl-[20px] rounded-[12px] bg-[#1B1B1B]">
        <Image src={"/tg_icon.svg"} alt="telegram" width={168} height={168} />
        <div className="ml-[20px] w-[406px] h-[160px] flex flex-col gap-[12px]">
          <h1 className="text-white text-[28px] font-bold">Telegram kanal</h1>
          <p className="text-[18px] w-[406px] font-normal text-[#FFFFFF40]">
            Barcha loyihalarimni telegram kanalimda <br /> ham kuzatib
            borishingiz mumkin!
          </p>
          <Link href={"https://t.me/SHoWMaN777"} target="_blank">
            <button className="w-[178px] cursor-pointer h-[40px] bg-[#39965F] rounded-[8px] text-white text-[16px] font-normal flex items-center justify-center">
              Tashrif buyurish
            </button>
          </Link>
        </div>
        <div className="relative max-w-[280px] w-full">
          <Image src={"/qiyalik1.svg"} alt="photo" width={144} height={144} />
          <div className="absolute top-[-10px] right-[-10px]">
            <Image src={"/qiyalik2.svg"} alt="photo" width={206} height={192} />
          </div>
        </div>
      </div>
    </div>
  );
}
