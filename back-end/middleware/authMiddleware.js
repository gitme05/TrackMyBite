const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).redirect('/login');
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.clearCookie('token');
    res.status(401).redirect('/login');
  }
};

module.exports = authenticateUser;
