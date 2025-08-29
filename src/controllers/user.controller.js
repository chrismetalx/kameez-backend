const { User } = require('../models');
const { UniqueConstraintError } = require('sequelize');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const postUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, terms } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword || !terms) {
      return res.status(400).json({
        message: 'All fields are required and you must accept the terms.'
      });
    };

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: 'The password and confirm password do not match.'
      });
    };

    const createUser = await User.create(
      {
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(password, saltRounds)
      }
    );

    res.status(200).json({
      status: 200,
      message: 'User created successfully.',
      data: {
        user: {
          firstName: createUser.firstName,
          lastName: createUser.lastName,
          email: createUser.email
        }
      }
    });

  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res.status(409).json({ message: `Already exist an user with the email.` });
    } else {
      return res.status(500).json({ message: 'Internal Server Error.' });
    }
  }
};

const patchUserPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        message: 'All fields are required.'
      });
    };

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: 'The password and confirm password do not match.'
      });
    };

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        message: 'No user exists with that email.'
      });
    };

    await User.update(
      {
        password: await bcrypt.hash(password, saltRounds)
      },
      {
        where: {
          id: user.id
        }
      }
    );

    res.status(200).json({
      status: 200,
      message: 'Password updated successfully.'
    });

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
};

module.exports = {
  postUser: postUser,
  patchUserPassword: patchUserPassword
};