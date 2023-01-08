const bcrypt = require('bcrypt');
const CustomError = require('../helpers/CustomError');
const { generateToken } = require('../middlewares/auth');
const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  let { userId } = req.params;
  if (!userId) {
    userId = req.user._id;
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new CustomError('Пользователь не найден', 404);
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CustomError('Пользователь не найден', 400));
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => {
        res.status(201).send({
          _id: user._id,
          email: user.email,
          name,
          about,
          avatar,
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new CustomError('Такой пользователь уже существует', 409));
        }
        if (err.name === 'ValidationError') {
          next(new CustomError('Переданы некорректные данные при создании пользователя.', 400));
        }
        next(err);
      }));
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new CustomError('Пользователь не найден', 404);
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CustomError('Переданы некорректные данные при обновлении пользователя.', 400));
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new CustomError('Пользователь не найден', 404);
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CustomError('Переданы некорректные данные при обновлении аватара.', 400));
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ _id: user._id });
      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
        }).send({ token });
    })
    .catch((err) => {
      next(new CustomError(err.message, 401));
    });
};
