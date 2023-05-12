const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { insertUser } = require('../db/pg_connection');
const { hashPassword } = require('../db/password-tools');
const router = express.Router();

router.get('/test-public', (req, res) => {
  res.status(200).send('Public route is working!')
});

router.post(
  '/login',
  (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          return next(err);
        }
        const frontendUser = { email: user.email };
        const token = jwt.sign(frontendUser, process.env.JWT_SECRET);
        return res.json({ user: frontendUser, token });
      });
    })(req, res, next);
  }
);

router.post(
  '/register',
  (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: 'email and password are required'});
    }
    insertUser({ email, password }).then((user) => {
      if (!user) {
        return res.status(400).send({ message: 'user signup failed'});
      }
      const token = jwt.sign(user, process.env.JWT_SECRET);
      res.status(200).json({ user, token });
    }).catch((err) => {
      if (err) {
        console.log('error inside register function: ', err);
        return next(err);
      }
    });
  }
);

module.exports = router;
