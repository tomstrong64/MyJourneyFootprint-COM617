import fs from "fs";
import csv from "csv-parser";
import pkg from "pg";
const { Client } = pkg;

const results = [];

// Create a new client instance
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

// Connect to the database
await client.connect();

// Start a transaction
await client.query('BEGIN');

fs.createReadStream("Cars_By_Market.csv")
  .pipe(csv())
  .on("data", (data) => {
    // Only add rows where the activity is 'Cars (by market segment)' and the Unit is 'mile'
    if ( data.Unit === "miles") {
      console.log('Adding row:', data);
      results.push(data);
    }
    else{
      console.log('Skipped row:', data);
    }
    console.log('results:', results);
  })
  .on("end", async () => {
    // Insert the data into the database
    for (const row of results) {
      // Determine the fuel type
      // ... (rest of your code)

      const query = "INSERT INTO Emissions (vehicle, emission) VALUES ($1, $2)";
      const values = [
        {
          activity: row.activity,
          type: row.type,
          fuel: row.fuel,
          laden: row.laden,
        },
        row.kgCO2e,
      ];
      await client.query(query, values);
    }

    // Rollback the transaction
    await client.query('ROLLBACK');

    // Close the database connection
    client.end();
  });