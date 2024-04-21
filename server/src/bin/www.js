import { createServer } from 'http';

import {} from 'dotenv/config';

import app from '../app.js';

// connect to db

// create server
const server = createServer(app);
server.listen(3000);
console.log('Server listening on port 3000');

//////////////
// SHUTDOWN //
//////////////

// handle DB disconnect

// shutdown server
const gracefulShutdown = () => {
    server.close(async () => {
        console.log('Server closed');
        process.exit(0);
    });
};

// handle shutdown message
process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    gracefulShutdown();
});

process.on('SIGINT', () => {
    console.log('SIGINT received');
    gracefulShutdown();
});
