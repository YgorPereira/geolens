import type { Country } from "./country.js";

export type CityDTO = {
    id?: number,
    name: string,
    population: number,
    latitude: number,
    longitude: number,
    country_id: number,
    country: Country
};

export class City {
    private constructor(private props: CityDTO) {};

    public static create(name: string, population: number, latitude: number, longitude: number, country_id: number, country: Country): City {
        if (!name) throw new Error('City Name is required!');
        if (population < 0) throw new Error('Population must be non-negative!');
        return new City({ name, population, latitude, longitude, country_id, country});
    };

    public static restore(props: CityDTO): City {
        return new City(props);
    };

    get id(): number | undefined { return this.props.id; }
    get name(): string { return this.props.name; }
    get population(): number { return this.props.population; }
    get latitude(): number { return this.props.latitude; }
    get longitude(): number { return this.props.longitude; }
    get country_id(): number { return this.props.country_id; }
    get country(): Country { return this.props.country; }

    toJSON(): CityDTO {
        return { ...this.props };
    };
};
