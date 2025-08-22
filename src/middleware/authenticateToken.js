const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config.js');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Invalid token.'
    })
  };

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: 'Unauthorized.'
      })
    }

    req.user = user;
    next();
  })
};

module.exports = authenticateToken;