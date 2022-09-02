const ERROR_CODE = 400;

class IncorrectQueryError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE;
  }
}

module.exports = IncorrectQueryError;
