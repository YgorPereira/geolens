import type { Request, Response } from 'express';
import type CountryService from '../../services/country.js';

export default class CountryController {
    constructor(private readonly countryService: CountryService) { };

    public createCountry = async (req: Request, res: Response): Promise<Response> => {
        console.log("[POST /countries] body:", req.body);
        try {
            const newCountry = await this.countryService.createCountry(req.body);
            console.log("[POST /countries] created:", newCountry);
            return res.status(201).json(newCountry);
        } catch (error: any) {
            console.error("[POST /countries] error:", error.message);
            return res.status(400).json({ error: error.message });
        }
    };

    public listCountries = async (req: Request, res: Response): Promise<Response> => {
        console.log("[GET /countries] fetching all countries");
        try {
            const countries = await this.countryService.getAllCountries();
            console.log("[GET /countries] fetched:", countries.length, "items");
            return res.json(countries);
        } catch (error: any) {
            console.error("[GET /countries] error:", error.message);
            return res.status(500).json({ error: error.message });
        }
    };

    public getCountryById = async (req: Request, res: Response): Promise<Response> => {
        const id = Number(req.params.id);
        console.log(`[GET /countries/${id}] fetching country`);
        if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
        try {
            const country = await this.countryService.getCountryById(id);
            console.log(`[GET /countries/${id}] found:`, country);
            return res.json(country);
        } catch (error: any) {
            console.error(`[GET /countries/${id}] error:`, error.message);
            return res.status(404).json({ error: error.message });
        }
    };

    public updateCountry = async (req: Request, res: Response): Promise<Response> => {
        const id = Number(req.params.id);
        console.log(`[PUT /countries/${id}] body:`, req.body);
        if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
        try {
            const updated = await this.countryService.updateCountry({ id, ...req.body });
            console.log(`[PUT /countries/${id}] updated:`, updated);
            return res.json(updated);
        } catch (error: any) {
            console.error(`[PUT /countries/${id}] error:`, error.message);
            return res.status(400).json({ error: error.message });
        }
    };

    public deleteCountry = async (req: Request, res: Response): Promise<Response> => {
        const id = Number(req.params.id);
        console.log(`[DELETE /countries/${id}] deleting country`);
        if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
        try {
            await this.countryService.deleteCountry(id);
            console.log(`[DELETE /countries/${id}] deleted`);
            return res.status(204).send();
        } catch (error: any) {
            console.error(`[DELETE /countries/${id}] error:`, error.message);
            return res.status(404).json({ error: error.message });
        }
    };
};
