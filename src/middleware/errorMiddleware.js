import { config } from "../config/index.js";
// import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (err, _req, res, _next) => {
  console.error("Raw Error:", err);

  // EARLY RETURN for ApiError
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
      ...(config.env === "development" && { stack: err.stack }),
    });
  }

  // Zod Validation Errors
  if (err.name === "ZodError") {
    const errorMessages = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errorMessages,
    });
  }

  // Mongoose Cast Error (Invalid ID)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid ID: ${err.value}`,
    });
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Database validation failed",
      errors: messages,
    });
  }

  // MongoDB Duplicate Key
  if (err.name === "MongoServerError" && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  // Generic Error
  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(config.env === "development" && { stack: err.stack }),
  });
};

export const notFoundHandler = (req, _res, next) => {
  const error = {
    statusCode: 404,
    message: `Route ${req.originalUrl} not found`,
  };
  next(error);
};
