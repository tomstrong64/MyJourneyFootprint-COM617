export const getHealth = (req, res) => {
    const db = true; // TODO: check db connection
    const upTime = process.uptime();
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    const status = {
        db,
        upTime,
        memoryUsage,
        cpuUsage,
    };

    if (!db) return res.status(503).json(status);

    return res.status(200).json(status);
};
