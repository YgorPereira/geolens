import type { Request, Response } from 'express';
import type CityService from '../../services/city.js';

export default class CityController {
    constructor(private readonly cityService: CityService) { };

    public createCity = async (req: Request, res: Response): Promise<Response> => {
        console.log("[POST /cities] body:", req.body);
        try {
            const newCity = await this.cityService.createCity(req.body);
            console.log("[POST /cities] created:", newCity);
            return res.status(201).json(newCity);
        } catch (error: any) {
            console.error("[POST /cities] error:", error.message);
            return res.status(400).json({ error: error.message });
        }
    };

    public listCities = async (req: Request, res: Response): Promise<Response> => {
        console.log("[GET /cities] fetching all cities");
        try {
            const cities = await this.cityService.getAllCities();
            console.log("[GET /cities] fetched:", cities.length, "items");
            return res.json(cities);
        } catch (error: any) {
            console.error("[GET /cities] error:", error.message);
            return res.status(500).json({ error: error.message });
        }
    };

    public getCityById = async (req: Request, res: Response): Promise<Response> => {
        const id = Number(req.params.id);
        console.log(`[GET /cities/${id}] fetching city`);
        if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
        try {
            const city = await this.cityService.getCityById(id);
            console.log(`[GET /cities/${id}] found:`, city);
            return res.json(city);
        } catch (error: any) {
            console.error(`[GET /cities/${id}] error:`, error.message);
            return res.status(404).json({ error: error.message });
        }
    };

    public updateCity = async (req: Request, res: Response): Promise<Response> => {
        const id = Number(req.params.id);
        console.log(`[PUT /cities/${id}] body:`, req.body);
        if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
        try {
            const updated = await this.cityService.updateCity({ id, ...req.body });
            console.log(`[PUT /cities/${id}] updated:`, updated);
            return res.json(updated);
        } catch (error: any) {
            console.error(`[PUT /cities/${id}] error:`, error.message);
            return res.status(400).json({ error: error.message });
        }
    };

    public deleteCity = async (req: Request, res: Response): Promise<Response> => {
        const id = Number(req.params.id);
        console.log(`[DELETE /cities/${id}] deleting city`);
        if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
        try {
            await this.cityService.deleteCity(id);
            console.log(`[DELETE /cities/${id}] deleted`);
            return res.status(204).send();
        } catch (error: any) {
            console.error(`[DELETE /cities/${id}] error:`, error.message);
            return res.status(404).json({ error: error.message });
        }
    };
};
