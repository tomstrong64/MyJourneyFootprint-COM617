import { Router } from 'express';
import HealthRouter from './health.router.js';
import UserRouter from './user.router.js';

const router = Router();

router.use('/health', HealthRouter);
router.use('/user', UserRouter);

export default router;
