import { create } from "zustand";
import { Spot } from "@/types/spot/types";

export type LastPostedSpot = Spot & { message: string };

interface SpotStore {
  lastPostedSpot: LastPostedSpot | null;
  setLastPostedSpot: (spot: LastPostedSpot) => void;
}

export const useSpotStore = create<SpotStore>((set) => ({
  lastPostedSpot: null,
  setLastPostedSpot: (spot) => set({ lastPostedSpot: spot })
}));