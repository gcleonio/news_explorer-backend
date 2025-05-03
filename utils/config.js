const { JWT_SECRET = "dev-secret", NODE_ENV } = process.env;

// extract CONNECT from environmental variables for connecting db
// extract MONGO_DB_CONNECTION from process.env and set a default value

module.exports = {
  JWT_SECRET,
  NODE_ENV,
};
