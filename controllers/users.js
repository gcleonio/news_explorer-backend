// import bcrypt
// import jsonwebtokens
// import jwt_secret, and node_env
const User = require("../models/user");
// import other errors
const NotFoundError = require("../utils/errors/NotFound");
const { USER_NOT_FOUND } = require("../utils/constants");

// also need to create controller for createUser

// also need to create controller for loginUser

const getCurrentUser = (req, res, next) => {
  console.log(req.user._id);
  const id = req.user._id;

  User.findById(id)
    .then((user) => {
      if (!user) {
        // throw new notFoundError;
        throw new NotFoundError(USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getCurrentUser };
