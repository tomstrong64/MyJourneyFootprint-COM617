import fs from "fs/promises";
import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  connectionString: "postgres://postgres:postgres@localhost:5432/postgres",
});

await client.connect();

async function fileTo2DArray(fileName) {
  const file = await fs.readFile(fileName, "utf-8");
  return file.split("\n").map((row) => row.split(","));
}

async function parseHeadedFile(fileName) {
  let data = await fileTo2DArray(fileName);
  let firstColumnFound = false;

  // loop through the first row of the data (columns)
  for (let i = 3; i < data[0].length; i++) {
    // check if there is a column name
    let columnName = data[0][i];

    // if its the first column name, skip it
    if (columnName && !firstColumnFound) {
      firstColumnFound = true;
      continue;
    }

    // if there is no column name and the first column has been found, remove the column
    if (!columnName && firstColumnFound) {
      for (let j = 0; j < data.length; j++) {
        data[j].splice(i, 1);
      }
      i--;
    }
  }

  // loop through rows
  for (let i = 2; i < data.length; i++) {
    // if unit is miles, delete the row
    if (data[i][2] == "miles") {
      data.splice(i, 1);
    }
  }

  data.splice(1, 1);

  // delete column at index 2
  for (let i = 0; i < data.length; i++) {
    data[i].splice(2, 1);
  }

  // create a new table where each named column is moved into its own row
  let newData = [];
  for (let i = 1; i < data.length; i++) {
    for (let j = 2; j < data[i].length; j++) {
      let newRow = [data[i][0], data[i][1], data[0][j], data[i][j]];
      newData.push(newRow);
    }
  }

  // fill the first column with the same value until a new value is found
  for (let i = 0; i < newData.length; i++) {
    if (!newData[i][0]) {
      newData[i][0] = newData[i - 1][0];
    }
  }

  //TODO: remove rows where a value is missing

  for (let i = 0; i < newData.length; i++) {
    for (let j = 0; j < newData[i].length; j++) {
      if (newData[i][j] == "" || newData[i][j] == "\r") {
        newData.splice(i, 1);
        i--;
      }
    }
  }
  for (let i = 0; i < newData.length; i++) {
    // turn strings into numbs
    newData[i][newData[i].length - 1] = parseFloat(
      newData[i][newData[i].length - 1]
    );
  }

  console.table(newData);

  return newData;
}

async function parseHeadlessFile(fileName) {
  let data = await fileTo2DArray(fileName);
  // delete columns 4-6
  for (let i = 0; i < data.length; i++) {
    data[i].splice(4, data[i].length - 1);
  }

  // remove first row
  data.splice(0, 1);

  // remove rows where column 2 is miles
  for (let i = 0; i < data.length; i++) {
    if (data[i][2] == "miles") {
      data.splice(i, 1);
    }
  }

  //remove column 2
  for (let i = 0; i < data.length; i++) {
    data[i].splice(2, 1);
  }

  // fill the first column with the same value until a new value is found
  for (let i = 0; i < data.length; i++) {
    if (!data[i][0]) {
      data[i][0] = data[i - 1][0];
    }
  }

  //TODO: remove rows where a value is missing
  for (let i = 0; i < data.length; i++) {
    if (data[i].length < 3) {
      data.splice(i, 1);
      continue;
    }
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] == "" || data[i][j] == "/r" || data[i][j] == undefined) {
        data.splice(i, 1);
      }
    }
  }
  for (let i = 0; i < data.length; i++) {
    // turn strings into numbs
    data[i][data[i].length - 1] = parseFloat(data[i][data[i].length - 1]);
  }

  console.table(data);
  return data;
}

async function insertMBData(dataToInsert) {
  for (let row of dataToInsert) {
    const vehicle = {
      activity: row[0],
      type: row[1],
      fuel: "Petrol",
      laden: "Not Applicable", // or whatever default value you want to use
    };

    const query =
      "INSERT INTO Emissions (vehicle_activity, vehicle_type, vehicle_fuel, vehicle_laden, emission) VALUES ($1, $2, $3, $4, $5)";
    const values = [
      vehicle.activity,
      vehicle.type,
      vehicle.fuel,
      vehicle.laden,
      row[2],
    ];

    try {
      await client.query(query, values);

      // Print the query and values to the console instead of executing the query
      console.log(`Query: ${query}`);
      console.log(`Values: ${JSON.stringify(vehicle)}, ${row[2]}`);
    } catch (err) {
      console.error(err);
    }
  }
}

async function insertFuelData(dataToInsert) {
  for (let row of dataToInsert) {
    const vehicle = {
      activity: row[0],
      type: row[1],
      fuel: row[2],
      laden: "Not Applicable", // or whatever default value you want to use
    };

    const query =
      "INSERT INTO Emissions (vehicle_activity, vehicle_type, vehicle_fuel, vehicle_laden, emission) VALUES ($1, $2, $3, $4, $5)";
    const values = [
      vehicle.activity,
      vehicle.type,
      vehicle.fuel,
      vehicle.laden,
      row[3],
    ];

    try {
      await client.query(query, values);

      // Print the query and values to the console instead of executing the query
      console.log(`Query: ${query}`);
      console.log(`Values: ${JSON.stringify(vehicle)}, ${row[3]}`);
    } catch (err) {
      console.error(err);
    }
  }
}

async function insertLadenData(dataToInsert) {
  for (let row of dataToInsert) {
    const vehicle = {
      activity: row[0],
      type: row[1],
      fuel: "Diesel",
      laden: row[2],
    };

    const query =
      "INSERT INTO Emissions (vehicle_activity, vehicle_type, vehicle_fuel, vehicle_laden, emission) VALUES ($1, $2, $3, $4, $5)";
    const values = [
      vehicle.activity,
      vehicle.type,
      vehicle.fuel,
      vehicle.laden,
      row[3],
    ];

    try {
      await client.query(query, values);

      // Print the query and values to the console instead of executing the query
      console.log(`Query: ${query}`);
      console.log(`Values: ${JSON.stringify(vehicle)}, ${row[2]}`);
    } catch (err) {
      console.error(err);
    }
  }
}

async function dropDatabase() {
  try {
    const query = await fs.readFile("dropDB.sql", "utf8");
    await client.query(query);
  } catch (err) {
    console.error(err);
  }
}

async function createDatabase() {
  try {
    const query = await fs.readFile("setupDB.sql", "utf8");
    await client.query(query);
  } catch (err) {
    console.error(err);
  }
}

await dropDatabase();
await createDatabase();

// insert fuel based emissions data
const filesFuel = ["Cars_By_Size.csv", "Cars_By_Market.csv", "Vans.csv"].map(
  (n) => `data/${n}`
);

for (let file of filesFuel) {
  const data = await parseHeadedFile(file);
  await insertFuelData(data);
}

// insert laden based emissions data
const filesLaden = ["HGVs_allDiesel.csv", "HGVs_Refrigerated.csv"].map(
  (n) => `data/${n}`
);

for (let file of filesLaden) {
  const data = await parseHeadedFile(file);
  await insertLadenData(data);
}

// insert motorbike data
const motorbikeData = await parseHeadlessFile("data/Motorbike.csv");
await insertMBData(motorbikeData);

// display data that has been inserted
const data = await client.query("SELECT * FROM Emissions");
console.log(data.rows);

await client.end();
