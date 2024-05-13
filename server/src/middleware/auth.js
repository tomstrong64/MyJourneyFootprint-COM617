export const checkAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect('/login');

  return next();
};

export const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect('/');

  return next();
};
