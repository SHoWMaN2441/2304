"use client";

import { BASE_IMAGE_URL } from "@/helpers/types";
import { createClient } from "@/utils/client";

import Image from "next/image";
import { useState } from "react";

export default function UserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [telephone, settelephone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [aboutme, setaboutme] = useState("");
  const [fields, setFields] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [projectImageUrl, setProjectImageUrl] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectTalab, setProjectTalab] = useState("");
  const [projectTags, setProjectTags] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([
    "/htmlCard.svg",
    "/cssCard.svg",
    "/jsCard.svg",
    "/figma.svg",
    "/react.svg",
    "/vue.svg",
    "/a1.svg",
    "/a2.svg",
  ]);

  const handleAddTool = () => {
    const newTool = prompt(
      "Yangi texnologiya rasmi manzilini kiriting (masalan: /newtech.svg)"
    );
    if (newTool) {
      setTools((prev) => [...prev, newTool]);
    }
  };

  // const handleasbobuskunalar = () => {
  //   console.log("Saqlangan texnologiyalar:", tools);
  // };
  const handleDeleteTool = (index: number) => {
    const updatedTools = [...tools];
    updatedTools.splice(index, 1);
    setTools(updatedTools);
  };

  const supabase = createClient();

  async function handleImage(file: File) {
    try {
      const { data } = await supabase.storage
        .from("products")
        .upload(`image_${Date.now()}`, file);
      setImageUrl(BASE_IMAGE_URL + data?.path);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleProjectImage(file: File) {
    try {
      const { data } = await supabase.storage
        .from("products")
        .upload(`image_${Date.now()}`, file);
      setProjectImageUrl(BASE_IMAGE_URL + data?.path);
    } catch (error) {
      console.error("Image yuklashda xatolik:", error);
    }
  }
  function handleProjectTags(e: React.ChangeEvent<HTMLInputElement>) {
    const tags = e.target.value
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    setProjectTags(tags);
  }

  async function handleProjectSave() {
    try {
      const { error } = await supabase.from("loyihalar").insert([
        {
          imageUrl: projectImageUrl,
          name: projectName,
          talab: projectTalab,
          tags: projectTags,
        },
      ]);
      if (error) console.error("Loyiha saqlanmadi:", error.message);
      else console.log("Loyiha muvaffaqiyatli qo‘shildi!");
    } catch (err) {
      console.error("Xatolik:", err);
    }
  }

  function handleText(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const array = value
      .split(",")
      .map((str) => str.trim())
      .filter((str) => str);
    setFields(array);
  }

  async function handleSave() {
    try {
      const { error } = await supabase.from("userdata").insert([
        {
          name,
          email,
          telephone,
          github,
          telegram,
          imageUrl,
          fields,
          aboutme,
        },
      ]);

      if (error) {
        console.error("Xatolik:", error.message);
      } else {
        console.log("Foydalanuvchi muvaffaqiyatli saqlandi");
      }

      if (error) {
        console.log("Xatolik:", error.message);
      } else {
        console.log("Ma`lumot muvaffaqiyatli qo`shildi!");
      }
    } catch (error) {
      console.log("Xatolik:", error);
    }
  }

  return (
    <div className=" text-white pt-[32px] min-h-screen mx-auto w-full">
      <div className="max-w-[912px]  h-[610px] flex flex-col gap-[24px]">
        <div className=" h-[65px]  flex flex-col  gap-[8px]  ">
          <h1 className="text-white  font-bold text-[28px]">
            Side-bar malumot
          </h1>
          <Image src={"/border.svg"} alt="photo" width={112} height={8} />
        </div>
        <div className="w-[912px] h-[570px] bg-[#1B1B1B] flex flex-col gap-[210px]  rounded-[12px] p-[20px]">
          <div className="w-[872px] h-[76px] flex flex-wrap items-center justify-between gap-y-[20px]  ">
            <div className="w-[280px] h-[76px] flex flex-col justify-between  ">
              <p className="text-white  font-normal text-[16px]">Ism*</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-1 border-[#FFFFFF40] pl-[20px] w-[100%] text-gray-300 h-[44px] rounded-[8px] "
                type="text"
                placeholder="Ismingizni kiriting"
              />
            </div>
            <div className="w-[280px] h-[76px] flex flex-col justify-between  ">
              <p className="text-white  font-normal text-[16px]">Email*</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-1 border-[#FFFFFF40] pl-[20px] w-[100%] text-gray-300 h-[44px] rounded-[8px] "
                type="text"
                placeholder="Emailingizni kiriting"
              />
            </div>
            <div className="w-[280px] h-[76px] flex flex-col justify-between  ">
              <p className="text-white  font-normal text-[16px]">Telegram*</p>
              <input
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                className="border-1 border-[#FFFFFF40] pl-[20px] w-[100%] text-gray-300 h-[44px] rounded-[8px] "
                type="text"
                placeholder="Telegram manzilni kiriting"
              />
            </div>
            <div className="w-[280px] h-[76px] flex flex-col justify-between  ">
              <p className="text-white  font-normal text-[16px]">Github*</p>
              <input
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="border-1 border-[#FFFFFF40] pl-[20px] w-[100%] text-gray-300 h-[44px] rounded-[8px] "
                type="text"
                placeholder="Github manzilni kiriting"
              />
            </div>
            <div className="w-[280px] h-[76px] flex flex-col justify-between  ">
              <p className="text-white  font-normal text-[16px]">
                Telefon telephone*
              </p>
              <input
                value={telephone}
                onChange={(e) => settelephone(e.target.value)}
                className="border-1 border-[#FFFFFF40] pl-[20px] w-[100%] text-gray-300 h-[44px] rounded-[8px] "
                type="text"
                placeholder="Telefon telephoneni kiriting"
              />
            </div>
            <div className="w-[280px] h-[76px] flex flex-col justify-between ">
              <p className="text-white  font-normal text-[16px]">Surat*</p>
              <label
                htmlFor="image"
                className="flex  bg-[#1B1B1B]  text-white border-1 border-[#FFFFFF40] rounded-[8px] text-base font-medium px-22 py-2.5 outline-none w-max cursor-pointer mx-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 mr-2 fill-white inline"
                  viewBox="0 0 32 32"
                >
                  <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                  <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                </svg>
                Upload
                <input
                  onChange={(e) => handleImage(e.target.files![0])}
                  type="file"
                  id="image"
                  className="hidden"
                />
              </label>
            </div>
            <div className="w-full h-[76px] flex flex-col justify-between  ">
              <p className="text-white  font-normal text-[16px]">
                Sozli tanishtiruv*
              </p>
              <input
                onChange={handleText}
                className="border-1 border-[#FFFFFF40] pl-[20px] w-[100%] text-gray-300 h-[44px] rounded-[8px] "
                type="text"
                placeholder="O`zingiz haqida tarif kiriting"
              />
            </div>
          </div>
          <div className="w-full h-[230px]  flex flex-col justify-between  ">
            <p className="text-white  font-normal text-[16px]">aboutme*</p>
            <textarea
              value={aboutme}
              onChange={(e) => setaboutme(e.target.value)}
              placeholder="O`zingiz haqida qisqa aboutme kiriting"
              className="border-1 border-[#FFFFFF40] pl-[20px] pt-[10px] w-[100%] text-gray-300 h-[160px] rounded-[8px]"
            ></textarea>
            <button
              onClick={handleSave}
              className="w-[178px] h-[40px] bg-[#39965F] rounded-[8px]  mt-[10px] text-white text-[16px]  font-normal  flex items-center justify-center  "
            >
              Saqlash
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-[912px] h-auto flex flex-col gap-[24px] mt-[80px]">
        <div className="h-[65px] flex flex-col gap-[8px]">
          <h1 className="text-white font-bold text-[28px]">Loyihalar</h1>
          <Image src={"/border.svg"} alt="photo" width={112} height={8} />
        </div>
        <div className="w-[912px] bg-[#1B1B1B] rounded-[12px] p-[20px] flex flex-col gap-[20px]">
          <div className="flex flex-wrap gap-[20px]">
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-[280px] h-[44px] rounded-[8px] border-1 border-[#FFFFFF40] pl-[20px] text-gray-300"
              type="text"
              placeholder="Loyiha nomi"
            />
            <input
              value={projectTalab}
              onChange={(e) => setProjectTalab(e.target.value)}
              className="w-[280px] h-[44px] rounded-[8px] border-1 border-[#FFFFFF40] pl-[20px] text-gray-300"
              type="text"
              placeholder="Talab (past, o`rta, yuqori)"
            />
            <input
              onChange={handleProjectTags}
              className="w-[280px] h-[44px] rounded-[8px] border-1 border-[#FFFFFF40] pl-[20px] text-gray-300"
              type="text"
              placeholder="HashTaglar: #web, #ai,..."
            />
            <label
              htmlFor="projectImage"
              className="bg-[#1B1B1B] border-1 border-[#FFFFFF40] rounded-[8px] px-4 py-2 text-white cursor-pointer flex items-center justify-center"
            >
              Surat yuklash
              <input
                onChange={(e) => handleProjectImage(e.target.files![0])}
                type="file"
                id="projectImage"
                className="hidden"
              />
            </label>
          </div>
          <button
            onClick={handleProjectSave}
            className="w-[178px] h-[40px] bg-[#39965F] rounded-[8px] text-white text-[16px] font-normal"
          >
            Loyihani Saqlash
          </button>
        </div>
      </div>

      <div className="max-w-[912px] h-[610px] flex flex-col gap-[24px] mt-[40px] ">
        <div className="h-[65px] flex flex-col gap-[8px]">
          <h1 className="text-white font-bold text-[28px]">About Page uchun</h1>
          <Image src={"/border.svg"} alt="photo" width={112} height={8} />
        </div>
        <div className="max-w-[912px  ] w-[100%] h-[243px] flex flex-col bg-[#1B1B1B] p-[20px] mt-[20px] gap-[10px]">
          <div className="h-[65px] flex flex-col gap-[8px]">
            <h1 className="text-white font-bold text-[24px]">Men haqimda</h1>
            <Image src={"/order.svg"} alt="photo" width={112} height={8} />
          </div>
          <textarea
            className="border-1 bg-[#1B1B1B] border-[#FFFFFF40] pl-[20px] pt-[10px] w-[100%] text-gray-300 h-[160px] rounded-[8px]"
            name="o`zingiz haqida batafsilroq"
            placeholder="O`zingiz haqida..."
            id=""
          ></textarea>
        </div>

        <div className="max-w-[912px] h-[570px] bg-[#1B1B1B] flex flex-col gap-[40px] rounded-[12px] p-[20px] overflow-y-auto">
          <div className="w-[912px] flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-white font-bold text-[24px]">
                Asbob-uskunalar
              </h3>
              <Image src={"/border.svg"} alt="border" width={112} height={8} />
            </div>

            <div className="max-w-[912px] w-full flex flex-wrap gap-[10px]">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  className="relative group w-[213px] h-[124px] rounded-[12px] overflow-hidden"
                >
                  <Image
                    src={tool}
                    alt="tool"
                    width={213}
                    height={124}
                    className="rounded-[12px]"
                  />

                  <button
                    onClick={() => handleDeleteTool(index)}
                    className="absolute cursor-pointer top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    title="o`chirish"
                  >
                    ×
                  </button>
                </div>
              ))}

              <button
                onClick={handleAddTool}
                className="w-[213px] cursor-pointer h-[124px] border-2 border-dashed border-[#39965F] flex items-center justify-center rounded-[12px] text-white text-[48px] font-bold hover:bg-[#39965F] transition"
              >
                +
              </button>
            </div>
          </div>

          <div className="w-full flex flex-col justify-end">
            <button
              onClick={handleSave}
              className="w-[178px] h-[40px] bg-[#39965F] rounded-[8px] text-white text-[16px] font-normal flex items-center justify-center"
            >
              Saqlash
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
