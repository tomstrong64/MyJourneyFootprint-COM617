// routes/userRoutes.js
import { Router } from 'express';
import { checkNotAuthenticated } from '../middleware/auth.js';
import * as UserController from '../controllers/user.controller.js';
import passport from 'passport';

const router = Router();

router.get('/', UserController.getUser);

router.post('/register', checkNotAuthenticated, UserController.createUser);

router.post('/login', checkNotAuthenticated, function (req, res, next) {
  passport.authenticate('local', function (err, user, info, status) {
    // redirect to localhost in dev
    let prefix = '';
    if (req.headers.referer && req.headers.referer.includes('5173'))
      prefix = 'http://localhost:5173';
    if (err || !user) return res.redirect(`${prefix}/login`);
    return res.redirect(`${prefix}/`);
  })(req, res, next);
});

router.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

export default router;
