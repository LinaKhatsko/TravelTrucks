import axios from "axios";
import { Camper, CampersQuery } from "@/types/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCampers = async (
  params?: CampersQuery
): Promise<Camper[]> => {
 try {
    const { data } = await api.get<Camper[]>("/campers", { 
      params 
    });
    return data;
  } catch (error) {
    console.error("Error fetching campers:", error);
    throw error;
  }
};

export const getCamperById = async (id: string): Promise<Camper> => {
 try {
    const { data } = await api.get<Camper>(`/campers/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching camper with id ${id}:`, error);
    throw error;
  }
};