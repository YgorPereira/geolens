import { Continent } from "./continent.js";

export type CountryDTO = {
    id?: number | undefined,
    name: string,
    population: number,
    language: string,
    coin: string,
    continent_id: number,
    continent?: Continent
};

export class Country {
    private constructor(private props: CountryDTO) { };

    public static create(name: string, population: number, language: string, coin: string, continent_id: number,): Country {
        if (!name) throw new Error('Country name is required');
        if (!language) throw new Error('Country language is required');
        if (!coin) throw new Error('Country coin is required');
        if (population < 0) throw new Error('Population must be non-negative!')

        return new Country({ name, population, language, coin, continent_id });
    };

    public static restore(props: CountryDTO): Country {
        const continentInstance = props.continent
            ? Continent.restore(props.continent)
            : undefined;

        return new Country({ ...props, continent: continentInstance });
    }

    get id(): number | undefined { return this.props.id };
    get name(): string { return this.props.name };
    get language(): string { return this.props.language };
    get population(): number { return this.props.population };
    get coin(): string { return this.props.coin };
    get continent_id(): number { return this.props.continent_id };
    get continent(): Continent | undefined { return this.props.continent };

    toJSON(): CountryDTO {
        return { ...this.props }
    };
};
