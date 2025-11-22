import Image from "next/image"
import { Spot } from "@/types/spot/types"

export function SpotSheetContent({
  id,
  imageSrc,
  title,
  name,
  location,
  tags
}: Spot) {
  return (
    <div>
      <span />
      <div>
        <Image
          src={imageSrc}
          alt={`${imageSrc}-image`}
          width={345}
          height={184}
        />
        <div>
          <div /> // blur
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  )
}