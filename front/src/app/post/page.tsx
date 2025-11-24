"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  FiMapPin,
  FiPlus,
  FiUpload,
  FiX,
  FiRepeat,
  FiChevronLeft,
} from "react-icons/fi";
import { TbSend2 } from "react-icons/tb";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useSpotStore } from "@/hooks/store/spot-store";
import { useMutation } from "@tanstack/react-query";
import { SpotStore } from "@/lib/api/spot-store";

const BottomSheet = dynamic(
  () =>
    import("@/components/shared/bottom-sheet").then(
      (mod) => mod.default
    ),
  { ssr: false }
);

export default function PostPage() {
  const router = useRouter();

  const setLastPostedSpot = useSpotStore((state) => state.setLastPostedSpot);
  const [title, setTitle] = useState("");
  const [spotName, setSpotName] = useState("");
  const [address, setaddress] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [coord, setCoord] = useState<{ lat: number; lng: number } | null>(null);
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [showTagModal, setShowTagModal] = useState(false);

  const mutation = useMutation({
    mutationFn: SpotStore,
    onSuccess: (spot) => {
      useSpotStore.getState().setLastPostedSpot(spot);
      router.push("/post/map?status=posted");
    }
  });

  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFile(reader.result as string);
      };
      reader.readAsDataURL(file)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
      );

      const data = await res.json();
      if (data.features?.length > 0) {
        const [lng, lat] = data.features[0].center;
        
        setCoord({ lat, lng });
        localStorage.setItem(
          "selectedaddress",
          JSON.stringify({ lat, lng })
        );
        

      } else {
        setCoord(null);
      }
    } catch (error) {
      console.error("スポットの投稿に失敗しました: ", error);
    }
  }

  return (
    <div className="p-4 space-y-6 mx-6 relative pb-[47px]">


      {/* Header */}
      <div className="flex justify-between items-center">
        <button className="text-2xl" onClick={() => router.push("/")}>
          <FiChevronLeft size={32} />
        </button>

        <Link 
          href="/post/map"
          className="text-castle-green300 underline text-sm flex items-center gap-1"
        >
          <FiRepeat size={14} />
          Search on Google Maps
        </Link>
      </div>

      {/* Image Upload */}
      {!previewFile && (
        <div className="border-dashed border-2 border-gray-500 rounded-lg h-44 flex flex-col justify-center items-center text-black bg-gray-100 mb-8">
          <label className="cursor-pointer flex flex-col items-center">
            <FiUpload size={24} />
            <span>Choose an image</span>
            <input
              type="file"
              accept="image/*,video/mp4"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <p className="text-xs mt-1 text-gray-500">
            JPG under 20MB • MP4 under 200MB
          </p>
        </div>
      )}

      {previewFile && (
        <Image 
          src={previewFile}
          alt="Preview"
          width={312}
          height={176}
          className="rounded-lg"
        />
      )}

      {/* TITLE */}
      <div className="mb-4">
        <label className="Body12Medium text-gray-800">
          TITLE <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="A beautiful moment..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-500 rounded-md p-2 mt-1 placeholder-gray-400 focus:border-castle-green300 focus:outline-none"
        />
      </div>

      {/* SPOT NAME */}
      <div className="mb-4">
        <label className="Body12Medium text-gray-800">
          SPOT NAME <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Cafe, Park..."
          value={spotName}
          onChange={(e) => setSpotName(e.target.value)}
          className="w-full border border-gray-500 rounded-md p-2 mt-1 focus:border-castle-green300 focus:outline-none"
        />
      </div>

      {/* address */}
      <div className="mb-4">
        <label className="Body12Medium text-gray-800 flex items-center gap-1">
          <FiMapPin /> address
        </label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            placeholder="123 Main St, City"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            className="flex-1 border border-gray-500 rounded-md p-2 focus:border-castle-green300 outline-none"
          />
          <button className="bg-castle-green200 rounded-lg w-11 h-11 flex items-center justify-center text-white">
            <FiMapPin size={20} />
          </button>
        </div>
      </div>

      {/* TAGS */}
      <div className="mb-4">
        <label className="Body12Medium text-gray-800">
          # TAGS <span className="text-red-500">*</span>
        </label>

        <div className="flex gap-2">
          <div className="flex items-center flex-wrap gap-2 border border-gray-500 rounded-md p-2 flex-1 min-h-12">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center bg-red-500 text-white px-3 py-1 rounded-full text-sm"
              >
                {tag}
                <button onClick={() => removeTag(tag)} className="ml-2">
                  <FiX />
                </button>
              </span>
            ))}

            <input
              type="text"
              placeholder={tags.length === 0 ? "Search for a tag" : ""}
              value=""
              disabled
              readOnly
              className="flex-1 min-w-[120px] outline-none"
            />

          </div>

          <button
            onClick={() => setShowTagModal(true)}
            className="bg-castle-green200 w-11 h-11 rounded-lg flex items-center justify-center text-white"
          >
            <FiPlus size={20} />
          </button>
        </div>
      </div>

      {/* POST BUTTON */}
      <div className="mt-10">
        <button 
          className="w-full bg-castle-green200 text-white py-3 rounded-lg Body16Bold flex items-center justify-center gap-2"
          onClick={() => handleSubmit()}
        >
          Post a spot
          <TbSend2 size={20} />
        </button>
      </div>

      {/* BOTTOM SHEET モーダル */}<BottomSheet isOpen={showTagModal} onSwitch={setShowTagModal}>
        <div className="pb-4 h-[440px] overflow-y-auto px-6 ">

          <label className="Body12Medium text-gray-800 mt-4 block">
            # TAGS
          </label>

          {/* 選択済みタグ表示ボックス */}
          <div className="border border-gray-400 bg-white rounded-md mt-2 px-3 py-2 min-h-12 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center bg-red-500 text-white px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button onClick={() => removeTag(tag)} className="ml-2">
                    <FiX />
                  </button>
                </span>
              ))}
            </div>

            {tags.length > 0 && (
              <button className="text-black">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>

          {/* タグ入力フィールド（検索風） */}
          <div className="relative mt-3">
            <input
              type="text"
              placeholder="Search for a tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              className="w-full border-2 border-castle-green200 bg-white rounded-md pl-10 pr-4 py-2 focus:outline-none placeholder-gray-400"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-castle-green300">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
            </div>
          </div>

          {/* 保存ボタン */}
          <button
            onClick={() => setShowTagModal(false)}
            className="w-full bg-castle-green200 text-white py-3 rounded-lg Body16Bold mt-6"
          >
            Save a tags
          </button>
        </div>
      </BottomSheet>

    </div>
  );
}
