import { body } from "express-validator";

export const transferOwnershipValidator = [
    body("userId")
        .trim()
        .notEmpty()
        .withMessage("User ID is required")
        .isUUID()
        .withMessage("Invalid user ID"),
];
