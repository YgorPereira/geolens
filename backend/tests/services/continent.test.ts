import { ContinentRepository } from "../../src/repositories/continent.js";
import ContinentService from "../../src/services/continent.js";
import { prisma } from "../vitest.setup.js";

describe("Continent Service", () => {
    const continentRepository = new ContinentRepository(prisma);

    const service = new ContinentService(continentRepository);

    let continent;

    beforeAll(async () => {
        await prisma.continent.deleteMany();
        
        continent = await continentRepository.save({
            name: "Asia",
            description: "Teste continente"
        });
    });


    it("Should create a continent", async () => {
        const created = await service.createContinent({
            name: "Africa",
            description: "Teste continente Africa"
        });

        expect(created.name).toBe("Africa");
        expect(created.description).toBe("Teste continente Africa");
    });

    it("Should not allow duplicate continent name", async () => {
        await expect(service.createContinent({
            name: "Asia",
            description: "Outro teste continente"
        })).rejects.toThrow();
    });

    it('Should list all continents', async () => {
        const continents = await service.getAllContinents();
        expect(continents.length).toBe(2);
    });

    it('Should get continent by id', async () => {
        const found = await service.getContinentById(continent.id);
        expect(found.name).toBe("Asia");
        expect(found.description).toBe("Teste continente");
    });

    it ("Should not find continent with invalid id", async () => {
        await expect(service.getContinentById(9999)).rejects.toThrow();
    });

    it('Should update a continent successfully', async () => {
        const updated = await service.updateContinent({
            id: continent.id,
            name: "Asia Updated",
            description: "Updated description"
        });
        expect(updated.name).toBe("Asia Updated");
        expect(updated.description).toBe("Updated description");
    });

    it("Should not update to a duplicate continent name", async () => {
        const europe = await continentRepository.save({
            name: "Europe",
            description: "Teste continente Europe"
        });
        await expect(service.updateContinent({
            id: europe.id,
            name: "Asia Updated"
        })).rejects.toThrow();
    });

    it("Should delete a continent successfully", async () => {
        await service.deleteContinent(continent.id);
        await expect(service.getContinentById(continent.id)).rejects.toThrow();
    });
});