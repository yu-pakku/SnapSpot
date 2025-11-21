// app/post/page.tsx
"use client";

import { useState } from "react";
import { FiMapPin, FiPlus, FiUpload } from "react-icons/fi";

export default function PostPage() {
  const [title, setTitle] = useState("");
  const [spotName, setSpotName] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // タグ追加
  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  // 画像アップロード
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="p-4 space-y-6 mx-6">

      {/* 戻るボタン & Google Map検索 */}
      <div className="flex justify-between items-center">
        <button className="text-2xl">&larr;</button>
        <button className="text-green-700 underline text-sm">
          Search on Google Maps
        </button>
      </div>

      {/* 画像アップロード */}
      <div className="border-dashed border-2 border-gray-500 rounded-lg h-44 flex flex-col justify-center items-center text-black bg-gray-100">
        <label className="cursor-pointer flex flex-col items-center">
          <FiUpload size={24} />
          <span>Choose an image</span>
          <input
            type="file"
            accept="image/*,video/mp4"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
        <p className="text-xs mt-1 text-gray-500">
          JPG under 20MB • MP4 under 200MB
        </p>
      </div>

      {/* タイトル */}
      <div>
        <label className="Body12Medium text-gray-800">
          TITLE <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="A beautiful moment..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-500 rounded-md p-2 mt-1 placeholder-gray-400 focus:outline-none focus:border-2 focus:border-(--castle-green-300)"
        />
      </div>

      {/* スポット名 */}
      <div>
        <label className="Body12Medium text-gray-800">
          SPOT NAME <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Cafe, Park..."
          value={spotName}
          onChange={(e) => setSpotName(e.target.value)}
          className="w-full border border-gray-500 rounded-md p-2 mt-1 placeholder-gray-400 focus:outline-none focus:border-2 focus:border-(--castle-green-300)"
        />
      </div>

      {/* LOCATION */}
      <div>
        <label className="Body12Medium text-gray-800 flex items-center gap-1">
          <FiMapPin />
          LOCATION
        </label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            placeholder="123 Main St, City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 border border-gray-500 rounded-md p-2 placeholder-gray-400 focus:outline-none focus:border-2 focus:border-(--castle-green-300)"
          />
          <button className="bg-(--castle-green-200) rounded-lg w-11 h-11 flex items-center justify-center text-white">
            <FiMapPin />
          </button>
        </div>
      </div>

      {/* タグ入力 */}
      <div>
        <label className="Body12Medium text-gray-800">
          # TAGS <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            placeholder="Search for a tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-1 border border-gray-500 rounded-md p-2 placeholder-gray-400 focus:outline-none focus:border-2 focus:border-(--castle-green-300)"
          />
          <button
            onClick={handleAddTag}
            className="bg-(--castle-green-200) rounded-lg w-11 h-11 flex items-center justify-center text-white"
          >
            <FiPlus />
          </button>
        </div>

        {/* タグ一覧 */}
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* 投稿ボタン */}
      <div>
        <button className="w-full bg-(--castle-green-200) text-white py-3 rounded-lg mt-4 Body16Bold flex items-center justify-center gap-2">
          Post a spot
          <span className="text-xl">&gt;</span>
        </button>
      </div>

    </div>
  );
}
