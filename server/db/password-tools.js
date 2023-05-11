const crypto = require('crypto');
const ITERATIONS = 1000;
const KEYLEN = 64;
const DIGEST = 'sha512';

function hashPassword(password, previousSalt=undefined) {
  let salt;
  if (previousSalt) {
    salt = previousSalt;
  } else {
    salt = crypto.randomBytes(16).toString('hex');
  }
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST).toString('hex');
  return {
    salt,
    hash,
  };
}

function verifyPassword(password, user) {
  const { password_hash, password_salt } = user;
  const { hash } = hashPassword(password, password_salt);
  return hash === password_hash;
}

module.exports = {
  hashPassword,
  verifyPassword,
};
