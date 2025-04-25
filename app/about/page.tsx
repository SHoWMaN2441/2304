import Image from "next/image";

export default function MalumotPage() {
  return (
    <div>
      <div className="max-w-[912px] w-[100%] h-[398px] mt-[22px]">
        <div className="flex flex-col gap-[8px] ">
          <h1 className="text-white font-bold  text-[32px] ">Men haqimda</h1>
          <Image src={"/border.svg"} alt="border" width={112} height={8} />
        </div>
        <div className="max-w-[912px] w-[100%] h-[243px] flex flex-col mt-[20px] gap-[10px]">
          <p className="font-medium  text-[18px] text-gray-300  ">
            Men Husanov Azizbek veb dasturchisiman. Yoshim 18 da, Buxoro
            viloyati Buxoro shahrida tug`ilganman. Qiziqarli, ko`p
            funksionallika ega bo`lgan va kuchli dizaynga ega bo`lgan dasturlar
            yaratishga qiziqaman.
          </p>
          <p className="font-medium  text-[18px] text-gray-300 ">
            Mening vazifam veb saytni foydalanuvchilarga qulay, sayt dizayni
            foydalanuvchilarga jalb qiluvchi lekin ayni paytda tezkor bo`lishini
            taminlashdir va saytni moslashuvchan kodlar bilan yaratishdir!
            Mening maqsadim veb sayt foydalanuvchilariga barcha qismlarini
            intuitiv va qulay bo`lishga harakat qilishga qaratilgan. Agar sizga
            men yaratgan loyihalarim qiziq bo`lsa Loyihalar sahifasiga tashrif
            buyurishingiz mumkin
          </p>
        </div>
        <button className="bg-[#39965F] w-[181px] h-[43px] rounded-[8px]  text-white flex items-center  justify-center   ">
          Bog`lanish
        </button>
      </div>
      <div className="w-[912px] h-[350px] mt-[44px] flex flex-col gap-[24px] ">
        <div className="flex flex-col gap-[8px] ">
          <h1 className="text-white font-bold  text-[32px] ">
            Asbob-uskunalar
          </h1>
          <Image src={"/border.svg"} alt="border" width={112} height={8} />
        </div>
        <div className="max-w-[912px] w-[100%] h-[268px] flex flex-wrap gap-[20px] ">
          <Image src={"/htmlCard.svg"} alt="photo" width={213} height={124} />
          <Image src={"/cssCard.svg"} alt="photo" width={213} height={124} />
          <Image src={"/jsCard.svg"} alt="photo" width={213} height={124} />
          <Image src={"/figma.svg"} alt="photo" width={213} height={124} />
          <Image src={"/react.svg"} alt="photo" width={213} height={124} />
          <Image src={"/vue.svg"} alt="photo" width={213} height={124} />
          <Image src={"/a1.svg"} alt="photo" width={213} height={124} />
          <Image src={"/a2.svg"} alt="photo" width={213} height={124} />
        </div>
      </div>
      <div className="max-w-[912px] h-[350px] mt-[64px]  w-[100%] flex flex-col gap-[24px] ">
        <div className="flex flex-col gap-[8px] ">
          <h1 className="text-white font-bold  text-[32px] ">
            Men nimalar qila olaman
          </h1>
          <Image src={"/border.svg"} alt="border" width={112} height={8} />
        </div>
        <div className="w-[912px] h-[268px] flex flex-wrap gap-[20px]">
          <div className="w-[444px] h-[124px] rounded-[12px]   bg-[#1A1A1A] flex items-center justify-center">
            <div className="w-[404px] h-[84px]  flex gap-[10px]  items-start ">
              <Image src={"/b1.svg"} alt="photo" width={64} height={64} />
              <div className="w-[326px]  h-[84px]  flex flex-col gap-[7px]">
                <h1 className="text-white  font-semibold text-[20px] leading-[100%] ">
                  Seo
                </h1>
                <p className="font-medium text-[16px] text-gray-300 ">
                  Qidiruv tizimining natijalarida sayt <br /> reytingini
                  yaxshilash
                </p>
              </div>
            </div>
          </div>
          <div className="w-[444px] h-[124px] rounded-[12px]  bg-[#1A1A1A] flex items-center justify-center">
            <div className="w-[404px] h-[84px]  flex gap-[10px]  items-start ">
              <Image src={"/b3.svg"} alt="photo" width={64} height={64} />
              <div className="w-[326px]  h-[84px]  flex flex-col gap-[7px]">
                <h1 className="text-white  font-semibold text-[20px] leading-[100%] ">
                  Dizayn
                </h1>
                <p className="font-medium text-[16px] text-gray-300 ">
                  Kuchli dizayn va kichik detallargacha <br /> e`tibor berish
                </p>
              </div>
            </div>
          </div>
          <div className="w-[444px] h-[124px] rounded-[12px]  bg-[#1A1A1A] flex items-center justify-center">
            <div className="w-[404px] h-[84px]  flex gap-[10px]  items-start ">
              <Image src={"/b2.svg"} alt="photo" width={64} height={64} />
              <div className="w-[326px]  h-[84px]  flex flex-col gap-[7px]">
                <h1 className="text-white  font-semibold text-[20px] leading-[100%] ">
                  Sifat
                </h1>
                <p className="font-medium text-[16px] text-gray-300 ">
                  Yuqori darajada saytlarni sifatli ishlab <br /> chiqish
                </p>
              </div>
            </div>
          </div>
          <div className="w-[444px] h-[124px] rounded-[12px]  bg-[#1A1A1A] flex items-center justify-center">
            <div className="w-[404px] h-[84px]  flex gap-[10px]  items-start ">
              <Image src={"/b4.svg"} alt="photo" width={64} height={64} />
              <div className="w-[326px]  h-[84px]  flex flex-col gap-[7px]">
                <h1 className="text-white  font-semibold text-[20px] leading-[100%] ">
                  Tezkorlik
                </h1>
                <p className="font-medium text-[16px] text-gray-300 ">
                  Qisqa muddat ichida tezkor sayt ishlab <br /> chiqish
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[912px] h-[206px] flex flex-col mt-[64px] mb-[32px]  gap-[24px]">
        <div className="flex flex-col gap-[8px] ">
          <h1 className="text-white font-bold  text-[32px] ">Mijozlar</h1>
          <Image src={"/border.svg"} alt="border" width={112} height={8} />
        </div>
        <div className="w-[912px] h-[124px] flex gap-[20px] justify-between ">
          <div className="w-[213px] h-[124px]  bg-[#1A1A1A] rounded-[12px] flex items-center justify-center">
            <Image src={"/webking.svg"} alt="photo" width={114} height={66} />
          </div>
          <div className="w-[213px] h-[124px]  bg-[#1A1A1A] rounded-[12px] flex items-center justify-center">
            <Image src={"/market.svg"} alt="photo" width={114} height={66} />
          </div>
          <div className="w-[213px] h-[124px]  bg-[#1A1A1A] rounded-[12px] flex items-center justify-center"></div>
          <div className="w-[213px] h-[124px]  bg-[#1A1A1A] rounded-[12px] flex items-center justify-center"></div>
        </div>
      </div>
    </div>
  );
}
