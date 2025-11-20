import axios from "axios";

const openMeteo = axios.create({
    baseURL: "https://api.open-meteo.com/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

export async function getCurrentTemperature(lat: number, lon: number): Promise<number | null> {
    try {
        const response = await openMeteo.get("/forecast", {
            params: {
                latitude: lat,
                longitude: lon,
                current_weather: true,
            },
        });

        return response.data?.current_weather?.temperature ?? null;
    } catch (error: any) {
        console.error("Erro ao buscar temperatura:", error.message);
        return null;
    }
}
