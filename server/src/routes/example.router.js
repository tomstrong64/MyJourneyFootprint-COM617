import { Router } from 'express';

import * as ExampleController from '../controllers/example.controller.js';

const router = Router();

router.get('/', ExampleController.getExamples);
router.post('/', ExampleController.createExample);

export default router;