import express from 'express';
import cors from 'cors';
import history from 'connect-history-api-fallback';
import session from 'express-session'; // Add the import statement for the session module
import flash from 'connect-flash'; // Add the import statement for the flash module
import cookieParser from 'cookie-parser';

import HealthRouter from './routes/health.router.js';
import GraphqlRouter from './routes/graphql.router.js';
import IndexRouter from './routes/index.router.js';
import { logRequest } from './controllers/index.controller.js';

import client from './services/db.js';
import passport from 'passport';
import LocalStrategy from './middleware/Passport/Local.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(cors());

app.use(cookieParser());

app.use(logRequest);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

passport.use(LocalStrategy);
passport.serializeUser((user, done) => {
  console.log('serializeUser', user);
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await client.query('SELECT * FROM Users WHERE id = $1', [id]);
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/health', HealthRouter);
app.use('/graphql', GraphqlRouter);
app.use(IndexRouter);

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
