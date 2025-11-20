import { useEffect, useState } from "react"
import type { City } from "../features/Cities/cities.types"
import { createCity, listCities, updateCity, deleteCity } from "../features/Cities/cities.api"
import { append, removeById, updateById } from "../utils/arrayHelper"

export const useCities = () => {
    const [cities, setCities] = useState<City[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchCities = async () => {
        setError(null);
        try {
            setLoading(true);
            const data = await listCities();
            console.log(data)
            const normalized = data.map(c => ({
                ...c,
                country_name: c.country?.name || "",
            }));
            setCities(normalized);
        } catch (error: any) {
            setError(error.message || "Error fetching cities.")
        } finally {
            setLoading(false);
            console.info("Success fetching cities.")
        }
    };

    const addCity = async (city: City) => {
        setError(null);
        try {
            const newOne = await createCity(city);
            setCities(prev => append(prev, newOne));
            return newOne;
        } catch (error: any) {
            setError(error.message || "Error create new city")
        }
    };

    const editCity = async (city: City) => {
        setError(null);
        try {
            const updated = await updateCity(city);
            setCities(prev => updateById(prev, updated));
            return updated;
        } catch (error: any) {
            setError(error.message || "Error update a city")
        }
    };

    const removeCity = async (id: number) => {
        setError(null);
        try {
            const updated = await deleteCity(id);
            setCities(prev => removeById(prev, id))
            return updated;
        } catch (error: any) {
            setError(error.message || "Error delete a city")
        }
    };

    useEffect(() => {
        fetchCities();
    }, []);


    return {
        cities: cities,
        loading,
        error,
        fetchCountries: fetchCities,
        addContinent: addCity,
        editContinent: editCity,
        removeCountry: removeCity,
    };
} 