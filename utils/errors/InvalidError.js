class InvalidError extends Error {
  constructor(message) {
    super(message);
    this.name = "INVALID_DATA_ERROR";
    this.statusCode = 400;
  }
}

module.exports = InvalidError;
