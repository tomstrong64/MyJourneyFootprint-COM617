import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import HealthRouter from './routes/health.router.js';
import { logRequest } from './controllers/index.controller.js';

const app = express();

app.use(cors());
app.use(helmet());

app.use(logRequest);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/health', HealthRouter);

app.use(express.static('src/public'));

export default app;
