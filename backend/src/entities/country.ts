export type CountryProps = {
    id?: number,
    name: string,
    population: number,
    language: string,
    coin: string
};

export class Country {
    private constructor(private props: CountryProps) { };

    public static create(name: string, population: number, language: string, coin: string): Country {
        if (!name) throw new Error('Country name is required');
        if (!language) throw new Error('Country language is required');
        if (!coin) throw new Error('Country coin is required');
        if (population < 0) throw new Error('Population must be non-negative!')

        return new Country({ name, population, language, coin });
    };

    get id(): number { return this.id };
    get name(): string { return this.name };
    get language(): string { return this.language };
    get coin(): string { return this.coin };

    toJson(): CountryProps {
        return { ...this.props }
    };
};
