import { Continent, type ContinentDTO } from "../../src/entities/continent.js";
import { ContinentRepository } from "../../src/repositories/continent.js";
import { prisma } from "../vitest.setup.js";

describe('Continent Repository Test', async () => {
    const repo = new ContinentRepository(prisma);

    let createdContinent: Continent;

    const baseData: ContinentDTO = {
        name: "Europa",
        description: "Continente europeu",
    };

    beforeAll(async () => {
        createdContinent = await repo.save({ name: "America do Sul", description: "Continente que abriga o Brasil" });
    });

    it('Should create a Continent record in database', async () => {
        const created: Continent = await repo.save(baseData);

        expect(created).toBeInstanceOf(Continent);
        expect(created.name).toBe("Europa");
        expect(created.description).toBe("Continente europeu");
    });

    it('Should list all Continent records saved in database', async () => {
        const continents: Continent[] = await repo.findAll();

        expect(continents.length).toBeGreaterThan(0);
        for (const continent of continents) {
            expect(continent).toBeInstanceOf(Continent);
        };
    });

    it('Should list a Continent record in database by id', async () => {
        const continent: Continent | null = await repo.findById(createdContinent.id as number);

        expect(continent).toBeInstanceOf(Continent);
        expect(continent.name).toBe("America do Sul");
        expect(continent.description).toBe("Continente que abriga o Brasil");
    });

    it('Should update a Continent record', async () => {
        const continent = await repo.save({
            name: "África",
            description: "Continente quente"
        });

        const updated = await repo.update({
            id: continent.id,
            name: "África Atualizada",
            description: "Descrição atualizada"
        });

        expect(updated).toBeInstanceOf(Continent);
        expect(updated.id).toBe(continent.id);
        expect(updated.name).toBe("África Atualizada");
        expect(updated.description).toBe("Descrição atualizada");
    });

    it('Should delete a Continent record by id', async () => {
        const founded_continent: Continent | null = await repo.delete(createdContinent.id as number);

        expect(founded_continent).toBeUndefined();
    });
});