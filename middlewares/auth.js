const jwt = require("jsonwebtoken");
const { JWT_SECRET, NODE_ENV } = require("../utils/config");

const UnauthorizedError = require("../utils/errors/UnauthorizedError");

const authError = (next) => {
  next(new UnauthorizedError("Authorization required"));
};

const handleAuthorization = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return authError(next);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    console.log(NODE_ENV === "production" ? JWT_SECRET : "dev-secret");
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
    );
  } catch (err) {
    return authError(next);
  }

  req.user = payload;

  return next();
};

module.exports = { handleAuthorization };
