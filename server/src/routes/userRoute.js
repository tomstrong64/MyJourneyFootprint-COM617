// routes/userRoutes.js
import express from express;
import router from express.Router();
import userController from '../controllers/userController';

router.post('/register', userController.createUser);
router.post('/login', userController.login);


module.exports = router;
