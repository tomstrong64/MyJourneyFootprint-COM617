const { execSync } = require('child_process');

try {
    console.log('Running first script...');
    execSync('node CBM.js', { stdio: 'inherit' });

    console.log('Running second script...');
    execSync('node CBM2.js', { stdio: 'inherit' });

    console.log('Running third script...');
    execSync('node CBM3.js', { stdio: 'inherit' });

    console.log('Running fourth script...');
    execSync('node CBS.js', { stdio: 'inherit' });

    console.log('Running fifth script...');
    execSync('node CBS2.js', { stdio: 'inherit' });

    console.log('Running sixth script...');
    execSync('node CBS3.js', { stdio: 'inherit' });

    console.log('Running seventh script...');
    execSync('node HGVD.js', { stdio: 'inherit' });

    console.log('Running eighth script...');
    execSync('node HGVD2.js', { stdio: 'inherit' });

    console.log('Running ninth script...');
    execSync('node HGVD3.js', { stdio: 'inherit' });

    console.log('Running tenth script...');
    execSync('node HGVR.js', { stdio: 'inherit' });

    console.log('Running eleventh script...');
    execSync('node HGVR2.js', { stdio: 'inherit' });

    console.log('Running twelfth script...');
    execSync('node HGVR3.js', { stdio: 'inherit' });

    console.log('Running thirteenth script...');
    execSync('node Vans.js', { stdio: 'inherit' });

    console.log('Running fourteenth script...');
    execSync('node Vans2.js', { stdio: 'inherit' });

    console.log('Running fifteenth script...');
    execSync('node Vans3.js', { stdio: 'inherit' });

    console.log('Running sixteenth script...');
    execSync('node MB3.js', { stdio: 'inherit' });

    console.log('All scripts executed successfully.');
} catch (error) {
    console.error('Error occurred:', error);
}