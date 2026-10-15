import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { requireWorkspaceMember } from "../middleware/workspace.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import {
    createTaskController,
    deleteTaskController,
    getProjectTasksController,
    getTaskByIdController,
    updateTaskController,
} from "../controllers/task.controller.js";
import {
    createTaskValidator,
    updateTaskValidator,
} from "../validators/task.validator.js";
import {
    createCommentController,
    deleteCommentController,
    getTaskCommentsController,
    updateCommentController,
} from "../controllers/comment.controller.js";
import {
    createCommentValidator,
    updateCommentValidator,
} from "../validators/comment.validator.js";

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

taskRouter.patch(
    "/:workspaceId/projects/:projectId/tasks/:taskId",
    authUser,
    requireWorkspaceMember,
    updateTaskValidator,
    validateRequest,
    updateTaskController,
);

taskRouter.delete(
    "/:workspaceId/projects/:projectId/tasks/:taskId",
    authUser,
    requireWorkspaceMember,
    deleteTaskController,
);

taskRouter.post(
    "/:workspaceId/projects/:projectId/tasks/:taskId/comments",
    authUser,
    requireWorkspaceMember,
    createCommentValidator,
    validateRequest,
    createCommentController,
);

taskRouter.get(
    "/:workspaceId/projects/:projectId/tasks/:taskId/comments",
    authUser,
    requireWorkspaceMember,
    getTaskCommentsController,
);

taskRouter.patch(
    "/:workspaceId/projects/:projectId/tasks/:taskId/comments/:commentId",
    authUser,
    requireWorkspaceMember,
    updateCommentValidator,
    validateRequest,
    updateCommentController,
);

taskRouter.delete(
    "/:workspaceId/projects/:projectId/tasks/:taskId/comments/:commentId",
    authUser,
    requireWorkspaceMember,
    deleteCommentController,
);

export default taskRouter;
