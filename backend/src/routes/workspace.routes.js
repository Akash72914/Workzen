import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { workspaceController } from "../controllers/workspace.controller.js";

const workspaceRouter = express.Router();

workspaceRouter.post("/", authUser, workspaceController);

export default workspaceRouter;
