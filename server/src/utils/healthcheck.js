(async () => {
    const response = await fetch('http://localhost:3000/health');

    if (response.status !== 200) {
        console.log(await response.json());
        process.exit(1);
    }

    process.exit(0);
})();
