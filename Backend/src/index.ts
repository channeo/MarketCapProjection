import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import marketcapRoutes from './routes/marketcapRoutes';

dotenv.config();

const app = express();
const port = 4000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Cho phép frontend tại localhost:3000
  methods: ['GET', 'POST'], // Cho phép các method cần thiết
  allowedHeaders: ['Content-Type'], // Cho phép header Content-Type
}));
app.use(express.json());

// Routes
app.use('/price', marketcapRoutes);
app.use('/pool', marketcapRoutes);
app.use('/calculate', marketcapRoutes);

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});