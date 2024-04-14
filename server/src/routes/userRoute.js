// routes/userRoutes.js
import { Router } from 'express';
import userController from '../controllers/userController.js';

const router = Router();

router.post('/register', userController.createUser);
router.post('/login', userController.login);

export default router;
