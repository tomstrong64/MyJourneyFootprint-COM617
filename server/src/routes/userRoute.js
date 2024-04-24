// routes/userRoutes.js
import { Router } from 'express';
import { checkNotAuthenticated } from '../middleware/auth.js';
import UserController from '../controllers/userController.js';

const router = Router();

/* router.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name });
}); */

router.post('/register', checkNotAuthenticated, UserController.createUser) 

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
});


router.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

export default router;
