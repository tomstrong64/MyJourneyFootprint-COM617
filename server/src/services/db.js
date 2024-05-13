import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  connectionString: process.env.POSTGRES_URI,
});

await client.connect();

console.log('Connected to Postgres');

export default client;
