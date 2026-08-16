import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.array(),
    });
  }

  next();
};
