import type { ContinentDTO } from "../entities/continent.js";
import type { ContinentRepository } from "../repositories/continent.js";

export default class ContinentService {
    constructor(private readonly continentRepository: ContinentRepository) { }

    async createContinent(data: ContinentDTO) {
        const continents = await this.continentRepository.findByName(data.name);
        if (continents.length > 0) {
            throw new Error(`Continent with name ${data.name} already exists.`);
        }
        return this.continentRepository.save(data);
    };

    async getAllContinents() {
        return this.continentRepository.findAll();
    };

    async getContinentById(id: number) {
        const continent = await this.continentRepository.findById(id);
        if (!continent) {
            throw new Error(`Continent with id ${id} not found.`);
        }
        return continent;
    };

    async getContinentByName(name: string) {
        const continent = await this.continentRepository.findByName(name);
        if (!continent) {
            throw new Error(`Continent with name ${name} not found.`);
        }
        return continent;
    };

    async updateContinent(data: Partial<ContinentDTO>) {
        const continent = await this.continentRepository.findById(data.id);

        if (!continent) {
            throw new Error(`Continent with id ${data.id} not found.`);
        }

        if (data.name) {
            const continentsWithSameName = await this.continentRepository.findByName(data.name);

            if (continentsWithSameName.length > 0) {
                const another = continentsWithSameName.find(
                    c => c.id !== continent.id
                );

                if (another) {
                    throw new Error(`Continent '${data.name}' already exists.`);
                }
            }
        }

        const updatedData: ContinentDTO = {
            id: continent.id,
            name: data.name ?? continent.name,
            description: data.description ?? continent.description,
        };

        return this.continentRepository.update(updatedData);
    }


    async deleteContinent(id: number) {
        const continent = await this.continentRepository.findById(id);
        if (!continent) {
            throw new Error(`Continent with id ${id} not found.`);
        }
        return this.continentRepository.delete(id);
    };
};