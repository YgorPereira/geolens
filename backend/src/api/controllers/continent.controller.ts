import type { Request, Response } from 'express';
import type ContinentService from '../../services/continent.js';

export default class ContinentController {
    constructor(private readonly continentService: ContinentService) { };

    public createContinent = async (req: Request, res: Response): Promise<Response> => {
        console.log("[POST /continents] body:", req.body);
        try {
            const newContinent = await this.continentService.createContinent(req.body);
            console.log("[POST /continents] created:", newContinent);
            return res.status(201).json(newContinent);
        } catch (error: any) {
            console.error("[POST /continents] error:", error.message);
            return res.status(400).json({ error: error.message });
        }
    };

    public listContinents = async (req: Request, res: Response): Promise<Response> => {
        console.log("[GET /continents] fetching all continents");
        try {
            const continents = await this.continentService.getAllContinents();
            console.log("[GET /continents] fetched:", continents.length, "items");
            return res.json(continents);
        } catch (error: any) {
            console.error("[GET /continents] error:", error.message);
            return res.status(500).json({ error: error.message });
        }
    };

    public getContinentById = async (req: Request, res: Response): Promise<Response> => {
        const id = Number(req.params.id);
        console.log(`[GET /continents/${id}] fetching continent`);
        if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
        try {
            const continent = await this.continentService.getContinentById(id);
            console.log(`[GET /continents/${id}] found:`, continent);
            return res.json(continent);
        } catch (error: any) {
            console.error(`[GET /continents/${id}] error:`, error.message);
            return res.status(404).json({ error: error.message });
        }
    };

    public updateContinent = async (req: Request, res: Response): Promise<Response> => {
        const id = Number(req.params.id);
        console.log(`[PUT /continents/${id}] body:`, req.body);
        if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
        try {
            const updated = await this.continentService.updateContinent({ id, ...req.body });
            console.log(`[PUT /continents/${id}] updated:`, updated);
            return res.json(updated);
        } catch (error: any) {
            console.error(`[PUT /continents/${id}] error:`, error.message);
            return res.status(400).json({ error: error.message });
        }
    };

    public deleteContinent = async (req: Request, res: Response): Promise<Response> => {
        const id = Number(req.params.id);
        console.log(`[DELETE /continents/${id}] deleting continent`);
        if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
        try {
            await this.continentService.deleteContinent(id);
            console.log(`[DELETE /continents/${id}] deleted`);
            return res.status(204).send();
        } catch (error: any) {
            console.error(`[DELETE /continents/${id}] error:`, error.message);
            return res.status(404).json({ error: error.message });
        }
    };
};
