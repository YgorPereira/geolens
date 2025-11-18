import type { CountryDTO } from "../entities/country.js";
import type { CountryRepository } from "../repositories/country.js";

export default class CountryService {
    constructor(private readonly countryRepository: CountryRepository) { }

    async createCountry(data: CountryDTO) {
        const existing = await this.countryRepository.findByName(data.name);

        const alreadyExists = existing.some(
            c => c.continent_id === data.continent_id
        );

        if (alreadyExists) {
            throw new Error(
                `Country '${data.name}' already exists in this continent.`
            );
        }

        return this.countryRepository.save(data);
    }


    async getAllCountries() {
        return this.countryRepository.findAll();
    };

    async getCountryById(id: number) {
        const country = await this.countryRepository.findById(id);
        if (!country) {
            throw new Error(`Country with id ${id} not found.`);
        }
        return country;
    };

    async getCountryByName(name: string) {
        const country = await this.countryRepository.findByName(name);
        if (!country) {
            throw new Error(`Country with name ${name} not found.`);
        }
        return country;
    };

    async updateCountry(data: Partial<CountryDTO>) {
        const country = await this.countryRepository.findById(data.id);

        if (!country) {
            throw new Error(`Country with id ${data.id} not found.`);
        }

        const newName = data.name ?? country.name;
        const newContinentId = data.continent_id ?? country.continent_id;

        if (data.name || data.continent_id) {
            const countriesWithSameName = await this.countryRepository.findByName(newName);

            const conflict = countriesWithSameName.some(
                c => c.id !== country.id && c.continent_id === newContinentId
            );

            if (conflict) {
                throw new Error(
                    `Country '${newName}' already exists in continent ID ${newContinentId}.`
                );
            }
        }

        const updatedData: CountryDTO = {
            id: country.id,
            name: newName,
            population: data.population ?? country.population,
            language: data.language ?? country.language,
            coin: data.coin ?? country.coin,
            continent_id: newContinentId,
        };

        return this.countryRepository.update(updatedData);
    }


    async deleteCountry(id: number) {
        const country = await this.countryRepository.findById(id);
        if (!country) {
            throw new Error(`Country with id ${id} not found.`);
        }
        return this.countryRepository.delete(id);
    };
};