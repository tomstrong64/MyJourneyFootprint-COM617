import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserByEmail } from '../services/userService.js';
import { getUserById } from '../services/userService.js';


export const Strategy = new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    const user = await getUserByEmail(email);

    if (!user) {
      return done(null, false);
    }

    try {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false);
      }
    } catch (e) {
      console.log(e);
      return done(null, false);
    }
    return done(null, user);
  }
);

passport.serializeUser = (user, done) => {
  done(null, user.id);
};

passport.deserializeUser = async (id, done) => {
  try {
    const user = await getUserById(id);
    if (!user) {
      return done(new Error('User not found'), null);
    }
    done(null, user);
  } catch (e) {
    done(e, null);
  }
};

export default passport;