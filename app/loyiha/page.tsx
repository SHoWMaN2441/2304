"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/client";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface Loyiha {
  id: number;
  imageUrl: string;
  name: string;
  talab: string;
  tags: string[] | string;
  githubUrl?: string;
  viewUrl?: string;
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
    if (talab === "Yuqori") return "/green_card.svg";
    if (talab === "Past") return "/aylana.svg";
    return "/chevron.svg";
  };

  return (
    <div className="mt-8 max-w-[912px] w-full px-4 sm:px-0">
      <h1 className="text-white font-bold text-3xl mb-4">Loyihalar</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {loyihalar.map((loyiha) => (
          <div
            key={loyiha.id}
            className="relative border border-[#444] rounded-lg overflow-hidden group bg-[#1A1A1A] transition-transform duration-300 hover:scale-[1.01]"
          >
            <div className="relative w-full h-[200px] sm:h-[240px]">
              <Image
                src={loyiha.imageUrl}
                alt={`Image of ${loyiha.name}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 backdrop-blur-xs bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <Link href={loyiha.githubUrl || "#"} target="_blank">
                  <FaGithub
                    size={35}
                    className="hover:scale-110 transition-transform absolute right-2 top-4 text-green-400"
                  />
                </Link>
                <Link href={loyiha.viewUrl || "#"} target="_blank">
                  <Image
                    src="/eye.jpg"
                    alt="View"
                    width={35}
                    height={35}
                    className="hover:scale-110 transition-transform rounded-full absolute top-4 right-14"
                  />
                </Link>
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-white text-xl font-semibold">
                  {loyiha.name}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">{loyiha.talab}</span>
                  <Image
                    src={getPriorityIcon(loyiha.talab)}
                    alt="talab"
                    width={10}
                    height={10}
                  />
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(loyiha.tags as string[]).map((tag, index) => (
                  <span
                    key={index}
                    className="text-[#39965F] text-sm font-medium bg-[#1F1F1F] px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full mt-16 bg-[#1B1B1B] p-4 sm:p-6 md:p-8 rounded-[12px] flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 border-2 border-white">
        <div className="min-w-[100px] sm:min-w-[120px] flex-shrink-0">
          <Image
            src="/tg_icon.svg"
            alt="telegram"
            width={120}
            height={120}
            className="w-[80px] sm:w-[100px] md:w-[120px] h-auto"
          />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
            Telegram kanal
          </h2>
          <p className="text-[#FFFFFFB3] text-sm sm:text-base md:text-lg mt-2 mb-4">
            Barcha loyihalarimni telegram kanalimda ham kuzatib borishingiz
            mumkin!
          </p>
          <Link href="https://t.me/SHoWMaN777" target="_blank">
            <button className="bg-[#39965F] text-white px-5 py-2 rounded-md font-medium text-sm sm:text-base hover:bg-[#2e7e4c] transition-colors">
              Tashrif buyurish
            </button>
          </Link>
        </div>

        <div className="relative hidden sm:block w-[120px] md:w-[144px]">
          <Image
            src="/qiyalik1.svg"
            alt="photo"
            width={144}
            height={144}
            className="w-full h-auto"
          />
          <div className="absolute top-[-10px] right-[-10px]">
            <Image
              src="/qiyalik2.svg"
              alt="photo"
              width={206}
              height={192}
              className="w-[140px] md:w-[206px] h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
