const fs = require('fs');
const Papa = require('papaparse');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { Parser } = require('json2csv');

// First script
const file = fs.readFileSync('Cars_By_Market.csv', 'utf8');

Papa.parse(file, {
    complete: function(results) {
        let data = results.data;
        let firstThreeColumns = data.map(row => row.slice(0, 3));
        if (firstThreeColumns[0].every(item => item === '')) {
            firstThreeColumns.shift(); // remove the first row if it's empty
        }
        let csv = Papa.unparse(firstThreeColumns);
        fs.writeFileSync('new_Cars_By_Market.csv', csv);
    }
});

// Second script
let data = [];
let existingData = [];

fs.createReadStream('new_Cars_By_Market.csv')
    .pipe(csv())
    .on('data', (row) => {
        existingData.push(row);
    })
    .on('end', () => {
        fs.createReadStream('Cars_By_Market.csv')
            .pipe(csv())
            .on('data', (row) => {
                
                // Select the columns you want
                let newRow = {
                    'Diesel': Number(row['Diesel']),
                    'Petrol': Number(row['Petrol']),
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
                fs.writeFile('new_Cars_By_Market.csv', csv, (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
            });
    });

// Third script
data = [];
let previousType = '';

fs.createReadStream('new_Cars_By_Market.csv')
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
            path: 'out.csv',
            header: Object.keys(data[0]).map(key => ({id: key, title: key})),
        });

        csvWriter
            .writeRecords(data)
            .then(()=> console.log('The CSV file was written successfully'));
    });