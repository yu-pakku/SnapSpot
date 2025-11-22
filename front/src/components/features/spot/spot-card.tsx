import { Spot } from "@/types/spot/types";
import { useState } from "react";
import Image from "next/image";

type SpotCardProps = Pick<Spot, "imageSrc" | "title" | "name">;

export function SpotCard({ imageSrc, title, name }: SpotCardProps) {
  const [imgHeight, setImgHeight] = useState<number>(180);

  return (
    <div className="flex flex-col gap-2 w-full relative" style={{ height: imgHeight }}>
      <Image
        src={imageSrc}
        alt={`${imageSrc}-image`}
        width={180}
        height={imgHeight}
        className="relative rounded-lg shadow-[0_2px_5px_-2px_rgba(0,0,0,0.25)] z-0"
        onLoad={e => {
          const img = e.currentTarget as HTMLImageElement;
          setImgHeight(img.naturalHeight);
        }}
      />
      <div>
        <div className="absolute bottom-8 w-full h-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] blur-lg rounded-lg" />
          <h2 className="relative z-10 text-white Body16Bold">
            {title}
          </h2>
        </div>
        <h3 className="pl-1.5 Body12Medium text-black">
          {name}
        </h3>
      </div>
    </div>
  );
}