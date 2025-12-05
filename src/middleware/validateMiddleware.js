import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError.js";

export const validateMiddleware = (schema) => {
  return async (req, _res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));
        next(ApiError.badRequest("Validation failed", errorMessages));
      } else {
        next(error);
      }
    }
  };
};
