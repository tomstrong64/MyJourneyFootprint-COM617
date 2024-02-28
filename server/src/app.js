import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import history from 'connect-history-api-fallback';

import HealthRouter from './routes/health.router.js';
import { logRequest } from './controllers/index.controller.js';

const app = express();

app.use(cors());
app.use(helmet());

app.use(logRequest);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/health', HealthRouter);

// Middleware for serving the vuejs frontend
const staticFileMiddleware = express.static('src/public');

// 1st call for unredirected requests
app.use(staticFileMiddleware);

// Support history api
app.use(
  history({
    index: '/index.html',
  })
);

// 2nd call for redirected requests
app.use(staticFileMiddleware);

export default app;
