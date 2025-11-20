import { useEffect, useState } from "react"
import type { Country } from "../features/Countries/countries.types"
import { createCountry, listCountries, updateCountry, deleteCountry } from "../features/Countries/countries.api"
import { append, removeById, updateById } from "../utils/arrayHelper"

export const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchCountries = async () => {
        setError(null);
        try {
            setLoading(true);
            const data = await listCountries();
            const normalized = data.map(c => ({
                ...c,
                city_quantity: c.cities ? c.cities.length : 0,
                continent_name: c.continent?.name || "",
            }));
            setCountries(normalized);
        } catch (error: any) {
            setError(error.message || "Error fetching countries.")
        } finally {
            setLoading(false);
            console.info("Success fetching countries.")
        }
    };

    const addCountry = async (country: Country) => {
        setError(null);
        try {
            const newOne = await createCountry(country);

            const normalized = {
                ...newOne,
                city_quantity: newOne.cities ? newOne.cities.length : 0,
                continent_name: newOne.continent?.name || "",
            };

            setCountries(prev => append(prev, normalized));
            return normalized;

        } catch (error: any) {
            setError(error.message || "Error create new country");
        }
    };

    const editCountry = async (country: Country) => {
        setError(null);
        try {
            const updated = await updateCountry(country);
            const normalized = {
                ...updated,
                city_quantity: updated.cities ? updated.cities.length : 0,
                continent_name: updated.continent?.name || "",
            };
            setCountries(prev => updateById(prev, normalized));
            return updated;
        } catch (error: any) {
            setError(error.message || "Error update a country")
        }
    };

    const removeCountry = async (id: number) => {
        setError(null);
        try {
            const updated = await deleteCountry(id);
            setCountries(prev => removeById(prev, id))
            return updated;
        } catch (error: any) {
            setError(error.message || "Error delete a country")
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);


    return {
        countries: countries,
        loading,
        error,
        fetchCountries,
        addCountry,
        editCountry,
        removeCountry,
    };
} 