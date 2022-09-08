const AUTH_ERROR = 401;

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTH_ERROR;
  }
}

module.exports = AuthError;
