import Image from "next/image"
import Link from "next/link";
import { Spot } from "@/types/spot/types"
import { FiMapPin } from "react-icons/fi";
import { FaRoute } from "react-icons/fa";
import { Tag } from "@/components/features/tag"
import { Button } from "@/components/shared";

type SpotSheetContentProps = Pick<Spot, "imageSrc" | "title" | "name" | "location" | "tags">;

export function SpotSheetContent({
  imageSrc,
  title,
  name,
  location,
  tags
}: SpotSheetContentProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <Image
          src={imageSrc}
          alt={`${imageSrc}-image`}
          width={345}
          height={188}
          className="w-full h-47 rounded-lg object-cover"
        />
        <div className="absolute bottom-1 w-full p-2">
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] blur-lg rounded-lg" />
          <h2 className="relative z-10 text-white Heading20 text-right">
            {title}
          </h2>
        </div>
      </div>
      <h3 className="text-black Heading24">
        {name}
      </h3>
      <div className="flex flex-col gap-6 w-full py-6 border-t-[0.5px] border-gray400 text-black">
        <p className="flex items-center gap-2">
          <FiMapPin size={20} />
          <span className="truncate block w-full">{location}</span>
        </p>
        <div className="flex gap-3 mb-14">
          <h3 className="Body16Bold">
            Tags: 
          </h3>
          <ul className="flex gap-2">
            {tags.map((tag) => (
              <li key={tag.id}>
                <Tag name={tag.name} />
              </li>
            ))}
          </ul>
        </div>
        <Link href="/map">
          <Button
            size="w-full"
            text="Show route"
            icon={<FaRoute size={16} color="white" />}
          />
        </Link>
      </div>
    </div>
  )
}