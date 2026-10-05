import { body } from "express-validator";

export const createProjectValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Project name is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Project name must be between 3 and 100 characters"),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Project description cannot exceed 500 characters"),
];
