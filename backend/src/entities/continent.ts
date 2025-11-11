export type ContinentProps = {
    id?: number,
    name: string,
    description: string,
}

export class Continent {
    private constructor(private props: ContinentProps) { };

    public static create(name: string, description: string): Continent {
        if (!name) throw new Error('Continent name is required');
        if (!description) throw new Error('Continent description is required');

        return new Continent({ name, description });
    };

    get id(): number { return this.id };
    get name(): string { return this.name };
    get description(): string { return this.description };

    toJson(): ContinentProps {
        return { ...this.props };
    };
};