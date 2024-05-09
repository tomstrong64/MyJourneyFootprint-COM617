// routes/userRoutes.js
import { Router } from 'express';
import { checkNotAuthenticated } from '../middleware/auth.js';
import * as UserController from '../controllers/user.controller.js';
import passport from 'passport';

const router = Router();

router.post('/register', checkNotAuthenticated, UserController.createUser);

router.post('/login', checkNotAuthenticated, function (req, res, next) {
  passport.authenticate('local', function (err, user, info, status) {
    if (err) return res.sendStatus(500);
    if (!user) return res.sendStatus(401);
    res.sendStatus(200);
  })(req, res, next);
});

router.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

export default router;
