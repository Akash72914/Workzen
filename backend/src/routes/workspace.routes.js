import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {
    getWorkspaceController,
    getWorkspacesController,
    updateWorkspaceController,
    workspaceController,
} from "../controllers/workspace.controller.js";
import { requireWorkspaceRole } from "../middleware/workspace.middleware.js";

const workspaceRouter = express.Router();

workspaceRouter.post("/", authUser, workspaceController);
workspaceRouter.get("/", authUser, getWorkspacesController);
workspaceRouter.get("/:workspaceId", authUser, getWorkspaceController);
workspaceRouter.patch(
    "/:workspaceId",
    authUser,
    requireWorkspaceRole("OWNER", "ADMIN"),
    updateWorkspaceController,
);

export default workspaceRouter;
