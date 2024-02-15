var express = require('express');
var router = express.Router();
const connection = require('../lib/conn');

/* GET users listing. */
router.get('/all', function (req, res, next) {
  connection.connect((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'error with connection' });
    }
  });
  res.json({ login: 'all works' });
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
