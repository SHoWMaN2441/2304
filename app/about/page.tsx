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
        console.error("Ma`lumot olishda xato:", error);
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
    <div className="px-4 md:px-0 w-full max-w-[912px] mx-auto mt-6">
      {/* Men haqimda */}
      <section className="flex flex-col gap-4">
        <h1 className="text-white font-bold text-2xl md:text-3xl">
          Men haqimda
        </h1>
        <Image src="/border.svg" alt="border" width={112} height={8} />
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          {aboutData.aboutme}
        </p>
        <button className="bg-[#39965F] w-full sm:w-fit px-6 py-2 rounded-md text-white">
          Bog‘lanish
        </button>
      </section>

      <section className="mt-12">
        <h1 className="text-white font-bold text-2xl md:text-3xl">
          Asbob-uskunalar
        </h1>
        <Image src="/border.svg" alt="border" width={112} height={8} />
        <div className="mt-4 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-4">
          {aboutData.asbob_uskunalar.map((toolString, index) => {
            let tool: Tool;
            try {
              tool = JSON.parse(toolString);
            } catch {
              return null;
            }

            return (
              <div key={index} className="relative group w-full aspect-[4/3]">
                <Image
                  src={tool.image}
                  alt="asbob uskunalar"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
                {tool.hoverText && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition">
                    {tool.hoverText}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-16">
        <h1 className="text-white font-bold text-2xl md:text-3xl">
          Men nimalar qila olaman
        </h1>
        <Image src="/border.svg" alt="border" width={112} height={8} />
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {["b1", "b3", "b2", "b4"].map((item, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] rounded-xl p-4 flex flex-col sm:flex-row gap-4"
            >
              <Image
                src={`/${item}.svg`}
                alt="photo"
                width={64}
                height={64}
                className="w-16 h-16 mx-auto sm:mx-0"
              />
              <div className="flex flex-col gap-2 text-center sm:text-left">
                <h2 className="text-white font-semibold text-lg">
                  {item === "b1" && "Seo"}
                  {item === "b3" && "Dizayn"}
                  {item === "b2" && "Sifat"}
                  {item === "b4" && "Tezkorlik"}
                </h2>
                <p className="text-gray-300 text-sm">
                  {item === "b1" &&
                    "Qidiruv tizimining natijalarida sayt reytingini yaxshilash"}
                  {item === "b3" &&
                    "Kuchli dizayn va kichik detallargacha e`tibor berish"}
                  {item === "b2" &&
                    "Yuqori darajada saytlarni sifatli ishlab chiqish"}
                  {item === "b4" &&
                    "Qisqa muddat ichida tezkor sayt ishlab chiqish"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 mb-12">
        <h1 className="text-white font-bold text-2xl md:text-3xl">Mijozlar</h1>
        <Image src="/border.svg" alt="border" width={112} height={8} />
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {["webking", "market"].map((item, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] rounded-xl flex items-center justify-center aspect-[4/3]"
            >
              {item && (
                <Image
                  src={`/${item}.svg`}
                  alt="photo"
                  width={114}
                  height={66}
                  className="h-12 object-contain"
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
