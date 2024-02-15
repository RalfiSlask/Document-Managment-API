var express = require('express');
var router = express.Router();
const connection = require('../lib/conn');
const bcrypt = require('bcrypt');
const saltRounds = 12;

/**
 * Get all users
 */
router.get('/all', function (req, res, next) {
  connection.connect((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'error with connection' });
    }

    let query = 'SELECT * FROM users';

    connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'error with connection' });
      }

      console.log('result', result);
      res.json(result);
    });
  });
});

/**
 * Login user
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  connection.connect((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'error with connection' });
    }

    let query = `SELECT * FROM users WHERE email="${email}"`;

    connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'error with connection' });
      }

      if (result.length === 0) {
        console.log('user does not exist');
        return res.status(402).json({ error: 'user does not exist' });
      }

      const hashPassword = result[0].password;

      bcrypt.compare(password, hashPassword).then(function (result) {
        console.log(result);
        // result == true

        if (result) {
          console.log(result);
          res.json({ message: 'login works' });
        } else {
          res.status(401).json({ error: 'password is incorrect' });
        }
      });
    });
  });
});

/**
 * Create user
 */
router.post('/add', (req, res) => {
  const { name, email, password } = req.body;
  connection.connect((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'error with connection' });
    }

    let query = 'SELECT * FROM users';

    connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'error with connection' });
      }

      const users = result;
      const doesUserExist = users.find((user) => user.email === email);
      if (doesUserExist) {
        console.log('user already exist');
        return res.status(404).json({ error: 'user already exist' });
      }

      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'error crypting password' });
        }
        let query = `INSERT INTO users (name, email, password) VALUES ("${name}", "${email}", "${hash}")`;
        connection.query(query, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: 'error with connection' });
          }

          console.log(result);
          res.json(result);
        });
      });
    });
  });
});

module.exports = router;
