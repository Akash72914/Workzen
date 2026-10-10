import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {
    requireWorkspaceMember,
    requireWorkspaceRole,
} from "../middleware/workspace.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import { addProjectMemberValidator } from "../validators/projectMember.validator.js";
import {
    addProjectMemberController,
    projectMembersController,
} from "../controllers/projectMember.controller.js";

const projectMemberRouter = express.Router();

projectMemberRouter.post(
    "/:workspaceId/projects/:projectId/members",
    authUser,
    requireWorkspaceRole("OWNER", "ADMIN"),
    addProjectMemberValidator,
    validateRequest,
    addProjectMemberController,
);

projectMemberRouter.get(
    "/:workspaceId/projects/:projectId/members",
    authUser,
    requireWorkspaceMember,
    projectMembersController,
);

export default projectMemberRouter;
