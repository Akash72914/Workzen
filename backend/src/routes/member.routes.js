import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {
    requireWorkspaceMember,
    requireWorkspaceRole,
} from "../middleware/workspace.middleware.js";
import {
    addMemberController,
    getMembersController,
} from "../controllers/member.controller.js";
import { addMemberValidator } from "../validators/member.validator.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import { requireMemberRolePermission } from "../middleware/member.middleware.js";

const memberRouter = express.Router();

memberRouter.post(
    "/:workspaceId/members",
    authUser,
    requireWorkspaceRole("OWNER", "ADMIN"),
    addMemberValidator,
    validateRequest,
    requireMemberRolePermission,
    addMemberController,
);
memberRouter.get(
    "/:workspaceId/members",
    authUser,
    requireWorkspaceMember,
    getMembersController,
);

export default memberRouter;
