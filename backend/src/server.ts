import { PrismaClient } from "./generated/prisma/client.js";
import createApp from "./api/app.js";

import { CityRepository } from "./repositories/city.js";
import CityService from "./services/city.js";
import CityController from "./api/controllers/city.controller.js";

import { CountryRepository } from "./repositories/country.js";
import CountryService from "./services/country.js";
import CountryController from "./api/controllers/country.controller.js";

import { ContinentRepository } from "./repositories/continent.js";
import ContinentService from "./services/continent.js";
import ContinentController from "./api/controllers/continent.controller.js";

const prisma = new PrismaClient();

const cityRepository = new CityRepository(prisma);
const cityService = new CityService(cityRepository);
const cityController = new CityController(cityService);

const countryRepository = new CountryRepository(prisma);
const countryService = new CountryService(countryRepository);
const countryController = new CountryController(countryService);

const continentRepository = new ContinentRepository(prisma);
const continentService = new ContinentService(continentRepository);
const continentController = new ContinentController(continentService);

const deps = {
    cityController,
    countryController,
    continentController
};

const app = createApp(deps);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
