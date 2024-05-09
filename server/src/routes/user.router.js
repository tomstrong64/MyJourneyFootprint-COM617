// routes/userRoutes.js
import { Router } from 'express';
import { checkNotAuthenticated } from '../middleware/auth.js';
import * as UserController from '../controllers/user.controller.js';
import passport from 'passport';

const router = Router();

router.post('/register', checkNotAuthenticated, UserController.createUser);

router.post('/login', checkNotAuthenticated, function (req, res, next) {
  console.log(req.body);
  passport.authenticate('local', function (err, user, info, status) {
    console.log(err);
    console.log(user);
    if (err || !user) return res.redirect('/login');
    return res.redirect('/');
  })(req, res, next);
});

router.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

export default router;
