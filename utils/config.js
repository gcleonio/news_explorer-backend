const { JWT_SECRET = "dev-secret", NODE_ENV } = process.env;

const { MONGO_DB_CONNECTION = "mongodb://localhost:27017/news_explorer_db" } =
  process.env;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  MONGO_DB_CONNECTION,
};
