import { Spot } from "@/types/spot/types";

type SpotCardProps = Pick<Spot, "imageSrc" | "title" | "name">;

export function SpotCard({
  imageSrc,
  title,
  name
}: SpotCardProps) {
  return (
    <div>
      <div style={{ background: imageSrc }}>
        <h2>{title}</h2>
      </div>
      <h3>{name}</h3>
    </div>
  );
}