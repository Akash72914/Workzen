import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {
    requireWorkspaceMember,
    requireWorkspaceRole,
} from "../middleware/workspace.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import { createTaskController } from "../controllers/task.controller.js";
import { createTaskValidator } from "../validators/task.validator.js";

const taskRouter = express.Router();

taskRouter.post(
    "/:workspaceId/projects/:projectId/tasks",
    authUser,
    requireWorkspaceMember,
    createTaskValidator,
    validateRequest,
    createTaskController,
);

export default taskRouter;
