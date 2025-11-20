import { PrismaClient } from '@prisma/client';
import { City, type CityDTO } from '../entities/city.js'
import type { BaseRepository } from "./base.js";


export class CityRepository implements BaseRepository<CityDTO, City> {
    constructor(private readonly prisma = new PrismaClient()) { }

    async save(data: CityDTO): Promise<City> {
        try {
            const new_city = await this.prisma.city.create({ data, include: { country: true } });
            return City.restore(new_city)
        } catch (error) {
            console.error('Error saving city: ', error);
            throw error;
        };
    };

    async findAll(): Promise<City[]> {
        try {
            const cities = await this.prisma.city.findMany({
                include: { country: true }
            });
            return cities.map(city => City.restore(city));
        } catch (error) {
            console.error('Error fetching cities: ', error);
            throw error;
        };
    };

    async findById(id: number): Promise<City | null> {
        try {
            const city = await this.prisma.city.findUnique({
                where: { id: id },
                include: { country: true }
            });

            if (!city) return null;

            return City.restore(city);
        } catch (error) {
            console.error(`Error fetching city by id ${id}: ${error}`);
            throw error;
        };
    };

    async findByName(name: string): Promise<City | null> {
        try {
            const city = await this.prisma.city.findFirst({
                where: { name: name },
                include: { country: true }
            });
            if (!city) return null;
            return City.restore(city);
        } catch (error) {
            console.error(`Error fetching city by name ${name}: ${error}`);
            throw error;
        };
    };

    async update(data: CityDTO): Promise<City> {
        try {
            const city = await this.prisma.city.update({
                where: { id: data.id },
                data,
                include: { country: true }
            });
            return City.restore(city);
        } catch (error) {
            console.error(`Error update city by ${data.id}: ${error}`);
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