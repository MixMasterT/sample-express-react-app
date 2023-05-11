const passport = require('passport');
const passportJWT = require('passport-jwt');

const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const { getUserByEmail } = require('./db/pg_connection');
const { verifyPassword } = require('./db/password-tools');

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, callBack) => {
    getUserByEmail(email).then((user) => {
      if (!user) {
        return callBack(null, false, { message: 'Incorrect email.' });
      }
      if (!verifyPassword(password, user)) {
        return callBack(null, false, { message: 'Incorrect password.' });
      }
      return callBack(null, user);
    }).catch((err) => {
      if (err) {
        console.log('checking password failed: ', err);
        return callBack(err);
      }
    });
  }
));

passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  (jwtPayload, callBack) => {
    getUserByEmail(jwtPayload.email).then((user) => {
      if (!user) {
        return callBack(null, false, { message: 'Incorrect email.' });
      }
      return callBack(null, user);
    }).catch((err) => {
      if (err) {
        console.log('checking password failed: ', err);
        return callBack(err);
      }
    });
  }
));
