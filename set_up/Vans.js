const fs = require('fs');
const Papa = require('papaparse');

const file = fs.readFileSync('Vans.csv', 'utf8');

Papa.parse(file, {
    complete: function(results) {
        let data = results.data;
        let firstThreeColumns = data.map(row => row.slice(0, 3));
        if (firstThreeColumns[0].every(item => item === '')) {
            firstThreeColumns.shift(); // remove the first row if it's empty
        }
        let csv = Papa.unparse(firstThreeColumns);
        fs.writeFileSync('new_Vans.csv', csv);
    }
});