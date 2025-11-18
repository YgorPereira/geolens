import type { Continent } from "@prisma/client";
import { City, type CityDTO } from "../../src/entities/city.js";
import { CityRepository } from "../../src/repositories/city.js";
import { prisma } from "../vitest.setup.js";
import { Country } from "../../src/entities/country.js";
import { Continent } from "../../src/entities/continent.js";

describe('City Repository', () => {
    const repo = new CityRepository(prisma);

    let created_continent: Continent = {} as Continent;
    let created_country: Country = {} as Country;
    let created_city: City = {} as City;
    let cityBaseData: CityDTO;

    beforeAll(async () => {
        created_continent = await prisma.continent.create({
            data: { name: "Europa", description: "Continent Europeu" }
        });

        created_country = await prisma.country.create({
            data: {
                name: "Alemanha",
                population: 100000000,
                language: "Alemão",
                coin: "Euro",
                continent_id: created_continent.id,
            }
        });

        created_city = await repo.save({
            name: "Berlim",
            population: 1190000,
            latitude: -23.5505,
            longitude: -46.6339,
            country_id: created_country.id,
        });

        cityBaseData = {
            name: "Hamburgo",
            population: 2000000,
            latitude: -21.123,
            longitude: -11.111,
            country_id: created_country.id,
        };
    });


    it('Should create a record of City in Database', async () => {
        const created = await repo.save(cityBaseData);
        expect(created.name).toBe("Hamburgo");
        expect(created.population).toBe(2000000);
        expect(created.latitude).toBe(-21.123);
        expect(created.longitude).toBe(-11.111);
        expect(created.country_id).toBe(created_country.id);
    });

    it('Should list all records of City in Database', async () => {
        const cities = await repo.findAll();

        expect(cities.length).toBeGreaterThan(0);
        for (const city of cities) {
            expect(city).toBeInstanceOf(City);
        }
    });

    it('Should list a City record by id', async () => {
        const city = await repo.findById(created_city.id);

        expect(city).not.toBeNull();
        expect(city.name).toBe("Berlim");
        expect(city.population).toBe(1190000);
        expect(city.latitude).toBe(-23.5505);
        expect(city.longitude).toBe(-46.6339);
        expect(city.country_id).toBe(created_country.id);
        expect(city.country).toBeInstanceOf(Country);
        expect(city.country?.name).toBe("Alemanha");
        expect(city.country?.population).toBe(100000000);
        expect(city.country?.language).toBe("Alemão");
        expect(city.country?.coin).toBe("Euro");
        expect(city.country?.continent_id).toBe(created_continent.id);
    });

    it('Should update a City', async () => {
        const city = await repo.save({
            name: "São Paulo",
            population: 12300000,
            latitude: -23.55,
            longitude: -46.63,
            country_id: created_country.id,
        });

        const updated = await repo.update({
            id: city.id,
            name: "São Paulo Atualizada",
            population: 15000000,
            latitude: -20.0,
            longitude: -40.0,
            country_id: created_country.id,
        });

        expect(updated).toBeInstanceOf(City);
        expect(updated.id).toBe(city.id);
        expect(updated.name).toBe("São Paulo Atualizada");
        expect(updated.population).toBe(15000000);
        expect(updated.latitude).toBe(-20.0);
        expect(updated.longitude).toBe(-40.0);
    });

    it('Should delete a City record by id', async () => {
        const founded_city = await repo.delete(created_city.id);

        expect(founded_city).toBeUndefined();
    });
});