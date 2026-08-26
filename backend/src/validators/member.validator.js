import { body } from "express-validator";

export const addMemberValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email")
        .normalizeEmail(),

    body("role")
        .trim()
        .notEmpty()
        .withMessage("Role is required")
        .isIn(["OWNER", "ADMIN", "MEMBER"])
        .withMessage("Invalid workspace role"),
];

export const updateMemberRoleValidator = [
    body("role")
        .trim()
        .notEmpty()
        .withMessage("Role is required")
        .isIn(["OWNER", "ADMIN", "MEMBER"])
        .withMessage("Invalid workspace role"),
];
