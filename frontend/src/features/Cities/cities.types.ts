export interface City {
    id?: number,
    name: string,
    population: number,
    latitude: number,
    longitude: number,
    country_id?: number,
    country_name?: string,
    country?: object,
    weather?: string,
}
