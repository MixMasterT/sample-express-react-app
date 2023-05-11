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
    console.log('inside login route, req.body: ', req.body);
    passport.authenticate('local', { session: false }, (err, user, info) => {
      console.log('inside authenticate callback');
      if (err) {
        console.log('inside authenticate callback err: ', err);
        return next(err);
      }
      if (!user) {
        console.log('inside authenticate callback !user: ', !user);
        return res.status(401).json({ message: info.message });
      }
      req.login(user, { session: false }, (err) => {
        console.log('inside req.login callback');
        if (err) {
          console.log('inside req.login callback err: ', err);
          return next(err);
        }
        const token = jwt.sign(user, process.env.JWT_SECRET);
        return res.json({ user, token });
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
      console.log('user inserted: ', user)
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
