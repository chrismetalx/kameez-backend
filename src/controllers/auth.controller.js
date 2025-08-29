const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config.js');

const postLogin = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and Password are required.'
    });
  };

  const user = await User.findOne({
    where: {
      email: email
    }
  });

  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: 'Invalid credentials'
      })
    }
  } else {
    return res.status(401).json({
      message: 'There is no user with that email.'
    })
  }

  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '3m' });

  res.status(200).json({
    status: 200,
    message: 'User login successfully.',
    data: {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      token
    }
  })
};

module.exports = {
  postLogin: postLogin
};