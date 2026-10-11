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

export const updateTaskValidator = [
    body().custom((value) => {
        if (!value || Object.keys(value).length === 0) {
            throw new Error("At least one field is required to update a task");
        }

        return true;
    }),

    body("title")
        .optional()
        .isString()
        .withMessage("Task title must be a string")
        .bail()
        .trim()
        .isLength({ min: 3, max: 150 })
        .withMessage("Task title must be between 3 and 150 characters"),

    body("description")
        .optional({ values: "undefined" })
        .custom((value) => {
            if (value === null) return true;

            if (typeof value !== "string") {
                throw new Error("Description must be a string or null");
            }

            if (value.length > 1000) {
                throw new Error("Description cannot exceed 1000 characters");
            }

            return true;
        })
        .trim(),

    body("status")
        .optional()
        .isIn(["TODO", "IN_PROGRESS", "REVIEW", "DONE"])
        .withMessage("Invalid task status"),

    body("priority")
        .optional()
        .isIn(["LOW", "MEDIUM", "HIGH", "URGENT"])
        .withMessage("Invalid task priority"),

    body("assigneeId")
        .optional({ values: "undefined" })
        .custom((value) => {
            if (value === null) return true;

            if (typeof value !== "string") {
                throw new Error("Assignee ID must be a UUID or null");
            }

            return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
                value,
            );
        })
        .withMessage("Assignee ID must be a valid UUID or null"),

    body("dueDate")
        .optional({ values: "undefined" })
        .custom((value) => {
            if (value === null) return true;

            if (
                typeof value !== "string" ||
                !/^\d{4}-\d{2}-\d{2}(T.*)?$/.test(value) ||
                Number.isNaN(Date.parse(value))
            ) {
                throw new Error(
                    "Due date must be a valid ISO 8601 date or null",
                );
            }

            return true;
        }),
];
