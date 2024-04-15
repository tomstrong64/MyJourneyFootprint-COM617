import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';

function initialize(passport, getUserByEmail) {
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
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
}


export default initialize;
