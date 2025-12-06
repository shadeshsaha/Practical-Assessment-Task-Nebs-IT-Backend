import mongoose from "mongoose";
import { config } from "../config/index.js";
import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (err, _req, res, _next) => {
  let error = err;
  console.error(err.message, err.stack);

  // Mongoose Cast Error
  if (err instanceof mongoose.Error.CastError) {
    error = ApiError.badRequest(`Invalid ${err.path}: ${err.value}`);
  }

  // Mongoose Validation Error
  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map((e) => e.message);
    error = ApiError.badRequest("Validation Error", messages);
  }

  // Mongoose Duplicate Key Error
  if (err.name === "MongoServerError" && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = ApiError.conflict(`${field} already exists`);
  }

  // Default to ApiError
  if (!(error instanceof ApiError)) {
    error = new ApiError(500, err.message || "Internal Server Error");
  }

  const apiError = error;
  res.status(apiError.statusCode).json({
    success: false,
    message: apiError.message,
    errors: apiError.errors,
    ...(config.env === "development" && { stack: apiError.stack }),
  });
};

export const notFoundHandler = (req, _res, next) => {
  next(ApiError.notFound(`Route ${req.originalUrl} not found`));
};
