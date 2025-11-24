import axios from "axios";
import { Spot } from "@/types/spot/types";

export type SpotStoreRequest = Omit<Spot, "tags"> & {
  tagIds: number[]
}

export interface SpotStoreResponse {
  id: number;
  message: string;
}

export async function SpotStore(req: FormData): Promise<SpotStoreResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/spots`;
  return axios
    .post<SpotStoreResponse>(apiUrl, req)
    .then((res) => { return res.data })
    .catch((err) => { throw err });
}