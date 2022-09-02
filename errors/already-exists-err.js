const ALREADY_EXISTS = 409;

class AlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ALREADY_EXISTS;
  }
}

module.exports = AlreadyExistsError;
