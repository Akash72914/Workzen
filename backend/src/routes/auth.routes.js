import express from "express";
import { registerValidator } from "../validators/auth.validator.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import { registerController } from "../controllers/register.controller.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  registerValidator,
  validateRequest,
  registerController,
);

export default authRouter;
