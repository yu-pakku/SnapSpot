export interface Spot {
  id: number;
  imageFile: string;
  title: string;
  name: string;
  address: string;
  tags: Tag[];
}

export interface Tag {
  id: number;
  name: string;
}

export type SpotStoreParams = Omit<Spot, "id" | "address"> & {
  coord: { lat: number; lng: number } | null;
}