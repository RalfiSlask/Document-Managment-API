var express = require('express');
var router = express.Router();
const connection = require('../lib/conn');

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
  });

  res.send('login works');
});

/**
 * Create user
 */
router.post('/add', (req, res) => {
  connection.connect((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'error with connection' });
    }
  });

  res.send('add works');
});

module.exports = router;
