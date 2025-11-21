"use client";

import Image from "next/image";
import { useState } from "react";
import MockData from "@/data/mock-data.json";
import { SpotCard } from "@/components/features/spot/";
import { Spot } from "@/types/spot/types";
import { LangageMenu } from "@/components/shared";

export default function Top() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [langage, setLangage] = useState("English");
  const [isActiveLang, setIsActiveLang] = useState(0);
  const spots = MockData as Spot[];

  return (
    <main>
      <div>
        {/* <Image 
          src="/assets/logo/logo.png"
          alt="Snap Spot"
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
      <ul>
        {spots.map((spot, i) => (
          <li key={i}> {/* TODO: key属性に渡すのはspot.id */}
            <SpotCard {...spot}/>
          </li>
        ))}
      </ul>
      <button></button>
    </main>
  );