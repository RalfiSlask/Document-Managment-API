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
 * Using select query to check if user exists
 * Decrypts password and checks if it is correct, returns boolean
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  connection.connect((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'error with connection' });
    }

    let query = `SELECT * FROM users WHERE email = ?`;

    connection.query(query, [email], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'error with connection' });
      }

      if (result.length === 0) {
        console.log('user does not exist');
        return res.status(402).json({ error: 'user does not exist' });
      }

      const hashPassword = result[0].password;

      bcrypt.compare(password, hashPassword, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'error with connection' });
        }

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
 * Checks if user already exists with select query
 * Encrypts password with hashing
 * Inserts into database
 */
router.post('/add', (req, res) => {
  const { name, email, password } = req.body;
  connection.connect((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'error with connection' });
    }

    let selectQuery = 'SELECT * FROM users WHERE email = ?';

    connection.query(selectQuery, [email], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'error with connection' });
      }

      if (result.length > 0) {
        console.log('user already exists');
        return res.status(409).json({ error: 'user already exist' });
      }

      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'error crypting password' });
        }
        let query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        connection.query(query, [name, email, hash], (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: 'error with connection' });
          }

          console.log(result);
          res.status(201).json({ message: 'User added' });
        });
      });
    });
  });
});

module.exports = router;
