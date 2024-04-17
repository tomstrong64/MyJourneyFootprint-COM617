import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserByEmail } from '../services/userService.js';

const Strategy = new LocalStrategy(
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

export default Strategy;
