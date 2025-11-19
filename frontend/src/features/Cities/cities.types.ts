export interface City {
    id?: number,
    name: string,
    population: number,
    latitude: number,
    longitude: number,
    country_id?: number,
    country_name?: string
    weather?: string,
}

export const cities = [
    {
        id: 1,
        name: "São Paulo",
        population: 12330000,
        latitude: -23.5505,
        longitude: -46.6333,
        country_id: 1,
        country_name: "Brasil",
        weather: "Ensolarado"
    },
    {
        id: 2,
        name: "Rio de Janeiro",
        population: 6748000,
        latitude: -22.9068,
        longitude: -43.1729,
        country_id: 1,
        country_name: "Brasil",
        weather: "Parcialmente nublado"
    },
    {
        id: 3,
        name: "Buenos Aires",
        population: 2890000,
        latitude: -34.6037,
        longitude: -58.3816,
        country_id: 2,
        country_name: "Argentina",
        weather: "Nublado"
    },
    {
        id: 4,
        name: "Córdoba",
        population: 1391000,
        latitude: -31.4201,
        longitude: -64.1888,
        country_id: 2,
        country_name: "Argentina",
        weather: "Ensolarado"
    },
    {
        id: 5,
        name: "Santiago",
        population: 5614000,
        latitude: -33.4489,
        longitude: -70.6693,
        country_id: 3,
        country_name: "Chile",
        weather: "Frio"
    },
    {
        id: 6,
        name: "Valparaíso",
        population: 295000,
        latitude: -33.0472,
        longitude: -71.6127,
        country_id: 3,
        country_name: "Chile",
        weather: "Chuvoso"
    },
    {
        id: 7,
        name: "Lima",
        population: 9675000,
        latitude: -12.0464,
        longitude: -77.0428,
        country_id: 4,
        country_name: "Peru",
        weather: "Neblina"
    },
    {
        id: 8,
        name: "Cusco",
        population: 428450,
        latitude: -13.5319,
        longitude: -71.9675,
        country_id: 4,
        country_name: "Peru",
        weather: "Frio"
    },
    {
        id: 9,
        name: "Bogotá",
        population: 7600000,
        latitude: 4.711,
        longitude: -74.0721,
        country_id: 5,
        country_name: "Colômbia",
        weather: "Chuvoso"
    },
    {
        id: 10,
        name: "Medellín",
        population: 2569000,
        latitude: 6.2442,
        longitude: -75.5812,
        country_id: 5,
        country_name: "Colômbia",
        weather: "Ensolarado"
    },
    {
        id: 11,
        name: "Cidade do México",
        population: 9200000,
        latitude: 19.4326,
        longitude: -99.1332,
        country_id: 6,
        country_name: "México",
        weather: "Ensolarado"
    },
    {
        id: 12,
        name: "Guadalajara",
        population: 1495000,
        latitude: 20.6597,
        longitude: -103.3496,
        country_id: 6,
        country_name: "México",
        weather: "Quente"
    },
    {
        id: 13,
        name: "Toronto",
        population: 2732000,
        latitude: 43.65107,
        longitude: -79.347015,
        country_id: 7,
        country_name: "Canadá",
        weather: "Nevando"
    },
    {
        id: 14,
        name: "Vancouver",
        population: 675218,
        latitude: 49.2827,
        longitude: -123.1207,
        country_id: 7,
        country_name: "Canadá",
        weather: "Chuvoso"
    },
    {
        id: 15,
        name: "Nova York",
        population: 8419000,
        latitude: 40.7128,
        longitude: -74.006,
        country_id: 8,
        country_name: "Estados Unidos",
        weather: "Nublado"
    },
    {
        id: 16,
        name: "Los Angeles",
        population: 3980000,
        latitude: 34.0522,
        longitude: -118.2437,
        country_id: 8,
        country_name: "Estados Unidos",
        weather: "Quente"
    },
    {
        id: 17,
        name: "Paris",
        population: 2148000,
        latitude: 48.8566,
        longitude: 2.3522,
        country_id: 9,
        country_name: "França",
        weather: "Nublado"
    },
    {
        id: 18,
        name: "Marselha",
        population: 861635,
        latitude: 43.2965,
        longitude: 5.3698,
        country_id: 9,
        country_name: "França",
        weather: "Ensolarado"
    },
    {
        id: 19,
        name: "Tóquio",
        population: 13960000,
        latitude: 35.6762,
        longitude: 139.6503,
        country_id: 10,
        country_name: "Japão",
        weather: "Nublado"
    },
    {
        id: 20,
        name: "Osaka",
        population: 2715000,
        latitude: 34.6937,
        longitude: 135.5023,
        country_id: 10,
        country_name: "Japão",
        weather: "Chuvoso"
    }
];
