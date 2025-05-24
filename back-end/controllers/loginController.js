const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  
  const user = { id: 1, email: 'test@example.com', password: '123456' };

  if (email === user.email && password === user.password) {
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, 
      sameSite: 'lax',
    });

    res.json({ status: 'success' });
  } else {
    res.status(401).json({ status: 'error', error: 'Invalid credentials' });
  }
};
