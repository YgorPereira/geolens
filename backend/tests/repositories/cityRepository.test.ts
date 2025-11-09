import { City, type CityProps } from "../../src/entities/city.js";
import { CityRepository } from "../../src/repositories/city.js";

import { prisma } from "../../tests/vitest.setup.js";

describe('City Repository', () => {
    const repo = new CityRepository(prisma);

    const baseData: CityProps = {
        name: "São Paulo",
        population: 11900000,
        latitude: -23.5505,
        longitude: -46.6339,
    };

    it('Should create a record of City in Database', async () => {
        const created = await repo.save(baseData);
        expect(created.name).toBe("São Paulo");
        expect(created.population).toBe(11900000);
        expect(created.latitude).toBe(-23.5505);
        expect(created.longitude).toBe(-46.6339);
    });

    it('Should list all records of City in Database', async () => {
        const created = await repo.save(baseData);

        if(!created) return null;

        const cites = await repo.findAll();

        expect(cites.length).toBeGreaterThan(0);
        for (const city of cites) {
            expect(city).toBeInstanceOf(City);
        }
    });

    it('Should list a City record by id', async () => {

        const created = await repo.save(baseData);

        if(!created) return null;

        const city = await repo.findById(created.id);

        expect(city).not.toBeNull();
        expect(city.name).toBe("São Paulo");
        expect(city.population).toBe(11900000);
        expect(city.latitude).toBe(-23.5505);
        expect(city.longitude).toBe(-46.6339);
    });

    it('Should delete a City record by id', async () => {

        const created = await repo.save(baseData);

        if(!created) return null;

        await repo.delete(created.id);

        const founded_city = await repo.findById(created.id);
        
        expect(founded_city).toBeNull();
    });
});