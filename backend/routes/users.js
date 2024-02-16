var express = require('express');
var router = express.Router();
const connection = require('../lib/conn');
const bcrypt = require('bcrypt');
const saltRounds = 12;

/**
 * Get all users
 */
router.get('/all', function (req, res) {
  connection.connect((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'error with connection' });
    }

    let selectQuery = 'SELECT * FROM users';

    connection.query(selectQuery, (err, users) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'error with connection' });
      }

      const sentResults = users.map((user) => {
        const userNoPass = { ...user };
        delete userNoPass.password;
        return userNoPass;
      });

      console.log('users', sentResults);
      res.json(sentResults);
    });
  });
});

/**
 * Get specific user
 */
router.get('/:userId', function (req, res) {
  console.log(req.body);
  connection.connect((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'error with connection' });
    }

    let selectQuery = `SELECT id, email, name FROM users WHERE id="${req.params.userId}"`;

    connection.query(selectQuery, (err, userData) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'error with connection' });
      }

      console.log('user', userData[0]);
      res.json(userData[0]);
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
      const { name, id } = result[0];

      bcrypt.compare(password, hashPassword, (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'error with connection' });
        }

        if (data) {
          console.log(data);
          res.json({ name: name, id: id });
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
          res
            .status(201)
            .json({ message: 'User added', name: name, email: email });
        });
      });
    });
  });
});

module.exports = router;
