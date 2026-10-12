import { body } from "express-validator";

export const createCommentValidator = [
    body("content")
        .exists()
        .withMessage("Comment content is required")
        .bail()
        .isString()
        .withMessage("Comment content must be a string")
        .bail()
        .trim()
        .notEmpty()
        .withMessage("Comment content cannot be empty")
        .bail()
        .isLength({ max: 2000 })
        .withMessage("Comment content cannot exceed 2000 characters"),
];
