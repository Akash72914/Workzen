import { body } from "express-validator";

export const createTaskValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Task title is required")
        .isString()
        .withMessage("Task title must be a string")
        .isLength({ min: 3, max: 150 })
        .withMessage("Task title must be between 3 and 150 characters"),

    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string")
        .trim()
        .isLength({ max: 1000 })
        .withMessage("Description cannot exceed 1000 characters"),

    body("priority")
        .notEmpty()
        .withMessage("Task priority is required")
        .isIn(["LOW", "MEDIUM", "HIGH", "URGENT"])
        .withMessage("Invalid task priority"),

    body("assigneeId")
        .optional({ values: "null" })
        .isUUID()
        .withMessage("Invalid assignee ID"),

    body("dueDate")
        .optional({ values: "null" })
        .isISO8601()
        .withMessage("Due date must be a valid date"),
];
