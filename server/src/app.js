import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import history from 'connect-history-api-fallback';

import HealthRouter from './routes/health.router.js';
import UserRoute from './routes/userRoute.js'
import { logRequest } from './controllers/index.controller.js';
import  LocalStrategy  from './middleware/localStrategy.js';

const app = express();

app.use(cors());
app.use(helmet());

app.use(logRequest);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(LocalStrategy);

app.use('/health', HealthRouter);
app.use('/userRoute',UserRoute)

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
