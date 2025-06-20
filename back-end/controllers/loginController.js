require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: 'error', error: 'Email and password are required' });
  }

  try {
    db.query('SELECT * FROM USER_CREDENTIALS WHERE EMAIL = ?', [email], async (err, result) => {
      if (err) return res.status(500).json({ status: 'error', error: err.message });

      if (result.length === 0) {
        return res.status(401).json({ status: 'error', error: 'Invalid email or password' });
      }

      const user = result[0];
      const isMatch = await bcrypt.compare(password, user.PASSWORD);
      if (!isMatch) {
        return res.status(401).json({ status: 'error', error: 'Invalid email or password' });
      }

    
      const token = jwt.sign({ id: user.ID }, JWT_SECRET, { expiresIn: '1h' });

   
            res.cookie('token', token, {
        httpOnly: true,
        secure: false, 
        maxAge: 3600000,
      });
      
      return res.status(200).json({ status: 'success', success: 'Login successful' });
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
};
