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

fs.createReadStream("Cars_By_Market.csv")
  .pipe(csv())
  .on("data", (data) => {
    // Only add rows where the activity is 'Cars (by market segment)' and the Unit is 'mile'
    if (data.activity === "Cars (by market segment)" && data.Unit === "mile") {
      results.push(data);
    }
  })
  .on("end", () => {
    // Insert the data into the database
    results.forEach((row) => {
      // Determine the fuel type
      if (row["Diesel"]) {
        row.fuel = "Diesel";
      } else if (row["Petrol"]) {
        row.fuel = "Petrol";
      } else if (row["Plug-in Hybrid Electric Vehicle"]) {
        row.fuel = "Plug-in Hybrid Electric Vehicle";
      } else if (row["Battery Electric Vehicle"]) {
        row.fuel = "Battery Electric Vehicle";
      } else if (row["Unknown"]) {
        row.fuel = "Unknown";
      } else if (row["0% Laden"]) {
        row.laden = "0% Laden";
      } else if (row["50% Laden"]) {
        row.laden = "50% Laden";
      } else if (row["100% Laden"]) {
        row.laden = "100% Laden";
      } else if (row["Avarage laden"]) {
        row.laden = "Avarage laden";
      } else {
        row.laden = "Not Applicable";
      }

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
      client.query(query, values, (err, res) => {
        if (err) throw err;
        console.log("Row inserted:", res.rowCount);
      });
    });

    // Close the database connection
    client.end();
  });
