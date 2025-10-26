import { Router } from 'express';
  import { getPrice, getPool, calculate } from '../controllers/marketcapController';

  const router = Router();

  router.get('/token/:token', getPrice); // /price/token/:token
  router.get('/pair/:pair', getPool);   // /pool/pair/:pair
  router.post('/', calculate);           // /calculate

  export default router;