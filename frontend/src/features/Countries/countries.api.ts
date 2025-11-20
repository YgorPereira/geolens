import api from "../../api/client";
import { COUNTRIES } from "../../api/endpoints";
import type { Country } from "../Countries/countries.types";

export const createCountry = async (country: Country): Promise<Country> => {
    const { data } = await api.post(COUNTRIES, country);
    return data;
};

export const listCountries = async (): Promise<Country[]> => {
    const { data } = await api.get(COUNTRIES);
    return data;
};

export const getCountryById = async (id: number): Promise<Country> => {
    const { data } = await api.get(`${COUNTRIES}/${id}`);
    return data;
};

export const updateCountry = async (country: Country): Promise<Country> => {
    const { data } = await api.put(`${COUNTRIES}/${country.id}`, country);
    return data;
};

export const deleteCountry = async (id: number): Promise<Country> => {
    const { data } = await api.delete(`${COUNTRIES}/${id}`);
    return data;
};
