import axios from "axios"

const restCountries = axios.create({
    baseURL: "https://restcountries.com/v3.1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

function normalize(text: string) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export async function getCountryInfo(name: string) {
    try {
        const query = `?fields=name,population,languages,currencies,translations`;

        let res = await restCountries.get(`/name/${name}${query}`).catch(() => null);
        console.log(res)
        if (res?.data?.length) return formatCountryResponse(res.data[0]);

        const normalized = normalize(name);
        res = await restCountries.get(`/name/${normalized}${query}`).catch(() => null);
        console.log(res)

        if (res?.data?.length) return formatCountryResponse(res.data[0]);

        res = await restCountries.get(`/translation/${name}${query}`).catch(() => null);
        console.log(res)

        if (res?.data?.length) return formatCountryResponse(res.data[0]);

        return null;
    } catch (error: any) {
        console.error("Erro ao buscar país:", error.message);
        return null;
    }
}

function formatCountryResponse(data: any) {
    const currency = Object.values(data.currencies || {})[0] as
        { name?: string; symbol?: string } | undefined;

    return {
        name: data.name.common,
        population: data.population,
        language: Object.values(data.languages || {})[0] || "",
        coin: currency
            ? `${currency.name}${currency.symbol ? ` (${currency.symbol})` : ""}`
            : "",
    };
}