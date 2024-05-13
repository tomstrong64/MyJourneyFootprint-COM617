import { Router } from 'express';
import * as GraphqlController from '../controllers/graphql.controller.js';

const router = Router();

router.post('/', GraphqlController.proxyRequest);

export default router;
