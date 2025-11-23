"use client";

import { useRef, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { LangageMenu } from "@/components/shared";
import mapboxgl from "mapbox-gl";

export default function Map() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [langage, setLangage] = useState("English");
  const [isActiveLang, setIsActiveLang] = useState(0);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_API_URL}`;
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current as HTMLElement,
      });
    }

    return () => {
      mapRef.current?.remove()
    }
  }, [])

  return (
    <main>
      <div className="fixed flex top-0 left-0 bg-white w-screen h-14 items-center justify-between px-5 border-b-[0.5px] border-gray400 shadow-[0_2px_5px_-2px_rgba(0,0,0,0.25)] z-10">
        <IoIosArrowBack
          size={32}
          color="black"
        />
        <LangageMenu 
          onSwitch={setIsDropdownVisible}
          onLangChange={setLangage}
          onActive={setIsActiveLang}
          isVisible={isDropdownVisible}
          isActive={isActiveLang}
        />
      </div>
      <div 
        ref={mapContainerRef}
        className="w-screen h-screen"
      />
    </main>
  )
}