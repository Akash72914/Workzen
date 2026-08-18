import express from "express";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import { registerController } from "../controllers/register.controller.js";
import { loginController } from "../controllers/login.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
import { meController } from "../controllers/me.controller.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  registerValidator,
  validateRequest,
  registerController,
);
authRouter.post("/login", loginValidator, validateRequest, loginController);
authRouter.get("/me", authUser, meController);

export default authRouter;
