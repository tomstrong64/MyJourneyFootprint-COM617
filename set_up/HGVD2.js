const fs = require('fs');
const csv = require('csv-parser');
const { Parser } = require('json2csv');

let data = [];
let existingData = [];

fs.createReadStream('new_HGVD.csv')
    .pipe(csv())
    .on('data', (row) => {
        existingData.push(row);
    })
    .on('end', () => {
        fs.createReadStream('HGVs_allDiesel.csv')
            .pipe(csv())
            .on('data', (row) => {
                
                // Select the columns you want
                let newRow = {
                    '0% Laden': Number(row['0% Laden']),
                    '50% Laden': Number(row['50% Laden']),
                    '100% Laden': Number(row['100% Laden']),
                    'Avarage laden': Number(row['Avarage laden'])
                };
                if (!isNaN(newRow['0% Laden']) && !isNaN(newRow['50% Laden']) && !isNaN(newRow['100% Laden']) && !isNaN(newRow['Avarage laden'])){
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
                fs.writeFile('new_HGVD.csv', csv, (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
            });
    });