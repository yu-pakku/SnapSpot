"use client";

import { useState } from "react";
import { FiMapPin, FiPlus, FiUpload, FiX, FiRepeat, FiChevronLeft } from "react-icons/fi";
import { TbSend2 } from "react-icons/tb";
import { useRouter } from "next/navigation";

export default function PostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [spotName, setSpotName] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [showTagModal, setShowTagModal] = useState(false);

  const allTags = ["oosu", "sakae", "banana", "ringo"];

  const handleAddTagInput = () => {
    if (newTag.trim() !== "") {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const addTagFromModal = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
      setShowTagModal(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="p-4 space-y-6 mx-6">

      {/* 戻るボタン & Google Map検索 */}
      <div className="flex justify-between items-center">
        <button className="text-2xl" onClick={() => router.push("/")}>
          <FiChevronLeft />
        </button>

        <button className="text-green-700 underline text-sm flex items-center gap-1">
          <FiRepeat size={14} />
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
            <FiMapPin size={20} />
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
            className="flex-1 border border-gray-500 rounded-md p-2 placeholder-gray-400 focus:outline-none focus:border-2 focus:border-(--castle-green-300)"
            disabled
          />
          <button
            onClick={() => setShowTagModal(true)}
            className="bg-(--castle-green-200) rounded-lg w-11 h-11 flex items-center justify-center text-white"
          >
            <FiPlus size={26} />
          </button>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="flex items-center bg-red-300 text-white px-3 py-1 rounded-full text-sm gap-1">
              {tag}
              <FiX onClick={() => removeTag(tag)} className="cursor-pointer" />
            </span>
          ))}
        </div>
      </div>


      {/* モーダル */}
      <div
        className={`fixed z-50 bottom-0 left-0 right-0 transition-transform duration-300 ${
          showTagModal ? "translate-y-0" : "translate-y-full"
        } bg-gray-100 border-t border-gray-200 rounded-t-2xl p-4 shadow-xl`}
      >
        <div className="w-10 h-1 bg-gray-400 mx-auto mb-4 rounded-full"></div>
        <label className="Body12Medium text-gray-800"># TAGS</label>
        <input
          type="text"
          placeholder="Search for a tag"
          className="w-full border border-gray-500 rounded-md p-2  placeholder-gray-400 focus:outline-none focus:border-2 focus:border-(--castle-green-300)"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />

        <div className="space-y-2">
          {allTags
            .filter((t) => t.includes(newTag))
            .map((tag) => (
              <div
                key={tag}
                onClick={() => addTagFromModal(tag)}
                className="border border-gray-300 rounded-md p-2 flex justify-between items-center cursor-pointer hover:bg-gray-100"
              >
                <span>{tag}</span>
                <span className="text-castle-green500">&gt;</span>
              </div>
            ))}
        </div>

        <button
          onClick={() => setShowTagModal(false)}
          className="w-full bg-(--castle-green-200) text-white py-3 rounded-full mt-4 Body16Bold"
        >
          Save a tags
        </button>
      </div>

      {/* 投稿ボタン */}
      <div className="mb-[47px]">
        <button className="w-full bg-(--castle-green-200) text-white py-3 rounded-lg mt-4 Body16Bold flex items-center justify-center gap-2">
          Post a spot
          <TbSend2 size={20} />
        </button>
      </div>
    </div>
  );
}
