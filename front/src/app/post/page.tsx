"use client";

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

export default function PostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [spotName, setSpotName] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [showTagModal, setShowTagModal] = useState(false);

  const allTags = ["oosu", "sakae", "banana", "ringo"];

  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const addTagFromModal = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
      setShowTagModal(false);
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="p-4 space-y-6 mx-6 relative">
      {/* 戻るボタン & Google Map検索 */}
      <div className="flex justify-between items-center">
        <button className="text-2xl" onClick={() => router.push("/")}>
          <FiChevronLeft />
        </button>

        <button className="text-castle-green300 underline text-sm flex items-center gap-1">
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

      {/* TITLE */}
      <div>
        <label className="Body12Medium text-gray-800">
          TITLE <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="A beautiful moment..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-500 rounded-md p-2 mt-1 placeholder-gray-400 focus:outline-none focus:border-2 focus:border-castle-green300"
        />
      </div>

      {/* SPOT NAME */}
      <div>
        <label className="Body12Medium text-gray-800">
          SPOT NAME <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Cafe, Park..."
          value={spotName}
          onChange={(e) => setSpotName(e.target.value)}
          className="w-full border border-gray-500 rounded-md p-2 mt-1 placeholder-gray-400 focus:outline-none focus:border-2 focus:border-castle-green300"
        />
      </div>

      {/* LOCATION */}
      <div>
        <label className="Body12Medium text-gray-800 flex items-center gap-1">
          <FiMapPin /> LOCATION
        </label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            placeholder="123 Main St, City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 border border-gray-500 rounded-md p-2 placeholder-gray-400 focus:outline-none focus:border-2 focus:border-castle-green300"
          />
          <button className="bg-castle-green200 rounded-lg w-11 h-11 flex items-center justify-center text-white">
            <FiMapPin size={20} />
          </button>
        </div>
      </div>

      {/* TAGS */}
      <div>
        <label className="Body12Medium text-gray-800">
          # TAGS <span className="text-red-500">*</span>
        </label>

        <div className="flex gap-2 mt-1">
          <div className="flex items-center flex-wrap gap-2 border border-gray-500 rounded-md p-2 flex-1 min-h-[48px]">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center bg-red-500 text-white px-3 py-1 rounded-full text-sm gap-2"
              >
                {tag}
                <button onClick={() => removeTag(tag)}>
                  <FiX />
                </button>
              </span>
            ))}

            <input
              type="text"
              placeholder={tags.length === 0 ? "Search for a tag" : ""}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              className="flex-1 min-w-[120px] outline-none"
              disabled
            />
          </div>

          {/* ＋ボタン */}
          <button
            onClick={() => setShowTagModal(true)}
            className="bg-castle-green200 rounded-lg w-11 h-11 flex items-center justify-center text-white shrink-0"
          >
            <FiPlus size={20} />
          </button>
        </div>
      </div>

      {/* POST BUTTON */}
      <div className="mb-[47px]">
        <button className="w-full bg-castle-green200 text-white py-3 rounded-lg mt-4 Body16Bold flex items-center justify-center gap-2">
          Post a spot
          <TbSend2 size={20} />
        </button>
      </div>

      {/* MODAL */}
      <div
        className={`fixed z-50 bottom-0 left-0 right-0 transform transition-transform duration-300 ${showTagModal ? "translate-y-0" : "translate-y-full"
          } bg-white border-t border-gray-200 rounded-t-2xl p-4 shadow-xl`}
      >
        <div className="w-full bg-white border-t border-gray-200 rounded-t-2xl p-4 shadow-xl">
          <div className="w-10 h-1 bg-gray-400 mx-auto mb-4 rounded-full"></div>

          <label className="Body12Medium text-gray-800"># TAGS</label>

          {/* 選択済みタグ */}
          <div className="flex gap-2 flex-wrap mt-3 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center bg-red-500 text-white px-3 py-1 rounded-full text-sm gap-2"
              >
                {tag}
                <button onClick={() => removeTag(tag)}>
                  <FiX />
                </button>
              </span>
            ))}
          </div>

          {/* タグ入力 */}
          <input
            type="text"
            placeholder="Type and press Enter to add a tag"
            className="w-full border border-gray-500 rounded-md p-2 placeholder-gray-400 focus:outline-none focus:border-2 focus:border-green-600"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
          />

          {/* 保存ボタン */}
          <button
            onClick={() => setShowTagModal(false)}
            className="w-full bg-castle-green200 text-white py-3 rounded-full Body16Bold mt-4"
          >
            Save tags
          </button>
        </div>
      </div>

    </div>
  );
}

