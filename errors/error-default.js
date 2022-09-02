const ERROR_DEFAULT = 500;

class ErrorDefault extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_DEFAULT;
  }
}

module.exports = ErrorDefault;
