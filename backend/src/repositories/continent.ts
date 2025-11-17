import { type ContinentDTO, Continent} from "../entities/continent.js";
import type { BaseRepository } from "./base.js";

export class ContinentRepository implements BaseRepository<ContinentDTO, Continent> {
    constructor(private readonly prisma = new PrismaClient()) { }

    async save(data: ContinentDTO): Promise<Continent> {
        try {
            const new_continet = await this.prisma.continent.create({ data });
            return Continent.restore(new_continet);
        } catch (error) {
            console.error('Error saving continent: ', error);
            throw error;
        };
    };

    async findAll(): Promise<Continent[]> {
        try {
            const continents = await this.prisma.continent.findMany();
            return continents.map(continent => Continent.restore(continent));
        } catch (error) {
            console.error('Error fetching continents: ', error);
            throw error;
        };
    };

    async findById(id: number): Promise<Continent | null> {
        try {
            const continent = await this.prisma.continent.findUnique({
                where: { id: id }
            });
            if (!continent) return null;
            
            return Continent.restore(continent);
        } catch (error) {
            console.error(`Error fetching continent by id ${id}: ${error}`);
            throw error;
        };
    };

    async update(data: ContinentDTO): Promise<Continent> {
        try {
            const continent = await this.prisma.continent.update({
                where: { id: data.id },
                data: data
            });
            return Continent.restore(continent);
        } catch (error) {
            console.error(`Error update continent by ${data.id}: ${error}`);
            throw error;
        };
    };

    async patch(data: Partial<ContinentDTO>): Promise<Continent> {
        try {
            if (!data.id) {
                throw new Error('ID is required for patching a continent');
            }
            const continent = await this.prisma.continent.update({
                where: { id: data.id },
                data: data
            });
            return Continent.restore(continent);
        } catch (error) {
            console.error(`Error patching continent by ${data.id}: ${error}`);
            throw error;
        };
    };

    async delete(id: number): Promise<void> {
        try {
            await this.prisma.continent.delete({
                where: { id: id }
            });
        } catch (error) {
            console.error(`Error deleting continent by id ${id}: ${error}`);
            throw error;
        };
    };
};