import { Router } from "express";

import cityRoutes from "./city.routes.js";
import continentRoutes from "./continent.routes.js";
import countryRoutes from "./country.routes.js";

export default function createRoutes(deps: any): Router {
    const router = Router();

    router.use("/cities", cityRoutes(deps.cityController));
    router.use("/countries", countryRoutes(deps.countryController));
    router.use("/continents", continentRoutes(deps.continentController));
    return router;
};
