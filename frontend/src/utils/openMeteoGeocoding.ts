import axios from "axios";

const openMeteo = axios.create({
    baseURL: "https://geocoding-api.open-meteo.com/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

function normalize(text: string) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export async function getCityCoordinates(city: string) {
    try {
        if (!city.trim()) return null;

        const normalized = normalize(city);

        const url = `/search?name=${encodeURIComponent(normalized)}&count=1`;

        const response = await openMeteo.get(url);

        const results = response.data?.results;

        if (!results || results.length === 0) {
            return null;
        }

        const item = results[0];

        return {
            population: item.population,
            latitude: item.latitude,
            longitude: item.longitude,
        };

    } catch (err: any) {
        console.error("Erro ao buscar coordenadas:", err.message);
        return null;
    }
}
