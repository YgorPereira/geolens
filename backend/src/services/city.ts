import type { CityDTO } from "../entities/city.js";
import type { CityRepository } from "../repositories/city.js";

export default class CityService {
    constructor(private readonly cityRepository: CityRepository) { }

    async createCity(data: CityDTO) {
        return this.cityRepository.save(data);
    };

    async getAllCities() {
        return this.cityRepository.findAll();
    }

    async getCityById(id: number) {
        const city = await this.cityRepository.findById(id);
        if (!city) {
            throw new Error(`City with id ${id} not found.`);
        }
        return city;
    };

    async getCityByName(name: string) {
        const city = await this.cityRepository.findByName(name);
        if (!city) {
            throw new Error(`City with name ${name} not found.`);
        }
        return city;
    };

    async updateCity(data: Partial<CityDTO>) {
        const city = await this.cityRepository.findById(data.id);
        if (!city) {
            throw new Error(`City with id ${data.id} not found.`);
        }

        const updatedData: CityDTO = {
            id: city.id,
            name: data.name ?? city.name,
            population: data.population ?? city.population,
            latitude: data.latitude ?? city.latitude,
            longitude: data.longitude ?? city.longitude,
            country_id: data.country_id ?? city.country_id,
        };
        return this.cityRepository.update({ ...updatedData });
    };

    async deleteCity(id: number) {
        const city = await this.cityRepository.findById(id);
        if (!city) {
            throw new Error(`City with id ${id} not found.`);
        }
        return this.cityRepository.delete(id);
    };
};