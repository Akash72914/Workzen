import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { requireWorkspaceRole } from "../middleware/workspace.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import { createProjectValidator } from "../validators/project.validator.js";
import { createProjectController } from "../controllers/project.controller.js";

const projectRouter = express.Router();

projectRouter.post(
    "/:workspaceId/projects",
    authUser,
    requireWorkspaceRole("OWNER", "ADMIN"),
    createProjectValidator,
    validateRequest,
    createProjectController,
);

export default projectRouter;
