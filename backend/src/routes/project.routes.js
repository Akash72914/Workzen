import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {
    requireWorkspaceMember,
    requireWorkspaceRole,
} from "../middleware/workspace.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import {
    createProjectValidator,
    updateProjectValidator,
} from "../validators/project.validator.js";
import {
    createProjectController,
    getProjectController,
    getProjectsController,
    updateProjectController,
} from "../controllers/project.controller.js";

const projectRouter = express.Router();

projectRouter.post(
    "/:workspaceId/projects",
    authUser,
    requireWorkspaceRole("OWNER", "ADMIN"),
    createProjectValidator,
    validateRequest,
    createProjectController,
);
projectRouter.get(
    "/:workspaceId/projects",
    authUser,
    requireWorkspaceMember,
    getProjectsController,
);
projectRouter.get(
    "/:workspaceId/projects/:projectId",
    authUser,
    requireWorkspaceMember,
    getProjectController,
);
projectRouter.patch(
    "/:workspaceId/projects/:projectId",
    authUser,
    requireWorkspaceRole("OWNER", "ADMIN"),
    updateProjectValidator,
    validateRequest,
    updateProjectController,
);

export default projectRouter;
