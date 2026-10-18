import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { requireWorkspaceMember } from "../middleware/workspace.middleware.js";
import { getTaskActivitiesController } from "../controllers/activity.controller.js";

const activityRouter = express.Router();

activityRouter.get(
    "/:workspaceId/projects/:projectId/tasks/:taskId/activities",
    authUser,
    requireWorkspaceMember,
    getTaskActivitiesController,
);

export default activityRouter;
