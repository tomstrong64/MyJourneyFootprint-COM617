import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import history from 'connect-history-api-fallback';
import session from 'express-session'; // Add the import statement for the session module
import flash from 'connect-flash'; // Add the import statement for the flash module

import IndexRouter from './routes/index.router.js';
import { logRequest } from './controllers/index.controller.js';
import passport from 'passport';
import LocalStrategy from './middleware/Passport/Local.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());

app.use(logRequest);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
passport.use(LocalStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
console.log('Session secret:', process.env.SESSION_SECRET);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

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
