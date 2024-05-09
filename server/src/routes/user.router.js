// routes/userRoutes.js
import { Router } from 'express';
import { checkNotAuthenticated } from '../middleware/auth.js';
import * as UserController from '../controllers/user.controller.js';
import passport from 'passport';

const router = Router();

/* router.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name });
}); */

router.post('/register', checkNotAuthenticated, UserController.createUser);

router.post(
  '/login',
  checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

router.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

export default router;
