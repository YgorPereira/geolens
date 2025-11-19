import api from "../../api/client";
import { CONTINENTS } from "../../api/endpoints";
import type { Continent } from "./continents.types";

export const createContinent = async (continent: Continent): Promise<Continent> => {
    const { data } = await api.post(CONTINENTS, continent);
    return data;
};

export const listContinents = async (): Promise<Continent[]> => {
    const { data } = await api.get(CONTINENTS);
    return data;
};

export const getContinentById = async (id: number): Promise<Continent> => {
    const { data } = await api.get(`${CONTINENTS}/${id}`);
    return data;
};

export const updateContinent = async (continent: Continent): Promise<Continent> => {
    const { data } = await api.put(`${CONTINENTS}/${continent.id}`, continent);
    return data;
};

export const deleteContinent = async (id: number): Promise<Continent> => {
    const { data } = await api.delete(`${CONTINENTS}/${id}`);
    return data;
};
