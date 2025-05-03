const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// import jwt_secret, and node_env from config folder in utils

const User = require("../models/user");
const InvalidError = require("../utils/errors/InvalidError");
const ConflictError = require("../utils/errors/ConflictError");
const NotFoundError = require("../utils/errors/NotFound");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");
const {
  USER_NOT_FOUND,
  VALID_EMAIL,
  EMAIL_IN_USE,
  CREATE_USER_INVALID,
  INVALID_CREDENTIALS,
} = require("../utils/constants");

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!email) {
        return next(new InvalidError(VALID_EMAIL));
      }
      if (user) {
        return next(new ConflictError(EMAIL_IN_USE));
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      const userPayload = user.toObject();
      delete userPayload.password;
      res.status(201).send({ data: userPayload });
    })

    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new InvalidError(CREATE_USER_INVALID));
      } else if (err.message === "Enter a valid email") {
        next(new InvalidError(VALID_EMAIL));
      } else if (err.message === "Email is already in use") {
        next(new ConflictError(EMAIL_IN_USE));
      } else {
        next(err);
      }
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new InvalidError(INVALID_CREDENTIALS));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" }
      );
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError(INVALID_CREDENTIALS));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  console.log(req.user._id);
  const id = req.user._id;

  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getCurrentUser, createUser, loginUser };
