import express from 'express';
import createRoutes from './routes/index.js';

export default function createApp(deps: any) {
    const app = express();

    app.use(express.json());
    app.use('/api', createRoutes(deps));
    
    return app;
};
