import { Continent } from "../../src/entities/continent.js";
import { Country, type CountryDTO } from "../../src/entities/country.js";
import { CountryRepository } from "../../src/repositories/country.js";
import { prisma } from "../vitest.setup.js";


describe('Country Repository Test', () => {
    const repo = new CountryRepository(prisma);

    let created_continent: Continent = {} as Continent;
    let created_country: Country = {} as Country;
    let countryBaseData: CountryDTO;

    beforeAll(async () => {
        created_continent = await prisma.continent.create({
            data: { name: "America do Sul", description: "Continente que abriga o Brasil" }
        });

        created_country = await repo.save({
            name: "Argentina",
            population: 100000000,
            language: "Espanhol",
            coin: "Peso argentino",
            continent_id: created_continent.id,
        });

        countryBaseData = {
            name: "Brazil",
            population: 213000000,
            language: "Português",
            coin: "Reais(R$)",
            continent_id: created_continent.id,
        };
    });

    it('Should create a country record in database', async () => {
        const created: Country = await repo.save(countryBaseData);

        expect(created).toBeInstanceOf(Country);
        expect(created.name).toBe("Brazil");
        expect(created.population).toBe(213000000);
        expect(created.language).toBe("Português");
        expect(created.coin).toBe("Reais(R$)");
        expect(created.continent_id).toBe(created_continent.id);
    });

    it('Should list all Country records saved in database', async () => {
        const countries: Country[] = await repo.findAll();

        expect(countries.length).toBeGreaterThan(0);
        for (const country of countries) {
            expect(country).toBeInstanceOf(Country);
        };
    });

    it('Should list a Country record in database by id', async () => {
        const country: Country = await repo.findById(created_country.id);

        expect(country).toBeInstanceOf(Country);
        expect(country.name).toBe("Argentina");
        expect(country.population).toBe(100000000);
        expect(country.language).toBe("Espanhol");
        expect(country.coin).toBe("Peso argentino");
        expect(country.continent_id).toBe(created_continent.id);
        expect(country.continent).toBeInstanceOf(Continent);
        expect(country.continent?.name).toBe("America do Sul");
        expect(country.continent?.description).toBe("Continente que abriga o Brasil");
    });

    it('Should update a Country completely', async () => {
        const country = await repo.save({
            name: "Chile",
            population: 20000000,
            language: "Espanhol",
            coin: "Peso",
            continent_id: created_continent.id
        });

        const updated = await repo.update({
            id: country.id,
            name: "Chile Atualizado",
            population: 21000000,
            language: "Espanhol Moderno",
            coin: "Peso Novo",
            continent_id: created_continent.id
        });

        expect(updated).toBeInstanceOf(Country);
        expect(updated.name).toBe("Chile Atualizado");
        expect(updated.population).toBe(21000000);
        expect(updated.language).toBe("Espanhol Moderno");
        expect(updated.coin).toBe("Peso Novo");
    });

    it('Should patch a Country partially', async () => {
        const country = await repo.save({
            name: "Peru",
            population: 33000000,
            language: "Espanhol",
            coin: "Sol",
            continent_id: created_continent.id
        });

        const patched = await repo.patch({
            id: country.id,
            population: 35000000
        });

        expect(patched.id).toBe(country.id);
        expect(patched.population).toBe(35000000);

        expect(patched.name).toBe("Peru");
        expect(patched.language).toBe("Espanhol");
        expect(patched.coin).toBe("Sol");
    });
    
    it('Should delete a Country record by id', async () => {
        const founded_country: undefined = await repo.delete(created_country.id);

        expect(founded_country).toBeUndefined();
    });
});