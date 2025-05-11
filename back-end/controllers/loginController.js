const db = require('../db/db');

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: 'error', error: 'Email and password are required' });
  }

  db.query(
    'SELECT * FROM USER_CREDENTIALS WHERE EMAIL = ? AND PASSWORD = ?',
    [email, password],
    (err, result) => {
      if (err) {
        return res.status(500).json({ status: 'error', error: err.message });
      }

      if (result.length === 0) {
        return res.status(401).json({ status: 'error', error: 'Invalid email or password' });
      }

      return res.status(200).json({ status: 'success', success: 'Login successful', userId: result[0].ID });
    }
  );
};
