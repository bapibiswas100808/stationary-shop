import express, { Application } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/products.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoutes);

export default app;
