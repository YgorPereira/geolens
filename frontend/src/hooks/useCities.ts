import { useEffect, useState } from "react"
import type { City } from "../features/Cities/cities.types"
import { createCity, listCities, updateCity, deleteCity } from "../features/Cities/cities.api"
import { append, removeById, updateById } from "../utils/arrayHelper"
import { getCurrentTemperature } from "../utils/openMeteo"
import { toast } from "sonner"

export const useCities = () => {
    const [cities, setCities] = useState<City[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchCities = async () => {
        setError(null);
        try {
            setLoading(true);

            const data = await listCities();

            const normalized = await Promise.all(
                data.map(async (c) => {
                    const temp = await getCurrentTemperature(c.latitude, c.longitude);

                    return {
                        ...c,
                        country_name: c.country?.name || "",
                        weather: temp !== null ? `${temp}°` : "N/A"
                    };
                })
            );
            setCities(normalized);
        } catch (error: any) {
            setError(error.message || "Error fetching cities.");
        } finally {
            setLoading(false);
            console.info("Success fetching cities.");
        }
    };

    const addCity = async (city: City) => {
        setError(null);
        try {
            const newOne = await createCity(city);
            const temp = await getCurrentTemperature(newOne.latitude, newOne.longitude);
            const normalized = {
                ...newOne,
                country_name: newOne.country?.name || "",
                weather: temp !== null ? `${temp}°` : "N/A"
            }
            setCities(prev => append(prev, normalized));
            toast.success("Cidade criada com sucesso.", { duration: 1500 })
            return normalized;
        } catch (error: any) {
            setError(error.message || "Error create new city")
        }
    };

    const editCity = async (city: City) => {
        setError(null);
        try {
            const updated = await updateCity(city);
            const normalized = {
                ...updated,
                country_name: updated.country?.name || "",
            }
            setCities(prev => updateById(prev, normalized));
            toast.success("Cidade editada com sucesso.", { duration: 1500 })
            return normalized;
        } catch (error: any) {
            setError(error.message || "Error update a city")
        }
    };

    const removeCity = async (id: number) => {
        setError(null);
        try {
            const updated = await deleteCity(id);
            setCities(prev => removeById(prev, id))
            toast.success("Cidade removida com sucesso.", { duration: 1500 })
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
        fetchCities: fetchCities,
        addCity: addCity,
        editCity: editCity,
        removeCity: removeCity,
    };
} 