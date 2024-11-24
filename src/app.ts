import express, { Application } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/products.route';
import { OrderRoutes } from './app/modules/orders/orders.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

export default app;
