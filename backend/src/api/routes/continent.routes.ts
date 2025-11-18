import { Router } from "express";
import type ContinentController from "../controllers/continent.controller.js";
"../controllers/city.controller.js";

export default (continentController: ContinentController): Router => {
    const router = Router();
    router.post("/", (req, res) => continentController.createContinent(req, res));
    router.get("/", (req, res) => continentController.listContinents(req, res));
    router.get("/:id", (req, res) => continentController.getContinentById(req, res));
    router.put("/:id", (req, res) => continentController.updateContinent(req, res));
    router.delete("/:id", (req, res) => continentController.deleteContinent(req, res));
    return router;
};
