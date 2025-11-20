import Image from "next/image";
import MockData from "@/data/mock-data.json";
import { SpotCard } from "@/components/features/spot/";
import { Spot } from "@/types/spot/types";

export default function Top() {
  const spots = MockData as Spot[];

  return (
    <main>
      <div>
        {/* <Image 
          src="/assets/logo/logo.png"
          alt="Snap Spot"
          width={88}
          height={44}
        /> */}
        ここにロゴが入ります
      </div>
      <ul>
        {spots.map((spot) => (
          <li>
            <SpotCard {...spot}/>
          </li>
        ))}
      </ul>
      <button></button>
    </main>
  );
}