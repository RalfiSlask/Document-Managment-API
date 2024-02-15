var express = require('express');
var router = express.Router();
const connection = require('../lib/conn');

/**
 * Get all documents
 */
router.get('/all', function (req, res, next) {
  connection.connect((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'error with connection' });
    }

    let query = 'SELECT * FROM documents';

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
 * Get documents for specific user
 */
router.get('/:userId', function (req, res, next) {
  connection.connect((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'error with connection' });
    }

    let query = `SELECT * FROM documents WHERE user_id="${req.params.userId}"`;

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
 * Soft delete for document
 * If delete request does not provide userId and documentId return
 * Checking if document exist in database
 * Update delete status for document
 */
router.delete('/remove', function (req, res, next) {
  connection.connect((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'error with connection' });
    }

    const { userId, documentId } = req.body;

    if (!userId || !documentId) {
      console.log('you have to provide ids');
      return res.status(401).json({ error: 'you have to provide ids' });
    }

    let selectQuery = `SELECT * FROM documents WHERE user_id="${userId}" AND document_id="${documentId}"`;

    connection.query(selectQuery, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'error with connection' });
      }

      if (data.length === 0) {
        console.log(data);
        return res.status(404).json({ error: 'document does not exist' });
      }

      let deleteQuery = `UPDATE documents SET deleted=1 WHERE user_id="${userId}" AND document_id="${documentId}" AND deleted=0`;

      connection.query(deleteQuery, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'error with connection' });
        }

        console.log('result', result);
        res.json(result);
      });
    });
  });
});

module.exports = router;
