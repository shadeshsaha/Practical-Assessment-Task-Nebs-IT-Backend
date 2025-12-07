import {
  getNoticeSchema,
  getNoticesQuerySchema,
} from "../features/Notice/validation/noticeValidation.js";
export const validateMiddleware = (schema) => {
  return async (req, _res, next) => {
    try {
      let dataToValidate;

      // GET /notices - allow empty query
      if (schema === getNoticesQuerySchema) {
        dataToValidate = { query: req.query || {} };
      }
      // POST/PATCH - body only
      else if (req.method === "POST" || req.method === "PATCH") {
        dataToValidate = req.body || {};
      }
      // Single notice - params only
      else if (schema === getNoticeSchema) {
        dataToValidate = { params: req.params };
      } else {
        dataToValidate = req.body || {};
      }

      await schema.parseAsync(dataToValidate);
      next();
    } catch (error) {
      console.error("Validation Error:", error);
      next(error);
    }
  };
};
