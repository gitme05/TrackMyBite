const db = require('../db/db');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: 'error', error: 'Email and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO USER_CREDENTIALS (EMAIL, PASSWORD, ACCOUNT_STATUS) VALUES (?, ?, ?)',
      [email, hashedPassword, 'Active'],
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
  } catch (error) {
    return res.status(500).json({ status: 'error', error: 'Server error during user creation' });
  }
};

