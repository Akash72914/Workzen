import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {
    getWorkspacesController,
    workspaceController,
} from "../controllers/workspace.controller.js";

const workspaceRouter = express.Router();

workspaceRouter.post("/", authUser, workspaceController);
workspaceRouter.get("/", authUser, getWorkspacesController);

export default workspaceRouter;
