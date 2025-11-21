import { useEffect, useState } from "react"
import { toast } from "sonner"
import type { Continent } from "../features/Continents/continents.types"
import { createContinent, deleteContinent, listContinents, updateContinent } from "../features/Continents/continents.api"
import { append, removeById, updateById } from "../utils/arrayHelper"

export const useContinents = () => {
    const [continents, setContinents] = useState<Continent[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchContinents = async () => {
        setError(null);
        try {
            setLoading(true);
            const data = await listContinents();
            const normalized = data.map(c => ({
                ...c,
                count_paises: c.countries ? c.countries.length : 0,
            }));
            setContinents(normalized);
        } catch (error: any) {
            setError(error.message || "Error fetching continents.")
        } finally {
            setLoading(false);
            console.info("Success fetching continents...")
        }
    };

    const addContinent = async (continent: Continent) => {
        setError(null);
        try {
            const newOne = await createContinent(continent);
            setContinents(prev => append(prev, newOne));
            toast.success("Continente criado com sucesso.", { duration: 1500 })
            return newOne;
        } catch (error: any) {
            setError(error.message || "Error create new continent")
        }
    };

    const editContinent = async (continent: Continent) => {
        setError(null);
        try {
            const updated = await updateContinent(continent);
            setContinents(prev => updateById(prev, updated));
            toast.success("Continente editado com sucesso.", { duration: 1500 })
            return updated;
        } catch (error: any) {
            setError(error.message || "Error update a continent")
        }
    };

    const removeContinent = async (id: number) => {
        setError(null);
        try {
            const updated = await deleteContinent(id);
            setContinents(prev => removeById(prev, id))
            toast.success("Continente removido com sucesso.", { duration: 1500 })
            return updated;
        } catch (error: any) {
            setError(error.message || "Error delete a continent")
        }
    };

    useEffect(() => {
        fetchContinents();
    }, []);


    return {
        continents,
        loading,
        error,
        fetchContinents,
        addContinent,
        editContinent,
        removeContinent,
    };
} 