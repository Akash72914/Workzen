import { body } from "express-validator";

export const addProjectMemberValidator = [
    body("userId")
        .trim()
        .notEmpty()
        .withMessage("User ID is required")
        .isUUID()
        .withMessage("Invalid user ID"),

    body("role")
        .trim()
        .notEmpty()
        .withMessage("Project role is required")
        .isIn(["MANAGER", "MEMBER", "VIEWER"])
        .withMessage("Invalid project role"),
];
