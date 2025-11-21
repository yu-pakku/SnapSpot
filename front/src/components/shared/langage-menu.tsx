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
    <>
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
        <ul>
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
                  ${isActiveIndex 
                    ? ""
                    : ""
                  }
                `}
              >
                {lang}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};