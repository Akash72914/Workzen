import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {
    getWorkspaceController,
    getWorkspacesController,
    workspaceController,
} from "../controllers/workspace.controller.js";

const workspaceRouter = express.Router();

workspaceRouter.post("/", authUser, workspaceController);
workspaceRouter.get("/", authUser, getWorkspacesController);
workspaceRouter.get("/:workspaceId", authUser, getWorkspaceController);

export default workspaceRouter;
