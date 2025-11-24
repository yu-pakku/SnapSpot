"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import mapboxgl from "mapbox-gl"
import { FiChevronLeft } from "react-icons/fi";
import { SpotSheetContent } from "@/components/features/spot";

const BottomSheet = dynamic(() => import("@/components/shared/bottom-sheet").then(mod => mod.default), { ssr: false });

export default function Map() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const mapContainerRef = useRef(null);
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const isPosted = status === "posted";

  useEffect(() => {
    mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;

    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [136.881537, 35.170915],
        zoom: 13
      })
    }
  })

  return (
    <main>
      <div className="fixed flex top-0 left-0 bg-white w-screen h-14 items-center justify-between px-5 border-b-[0.5px] border-gray400 shadow-[0_2px_5px_-2px_rgba(0,0,0,0.25)] z-20">
        <Link href="/">
          <FiChevronLeft size={32} />
        </Link>
      </div>

      <div
        ref={mapContainerRef}
        className="fixed top-14 left-0 w-full z-10"
        style={{ height: "calc(100vh - 56px)" }}
      />

      {isPosted ? (
        <div>
          {/* <BottomSheet
            isOpen={isBottomSheetOpen}
            onSwitch={setIsBottomSheetOpen}
          >
            <SpotSheetContent 

            />
          </BottomSheet> */}
        </div>
      ) : (
        <div></div>
      )}
    </main>
  )
}