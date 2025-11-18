import { prisma } from "../vitest.setup.js";

import { ContinentRepository } from "../../src/repositories/continent.js";
import { CountryRepository } from "../../src/repositories/country.js";
import CountryService from "../../src/services/country.js";
import { Country } from "../../src/entities/country.js";

describe("Country Service", () => {
    const countryRepository = new CountryRepository(prisma);
    const continentRepository = new ContinentRepository(prisma);

    const service = new CountryService(countryRepository);

    let continent: any;
    let country: any;

    beforeAll(async () => {
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
    });

    it("Should create a contry", async () => {
        const created = await service.createCountry({
            name: "Inglaterra",
            population: 70000000,
            language: "Inglês",
            coin: "Libra",
            continent_id: continent.id,
        });

        expect(created.name).toBe("Inglaterra");
        expect(created.population).toBe(70000000);
        expect(created.language).toBe("Inglês");
        expect(created.coin).toBe("Libra");
        expect(created.continent_id).toBe(continent.id);
    });

    it("Should not allow duplicate country name in same continent", async () => {
        await expect(service.createCountry({
            name: "Alemanha",
            population: 90000000,
            language: "Alemão",
            coin: "Euro",
            continent_id: continent.id,
        })).rejects.toThrow();
    });

    it("Should list all countries", async () => {
        const countries = await service.getAllCountries();

        expect(countries.length).toBeGreaterThan(0);
        for (const c of countries) {
            expect(c).toBeInstanceOf(Country);
        };
    });

    it("Should get country by id", async () => {
        const found = await service.getCountryById(country.id);

        expect(found.name).toBe("Alemanha");
        expect(found.population).toBe(90000000);
        expect(found.language).toBe("Alemão");
        expect(found.coin).toBe("Euro");
        expect(found.continent_id).toBe(continent.id);
    });

    it("Should throw if country id does not exist", async () => {
        await expect(service.getCountryById(9999)).rejects.toThrow();
    });

    it("Should update a country successfully", async () => {
        const france = await countryRepository.save({
            name: "França",
            population: 60000000,
            language: "Francês",
            coin: "Euro",
            continent_id: continent.id,
        });

        const updated = await service.updateCountry({
            id: france.id,
            name: "França Atualizada",
            population: 65000000
        });

        expect(updated.name).toBe("França Atualizada");
        expect(updated.population).toBe(65000000);
        expect(updated.language).toBe("Francês");
        expect(updated.coin).toBe("Euro");
        expect(updated.continent_id).toBe(continent.id);
    });

    it("Should not allow renaming to an existing country name in same continent", async () => {
        const spain = await countryRepository.save({
            name: "Espanha",
            population: 47000000,
            language: "Espanhol",
            coin: "Euro",
            continent_id: continent.id,
        });

        const italy = await countryRepository.save({
            name: "Itália",
            population: 59000000,
            language: "Italiano",
            coin: "Euro",
            continent_id: continent.id,
        });

        await expect(service.updateCountry({
            id: italy.id,
            name: "Espanha"
        })).rejects.toThrow();
    });


    it("Should delete a country", async () => {
        await service.deleteCountry(country.id);

        const found = await countryRepository.findById(country.id);

        expect(found).toBeNull();
    });
});