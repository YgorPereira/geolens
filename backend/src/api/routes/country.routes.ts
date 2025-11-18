import { Router } from "express";
import CountryController from "../controllers/country.controller.js";

export default (countryController: CountryController): Router => {
    const router = Router();

    router.post("/", (req, res) => countryController.createCountry(req, res));
    router.get("/", (req, res) => countryController.listCountries(req, res));
    router.get("/:id", (req, res) => countryController.getCountryById(req, res));
    router.put("/:id", (req, res) => countryController.updateCountry(req, res));
    router.delete("/:id", (req, res) => countryController.deleteCountry(req, res));
    return router;
};
