var express = require('express');
var router = express.Router();
const connection = require('../lib/conn');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

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

      res.json(result);
    });
  });
});

/**
 * Get documents for specific user
 */
router.get('/:userId', function (req, res, next) {
  /*   const token = req.headers.authorization.split(' ')[1]; */
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'authorization denied' });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: 'you are not authorized' });
    }
  });

  connection.connect((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'error with connection' });
    }

    let query = `SELECT * FROM documents WHERE user_id = ? AND deleted="0"`;

    connection.query(query, [req.params.userId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'error with connection' });
      }

      res.json(result);
    });
  });
});

// Unsure if it is better to use one single patch request or three different ones?

/**
 * Update content
 * Uses select query to check if the document exists in database
 * Updates document with values sent in body
 */
router.patch('/update', function (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'authorization denied' });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: 'you are not authorized' });
    }
  });

  connection.connect((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'error with connection' });
    }

    const { user_id, document_id, content, title, description } = req.body;

    let selectQuery = `SELECT * FROM documents WHERE user_id = ? AND document_id = ?`;

    connection.query(selectQuery, [user_id, document_id], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'error with connection' });
      }

      let updateQuery = `UPDATE documents SET content = ?, title = ?, description = ?  WHERE user_id = ? AND document_id = ?`;

      connection.query(
        updateQuery,
        [content, title, description, user_id, document_id],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: 'error with connection' });
          }

          res.json(result);
        }
      );
    });
  });
});

/**
 * Soft delete for document
 * If delete request does not provide userId and documentId return
 * Checking if document exist in database
 * Update delete status for document
 */
router.delete('/remove', function (req, res) {
  /*   const token = req.headers.authorization.split(' ')[1]; */
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'authorization denied' });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: 'you are not authorized' });
    }
  });

  connection.connect((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'error with connection' });
    }

    const { userId, documentId } = req.body;

    if (!userId || !documentId) {
      return res.status(401).json({ error: 'you have to provide ids' });
    }

    let selectQuery = `SELECT * FROM documents WHERE user_id = ? AND document_id = ?`;

    connection.query(selectQuery, [userId, documentId], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'error with connection' });
      }

      if (data.length === 0) {
        return res.status(404).json({ error: 'document does not exist' });
      }

      let deleteQuery = `UPDATE documents SET deleted=1 WHERE user_id = ? AND document_id = ? AND deleted = 0`;

      connection.query(deleteQuery, [userId, documentId], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'error with connection' });
        }

        res.json(result);
      });
    });
  });
});

/**
 * Create new document
 */
router.post('/add/:userId', function (req, res) {
  /*   const token = req.headers.authorization.split(' ')[1]; */
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'authorization denied' });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: 'you are not authorized' });
    }
  });

  const { title, description, content } = req.body;

  connection.connect((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'error with connection' });
    }

    if (!title || !description) {
      return res
        .status(404)
        .json({ error: 'you have to provide contents for the document' });
    }

    let insertQuery = `INSERT INTO documents (title, description, content, user_id) VALUES (?, ?, ?, ?)`;

    connection.query(
      insertQuery,
      [title, description, content, req.params.userId],
      (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'error inserting' });
        }

        res.status(201).json({ message: 'created new document', data: data });
      }
    );
  });
});

module.exports = router;
