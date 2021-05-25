const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Schema/userSchema');
// TODO: Salt rounds in env variable?

const userController = {

  addUser(req, res) {
    const { body } = req;
    bcrypt.hash(body.password, 10, (err, passwordHashed) => {
      if (err) {
        res.status(500).json({
          ok: false,
          err,
        });
      }
      const user = new User({
        email: body.user_email,
        password: passwordHashed,

      });
      user.save((error, userSaved) => {
        const token = JWT.sign(
          { user },
          process.env.SECRET_KEY,
          { expiresIn: process.env.JWT_EXPIRES },
        );

        const userInfo = { user_email: userSaved.email, user_id: userSaved._id };
        if (error) {
          res.status(500).json({
            ok: false,
            error,
          });
        } else {
          res.status(200).json({
            ok: true,
            userInfo,
            token,
          });
        }
      });
    });
  },

  login(req, res) {
    const { body } = req;

    if (body.token) {
      const decryptedToken = JWT.verify(body.token, process.env.SECRET_KEY);
      // eslint-disable-next-line no-underscore-dangle
      User.findById(decryptedToken.user._id, (err, user) => {
        if (err) {
          res.status(200).json({
            ok: false,
            message: 'User not found',
            err,
          });
        } else {
          const userInfo = { user_email: user.email, user_id: user._id };
          res.status(200).json({
            status: true,
            userInfo,
          });
        }
      });
    } else {
      User.findOne({ email: body.user_email })
        .exec((err, user) => {
          if (err) {
            res.status(500).json({
              err,
            });
          }
          if (user == null) {
            res.status(200).json({
              ok: false,
              message: 'User not found',
            });
          }
          if (user) {
            bcrypt.compare(body.password, user.password, (error, correctCredential) => {
              if (error) {
                res.status(409).json({
                  status: false,
                  message: 'Incorrect validation',
                });
              }
              if (correctCredential) {
                const token = JWT.sign(
                  { user },
                  process.env.SECRET_KEY,
                  { expiresIn: process.env.JWT_EXPIRES },
                );
                const userInfo = { user_email: user.email, user_id: user._id };
                res.status(200).json({
                  status: true,
                  userInfo,
                  token,
                });
              }
            });
          }
        });
    }
  },

};

module.exports = userController;
