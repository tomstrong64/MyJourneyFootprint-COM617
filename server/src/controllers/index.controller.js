export const logRequest = async (req, res, next) => {
  console.log(`${req.ip} - ${req.method} - ${req.originalUrl}`);
  return next();
};
