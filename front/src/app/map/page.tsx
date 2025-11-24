"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef, useEffect, useState } from "react";
import Loading from "../loading";
import { IoIosArrowBack } from "react-icons/io";
import { LangageMenu } from "@/components/shared";
import { SpotSheetContent } from "@/components/features/spot";
import { Spot } from "@/types/spot/types";
import { mockTags } from "../page";
import mapboxgl from "mapbox-gl";

const BottomSheet = dynamic(() => import("@/components/shared/bottom-sheet").then(mod => mod.default), { ssr: false });

export default function Map() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [langage, setLangage] = useState("English");
  const [isActiveLang, setIsActiveLang] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
    if (mapContainerRef.current) {
      const waypoints = [
        [136.899838, 35.185072], // 名古屋城
        [136.906379, 35.143891], // 熱田神宮
        [136.911565, 35.170915], // オアシス21
      ];

      const centerLng = (waypoints[0][0] + waypoints[1][0] + waypoints[2][0]) / 3;
      const centerLat = (waypoints[0][1] + waypoints[1][1] + waypoints[2][1]) / 3;
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current as HTMLElement,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [centerLng, centerLat],
        zoom: 10,
      });

      mapRef.current.on("idle", () => mapRef.current?.resize());

      mapRef.current.on("load", () => {
        setIsLoading(false);
        mapRef.current?.resize();

        // TODO: APIで取得
        const geojson: GeoJSON.FeatureCollection = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [136.899838, 35.185072] },
              properties: { title: "名古屋城" }
            },
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [136.906379, 35.143891] },
              properties: { title: "熱田神宮" }
            },
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [136.911565, 35.170915] },
              properties: { title: "オアシス21" }
            }
          ]
        };

        const markerImg = new window.Image(32, 32);
        markerImg.src = "/pin-icon.svg";
        markerImg.onload = async () => {
          if (mapRef.current && !mapRef.current.hasImage("custom-marker")) {
            mapRef.current.addImage("custom-marker", markerImg);
          }

          const coords = waypoints.map((w) => w.join(",")).join(";");
          const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${coords}?geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
          let route;
          try {
            const res = await fetch(url);
            const data = await res.json();
            route = data.routes[0].geometry;
          } catch (error) {
            console.error("ルートを描画できませんでした", error);
          }

          if (mapRef.current) {
            if (route) {
              mapRef.current.addSource("route", {
                type: "geojson",
                data: {
                  type: "Feature",
                  geometry: route,
                  properties: {},
                },
              });
              mapRef.current.addLayer({
                id: "route-line",
                type: "line",
                source: "route",
                layout: {
                  "line-join": "round",
                  "line-cap": "round",
                },
                paint: {
                  "line-width": 5,
                  "line-color": "#3b82f6",
                },
              });
            }

            mapRef.current.addSource("spots", {
              type: "geojson",
              data: geojson
            });

            if (!mapRef.current.getLayer("spot-labels")) {
              mapRef.current.addLayer({
                id: "spot-labels",
                type: "symbol",
                source: "spots",
                layout: {
                  "text-field": ["get", "title"],
                  "text-size": 14,
                  "text-offset": [0, 2],
                  "text-anchor": "top",
                  "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"]
                },
                paint: {
                  "text-color": "#000000",
                  "text-halo-color": "#ffffff",
                  "text-halo-width": 2
                }
              });
            }

            if (!mapRef.current.getLayer("spot-symbols")) {
              mapRef.current.addLayer({
                id: "spot-symbols",
                type: "symbol",
                source: "spots",
                layout: {
                  "icon-image": "custom-marker",
                  "icon-size": 1
                }
              }, "spot-labels");
            }

            const bounds = new mapboxgl.LngLatBounds();
            geojson.features.forEach((feature: GeoJSON.Feature) => {
              bounds.extend((feature.geometry as GeoJSON.Point).coordinates as [number, number]);
            });
            mapRef.current.fitBounds(bounds, { padding: 50 });
          }

          mapRef.current?.on("click", "spot-symbols", (e: mapboxgl.MapMouseEvent) => {
            if (!mapRef.current) return;
            const feature = e.features?.[0];
            if (feature && feature.properties) {
              setSelectedSpot({
                id: feature.id ?? feature.properties.id ?? "unknown",
                title: feature.properties.title,
                name: feature.properties.name,
                location: feature.properties.location,
                imageFile: feature.properties.imageFile,
                tags: feature.properties.tags ? (typeof feature.properties.tags === "string" ? JSON.parse(feature.properties.tags) : feature.properties.tags) : [],
              });
              setIsBottomSheetOpen(true);
            }
          });
        };
      });

      function handleResize() {
        mapRef.current?.resize();
      }
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        mapRef.current?.remove();
      };
    }
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
          <Loading />
        </div>
      )}

      <div className="fixed flex top-0 left-0 bg-white w-screen h-14 items-center justify-between px-5 border-b-[0.5px] border-gray400 shadow-[0_2px_5px_-2px_rgba(0,0,0,0.25)] z-20">
        <Link href="/">
          <IoIosArrowBack
            size={32}
            color="black"
          />
        </Link>
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
        className="fixed top-14 left-0 w-full z-10"
        style={{ height: "calc(100vh - 56px)" }}
      />

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onSwitch={setIsBottomSheetOpen}
      >
        <SpotSheetContent 
          imageFile={selectedSpot?.imageFile || "/test-spot-image.jpg"}
          title={selectedSpot?.title || "Breaking News!!"}
          name={selectedSpot?.name || "Vantan 2F"}
          location={selectedSpot?.location || "2-14 Taiko 3-chome, Nakamura Ward, Nagoya City, Aichi Prefecture"}
          tags={selectedSpot?.tags || mockTags}
          isButtonHidden={true}
        />
      </BottomSheet>
    </main>
  );
}