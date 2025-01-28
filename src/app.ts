import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/products.route';
import { OrderRoutes } from './app/modules/orders/orders.route';
import { UserRoutes } from './app/modules/users/user.route';
import { AuthRoutes } from './app/modules/auth/auth.route';
import globalErrorHandler from './app/middlewars/globalErrorHandler';
import { CartRoutes } from './app/modules/cart/cart.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/cart', CartRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});
app.use(globalErrorHandler);
export default app;
