function createApiError(statusCode, message, errors, isOperational = true) {
  const status = `${statusCode}`.startsWith("4") ? "fail" : "error";
  const error = new Error(message);

  error.statusCode = statusCode;
  error.status = status;
  error.isOperational = isOperational;
  error.errors = errors;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(error, createApiError);
  }

  return error;
}

export const ApiError = {
  badRequest(message, errors) {
    return createApiError(400, message, errors);
  },
  notFound(message = "Not found") {
    return createApiError(404, message);
  },
  conflict(message) {
    return createApiError(409, message);
  },
  internal(message = "Internal server error") {
    return createApiError(500, message);
  },
};
