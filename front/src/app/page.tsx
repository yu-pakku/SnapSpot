"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import Masonry from "react-masonry-css";
import MockData from "@/data/mock-data.json";
import { SpotCard, SpotSheetContent } from "@/components/features/spot/";
import { Spot } from "@/types/spot/types";
import { LangageMenu } from "@/components/shared";
import { FiPlus } from "react-icons/fi";

const BottomSheet = dynamic(() => import("@/components/shared/bottom-sheet").then(mod => mod.default), { ssr: false });

const mockTags = [
  {id: 1, name: "Next.js"},
  {id: 2, name: "Lravel"}
]

export default function Top() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [langage, setLangage] = useState("English");
  const [isActiveLang, setIsActiveLang] = useState(0);
  const spots = MockData as Spot[];

  return (
    <main>
      <div className="fixed flex top-0 left-0 bg-white w-screen h-14 items-center justify-between px-5 border-b-[0.5px] border-gray400 shadow-[0_2px_5px_-2px_rgba(0,0,0,0.25)] z-10">
        {/* <Image 
          src="/assets/logo/logo.png"
          alt="SnapSpot"
          width={88}
          height={44}
        /> */}
        ここにロゴが入ります
        <LangageMenu 
          onSwitch={setIsDropdownVisible}
          onLangChange={setLangage}
          onActive={setIsActiveLang}
          isVisible={isDropdownVisible}
          isActive={isActiveLang}
        />
      </div>
      <div className="w-full max-w-4xl mx-auto mt-22">
        <Masonry
          breakpointCols={2}
          className="flex gap-3 justify-center"
          columnClassName="masonry-column"
        >
          {spots.map((spot, i) => (
            <div 
              key={i} 
              className="mb-8 w-full"
              onClick={() => setIsBottomSheetOpen(true)}
            >
              {/* TODO: key属性に渡すのはspot.id */}
              <SpotCard
                {...spot}
              />
            </div>
          ))}
        </Masonry>
      </div>
      <Link href="/post">
        <button className="fixed bottom-10 right-10 bg-castle-green200 p-4 rounded-full shadow-[0_2px_5px_-2px_rgba(0,0,0,0.25)] cursor-pointer z-20">
          <FiPlus
            size={24}
            color="white"
          />
        </button>
      </Link>
      <BottomSheet 
        isOpen={isBottomSheetOpen}
        onSwitch={setIsBottomSheetOpen}
      >
        <SpotSheetContent
          imageSrc="/test-spot-image.jpg"
          title="Breaking News!!"
          name="Vantan 2F"
          location="2-14 Taiko 3-chome, Nakamura Ward, Nagoya City, Aichi Prefecture"
          tags={mockTags}
        />
      </BottomSheet>
    </main>
  );
}