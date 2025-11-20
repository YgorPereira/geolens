import api from "../../api/client";
import { CITIES } from "../../api/endpoints";
import type { City } from "./cities.types";

export const createCity = async (city: City): Promise<City> => {
    const { data } = await api.post(CITIES, city);
    return data;
};

export const listCities = async (): Promise<City[]> => {
    const { data } = await api.get(CITIES);
    console.log(data)
    return data;
};

export const getCityById = async (id: number): Promise<City> => {
    const { data } = await api.get(`${CITIES}/${id}`);
    return data;
};

export const updateCity = async (city: City): Promise<City> => {
    const { data } = await api.put(`${CITIES}/${city.id}`, city);
    return data;
};

export const deleteCity = async (id: number): Promise<City> => {
    const { data } = await api.delete(`${CITIES}/${id}`);
    return data;
};
