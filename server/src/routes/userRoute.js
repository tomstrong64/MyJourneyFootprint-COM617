// routes/userRoutes.js
import { Router } from 'express';
import { checkNotAuthenticated } from '../middleware/auth.js';
import UserController from '../controllers/userController.js';
import passport from 'passport';

const router = Router();

/* router.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name });
}); */

router.post('/register', checkNotAuthenticated, UserController.createUser) 

router.post('/login', checkNotAuthenticated, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!user) {
      console.log(info); // This will log the message set in the done callback in your local strategy
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});


router.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

export default router;
