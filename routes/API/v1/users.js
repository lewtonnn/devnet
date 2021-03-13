const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../../models/User');

router.post(
  '/',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please provide valid email address').isEmail(),
    check(
      'password',
      'Password is required and should be at least 6 characters long'
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    try {
      // check if email is taken
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User with this email is already exists' }],
        });
      }

      //   get gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        d: 'mm',
      });

      //   create new user
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //   hash password
      user.password = await bcrypt.hash(password, 10);

      //   save new user
      await user.save();

      //   generate JWT and send it to the frontend
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('JWT_SECRET'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      return     res.status(500).json({
        errors: [{ msg: 'Server error' }],
      });
    }
  }
);

module.exports = router;
