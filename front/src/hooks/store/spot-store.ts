import { create } from "zustand";
import { Spot } from "@/types/spot/types";

interface SpotStore {
  lastPostedSpot: Spot | null;
  setLastPostedSpot: (spot: Spot) => void;
}

export const useSpotStore = create<SpotStore>((set) => ({
  lastPostedSpot: null,
  setLastPostedSpot: (spot) => set({ lastPostedSpot: spot })
}));