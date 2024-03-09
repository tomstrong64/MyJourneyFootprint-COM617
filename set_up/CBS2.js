const fs = require('fs');
const csv = require('csv-parser');
const { Parser } = require('json2csv');

let data = [];
let existingData = [];

fs.createReadStream('new_Cars_By_Size.csv')
    .pipe(csv())
    .on('data', (row) => {
        existingData.push(row);
    })
    .on('end', () => {
        fs.createReadStream('Cars_By_Size.csv')
            .pipe(csv())
            .on('data', (row) => {
                
                // Select the columns you want
                let newRow = {
                    'Diesel': Number(row['Diesel']),
                    'Petrol': Number(row['Petrol']),
                    'Hybrid': Number(row['Hybrid']),
                    'CNG': Number(row['CNG']),
                    'LPG': Number(row['LPG']),
                    'Unknown': Number(row['Unknown']),
                    'Plug-in Hybrid Electric Vehicle': Number(row['Plug-in Hybrid Electric Vehicle']),
                    'Battery Electric Vehicle': Number(row['Battery Electric Vehicle'])
                };
                if (!isNaN(newRow['Diesel']) && !isNaN(newRow['Petrol']) && !isNaN(newRow['Unknown']) && !isNaN(newRow['Plug-in Hybrid Electric Vehicle']) && !isNaN(newRow['Battery Electric Vehicle'])) {
                    data.push(newRow);
                }
            })
            .on('end', () => {
                for (let i = 0; i < data.length; i++) {
                    // Merge the existing data with the new data
                    existingData[i] = { ...existingData[i], ...data[i] };
                }

                // Convert the merged data to CSV
                const json2csvParser = new Parser();
                const csv = json2csvParser.parse(existingData);

                // Write the merged data to the new CSV file
                fs.writeFile('new_Cars_By_Size.csv', csv, (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
            });
    });