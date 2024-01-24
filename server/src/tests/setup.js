import {} from 'dotenv/config';
import app from '../app.js';

export default async () => {
    // connect to db
    global.app = app;
};
