import express from "express";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import { registerController } from "../controllers/register.controller.js";
import { loginController } from "../controllers/login.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
import { profileController } from "../controllers/profile.controller.js";
import { logoutController } from "../controllers/logout.controller.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  registerValidator,
  validateRequest,
  registerController,
);
authRouter.post("/login", loginValidator, validateRequest, loginController);
authRouter.get("/profile", authUser, profileController);
authRouter.post("/logout", authUser, logoutController);

export default authRouter;
