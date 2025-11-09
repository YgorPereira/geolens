import { PrismaClient } from '@prisma/client';
import { City, type CityProps } from '../entities/city.js'
import type { BaseRepository } from "./base.js";


export class CityRepository implements BaseRepository<CityProps, City> {
    constructor(private readonly prisma = new PrismaClient()) { }

    async save(data: CityProps): Promise<City> {
        try {
            const new_city = await this.prisma.city.create({ data });
            return City.restore(new_city)
        } catch (error) {
            console.error('Error saving city: ', error);
            throw error;
        };
    };

    async findAll(): Promise<City[]> {
        try {
            const cities = await this.prisma.city.findMany();
            return cities.map(city => City.restore(city));

        } catch (error) {
            console.error('Error fetching cities: ', error);
            throw error;
        };
    };

    async findById(id: number): Promise<City | null> {
        try {
            const city = await this.prisma.city.findUnique({
                where: { id: id }
            });

            if (!city) return null;

            return City.restore(city);
        } catch (error) {
            console.error(`Error fetching city by id ${id}: ${error}`);
            throw error;
        };
    };

    async update(data: CityProps): Promise<City> {
        try {
            const city = await this.prisma.city.update({
                where: { id: data.id },
                data: data
            });
            return City.restore(city);
        } catch (error) {
            console.error(`Error update city by ${id}: ${error}`);
            throw error;
        };
    };

    async delete(id: number): Promise<void> {
        try {
            await this.prisma.city.delete({
                where: { id: id }
            });
        } catch (error) {
            console.error(`Error delete city by ${id}: ${error}`);
            throw error;
        };
    };
};