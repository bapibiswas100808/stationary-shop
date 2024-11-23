import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.post('/', (req: Request, res: Response) => {
  console.log(req.body);
  res.json({
    message: 'Data received successfully',
  });
});

export default app;
