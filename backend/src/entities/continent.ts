export type ContinentDTO = {
    id?: number | undefined,
    name: string,
    description: string,
}

export class Continent {
    private constructor(private props: ContinentDTO) { };

    public static create(name: string, description: string): Continent {
        if (!name) throw new Error('Continent name is required');
        if (!description) throw new Error('Continent description is required');

        return new Continent({ name, description });
    };

    public static restore(props: ContinentDTO): Continent {
        return new Continent(props);
    };

    get id(): number | undefined { return this.props.id };
    get name(): string { return this.props.name };
    get description(): string { return this.props.description };

    toJSON(): ContinentDTO {
        return { ...this.props };
    };
};