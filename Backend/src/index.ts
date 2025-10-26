import express from 'express';
  import cors from 'cors';
  import dotenv from 'dotenv';
  import marketcapRoutes from './routes/marketcapRoutes';

  dotenv.config();

  const app = express();
  const port = process.env.PORT || 4000;

  app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }));
  app.use(express.json());

  // Routes
  app.use('/price', marketcapRoutes);  // /price/token/:token
  app.use('/pool', marketcapRoutes);   // /pool/pair/:pair
  app.use('/calculate', marketcapRoutes); // /calculate

  app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
  });