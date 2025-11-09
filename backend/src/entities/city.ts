export type CityProps = {
    id?: number,
    name: string,
    population: number,
    latitude: number,
    longitude: number
};

export class City {
    private constructor(private props: CityProps) {};

    public static create(name: string, population: number, latitude: number, longitude: number): City {
        if (!name) throw new Error('City Name is required!');
        if (population < 0) throw new Error('Population must be non-negative!');
        return new City({ name, population, latitude, longitude });
    };

    public static restore(props: CityProps): City {
        return new City(props);
    };

    get id(): number | undefined { return this.props.id; }
    get name(): string { return this.props.name; }
    get population(): number { return this.props.population; }
    get latitude(): number { return this.props.latitude; }
    get longitude(): number { return this.props.longitude; }

    toJSON(): CityProps {
        return { ...this.props };
    };
};
