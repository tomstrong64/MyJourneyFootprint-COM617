// routes/userRoutes.js
import { Router } from 'express';
import passport from 'passport';
import * as PassportController from '../controllers/passport.controller';
const router = Router();

router.app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name });
});

router.app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs');
});

router.app.post(
  '/login',
  checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);



router.post('/register',PassportController.checkAuthenticated ,PassportController.createUser);      
   

router.app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});


export default router;
