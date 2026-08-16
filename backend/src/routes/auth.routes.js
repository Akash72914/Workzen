import express from "express";
import { registerValidator } from "../validators/auth.validator.js";
import { validateRequest } from "../middleware/validate.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerValidator, validateRequest, (req, res) => {
  res.send("Register route working");
});

export default authRouter;
