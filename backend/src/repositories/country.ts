import { PrismaClient } from "@prisma/client";
import { Country, type CountryDTO } from "../entities/country.js";
import type { BaseRepository } from "./base.js";
import { count } from "node:console";

export class CountryRepository implements BaseRepository<CountryDTO, Country> {
    constructor(private readonly prisma = new PrismaClient()) { };

    public async save(data: CountryDTO): Promise<Country> {
        try {
            const country = await this.prisma.country.create({ data });
            return Country.restore(country);
        } catch (error) {
            console.error('Error saving country: ', error);
            throw error;
        };
    };

    public async findAll(): Promise<Country[]> {
        try {
            const countries = await this.prisma.country.findMany({
                include: { continent: true }
            });
            return countries.map(country => Country.restore(country));
        } catch (error) {
            console.error('Error fetching countries: ', error);
            throw error;
        };
    };

    public async findById(id: number): Promise<Country | null> {
        try {
            const country = await this.prisma.country.findUnique({
                where: { id: id },
                include: { continent: true }
            });
            if (!country) return null;
            return Country.restore(country);
        } catch (error) {
            console.error(`Error fetching country by id ${id}: ${error}`);
            throw error;
        };
    };

    public async findByName(name: string): Promise<Country[]> {
        try {
            const countries = await this.prisma.country.findMany({
                where: { name: name },
                include: { continent: true }
            });
            return countries.map(country => Country.restore(country));
        } catch (error) {
            console.error(`Error fetching country by name ${name}: ${error}`);
            throw error;
        };
    };

    public async update(data: CountryDTO): Promise<Country> {
        try {
            const country = await this.prisma.country.update({
                where: { id: data.id },
                data: data
            });
            return Country.restore(country);
        } catch (error) {
            console.error(`Error update country by ${data.id}: ${error}`);
            throw error;
        };
    };

    public async delete(id: number): Promise<void> {
        try {
            await this.prisma.country.delete({
                where: { id: id }
            });
        } catch (error) {
            console.error(`Error deleting country by id ${id}: ${error}`);
            throw error;
        };
    };
};