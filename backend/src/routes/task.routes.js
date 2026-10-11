import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {
    requireWorkspaceMember,
    requireWorkspaceRole,
} from "../middleware/workspace.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import {
    createTaskController,
    getProjectTasksController,
    getTaskByIdController,
} from "../controllers/task.controller.js";
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

taskRouter.get(
    "/:workspaceId/projects/:projectId/tasks",
    authUser,
    requireWorkspaceMember,
    getProjectTasksController,
);

taskRouter.get(
    "/:workspaceId/projects/:projectId/tasks/:taskId",
    authUser,
    requireWorkspaceMember,
    getTaskByIdController,
);

export default taskRouter;
