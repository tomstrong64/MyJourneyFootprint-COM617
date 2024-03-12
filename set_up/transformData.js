import fs from "fs/promises";
import pkg from "pg";
const { Client } = pkg;

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

async function insertData(dataToInsert) {

  const client = new Client({
    connectionString:
      "postgres://postgres:postgres@localhost:5432/postgres",
  });

  await client.connect();
  for (let row of dataToInsert) {

    const vehicle = {
      activity: row[0],
      type: row[1],
      fuel: 'Petrol',
      laden: 'Not Applicable' // or whatever default value you want to use
    };


    const query = "INSERT INTO Emissions (vehicle, emission) VALUES (($1, $2, $3, $4), $5)";
    const values = [vehicle.activity, vehicle.type, vehicle.fuel, vehicle.laden, row[2]];

    try {
            await client.query(query, values);
      
      // Print the query and values to the console instead of executing the query
      console.log(`Query: ${query}`);
      console.log(`Values: ${JSON.stringify(vehicle)}, ${row[2]}`);    } catch (err) {
      console.error(err);
    }
  }
}

async function insertNewData(dataToInsert) {

  const client = new Client({
    connectionString:
      "postgres://postgres:postgres@localhost:5432/postgres",
  });

  await client.connect();
  for (let row of dataToInsert) {

    const vehicle = {
      activity: row[0],
      type: row[1],
      fuel: row[2],
      laden: 'Not Applicable' // or whatever default value you want to use
    };


    const query = "INSERT INTO Emissions (vehicle, emission) VALUES (($1, $2, $3, $4), $5)";
    const values = [vehicle.activity, vehicle.type, vehicle.fuel, vehicle.laden, row[3]];

    try {
            await client.query(query, values);
      
      // Print the query and values to the console instead of executing the query
      console.log(`Query: ${query}`);
      console.log(`Values: ${JSON.stringify(vehicle)}, ${row[3]}`);    } catch (err) {
      console.error(err);
    }
  }
}

async function insertNewData1(dataToInsert) {

  const client = new Client({
    connectionString:
      "postgres://postgres:postgres@localhost:5432/postgres",
  });

  await client.connect();
  for (let row of dataToInsert) {

    const vehicle = {
      activity: row[0],
      type: row[1],
      fuel: 'Not Applicable',
      laden: row[2] 
    };


    const query = "INSERT INTO Emissions (vehicle, emission) VALUES (($1, $2, $3, $4), $5)";
    const values = [vehicle.activity, vehicle.type, vehicle.fuel, vehicle.laden, row[3]];

    try {
            await client.query(query, values);
       
      // Print the query and values to the console instead of executing the query
      console.log(`Query: ${query}`);
      console.log(`Values: ${JSON.stringify(vehicle)}, ${row[2]}`);    } catch (err) {
      console.error(err);
    }
  }
}



const filesFuel = [
  "Cars_By_Size.csv",
  "Cars_By_Market.csv",
  "Vans.csv",
];

const filesLaden =[
  "HGVs_allDiesel.csv",
  "HGVs_Refrigerated.csv",
]

filesFuel.forEach(parseHeadedFile);
filesLaden.forEach(parseHeadedFile);


parseHeadlessFile("Motorbike.csv");

/* parseHeadlessFile("Motorbike.csv").then(data => {
  insertData(data);
});

Promise.all(filesFuel.map(parseHeadedFile)).then(newDataArray => {
  // newDataArray is an array of the results of each call to parseHeadedFile
  newDataArray.forEach(newData => {
    insertNewData(newData);
  });
});

Promise.all(filesLaden.map(parseHeadedFile)).then(newData1Array => {
  // newDataArray is an array of the results of each call to parseHeadedFile
  newData1Array.forEach(newData => {
    insertNewData1(newData);
  });
});
 */
async function retrieveData() {

  const client = new Client({
    connectionString: "postgres://postgres:postgres@localhost:5432/postgres",
  });

  await client.connect();

  try {
    const res = await client.query("SELECT * FROM Emissions");
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

retrieveData();
