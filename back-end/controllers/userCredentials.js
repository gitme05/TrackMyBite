const db = require('../db/db');

exports.createUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: 'error', error: 'Email and password are required' });
  }

  db.query(
    'INSERT INTO USER_CREDENTIALS (EMAIL, PASSWORD, ACCOUNT_STATUS) VALUES (?, ?, ?)',
    [email, password, 'Active'],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ status: 'error', error: 'Email already in use' });
        }
        return res.status(500).json({ status: 'error', error: err.message });
      }
      return res.status(201).json({ status: 'success', success: 'User created', userId: result.insertId });
    }
  );
};
