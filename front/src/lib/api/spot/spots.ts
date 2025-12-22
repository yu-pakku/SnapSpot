import axios from "axios";
import { Spot } from "@/types/spot/types";

export interface SpotsRequest {
  type: "ja" | "en" | "zh" | "ko";
}

export interface SpotsResponse {
  data: Spot[];
}

export async function Spots(req: SpotsRequest): Promise<SpotsResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/spots`;
  return axios
    .get(apiUrl, { params: req })
    .then((res) => { return res.data })
    .catch((err) => { throw err })
}