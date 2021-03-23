import { ERROR_TYPES } from './types';

class UnauthenticatedError extends Error {
  constructor(params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthenticatedError);
    }

    this.name = ERROR_TYPES.UNAUTHENTICATED;
  }
}

export default UnauthenticatedError;
