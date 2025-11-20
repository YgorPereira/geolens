export interface Country {
    id?: number,
    name: string,
    population: number,
    language: string,
    coin: string,
    continent_id?: number,
    continent_name?: string,
    continent?: object,
    city_quantity?: number
    cities?: []
}