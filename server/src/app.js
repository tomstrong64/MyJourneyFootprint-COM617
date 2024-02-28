import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import ExampleRouter from './routes/example.router.js';
import HealthRouter from './routes/health.router.js';

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.static('src/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/example', ExampleRouter);
app.use('/health', HealthRouter);

export default app;