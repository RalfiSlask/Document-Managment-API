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
  connection.connect((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'error with connection' });
    }

    const { email, password } = req.body;

    connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'error with connection' });
      }

      console.log(result);
      res.json(result);
    });
  });

  res.send('login works');
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
