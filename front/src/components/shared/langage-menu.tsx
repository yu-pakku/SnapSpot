import Image from "next/image"
import { motion } from "framer-motion";

interface LangageMenuProps {
  onSwitch: (value: boolean) => void;
  onLangChange: (value: string) => void;
  onActive: (value: number) => void;
  isVisible: boolean;
  isActive: number;
};

const langages = [
  "English",
  "日本語",
  "한국어",
  "中文",
];

export function LangageMenu({
  onSwitch,
  onLangChange,
  onActive,
  isVisible,
  isActive,
}: LangageMenuProps) {
  return (
    <div className="relative flex flex-col gap-1">
      <button
        onClick={() => onSwitch(!isVisible)}
        className="flex gap-1 items-center cursor-pointer"
      >
        <Image
          src="/icons/langage/black.svg"
          alt="lang-icon"
          width={16}
          height={16}
        />
        <p>Langage</p>
        <motion.div
          animate={{ rotate: isVisible ? -90 : 0 }}
          transition={{ duration: 0.1 }}
          style={{ display: "inline-block" }}
        >
          <Image
            src="/icons/bottom-arrow/black.svg"
            alt="bottom-arrow-icon"
            width={16}
            height={16}
          />
        </motion.div>
      </button>
      {isVisible && (
        <motion.ul
          className="absolute flex flex-col gap-2 items-center top-8 w-24 bg-gray100 py-2 px-1 rounded-lg shadow-[0_2px_5px_-2px_rgba(0,0,0,0.25)]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {langages.map((lang, i) => {
            const isActiveIndex = isActive === i;

            return (
              <li 
                key={i}
                onClick={() => {
                  onActive(i)
                  onLangChange(lang)
                }}
                className={`
                  ${isActiveIndex && "bg-gray200"}
                  w-full text-center py-1 rounded-sm Body14Medium text-black cursor-pointer
                `}
              >
                {lang}
              </li>
            );
          })}
        </motion.ul>
      )}
    </div>
  );
};