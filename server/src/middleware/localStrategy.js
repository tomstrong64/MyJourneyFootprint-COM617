import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserByEmail, getUserById } from '../controllers/userController.js';

function initialize(passport, ) {
  const authenticator = (email, password, done) => {
    const user = getUserByEmail(email);
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    try {
      const match = bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false);
      }
    } catch (e) {
      console.log(e);
      return done(null, false);
    }
    return done(null, user);
  };
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticator));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}


export default initialize;
