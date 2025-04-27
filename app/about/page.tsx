"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/client";
import Image from "next/image";

interface Tool {
  image: string;
  hoverText: string;
}

interface AboutData {
  aboutme: string;
  asbob_uskunalar: string[];
  imageUrl: string;
  name_for_hover: string;
}

export default function MalumotPage() {
  const supabase = createClient();
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      const { data, error } = await supabase
        .from("aboutpage")
        .select("*")
        .single();

      if (error) {
        console.error("Ma'lumot olishda xato:", error);
      } else {
        setAboutData(data);
      }
    };

    fetchAboutData();
  }, []);

  if (!aboutData) {
    return (
      <div className="text-white flex justify-center items-center h-screen">
        {/* Skeleton loading for the "Men haqimda" section */}
        <div className="space-y-6">
          <div className="w-48 h-8 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="w-72 h-4 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="w-32 h-10 bg-[#39965F] rounded-md animate-pulse"></div>
        </div>

        {/* Skeleton loading for the "Asbob-uskunalar" section */}
        <div className="mt-12 space-y-6">
          <div className="w-48 h-8 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="flex gap-4 flex-wrap">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="w-52 h-32 bg-gray-300 rounded-md animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Skeleton loading for the "Men nimalar qila olaman" section */}
        <div className="mt-12 space-y-6">
          <div className="w-72 h-8 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="flex gap-4 flex-wrap">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="w-64 h-32 bg-gray-300 rounded-md animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Skeleton loading for the "Mijozlar" section */}
        <div className="mt-12 space-y-6">
          <div className="w-48 h-8 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="flex gap-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="w-52 h-32 bg-gray-300 rounded-md animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Men haqimda */}
      <div className="max-w-[912px] w-[100%] h-[398px] mt-[22px]">
        <div className="flex flex-col gap-[8px]">
          <h1 className="text-white font-bold text-[32px]">Men haqimda</h1>
          <Image src="/border.svg" alt="border" width={112} height={8} />
        </div>
        <div className="max-w-[912px] w-[100%] h-[243px] flex flex-col mt-[20px] gap-[10px]">
          <p className="font-medium text-[18px] text-gray-300">
            {aboutData.aboutme}
          </p>
        </div>
        <button className="bg-[#39965F] w-[181px] h-[43px] rounded-[8px] text-white flex items-center justify-center">
          Bog`lanish
        </button>
      </div>

      {/* Asbob-uskunalar */}
      <div className="w-[912px] h-auto mt-[44px] flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px]">
          <h1 className="text-white font-bold text-[32px]">Asbob-uskunalar</h1>
          <Image src="/border.svg" alt="border" width={112} height={8} />
        </div>

        <div className="max-w-[912px] w-[100%] flex flex-wrap gap-[20px]">
          {aboutData.asbob_uskunalar.map((toolString, index) => {
            let tool: Tool;
            try {
              tool = JSON.parse(toolString);
            } catch (error) {
              console.error("Parsing error:", error);
              return null;
            }

            return (
              <div key={index} className="relative group">
                <Image
                  src={tool.image}
                  alt="asbob uskunalar"
                  width={213}
                  height={124}
                  className="rounded-md"
                />
                {tool.hoverText && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-[18px] opacity-0 group-hover:opacity-100 transition">
                    {tool.hoverText}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Men nimalar qila olaman */}
      <div className="max-w-[912px] h-[350px] mt-[64px] w-[100%] flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px]">
          <h1 className="text-white font-bold text-[32px]">
            Men nimalar qila olaman
          </h1>
          <Image src="/border.svg" alt="border" width={112} height={8} />
        </div>

        {/* Boshqa qismi o'zgarishsiz */}
        <div className="w-[912px] h-[268px] flex flex-wrap gap-[20px]">
          {/* Barcha kartochkalar */}
          {["b1", "b3", "b2", "b4"].map((item, index) => (
            <div
              key={index}
              className="w-[444px] h-[124px] rounded-[12px] bg-[#1A1A1A] flex items-center justify-center"
            >
              <div className="w-[404px] h-[84px] flex gap-[10px] items-start">
                <Image
                  src={`/${item}.svg`}
                  alt="photo"
                  width={64}
                  height={64}
                />
                <div className="w-[326px] h-[84px] flex flex-col gap-[7px]">
                  <h1 className="text-white font-semibold text-[20px] leading-[100%] ">
                    {item === "b1" && "Seo"}
                    {item === "b3" && "Dizayn"}
                    {item === "b2" && "Sifat"}
                    {item === "b4" && "Tezkorlik"}
                  </h1>
                  <p className="font-medium text-[16px] text-gray-300">
                    {item === "b1" &&
                      "Qidiruv tizimining natijalarida sayt reytingini yaxshilash"}
                    {item === "b3" &&
                      "Kuchli dizayn va kichik detallargacha e'tibor berish"}
                    {item === "b2" &&
                      "Yuqori darajada saytlarni sifatli ishlab chiqish"}
                    {item === "b4" &&
                      "Qisqa muddat ichida tezkor sayt ishlab chiqish"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mijozlar */}
      <div className="w-[912px] h-[206px] flex flex-col mt-[64px] mb-[32px] gap-[24px]">
        <div className="flex flex-col gap-[8px]">
          <h1 className="text-white font-bold text-[32px]">Mijozlar</h1>
          <Image src="/border.svg" alt="border" width={112} height={8} />
        </div>
        <div className="w-[912px] h-[124px] flex gap-[20px] justify-between">
          {["webking", "market", "", ""].map((item, index) => (
            <div
              key={index}
              className="w-[213px] h-[124px] bg-[#1A1A1A] rounded-[12px] flex items-center justify-center"
            >
              {item && (
                <Image
                  src={`/${item}.svg`}
                  alt="photo"
                  width={114}
                  height={66}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
