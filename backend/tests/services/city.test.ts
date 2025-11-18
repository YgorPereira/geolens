import { prisma } from "../vitest.setup.js";

import CityService from "../../src/services/city.js";
import { CityRepository } from "../../src/repositories/city.js";
import { CountryRepository } from "../../src/repositories/country.js";
import { ContinentRepository } from "../../src/repositories/continent.js";

describe("CityService", () => {
    const cityRepository = new CityRepository(prisma);
    const countryRepository = new CountryRepository(prisma);
    const continentRepository = new ContinentRepository(prisma);

    const service = new CityService(cityRepository);

    let continent: any;
    let country: any;
    let city: any;

    beforeAll(async () => {
        await prisma.city.deleteMany();
        await prisma.country.deleteMany();
        await prisma.continent.deleteMany();

        continent = await continentRepository.save({
            name: "Europa",
            description: "Teste continente"
        });

        country = await countryRepository.save({
            name: "Alemanha",
            population: 90000000,
            language: "Alemão",
            coin: "Euro",
            continent_id: continent.id,
        });

        city = await service.createCity({
            name: "Berlim",
            population: 3500000,
            latitude: 10,
            longitude: 20,
            country_id: country.id,
        });
    });

    it("Should create a city", async () => {
        const created = await service.createCity({
            name: "Hamburgo",
            population: 2000000,
            latitude: 12,
            longitude: 22,
            country_id: country.id,
        });

        expect(created.name).toBe("Hamburgo");
    });

    it("Should list all cities", async () => {
        const cities = await service.getAllCities();
        expect(cities.length).toBeGreaterThan(0);
    });

    it("Should get city by id", async () => {
        const found = await service.getCityById(city.id);
        expect(found.name).toBe("Berlim");
    });

    it("Should throw if city id does not exist", async () => {
        await expect(service.getCityById(9999)).rejects.toThrow();
    });

    it("Should update a city", async () => {
        const updated = await service.updateCity({
            id: city.id,
            name: "Berlim Atualizada",
        });

        const founded_city = await service.getCityById(city.id);

        expect(founded_city.name).toBe("Berlim Atualizada");
        expect(updated.name).toBe("Berlim Atualizada");
    });

    it("Should delete a city", async () => {
        const deleted = await service.deleteCity(city.id);
        expect(deleted).toBeUndefined();

        await expect(service.getCityById(city.id)).rejects.toThrow();
    });
});
