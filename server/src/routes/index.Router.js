import passport from 'passport';
import e, { Router } from 'express';
import * as UserController from '../controllers/userController.js';
import { checkNotAuthenticated } from '../middleware/auth.js';

const router = Router();

// route for login
router.post(
  '/login',
  checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);


// route for register
router.post('/register', UserController.createUser);


export default router;