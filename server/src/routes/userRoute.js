// routes/userRoutes.js
import { Router } from 'express';
import { checkNotAuthenticated } from '../middleware/auth.js';

const router = Router();

/* router.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name });
}); */

router.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs');
});

router.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

export default router;
