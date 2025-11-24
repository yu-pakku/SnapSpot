import { create } from "zustand";
import { SpotStoreResponse } from "@/lib/api";

interface SpotStore {
  lastPostedSpot: SpotStoreResponse | null;
  setLastPostedSpot: (spot: SpotStoreResponse) => void;
}

export const useSpotStore = create<SpotStore>((set) => ({
  lastPostedSpot: null,
  setLastPostedSpot: (spot) => set({ lastPostedSpot: spot })
}));