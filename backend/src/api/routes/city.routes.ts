import { Router } from "express";
import CityController from "../controllers/city.controller.js";

export default (cityController: CityController): Router => {
    const router = Router();

    router.post("/", (req, res) => cityController.createCity(req, res));
    router.get("/", (req, res) => cityController.listCities(req, res));
    router.get("/:id", (req, res) => cityController.getCityById(req, res));
    router.put("/:id", (req, res) => cityController.updateCity(req, res));
    router.delete("/:id", (req, res) => cityController.deleteCity(req, res));
    return router;
};
