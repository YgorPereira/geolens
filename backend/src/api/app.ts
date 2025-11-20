import express from 'express';
import cors from "cors";
import createRoutes from './routes/index.js';

export default function createApp(deps: any) {
    const app = express();

    app.use(cors({
        origin: "http://localhost:5173", // React/Vite
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    }));

    app.use(express.json());
    app.use('/api', createRoutes(deps));

    return app;
};
