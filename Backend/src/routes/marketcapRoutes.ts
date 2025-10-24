import { Router } from 'express';
import { getPrice, getPool, calculate } from '../controllers/marketcapController';

const router = Router();

router.get('/price/:token', getPrice);
router.get('/pool/:pair', getPool);
router.post('/calculate', calculate);

export default router;