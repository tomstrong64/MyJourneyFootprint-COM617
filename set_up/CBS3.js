const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

let data = [];
let previousType = '';
let previousActivity = '';

fs.createReadStream('new_Cars_By_Size.csv')
    .pipe(csv())
    .on('data', (row) => {
        if (row.Type === '') { // Make sure 'Type' matches the column name in your CSV file
            row.Type = previousType;
            row.Activity = previousActivity; // Keep the 'Activity' value from the previous row
        } else {
            previousType = row.Type;
            previousActivity = row.Activity; // Save the 'Activity' value for the next row
        }
        if (row.Unit !== 'km') { // Only push the row if 'Unit' is not 'Km'
            data.push(row);
        }
    })
    .on('end', () => {
        const csvWriter = createCsvWriter({
            path: 'CBS.csv',
            header: Object.keys(data[0]).map(key => ({id: key, title: key})),
        });

        csvWriter
            .writeRecords(data)
            .then(()=> console.log('The CSV file was written successfully'));
    });